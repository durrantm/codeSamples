import TotalUserBalance from './TotalUserBalance';
import WalletBalances from './WalletBalances';
import { pricesType, walletType } from '../types';
import TotalAssetsBalance from './TotalAssetsBalance';

const Wallets = ({ wallet, prices }) => {
  return (
    <>
      <section id="total-balance">
        <h2>Balance</h2>
        <div id="total-balance-amount" >
          <TotalUserBalance wallet={wallet} prices={prices} />
        </div>
      </section>
      <table id="wallet-details" className="wallet-details" align="center">
        <thead>
          <tr>
            <td />
            <td className="column-heading">$</td>
            <td className="column-heading asset_amount_header">Trades</td>
            <td className="column-heading math-sign">+</td>
            <td className="column-heading asset_amount_header">Avail</td>
            <td className="column-heading math-sign">=</td>
            <td className="column-heading asset_amount_header">Total</td>
          </tr>
        </thead>
        <tbody>
          <WalletBalances wallet={wallet} prices={prices} />
          <tr className="column-heading">
            <td className="all-assets">All</td>
            <td className="asset_dollars">
              <TotalAssetsBalance wallet={wallet} prices={prices} />
            </td>
            <td colSpan="5"> &nbsp; </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
Wallets.propTypes = {
  wallet: walletType,
  prices: pricesType
};
TotalAssetsBalance.propTypes = {
  wallet: walletType,
  prices: pricesType
};

export default Wallets;