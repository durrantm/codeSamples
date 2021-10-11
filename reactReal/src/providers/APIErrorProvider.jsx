import { createContext, useState, useCallback } from 'react';
import { oneOfType, arrayOf, element } from 'prop-types';

export const APIErrorContext = createContext();

const APIErrorProvider = ({ children }) => {
  const [errors, setErrors] = useState({});

  const addError = useCallback(error => {
    const status = error.response?.status || error.status || 500;
    const detail = error.response?.data?.error?.detail || error.message;
    const url = error.response?.config?.url || error.config?.url || error.url;
    setErrors(oldErrors => ({ ...oldErrors, [url]: { status, detail } }));
  }, []);

  const removeError = useCallback(key => {
    setErrors(oldErrors => {
      const errorsCopy = { ...oldErrors };
      delete errorsCopy[key];
      return errorsCopy;
    });
  }, []);

  return (
    <APIErrorContext.Provider value={{ errors, addError, removeError }}>
      {children}
    </APIErrorContext.Provider>
  );
};

APIErrorProvider.propTypes = {
  children: oneOfType([
    arrayOf(element),
    element
  ]).isRequired
};

export default APIErrorProvider;
