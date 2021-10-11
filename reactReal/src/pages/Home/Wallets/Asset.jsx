import { string } from 'prop-types';
import AssetValue from './AssetValue';
import AssetAmount from './AssetAmount';
import { itemType } from '../types';
import { currencyNames } from '../../../shared.constants';

const Asset = ({ item = {asset: '-'}, bidPrice = '0' }) => {
  return (
    <tr data-testid={item.asset} className={`asset ${item.asset}`} key={item.asset}>
      <td>
        <span className="currency" title={`${currencyNames[`${item.asset}USD`]}`}>
          {item.asset}
        </span>
      </td>
      <td className="asset_dollars">
        {item.asset !== 'USD' &&
          <>
            <span title="Current value in USD">
              <AssetValue item={item} bidPrice={bidPrice} />
            </span>
          </>
        }
      </td>
      <AssetAmount item={item} />
    </tr >
  );
};

Asset.propTypes = {
  item: itemType,
  bidPrice: string
};

export default Asset;