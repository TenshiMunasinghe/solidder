import Button from '../components/Button'
import Form from '../components/Form'
import Input from '../components/Input'
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

  return (
    <div class='space-y-8 py-12'>
      <h1>Log In</h1>
      <Form
        onSubmit={e => {
          e.preventDefault()
          onSubmit()
        }}
        ref={ref}>
        <Input type='email' name='email' />
        <Input type='password' name='password' />
        <Button type='submit'>Log In</Button>
      </Form>
    </div>
  )
}

export default Login
