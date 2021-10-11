import Markets from '.';
import { render, screen } from '@testing-library/react';

describe('Tests of totalUserBalance component', () => {
  it('renders component with zero balance', () => {
    render(<Markets prices={{ 'BTC': '0', 'ETH': '0', 'LTC': '0' }} />);
    const result = screen.getAllByText('0')[0];
    expect(result).toBeInTheDocument();
  });
  it('renders component with real balance', () => {
    render(<Markets prices={{ 'BTC': '100', 'ETH': '100', 'LTC': '0' }} />);
    const result = screen.getAllByText('100')[0];
    expect(result).toBeInTheDocument();
  });
});
