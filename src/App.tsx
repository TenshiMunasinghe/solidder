import { Route, Routes } from 'solid-app-router'
import { Component, createContext, lazy } from 'solid-js'
import { createStore, SetStoreFunction } from 'solid-js/store'
import { inferQueryResponse } from './lib/trpc'

const Home = lazy(() => import('./pages/home'))
const Login = lazy(() => import('./pages/login'))

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
