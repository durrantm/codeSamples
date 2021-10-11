import WalletBalances from './WalletBalances';
import { act, render, screen } from '@testing-library/react';
import { MOCKED_WALLET_BALANCES_ZERO, MOCKED_WALLET_BALANCES_WITH_MONEY } from 'paxos_mock_data';

describe('Tests of WalletBalances component', () => {
  const renderEmptyWallet = () => {
    render(
      <table>
        <tbody>
          <WalletBalances
            wallet={MOCKED_WALLET_BALANCES_ZERO}
            prices={{BTC: '0', ETH: '0', LTC: '0'}}
          />
        </tbody>
      </table>
    );
  };

  const renderWalletWithMoney = () => {
    render(
      <table>
        <tbody>
          <WalletBalances
            wallet={MOCKED_WALLET_BALANCES_WITH_MONEY}
            prices={{'BTC': '100', 'ETH': '100', 'LTC': '0'}}
          />
        </tbody>
      </table>
    );
  };

  it('does not render rows for prices not in the wallet', () => {
    act(renderEmptyWallet);
    const usdRow = screen.getByTestId('USD');
    const btcRow = screen.queryByTestId('BTC');
    expect(usdRow).toBeInTheDocument();
    expect(btcRow).toBeNull();
  });

  it('renders correctly for an empty wallet', () => {
    act(renderEmptyWallet);
    const result = screen.getByText('USD');
    expect(result).toBeInTheDocument();
  });

  it('renders rows for prices in the wallet', () => {
    act(renderWalletWithMoney);
    const usdRow = screen.getByTestId('USD');
    const btcRow = screen.getByTestId('BTC');
    expect(usdRow).toBeInTheDocument();
    expect(btcRow).toBeInTheDocument();
  });

  it('renders correctly for a wallet with real balance', () => {
    act(renderWalletWithMoney);
    const result = screen.getAllByText('7,290')[0];
    expect(result).toBeInTheDocument();
  });
});
