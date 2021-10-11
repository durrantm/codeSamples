import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import WalletAndPricesProvider from '../../providers/WalletAndPricesProvider';
import APIErrorProvider from '../../providers/APIErrorProvider';
import {
  MOCKED_WALLET_BALANCES_ZERO,
  MOCKED_WALLET_BALANCES_WITH_MONEY,
  MOCKED_TICKERS
} from 'paxos_mock_data';
import Title from '.';
import { BrowserRouter } from 'react-router-dom';

jest.mock('axios');

describe('Title', () => {
  it('renders allocations of the appropriate size', async () => {
    axios.get.mockImplementation(url => {
      const response = { status: 200, config: { url } };
      if (url.endsWith('ticker')) {
        return Promise.resolve({
          ...response,
          data: MOCKED_TICKERS
        });
      }
      return Promise.resolve({
        ...response,
        data: MOCKED_WALLET_BALANCES_WITH_MONEY
      });
    });
    render(
      <APIErrorProvider>
        <WalletAndPricesProvider>
          <BrowserRouter>
            <Title />
          </BrowserRouter>
        </WalletAndPricesProvider>
      </APIErrorProvider>
    );
    const expectedSegments = 3;

    await waitFor(() => {
      expect(screen.getAllByTestId('allocation-segment')).toHaveLength(expectedSegments);
    });

    const percentageEstimates = [66.41, 28.78, 4.8, 0.04];
    screen.getAllByTestId('allocation-segment').forEach((segment, idx) => {
      expect(parseFloat(segment.style.width)).toBeCloseTo(percentageEstimates[idx], 5);
    });
  });

  it('renders a full green bar if there are no assets', async () => {
    axios.get.mockImplementation(url => {
      const response = { status: 200, config: { url } };
      if (url.endsWith('ticker')) {
        return Promise.resolve({
          ...response,
          data: { last_execution: { price: '1.00' } }
        });
      }
      return Promise.resolve({
        ...response,
        data: {
          items: [
            ...MOCKED_WALLET_BALANCES_ZERO.items,
            { asset: 'BTC', available: '0', trading: '0' }
          ]
        }
      });
    });

    render(
      <APIErrorProvider>
        <WalletAndPricesProvider>
          <BrowserRouter>
            <Title />
          </BrowserRouter>
        </WalletAndPricesProvider>
      </APIErrorProvider>
    );

    await waitFor(() => {
      const onlySegment = screen.getByTestId('allocation-segment');
      expect(onlySegment).toHaveClass('USD');
      expect(parseFloat(onlySegment.style.width)).toBeCloseTo(100, 5);
    });
  });

  afterEach(jest.restoreAllMocks);
});
