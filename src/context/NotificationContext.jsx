import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'CLEAR':
      return { text: '', error: false }
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, dispatch] = useReducer(notificationReducer, {
    text: '',
    error: false,
  })
  const showNotification = ({ text, error }) => {
    dispatch({ type: 'SET', payload: { text, error } })
    setTimeout(() => dispatch({ type: 'CLEAR' }), 5000)
  }
  return (
    <NotificationContext.Provider value={[notification, showNotification]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
