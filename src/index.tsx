/* @refresh reload */
import { render } from 'solid-js/web'
import './assets/fonts/gordita/font.css'
import './index.css'

import { Router } from 'solid-app-router'
import App from './App'

render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  document.getElementById('root') as HTMLElement
)
