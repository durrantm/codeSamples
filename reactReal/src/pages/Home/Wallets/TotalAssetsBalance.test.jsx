import TotalAssetsBalance from './TotalAssetsBalance';
import { render, screen } from '@testing-library/react';
import { MOCKED_WALLET_BALANCES_ZERO, MOCKED_WALLET_BALANCES_WITH_MONEY } from 'paxos_mock_data';

describe('Tests of totalUserBalance component', () => {
  it('renders component with zero balance', () => {
    render(
      <TotalAssetsBalance
        wallet={MOCKED_WALLET_BALANCES_ZERO}
        prices={{ 'BTC': '0', 'ETH': '0', 'LTC': '0' }}
      />
    );
    const result = screen.getByText('0');
    expect(result).toBeInTheDocument();
  });
  it('renders component with real balance', () => {
    render(
      <TotalAssetsBalance
        wallet={MOCKED_WALLET_BALANCES_WITH_MONEY}
        prices={{ 'BTC': '100', 'ETH': '100', 'LTC': '0' }}
      />
    );
    const result = screen.getByText('1,129');
    expect(result).toBeInTheDocument();
  });
});
