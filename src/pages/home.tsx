import { useNavigate } from 'solid-app-router'
import { Component, createEffect, createSignal, useContext } from 'solid-js'
import { Context } from '../App'
import Button from '../components/Button'
import PostForm from '../form/PostForm'

const Home: Component = () => {
  const [showForm, setShowForm] = createSignal(false)
  const { user, logout } = useContext(Context)
  const navigate = useNavigate()

  createEffect(() => {
    if (!user?.()) {
      navigate('/login')
    }
  })

  return (
    <div class='flex flex-col py-12'>
      <h1>Home Page</h1>
      <Button onClick={logout}>Log Out</Button>
      <Button onClick={() => setShowForm(true)}>Post</Button>
      <PostForm isVisible={showForm()} closeForm={() => setShowForm(false)} />
    </div>
  )
}

export default Home
