import { errorsType } from './types';

function ErrorArea({ errors = {} }) {
  if (Object.keys(errors).length === 0) return null;
  const errorsAsArray = Object.entries(errors).reduce((errorArr, entry) => {
    if (typeof entry[1] === 'string') {
      errorArr.push(entry);
      return errorArr;
    }
    for (const errKey in entry[1]) {
      errorArr.push([`${entry[0]}_${errKey}`, entry[1][errKey]]);
    }
    return errorArr;
  }, []);
  return (
    <ul className="error-area" data-testid="trading-error-list">
      {errorsAsArray.map(([key, error]) => <li key={key} data-testid="trading-error">{error}</li>)}
    </ul>
  );
}

ErrorArea.propTypes = {
  errors: errorsType
};

export default ErrorArea;
