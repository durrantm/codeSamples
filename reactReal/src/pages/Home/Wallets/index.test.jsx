import Wallets from '.';
import { render, screen } from '@testing-library/react';
import { MOCKED_WALLET_BALANCES_WITH_MONEY } from 'paxos_mock_data';

describe('Tests of totalUserBalance component', () => {
  it('renders component with zero balance', () => {
    render(
      <Wallets
        wallet={MOCKED_WALLET_BALANCES_WITH_MONEY}
        prices={{ 'BTC': '1', 'ETH': '1', 'LTC': '1' }}
      />
    );
    const result = screen.getAllByText('19,740')[0];
    expect(result).toBeInTheDocument();
  });
  it('renders component with real balance', () => {
    render(
      <Wallets
        wallet={MOCKED_WALLET_BALANCES_WITH_MONEY}
        prices={{ 'BTC': '100', 'ETH': '100', 'LTC': '0' }}
      />
    );
    const result = screen.getByText('0');
    expect(result).toBeInTheDocument();
  });
});
