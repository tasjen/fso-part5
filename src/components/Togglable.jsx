import { useState } from 'react';
import PropTypes from 'prop-types';
import { createContext } from 'react';

export const VisibleContext = createContext();

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    setVisible(!visible);
  };

  return (
    <div>
      {visible ? (
        <div>
          <VisibleContext.Provider value={{ toggleVisible }}>
            {props.children}
          </VisibleContext.Provider>
          <button onClick={toggleVisible}>cancel</button>
        </div>
      ) : (
        <button onClick={toggleVisible}>{props.buttonLabel}</button>
      )}
    </div>
  );
};

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

Togglable.displayName = 'Togglable';

export default Togglable;
