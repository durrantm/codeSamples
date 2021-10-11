import formatNumber from '../../../util/formatNumber';
import { itemType } from '../types';
import commaForThousands from '../../../util/commaForThousands';
const AssetAmount = ({ item = {} }) => {
  const dollars = (amount = 0, decimals = 0) => {
    const theDecimals = amount > 10 && decimals !== 0 ? 3 : decimals;
    const result = commaForThousands(formatNumber(amount, theDecimals));
    return result;
  };
  const decimals = item.asset === 'USD' ? 0 : 4;
  return (
    <>
      <td className="asset_amount" title="Current trades">
        {dollars(item.trading, decimals)}
      </td>
      <td />
      <td className="asset_amount" title="Available for trading">
        {dollars(item.available, decimals)}
      </td>
      <td />
      <td className="asset_amount" title="Total amount">
        {dollars(Number(item.available) + Number(item.trading), decimals)}
      </td>
    </>
  );
};

AssetAmount.propTypes = {
  item: itemType
};

export default AssetAmount;