import { pricesType, walletType } from '../types';
import commaForThousands from '../../../util/commaForThousands';
import calculateAssetsSum from '../../../util/calculateAssetsSum';
import formatNumber from '../../../util/formatNumber';
import { walletsHideCents } from './featureFlags';

const TotalAssetsBalance = ({ wallet, prices }) => {
  const decimals = walletsHideCents ? 0 : 2;
  const assets_only = wallet?.items?.filter(asset => asset.asset !== 'USD') || [];
  const sum = commaForThousands(formatNumber(calculateAssetsSum(assets_only, prices), decimals));
  return (
    <span className="total-balance" title="Total assets value in USD">
      {sum}
    </span>
  );
};

TotalAssetsBalance.propTypes = {
  prices: pricesType,
  wallet: walletType,
};

export default TotalAssetsBalance;