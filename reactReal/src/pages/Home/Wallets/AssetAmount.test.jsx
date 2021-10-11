import AssetAmount from './AssetAmount';
import { render, screen } from '@testing-library/react';

describe('Asset amount component tests', () => {
  const renderTable = (component) => {
    render(
      <table data-testid="data">
        <tbody>
          <tr>
            {component}
          </tr>
        </tbody>
      </table>
    );
  };
  it('Show a BTC asset amount for zero', () => {
    renderTable(<AssetAmount item={{ asset: 'BTC', available: '0', trading: '0', bidPrice: '1' }} />);
    const result = screen.getByTestId('data');
    expect(result).toBeInTheDocument();
  });
  it('Show a BTC asset amount for 20 / 10', () => {
    renderTable(<AssetAmount item={{ asset: 'BTC', available: '10', trading: '10', bidPrice: '1' }} />);
    const result = screen.getAllByText('10.0000')[0];
    expect(result).toBeInTheDocument();
  });
  it('Show a blank asset amount with no item attribute', () => {
    renderTable(<AssetAmount />);
    const result = screen.getByTestId('data');
    expect(result).toBeInTheDocument();
  });
});
