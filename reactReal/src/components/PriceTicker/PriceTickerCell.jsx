import { memo } from 'react';
import { number } from 'prop-types';

function PriceTickerCell({ x, y, r, on }) {
  return (
    <circle
      data-testid="ticker-cell"
      className={`price-ticker-cell ${on ? 'on' : ''}`}
      cx={x}
      cy={y}
      r={r}
    />
  );
}

PriceTickerCell.propTypes = {
  x: number,
  y: number,
  r: number,
  on: number
};

export default memo(PriceTickerCell);
