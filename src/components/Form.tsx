import { JSX, splitProps } from 'solid-js'

interface Props extends JSX.FormHTMLAttributes<HTMLFormElement> {}

const Form = (props: Props) => {
  const [local, formProps] = splitProps(props, ['children', 'class'])
  return (
    <form
      {...formProps}
      class={
        'flex flex-col space-y-6' + (local.class ? ` ${local.class}` : '')
      }>
      {local.children}
    </form>
  )
}

export default Form
