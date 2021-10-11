import { pricesType, walletType } from '../types';
import commaForThousands from '../../../util/commaForThousands';
import calculateSum from '../../../util/calculateSum';
import formatNumber from '../../../util/formatNumber';
import { walletsHideCents } from './featureFlags';

const TotalUserBalance = ({ wallet, prices }) => {
  const decimals = walletsHideCents ? 0 : 2;
  const sum = commaForThousands(formatNumber(calculateSum(wallet, prices), decimals));
  return (
    <span className="total-balance"
      title="Total account value in USD"
      aria-label={`total account balance is ${sum}`}
    >
      {sum}
    </span>
  );
};

TotalUserBalance.propTypes = {
  prices: pricesType,
  wallet: walletType,
};

export default TotalUserBalance;