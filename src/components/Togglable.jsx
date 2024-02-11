import { useState } from 'react';
import PropTypes from 'prop-types';
import { createContext } from 'react';

export const VisibleContext = createContext();

const Togglable = (props) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisible = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      {isVisible ? (
        <div>
          <VisibleContext.Provider value={{ toggleVisible }}>
            {props.children}
          </VisibleContext.Provider>
        </div>
      ) : (
        <button
          onClick={toggleVisible}
          className="bg-gray-500 hover:bg-gray-400 text-gray-100 font-bold py-2 px-4 rounded"
        >
          {props.buttonLabel}
        </button>
      )}
    </div>
  );
};

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

Togglable.displayName = 'Togglable';

export default Togglable;
