import { Route, Routes } from 'solid-app-router'
import { Component } from 'solid-js'
import Home from './pages/home'

const App: Component = () => {
  return (
    <div class='max-w-4xl mx-auto'>
      <Routes>
        <Route path='/' component={Home} />
      </Routes>
    </div>
  )
}

export default App
