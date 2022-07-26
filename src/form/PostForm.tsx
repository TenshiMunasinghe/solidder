import { reporter } from '@felte/reporter-solid'
import { createForm } from '@felte/solid'
import { validator } from '@felte/validator-zod'
import { Portal, Show } from 'solid-js/web'
import z from 'zod'
import { SolidModel } from '../../prisma/zod'
import Button from '../components/Button'
import { trpcClient } from '../lib/trpc'
import Form from './Form'

interface Props {
  isVisible: boolean
  closeForm: () => void
}

const PostForm = (props: Props) => {
  const schema = SolidModel.pick({ content: true })
  const { form } = createForm<z.infer<typeof schema>>({
    extend: [
      validator({
        schema,
        level: 'error',
      }),
      reporter,
    ],
    onSubmit: async ({ content }) => {
      await trpcClient.mutation('with-token.post', { content })
    },
  })

  return (
    <Portal>
      <Show when={props.isVisible}>
        <div class='fixed top-0 w-screen h-screen bg-neutral-800/70 p-20'>
          <Form form={form} class='max-w-lg mx-auto'>
            <textarea
              placeholder='post your solid'
              class='bg-neutral-700 text-neutral-50'
              name='content'></textarea>
            <Button type='submit'>Post</Button>
          </Form>
        </div>
      </Show>
    </Portal>
  )
}

export default PostForm
