import { string } from 'prop-types';
import commaForThousands from '../../../util/commaForThousands';
import formatNumber from '../../../util/formatNumber';
import { itemType } from '../types';
import { walletsHideCents } from './featureFlags';

const AssetValue = ({ item = { trading: '-' }, bidPrice = '0' }) => {
  if (item.trading === '-') return '-';
  const decimals = walletsHideCents ? 0 : 2;
  const assetDollars = (num, bidPrice = 0) => formatNumber(bidPrice * num, decimals);
  return (
    <>
      { commaForThousands(assetDollars(Number(item.available) + Number(item.trading), bidPrice)) }
    </>
  );
};

AssetValue.propTypes = {
  item: itemType,
  bidPrice: string
};

export default AssetValue;