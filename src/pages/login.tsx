import { reporter } from '@felte/reporter-solid'
import { createForm } from '@felte/solid'
import { validator } from '@felte/validator-zod'
import { useContext } from 'solid-js'
import { z } from 'zod'
import { UserModel } from '../../prisma/zod'
import { Context } from '../App'
import Button from '../components/Button'
import Link from '../components/Link'
import Form from '../form/Form'
import FormField from '../form/FormField'
const Login = () => {
  const { login } = useContext(Context)

  const schema = UserModel.pick({ email: true, password: true })

  const { form } = createForm<z.infer<typeof schema>>({
    extend: [
      validator({
        schema,
        level: 'error',
      }),
      reporter,
    ],
    onSubmit: async ({ email, password }) => {
      if (!email || !password) return
      await login({ email, password })
    },
  })

  return (
    <div class='space-y-8 py-12'>
      <h1>Log In</h1>
      <Form form={form}>
        <FormField name='email' type='email' label='Email' />
        <FormField name='password' type='password' label='Password' />
        <Button type='submit'>Log In</Button>
      </Form>
      <div>
        No account? Then <Link href='/register'>register</Link>
      </div>
    </div>
  )
}

export default Login
