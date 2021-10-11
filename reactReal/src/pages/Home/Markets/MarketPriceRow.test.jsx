import { render, screen } from '@testing-library/react';
import MarketPriceRow from './MarketPriceRow';

describe('The market price row', () => {
  it('Works for valid data', () => {
    render(
      <table>
        <tbody>
          <MarketPriceRow asset="BTC" price="10000" />
        </tbody>
      </table>
    );
    const TradeText = screen.getByText(/10,000/);
    expect(TradeText).toBeInTheDocument();
  });
  it('Works for empty trade', () => {
    render(
      <table>
        <tbody>
          <MarketPriceRow />
        </tbody>
      </table>
    );
    const OrderText = screen.getByText(/-/);
    expect(OrderText).toBeInTheDocument();
  });
});