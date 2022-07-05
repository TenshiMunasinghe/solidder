import { JSX, splitProps } from 'solid-js'

interface Props extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = (props: Props) => {
  const [local, buttonProps] = splitProps(props, ['children', 'class'])

  return (
    <button
      class={
        'w-max px-4 py-2 rounded-sm hover:bg-secondary focus:bg-secondary bg-primary' +
        (local.class ? ` ${local.class}` : '')
      }
      {...buttonProps}>
      {local.children}
    </button>
  )
}

export default Button
