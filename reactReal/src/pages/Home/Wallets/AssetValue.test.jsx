import AssetValue from './AssetValue';
import { render, screen } from '@testing-library/react';

describe('Asset value component tests', () => {
  it('Show a BTC asset amount for zero', () => {
    render(<AssetValue item={{ asset: 'BTC', available: '0', trading: '0', bidPrice: '1' }} />);
    const result = screen.getByText(/0/);
    expect(result).toBeInTheDocument();
  });
  it('Show a blank asset amount with no item attribute', () => {
    render(<AssetValue />);
    const result = screen.getByText(/-/);
    expect(result).toBeInTheDocument();
  });
});
