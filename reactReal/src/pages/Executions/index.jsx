import { useState, useEffect } from 'react';
import { cryptoTraderAPI } from '../../services/config';
import useAPIError from '../../hooks/useAPIError';
import usePageSettings from '../../hooks/usePageSettings';
import ExecutionList from './ExecutionList';
import Loading from '../../components/Loading';

function Executions() {
  const [executions, setExecutions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { errors:apiErrors, addError, removeError } = useAPIError();
  const { activeMarkets, limit, buySellFilter } = usePageSettings();
  const [showExecutionUI, setShowExecutionUI] = useState(false);
  useEffect(() => {
    const allExecutions = async () => {
      if (activeMarkets.length === 0) {
        setExecutions([]);
        return;
      }
      try {
        setIsLoading(true);
        const executionDetails = await cryptoTraderAPI.executions(activeMarkets, buySellFilter, limit);
        if (executionDetails.status === 200) {
          setExecutions(executionDetails.data.items);
          removeError(executionDetails.config.url);
        }
      } catch (err) {
        addError(err);
      }
      setIsLoading(false);
    };
    allExecutions();
  }, [activeMarkets, limit, buySellFilter]);

  const loadingText = () => {
    return (
      <div className="txt_loading">
        <Loading />
        <p>Please wait while we fetch your trade details</p>
      </div>
    );
  };
  useEffect(() => {
    const error401 = Object.keys(apiErrors).filter((item) => {
      return item.includes('token') || item.includes('wallet_balance')
      && (apiErrors[item].status === 401 || apiErrors[item].status === 500);
    });
    error401.length ? setShowExecutionUI(false) : setShowExecutionUI(true);
  }, [apiErrors]);

  if (!showExecutionUI) return (
    <div className="txt_loading">
      You need to be authenticated to use this page
    </div>
  );

  return (
    <div data-testid="executions">
      {!isLoading && <ExecutionList trades={executions} />}
      {isLoading && loadingText()}
    </div>
  );
}
export default Executions;
