import { batch, createResource, createSignal } from 'solid-js'
import { trpcClient } from '../lib/trpc'

export const createAuth = () => {
  const [token, setToken] = createSignal(localStorage.getItem('token'))
  const [user, { mutate: setUser }] = createResource(token, async () => {
    return trpcClient.query('with-token.login')
  })

  const login = async ({
    email,
    password,
  }: {
    email: string
    password: string
  }) => {
    const { token: newToken, ...newUser } = await trpcClient.query('login', {
      email,
      password,
    })
    batch(() => {
      setUser(newUser)
      setToken(newToken)
    })
  }

  const register = async (input: {
    email: string
    password: string
    username: string
  }) => {
    const { token: newToken, ...newUser } = await trpcClient.mutation(
      'register',
      input
    )
    batch(() => {
      setUser(newUser)
      setToken(newToken)
    })
  }

  return { token, user, login, register }
}
