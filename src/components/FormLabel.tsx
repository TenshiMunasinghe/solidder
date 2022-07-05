import { JSX, mergeProps, splitProps } from 'solid-js'

interface Props extends JSX.LabelHTMLAttributes<HTMLLabelElement> {
  label?: string
  isInline?: boolean
}

const FormLabel = (props: Props) => {
  props = mergeProps({ isInline: false }, props)
  const [local, labelProps] = splitProps(props, [
    'children',
    'label',
    'isInline',
    'class',
  ])
  return (
    <label
      {...labelProps}
      class='flex'
      classList={{
        ['space-y-2 flex-col']: !local.isInline,
        ['space-x-2 items-center']: local.isInline,
      }}>
      <div>{local.label}</div>
      {local.children}
    </label>
  )
}

export default FormLabel
