import { useState, useContext } from 'react'
import UserContext from '../context/UserContext'
import Notification from './Notification'
import NotificationContext from '../context/NotificationContext'
import loginService from '../services/login'


const LogInForm = () => {
  const [, setUser] = useContext(UserContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, showNotification] = useContext(NotificationContext);

  const handleLogIn = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (err) {
      showNotification({ text: err.message, error: true })
    }
  }
  return (
    <form onSubmit={handleLogIn}>
      <h1>log in to application</h1>
      <Notification notification={notification} />
      <div>
        <label htmlFor={'username'}>username</label>
        <input
          id={'username'}
          value={username}
          onChange={({ target }) => {
            setUsername(target.value)
          }}
        />
      </div>
      <div>
        <label htmlFor={'password'}>password</label>
        <input
          id={'password'}
          type={'password'}
          value={password}
          onChange={({ target }) => {
            setPassword(target.value)
          }}
        />
      </div>
      <button type={'submit'}>login</button>
    </form>
  )
}


export default LogInForm