import { useContext } from 'solid-js'
import { Context } from '../App'
import Button from '../components/Button'
import Form from '../components/Form'
import FormLabel from '../components/FormLabel'
import Input from '../components/Input'

const Login = () => {
  let ref: HTMLFormElement | undefined

  const { login } = useContext(Context)

  const onSubmit = async () => {
    if (!ref) return
    const emailRef = ref.elements.namedItem('email') as HTMLInputElement,
      passwordRef = ref.elements.namedItem('password') as HTMLInputElement,
      email = emailRef.value,
      password = passwordRef.value

    if (!email || !password) return

    await login({ email, password })
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
        <FormLabel label='Email'>
          <Input type='email' name='email' />
        </FormLabel>
        <FormLabel label='Password'>
          <Input type='password' name='password' />
        </FormLabel>
        <Button type='submit'>Log In</Button>
      </Form>
    </div>
  )
}

export default Login
