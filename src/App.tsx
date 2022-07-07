import { Route, Routes } from 'solid-app-router'
import {
  Accessor,
  Component,
  createContext,
  createEffect,
  createSignal,
  lazy,
  Resource,
  Setter,
} from 'solid-js'
import { createTrpcQuery, inferQueryResponse } from './lib/trpc'

const Home = lazy(() => import('./pages/home'))
const Login = lazy(() => import('./pages/login'))
const Register = lazy(() => import('./pages/register'))

type User = inferQueryResponse<'with-token.login'> | undefined

type Token = string | null

export const Context = createContext<{
  user: Resource<User> | null
  setUser: Setter<User> | (() => void)
  token: Accessor<Token>
  setToken: Setter<Token> | (() => void)
}>({
  user: null,
  setUser: () => {
    /* initialize setUser as empty function */
  },
  token: () => null,
  setToken: () => {
    /* initialize setToken as empty function */
  },
})

const App: Component = () => {
  const [token, setToken] = createSignal(localStorage.getItem('token'))
  const [user, { mutate }] = createTrpcQuery('with-token.login')

  createEffect(() => {
    const newToken = token()
    if (!newToken) {
      localStorage.removeItem('token')
      return
    }
    localStorage.setItem('token', newToken)
  })

  return (
    <Context.Provider value={{ user, setUser: mutate, token, setToken }}>
      <div class='max-w-4xl mx-auto'>
        <Routes>
          <Route path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
        </Routes>
      </div>
    </Context.Provider>
  )
}

export default App
