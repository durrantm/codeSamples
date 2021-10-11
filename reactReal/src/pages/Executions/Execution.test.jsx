import { render, screen } from '@testing-library/react';
import Execution from './Execution';

describe('The execution', () => {
  const renderTable = (component) => { render(<table><tbody>{component}</tbody></table>); };
  const tradeBase = { market: 'BTCUSD', amount: '12', price: '12', commission: '0', rebate: '0', order_id: '1a' };
  it('Works for valid data, no commission fee, no rebate', () => {
    renderTable(<Execution trade={{ ...tradeBase }} />);
    const TradeText = screen.getByText(/144/);
    expect(TradeText).toBeInTheDocument();
  });
  it('Works for valid data, commission fee, no rebate', () => {
    renderTable(<Execution trade={{ ...tradeBase, commission: '0.5' }} />);
    const TradeText = screen.getByText(/144.50/);
    expect(TradeText).toBeInTheDocument();
  });
  it('Works for valid data, no commission, with rebate', () => {
    renderTable(<Execution trade={{ ...tradeBase, rebate: '0.5' }} />);
    const TradeText = screen.getByText(/143.50/);
    expect(TradeText).toBeInTheDocument();
  });
  it('Works for valid data, with commission and with rebate', () => {
    renderTable(<Execution trade={{ ...tradeBase, commission: '17', rebate: '2.5' }} />);
    const TradeText = screen.getByText(/158.50/);
    expect(TradeText).toBeInTheDocument();
  });
  it('Works for empty trade', () => {
    renderTable(<Execution trade={{}} />);
    const TradeText = screen.getByText(/-/);
    expect(TradeText).toBeInTheDocument();
  });
  it('Works for trade missing all amount, price and commission info', () => {
    renderTable(<Execution trade={{ market: 'BTCUSD' }} />);
    const TradeText = screen.getByText(/-/);
    expect(TradeText).toBeInTheDocument();
  });
});