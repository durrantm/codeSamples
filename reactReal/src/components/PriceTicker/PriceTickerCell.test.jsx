import { render, screen } from '@testing-library/react';
import PriceTickerCell from './PriceTickerCell';

describe('PriceTickerCell component', () => {
  it('Has a class of "on" when the on prop is provided', () => {
    render(
      <svg>
        <PriceTickerCell on={1} />
      </svg>
    );
    const cell = screen.getByTestId('ticker-cell');
    expect(cell).toHaveClass('on');
  });
  it('Does not have a class of "on" when the on prop is provided', () => {
    render(
      <svg>
        <PriceTickerCell on={0} />
      </svg>
    );
    const cell = screen.getByTestId('ticker-cell');
    expect(cell).not.toHaveClass('on');
  });
});
