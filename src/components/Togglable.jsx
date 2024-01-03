import { useState } from 'react';

const Togglable = ({buttonLabel, children}) => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    setVisible(!visible);
  }
  const showWhenVisible = {display: visible ? '' : 'none'}
  const hideWhenVisible = {display: visible ? 'none' : ''}
  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisible}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisible}>cancel</button>
      </div>
    </div>
  )
}

export default Togglable;