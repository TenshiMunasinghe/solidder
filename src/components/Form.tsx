import { JSX, splitProps } from 'solid-js'

interface Props extends JSX.FormHTMLAttributes<HTMLFormElement> {
  form: (node: HTMLFormElement) => {
    destroy: () => void
  }
}

const Form = (props: Props) => {
  const [local, formProps] = splitProps(props, ['children', 'class', 'form'])

  return (
    <form
      {...formProps}
      ref={local.form}
      class={
        'flex flex-col space-y-6' + (local.class ? ` ${local.class}` : '')
      }>
      {local.children}
    </form>
  )
}

export default Form
