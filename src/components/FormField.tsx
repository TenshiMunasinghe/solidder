import { ValidationMessage } from '@felte/reporter-solid'
import { For, JSX, Show, splitProps } from 'solid-js'
import Input from './Input'

type BreakPoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'all'

interface Props
  extends Omit<
    JSX.InputHTMLAttributes<HTMLInputElement>,
    'children' | 'class'
  > {
  name: string
  label?: string
  arrangement?: {
    direction: 'row' | 'column'
    above: BreakPoint
  }
}

const className = {
  row: {
    all: 'space-x-2 items-center',
    sm: 'sm:space-x-2 sm:items-center',
    md: 'md:space-x-2 md:items-center',
    lg: 'lg:space-x-2 lg:items-center',
    xl: 'xl:space-x-2 xl:items-center',
    '2xl': '2xl:space-x-2 2xl:items-center',
  },
  column: {
    all: 'space-y-2 flex-col',
    sm: 'sm:space-y-2 sm:flex-col',
    md: 'md:space-y-2 md:flex-col',
    lg: 'lg:space-y-2 lg:flex-col',
    xl: 'xl:space-y-2 xl:flex-col',
    '2xl': '2xl:space-y-2 2xl:flex-col',
  },
}

const FormField = (props: Props) => {
  const [local, inputProps] = splitProps(props, [
    'name',
    'label',
    'arrangement',
  ])
  const arrangement = () =>
    local.arrangement ?? {
      direction: 'column',
      above: 'all',
    }

  return (
    <div>
      <label
        class={
          'flex ' + className[arrangement().direction][arrangement().above]
        }>
        <div>{local.label}</div>
        <Input {...inputProps} name={local.name} />
      </label>
      <ValidationMessage for={local.name}>
        {errors => (
          <Show when={errors}>
            {messages => (
              <For each={messages}>{message => <div>{message}</div>}</For>
            )}
          </Show>
        )}
      </ValidationMessage>
    </div>
  )
}

export default FormField
