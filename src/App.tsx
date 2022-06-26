import ky from 'ky'
import { Component, createEffect, createResource } from 'solid-js'

const App: Component = () => {
  const [data] = createResource(
    () => '/api/users',
    async url => {
      return await ky.get(url).json()
    }
  )
  createEffect(() => {
    console.dir(data())
  })
  return <div class=''>Hello Solidder</div>
}

export default App
