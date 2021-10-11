import { string } from 'prop-types';
import commaForThousands from '../../../util/commaForThousands';
import formatNumber from '../../../util/formatNumber';
import { marketsHideCents } from './featureFlags';
import { currencyNames } from '../../../shared.constants';

const MarketPriceRow = ({ asset = '-', price = 0 }) => {
  const showPrice = marketsHideCents ? formatNumber(price, 0) : price;
  const currencyName = currencyNames[`${asset}USD`];
  return (
    <tr className={asset}>
      <td title={`${currencyName}`}> {asset} </td>
      <td title="Market price" className="price"> {commaForThousands(String(showPrice))} </td>
    </tr>
  );
};

MarketPriceRow.propTypes = {
  asset: string,
  price: string
};

export default MarketPriceRow;