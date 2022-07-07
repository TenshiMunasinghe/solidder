import { Route, Routes } from 'solid-app-router'
import { Component, createContext, createEffect, lazy } from 'solid-js'
import { createAuth } from './stores/createAuth'

const Home = lazy(() => import('./pages/home'))
const Login = lazy(() => import('./pages/login'))
const Register = lazy(() => import('./pages/register'))

type Auth = ReturnType<typeof createAuth>

export const Context = createContext<{
  user: Auth['user'] | null
  token: Auth['token']
  login: Auth['login'] | (() => void)
  register: Auth['register'] | (() => void)
}>({
  user: null,
  token: () => null,
  login: () => {
    /* initialize as empty function */
  },
  register: () => {
    /* initialize as empty function */
  },
})

const App: Component = () => {
  const auth = createAuth()

  createEffect(() => {
    const newToken = auth.token()
    if (!newToken) {
      localStorage.removeItem('token')
      return
    }
    localStorage.setItem('token', newToken)
  })

  return (
    <Context.Provider value={auth}>
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
