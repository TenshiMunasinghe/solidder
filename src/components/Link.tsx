import { Link as RouterLink, LinkProps } from 'solid-app-router'
import { splitProps } from 'solid-js'

interface Props extends LinkProps {}

const Link = (props: Props) => {
  const [local, linkProps] = splitProps(props, ['class'])

  return (
    <RouterLink
      class={
        'text-accent hover:underline focus:underline' +
        (local.class ? ` ${local.class}` : '')
      }
      {...linkProps}
    />
  )
}

export default Link
