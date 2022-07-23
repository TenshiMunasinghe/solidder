import { Component, createSignal } from 'solid-js'
import Button from '../components/Button'
import PostForm from '../form/PostForm'

const Home: Component = () => {
  const [showForm, setShowForm] = createSignal(false)
  return (
    <div class='py-12'>
      Home Page
      <Button onClick={() => setShowForm(true)}>Post</Button>
      <PostForm isVisible={showForm()} closeForm={() => setShowForm(false)} />
    </div>
  )
}

export default Home
