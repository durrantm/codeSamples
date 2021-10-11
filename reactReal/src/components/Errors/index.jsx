import { useCallback } from 'react';
import useAPIError from '../../hooks/useAPIError';

function Errors() {
  const { errors, removeError } = useAPIError();
  const handleClick = useCallback(path => () => removeError(path), []);
  return (
    <section className="errors-main">
      {Object.keys(errors).map(path => {
        const { status, detail } = errors[path];
        return (
          <p key={path} data-testid="error">
            {status} error at {path}: {detail}{' '}
            <button onClick={handleClick(path)}>X</button>
          </p>
        );
      })}
    </section>
  );
}

export default Errors;
