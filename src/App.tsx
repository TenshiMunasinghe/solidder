import { Component, createEffect } from 'solid-js'
import { createTrpcQuery } from './lib/trpc'

const App: Component = () => {
  const [data] = createTrpcQuery('users')
  createEffect(() => {
    console.dir(data())
  })
  return <div class=''>Hello Solidder</div>
}

export default App
