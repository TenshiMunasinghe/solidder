import { Route, Routes } from 'solid-app-router'
import { Component, createContext, createEffect } from 'solid-js'
import { createStore, SetStoreFunction } from 'solid-js/store'
import { inferQueryResponse } from './lib/trpc'
import Home from './pages/home'
import Login from './pages/login'

type User = inferQueryResponse<'login'>
type UserStore = NonNullable<User> | {}

export const Context = createContext<{
  user: UserStore | null
  setUser: SetStoreFunction<UserStore>
}>({
  user: null,
  setUser: () => {
    /* initialize setUser as empty function */
  },
})

const App: Component = () => {
  const [user, setUser] = createStore<NonNullable<UserStore>>({})

  createEffect(() => {
    console.dir(user)
  })
  return (
    <Context.Provider value={{ user, setUser }}>
      <div class='max-w-4xl mx-auto'>
        <Routes>
          <Route path='/' component={Home} />
          <Route path='/login' component={Login} />
        </Routes>
      </div>
    </Context.Provider>
  )
}

export default App
