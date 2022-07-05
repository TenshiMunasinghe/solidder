import { trpcClient } from '../lib/trpc'
import useUser from '../stores/useUser'

const Login = () => {
  let ref: HTMLFormElement | undefined

  const { setUser } = useUser()

  const onSubmit = async () => {
    if (!ref) return
    const emailRef = ref.elements.namedItem('email') as HTMLInputElement,
      passwordRef = ref.elements.namedItem('password') as HTMLInputElement,
      email = emailRef.value,
      password = passwordRef.value

    if (!email || !password) return

    const body = {
      email,
      password,
    }

    trpcClient.query('login', body).then(user => {
      setUser({ ...user })
    })
  }

  const className =
    'max-w-sm p-1 bg-neutral-700 focus:outline-none focus:ring-1 focus:ring-accent rounded-sm overflow-hidden'
  return (
    <div class='space-y-8 py-12'>
      <h1>Log In</h1>
      <form
        class='flex flex-col space-y-6'
        onSubmit={e => {
          e.preventDefault()
          onSubmit()
        }}
        ref={ref}>
        <input class={className} type='email' name='email' />
        <input class={className} type='password' name='password' />
        <button
          type='submit'
          class='w-max px-4 py-2 rounded-sm hover:bg-secondary focus:bg-secondary bg-primary '>
          Log In
        </button>
      </form>
    </div>
  )
}

export default Login
