import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TradingTable from './TradingTable';
import axios from 'axios';
import APIErrorProvider from '../../providers/APIErrorProvider';
import WalletAndPricesProvider from '../../providers/WalletAndPricesProvider';
import TradeProvider from '../../providers/TradeProvider';
import { MOCKED_TICKERS } from 'paxos_mock_data';

jest.mock('axios');

describe('TradingTable', () => {
  beforeEach(() => {
    axios.get.mockImplementation((url) => {
      switch (url) {
      case 'https://api.paxos.com/v2/all-markets/tickers':
        return Promise.resolve({
          status: 200,
          data: MOCKED_TICKERS,
          config: { url },
        });
      default:
        return Promise.reject(new Error('not found'));
      }
    });
  });

  const MOCK_TRADES = [
    {
      base_amount: '0.0001',
      price: '20000',
      side: 'BUY',
      ref_id: '1',
    },
    {
      base_amount: '0.0015',
      price: '30000',
      side: 'BUY',
      ref_id: '2',
    },
  ];

  it('shows the correct totals', async () => {
    render(
      <APIErrorProvider>
        <WalletAndPricesProvider>
          <TradeProvider>
            <TradingTable trades={MOCK_TRADES} />
          </TradeProvider>
        </WalletAndPricesProvider>
      </APIErrorProvider>
    );

    const totalQty = '0.001600';
    const totalPrice = '$47.00';
    await waitFor(() => {
      expect(screen.getByText(totalQty)).toBeInTheDocument();
      expect(screen.getByText(totalPrice)).toBeInTheDocument();
    });
  });

  it('calls the appropriate functions when clicking on buttons', async () => {
    const addRow = jest.fn();
    const removeRow = jest.fn();
    render(
      <APIErrorProvider>
        <WalletAndPricesProvider>
          <TradeProvider>
            <TradingTable
              trades={MOCK_TRADES}
              addRow={addRow}
              removeRow={removeRow}
            />
          </TradeProvider>
        </WalletAndPricesProvider>
      </APIErrorProvider>
    );
    fireEvent.click(screen.getByText('+ 1'));
    fireEvent.click(screen.getByText('+ 5'));
    fireEvent.click(screen.getByText('- 1'));
    fireEvent.click(screen.getByText('- 5'));
    await waitFor(() => {
      expect(addRow).toHaveBeenNthCalledWith(1, 1);
      expect(addRow).toHaveBeenNthCalledWith(2, 5);
      expect(removeRow).toHaveBeenNthCalledWith(1, 1);
      expect(removeRow).toHaveBeenNthCalledWith(2, 5);
    });
  });

  it('hides buttons appropriately based on the maxRows', async () => {
    render(
      <APIErrorProvider>
        <WalletAndPricesProvider>
          <TradeProvider>
            <TradingTable trades={MOCK_TRADES} maxRows={4} />
          </TradeProvider>
        </WalletAndPricesProvider>
      </APIErrorProvider>
    );

    await waitFor(() => {
      expect(screen.queryByText('+ 5')).not.toBeInTheDocument();
    });

    document.body.innerHTML = '';

    render(
      <APIErrorProvider>
        <WalletAndPricesProvider>
          <TradeProvider>
            <TradingTable trades={MOCK_TRADES} maxRows={2} />
          </TradeProvider>
        </WalletAndPricesProvider>
      </APIErrorProvider>
    );

    await waitFor(() => {
      expect(screen.queryByText('+ 1')).not.toBeInTheDocument();
      expect(screen.queryByText('+ 5')).not.toBeInTheDocument();
    });
  });
});
