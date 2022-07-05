import { For, splitProps } from 'solid-js'
import { createStore } from 'solid-js/store'
import Button from '../components/Button'
import Form from '../components/Form'
import FormLabel from '../components/FormLabel'
import Input from '../components/Input'
import { trpcClient } from '../lib/trpc'
import useUser from '../stores/useUser'

const Login = () => {
  let ref: HTMLFormElement | undefined

  const { setUser } = useUser()

  const [fields, setFields] = createStore({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  type FieldsKey = keyof typeof fields

  const attributes: {
    [key in FieldsKey]: {
      type: string
      label: string
    }
  } = {
    username: { type: 'text', label: 'Username' },
    email: { type: 'email', label: 'Email' },
    password: { type: 'password', label: 'Password' },
    confirmPassword: { type: 'password', label: 'Confirm Password' },
  }

  const onSubmit = async () => {
    if (!ref) return
    if (Object.values(fields).some(value => !value)) return
    if (fields.password !== fields.confirmPassword) return

    const [, body] = splitProps(fields, ['confirmPassword'])

    trpcClient.mutation('register', body).then(user => {
      setUser({ ...user })
    })
  }

  return (
    <div class='space-y-8 py-12'>
      <h1>Register</h1>
      <Form
        onSubmit={e => {
          e.preventDefault()
          onSubmit()
        }}
        ref={ref}>
        <For each={Object.keys(fields) as FieldsKey[]}>
          {key => {
            const { label, type } = attributes[key]
            return (
              <FormLabel label={label}>
                <Input
                  type={type}
                  name={key}
                  value={fields[key]}
                  onKeyUp={e => {
                    setFields(key, e.currentTarget.value)
                  }}
                />
              </FormLabel>
            )
          }}
        </For>
        <Button type='submit'>Register</Button>
      </Form>
    </div>
  )
}

export default Login
