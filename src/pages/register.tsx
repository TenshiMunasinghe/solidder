import { reporter } from '@felte/reporter-solid'
import { createForm } from '@felte/solid'
import { validator } from '@felte/validator-zod'
import { useContext } from 'solid-js'
import { z } from 'zod'
import { UserModel } from '../../prisma/zod'
import { Context } from '../App'
import Button from '../components/Button'
import Form from '../components/Form'
import FormField from '../components/FormField'

const Login = () => {
  const { register } = useContext(Context)

  const schema = UserModel.pick({
    email: true,
    password: true,
    name: true,
  }).merge(
    z.object({
      confirmPassword: UserModel.shape.password,
    })
  )

  const { form } = createForm<z.infer<typeof schema>>({
    extend: [
      validator({
        schema,
        level: 'error',
      }),
      reporter,
    ],
    validate: values => {
      if (values.password !== values.confirmPassword) {
        return {
          confirmPassword: 'Passwords do not match',
        }
      }
    },
    onSubmit: async ({ confirmPassword, name, ...values }) => {
      await register({ ...values, username: name })
    },
  })

  return (
    <div class='space-y-8 py-12'>
      <h1>Register</h1>
      <Form form={form}>
        <FormField label='Username' type='text' name='name' />
        <FormField label='Email' type='email' name='email' />
        <FormField label='Password' type='password' name='password' />
        <FormField
          label='Confirm Password'
          type='password'
          name='confirmPassword'
        />
        <Button type='submit'>Register</Button>
      </Form>
    </div>
  )
}

export default Login
