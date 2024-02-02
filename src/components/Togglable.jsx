import { useState } from 'react';
import PropTypes from 'prop-types';
import { createContext } from 'react';

export const VisibleContext = createContext();

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? '' : 'none' };
  const hideWhenVisible = { display: visible ? 'none' : '' };

  const toggleVisible = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisible}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        <VisibleContext.Provider value={{ toggleVisible }}>
          {props.children}
        </VisibleContext.Provider>
        <button onClick={toggleVisible}>cancel</button>
      </div>
    </div>
  );
};

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

Togglable.displayName = 'Togglable';

export default Togglable;
