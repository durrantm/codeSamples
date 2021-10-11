import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import Home from '.';
import Errors from '../../components/Errors';
import APIErrorProvider from '../../providers/APIErrorProvider';
import WalletAndPricesProvider from '../../providers/WalletAndPricesProvider';
import { cryptoTraderAPI } from '../../services/config';
import {
  MOCKED_TICKER,
  MOCKED_WALLET_BALANCES_ZERO,
  MOCKED_TOKEN_DATA,
} from 'paxos_mock_data';
import { localHost } from '../../urls.constant';

jest.mock('axios');

describe('Tests the home page', () => {
  const useStateMock = (initState) => [initState, jest.fn()];

  beforeEach(() => {
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    axios.post.mockImplementation(() =>
      Promise.resolve({
        data: MOCKED_TOKEN_DATA,
      })
    );
    cryptoTraderAPI.fetchAuthToken = jest
      .fn()
      .mockReturnValue({ token: 'validtoken', url: 'validurl' });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders the market prices text', async () => {
    axios.get.mockImplementation((url) => {
      switch (url) {
      case 'https://api.paxos.com/v2/all-markets/tickers':
        return Promise.resolve({
          status: 200,
          data: MOCKED_TICKER,
          config: { url },
        });
      case `${localHost}/wallet_balance`:
        return Promise.resolve({
          data: MOCKED_WALLET_BALANCES_ZERO,
          config: { url },
        });
      default:
        return Promise.reject(new Error('not found'));
      }
    });

    await waitFor(() => {
      render(
        <WalletAndPricesProvider>
          <APIErrorProvider>
            <Home />
          </APIErrorProvider>
        </WalletAndPricesProvider>
      );
    });
    const linkElement = screen.getByText(/BTC/);
    expect(linkElement).toBeInTheDocument();
  });

  it('shows any errors at the 400 level', async () => {
    axios.get.mockImplementation((url) =>
      Promise.reject({
        response: {
          status: 401,
          data: { description: 'unauthorized' },
          config: { url },
        },
      })
    );
    jest.spyOn(console, 'log').mockImplementation();

    await waitFor(() => {
      render(
        <WalletAndPricesProvider>
          <APIErrorProvider>
            <Errors />
            <Home />
          </APIErrorProvider>
        </WalletAndPricesProvider>
      );
    });

    const marketError = screen.getByText(
      /500 error at https:\/\/api.paxos.com\/v2\/all-markets\/ticker/
    );
    expect(marketError).toBeInTheDocument();
  });

  it('shows errors if the network is down', async () => {
    axios.get.mockImplementation((url) =>
      Promise.reject({
        status: 500,
        message: 'Network Error',
        config: { url },
      })
    );
    jest.spyOn(console, 'log').mockImplementation();

    await waitFor(() => {
      render(
        <WalletAndPricesProvider>
          <APIErrorProvider>
            <Errors />
            <Home />
          </APIErrorProvider>
        </WalletAndPricesProvider>
      );
    });

    const networkError = screen.getByText(
      /500 error at https:\/\/api.paxos.com\/v2\/all-markets\/ticker/
    );
    expect(networkError).toBeInTheDocument();
  });
});
