import { useContext } from 'solid-js'
import { Context } from '../App'

const useUser = () => {
  return useContext(Context)
}

export default useUser
