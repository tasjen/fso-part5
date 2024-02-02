import { createContext, useReducer } from 'react'

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    default:
      return state
  }
}

const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, null)

  const setUser = (user) => {
    dispatch({ type: 'SET', payload: user })
  }

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext
