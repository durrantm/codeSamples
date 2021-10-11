import { useContext } from 'react';
import { APIErrorContext } from '../providers/APIErrorProvider';

function useAPIError() {
  return useContext(APIErrorContext);
}

export default useAPIError;
