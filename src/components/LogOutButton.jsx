import { useContext } from 'react'
import UserContext from '../context/UserContext'

const LogOutButton = () => {
  const [, setUser] = useContext(UserContext)
  const handleLogOut = () => {
    setUser(null)
    localStorage.clear()
  }
  return <button onClick={handleLogOut}>logout</button>
}

export default LogOutButton
