import { JSX } from 'solid-js'

interface Props extends JSX.InputHTMLAttributes<HTMLInputElement> {}

const Input = (props: Props) => {
  return (
    <input
      class='max-w-sm w-full p-1 bg-neutral-700 focus:outline-none focus:ring-1 focus:ring-accent rounded-sm overflow-hidden'
      {...props}
    />
  )
}

export default Input
