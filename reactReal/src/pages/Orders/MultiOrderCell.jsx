import { useCallback } from 'react';
import { shape, string } from 'prop-types';
import shortOrderID from '../../util/shortOrderID';

function MultiOrderCell({ metadata = {} }) {
  const multiOrderNum = useCallback((metadata) => {
    if (!metadata?.multi_order_id) return '-';
    const { multi_order_id } = metadata;
    const multiOrderStr = shortOrderID(multi_order_id);
    return multiOrderStr;
  }, []);

  return (
    <td className="orders-order multi-order">
      <span className="multi-order-name">
        {metadata.multi_order_name}&nbsp;
      </span >
      {multiOrderNum(metadata)}&nbsp;
    </td>
  );
}

MultiOrderCell.propTypes = {
  metadata: shape({ multi_order_name: string, multi_order_id: string })
};

export default MultiOrderCell;
