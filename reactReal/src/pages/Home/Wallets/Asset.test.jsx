import Asset from './Asset';
import { render, screen } from '@testing-library/react';

describe('Asset component tests', () => {
  const renderTableRow = (component) => { render(<table><tbody>{component}</tbody></table>); };
  it('Show a BTC asset', () => {
    renderTableRow(<Asset item={{ asset: 'BTC', available: '10', trading: '10' }} bidPrice="1" />);
    const result = screen.getByTestId('BTC');
    expect(result).toBeTruthy();
  });
  it('Shows a BTC asset with correct $ value', () => {
    renderTableRow(<Asset item={{ asset: 'BTC', available: '30', trading: '10' }} bidPrice="1" />);
    const result = screen.getByText(/40\.00/);
    expect(result).toBeInTheDocument();
  });
  it('Shows a BTC asset with bid price missing', () => {
    renderTableRow(<Asset item={{ asset: 'BTC', available: '10', trading: '10' }} />);
    const result = screen.getAllByText(/0\.00/)[0];
    expect(result).toBeInTheDocument();
  });
  it('Handles item missing', () => {
    renderTableRow(<Asset />);
    const result = screen.getByText(/-/);
    expect(result).toBeInTheDocument();
  });
  it('Shows a USD asset with correct $ value with \'trading\' value', () => {
    renderTableRow(<Asset item={{ asset: 'USD', available: '17', trading: '25' }} bidPrice="1" />);
    const result = screen.getByText(/42/);
    expect(result).toBeInTheDocument();
  });
  it('Shows USD asset with correct $ value with no \'trading\' value', () => {
    renderTableRow(<Asset item={{ asset: 'USD', available: '17' }} bidPrice="1" />);
    const result = screen.getAllByText(/17/)[0];
    expect(result).toBeInTheDocument();
  });
});
