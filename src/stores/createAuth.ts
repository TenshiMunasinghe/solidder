import { batch, createSignal } from 'solid-js'
import { createTrpcQuery, trpcClient } from '../lib/trpc'

export const createAuth = () => {
  const [token, setToken] = createSignal(localStorage.getItem('token'))
  const [user, { mutate }] = createTrpcQuery('with-token.login')

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
      // must be in this order
      setToken(newToken)
      mutate(newUser)
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
      // must be in this order
      setToken(newToken)
      mutate(newUser)
    })
  }

  const logout = () => {
    batch(() => {
      setToken(null)
      mutate(undefined)
    })
  }

  return { token, user, login, register, logout }
}
