import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import Errors from '../../components/Errors/index';
import APIErrorProvider from '../../providers/APIErrorProvider';
import { MOCKED_TOKEN_DATA } from 'paxos_mock_data';
import MockCryptoTraderApiService from '../../mocked-data/mock-crypto-trader-api-service';
import { localHost } from '../../urls.constant';
import { marketsTrading, buySellTypeFilter, numRowsLimits } from '../../shared.constants';
import Executions from '.';
import PageSettingsProvider from '../../providers/PageSettingsProvider';

jest.mock('axios');

const mockApi = new MockCryptoTraderApiService();
const unselect = (checkbox) => {
  const theCheckbox = screen.getByLabelText(checkbox);
  expect(theCheckbox).toBeChecked();
  fireEvent.click(theCheckbox);
  expect(theCheckbox).not.toBeChecked();
};

const verifyRecordCount = async (n) => {
  await waitFor(() => {
    expect (screen.getAllByTestId('market-type').length).toBe(n);
  });
};

describe('Tests the executions page for currency filtering', () => {
  const renderExecutions = () => {
    render(
      <APIErrorProvider>
        <PageSettingsProvider>
          <Errors />
          <Executions />
        </PageSettingsProvider>
      </APIErrorProvider>
    );
  };

  beforeEach(async() => {
    axios.get.mockImplementation((url, options) => {
      const markets = options?.params?.markets || marketsTrading;
      const buySellFilter = options?.params?.buySellFilter || buySellTypeFilter;
      const limit = options?.params?.limit || numRowsLimits[0];
      if (url === `${localHost}/executions`) {
        return Promise.resolve(mockApi.executions(markets, buySellFilter, limit));
      } else if (url === `${localHost}/token`) {
        return Promise.resolve({
          data: MOCKED_TOKEN_DATA,
          config: { url }
        });
      }
    });
    await waitFor(() => renderExecutions());
  });

  afterEach(() => {
    jest.restoreAllMocks();
    localStorage.clear();
  });

  it('renders executions text', async () => {
    expect(screen.getByTestId('executions')).toBeInTheDocument();
  });

  it('shows errors if appropriate', async () => {
    axios.get.mockImplementation((url) =>
      Promise.reject({
        response: {
          status: 403,
          data: { error: { status: 403, detail: 'not allowed' } },
          config: { url }
        }
      })
    );
    jest.spyOn(console, 'log').mockImplementation();
    await waitFor(() => renderExecutions());
    const errorElement = screen.getByText(`403 error at ${localHost}/executions: not allowed`);
    expect(errorElement).toBeInTheDocument();
  });

  it('renders only 47 orders on click of 100 button', async () => {
    const limit100 = screen.getByTestId('limit100');
    await fireEvent.click(limit100);
    await waitFor(() => {
      const resultOfQuery = screen.getByTestId('num-records');
      expect(resultOfQuery).toHaveTextContent(47);
    });
  });

  it('renders only 47 orders on click of 1000 button', async () => {
    const limit1000 = screen.getByTestId('limit1000');
    await fireEvent.click(limit1000);
    await waitFor(() => {
      const resultOfQuery = screen.getByTestId('num-records');
      expect(resultOfQuery).toHaveTextContent(47);
    });
  });

  it('renders only 25 orders on click of 100 button first and then on click of 25 button', async () => {
    const limit100 = screen.getByTestId('limit100');
    await fireEvent.click(limit100);
    await waitFor(() => {
      const resultOfQuery = screen.getByTestId('num-records');
      expect(resultOfQuery).toHaveTextContent(47);
    });

    const limit25 = screen.getByTestId('limit25');
    await fireEvent.click(limit25);
    await waitFor(() => {
      const resultOfQuery = screen.getByTestId('num-records');
      expect(resultOfQuery).toHaveTextContent(25);
    });
  });

  it('Filters with currency checkbox BTC only', async () => {
    unselect('LTC');
    await verifyRecordCount(25);
    unselect('ETH');
    await waitFor(() => {
      const resultRows = screen.getAllByTestId('market-type');
      expect(resultRows.length).toBe(25);
      expect(resultRows[0]).toHaveTextContent('BTC');
      expect(screen.getAllByTestId('total-fees')[0]).toHaveTextContent('$26.80');
      expect(screen.getAllByTestId('total-buys')[0]).toHaveTextContent('$2,334.26');
      expect(screen.getAllByTestId('total-sells')[0]).toHaveTextContent('$8,856.06');
    });
  });

  it('Filters with currency checkbox ETH only', async () => {
    unselect('LTC');
    await verifyRecordCount(25);
    unselect('BTC');
    await waitFor(() => {
      const resultRows = screen.getAllByTestId('market-type');
      expect(resultRows.length).toBe(4);
      expect(resultRows[0]).toHaveTextContent('ETH');
      expect(screen.getByTestId('total-fees')).toHaveTextContent('$13.35');
      expect(screen.getByTestId('total-buys')).toHaveTextContent('$5,208.47');
      expect(screen.getByTestId('total-sells')).toHaveTextContent('$4,865.25');
    });
  });

  it('Filters with currency checkbox LTC only', async () => {
    unselect('ETH');
    await verifyRecordCount(25);
    unselect('BTC');
    await waitFor(() => {
      const resultRows = screen.getAllByTestId('market-type');
      expect(resultRows.length).toBe(2);
      expect(resultRows[0]).toHaveTextContent('LTC');
      expect(screen.getByTestId('total-fees')).toHaveTextContent('$4.46');
      expect(screen.getByTestId('total-buys')).toHaveTextContent('$1,604.96');
      expect(screen.getByTestId('total-sells')).toHaveTextContent('$1,431.12');
    });
  });

  it('Filters with currency checkboxes - none are checked', async () => {
    unselect('ETH');
    await verifyRecordCount(25);
    unselect('BTC');
    await verifyRecordCount(2);
    unselect('LTC');
    await waitFor(() => {
      const resultRows = screen.queryAllByTestId('market-type');
      expect(resultRows.length).toBe(0);
      expect(screen.getByText('No executions found')).toBeInTheDocument();
    });
  });
});

describe('Filtering by currency and Buy/Sell', () => {
  const renderExecutions = () => {
    render(
      <APIErrorProvider>
        <PageSettingsProvider>
          <Errors />
          <Executions />
        </PageSettingsProvider>
      </APIErrorProvider>
    );
  };

  beforeEach(async() => {
    axios.get.mockImplementation((url, options) => {
      const markets = options?.params?.markets || marketsTrading;
      const buySellFilter = options?.params?.buySellFilter || buySellTypeFilter;
      if (url === `${localHost}/executions`) {
        return Promise.resolve(mockApi.executions(markets, buySellFilter));
      } else if (url === `${localHost}/token`) {
        return Promise.resolve({
          data: MOCKED_TOKEN_DATA,
          config: { url }
        });
      }
    });
    await waitFor(() => renderExecutions());
  });

  afterEach(() => {
    jest.restoreAllMocks();
    localStorage.clear();
  });

  it('Renders BUY SELL Filter checkboxes', async () => {
    expect(screen.getByTestId('BUY_checkbox')).toBeInTheDocument();
    expect(screen.getByTestId('SELL_checkbox')).toBeInTheDocument();
  });

  it('Allows filtering by BTC and SELL', async () => {
    unselect('LTC');
    await verifyRecordCount(45);
    unselect('ETH');
    await verifyRecordCount(41);
    unselect('BUY');
    await verifyRecordCount(32);
    expect(await verifyRecordCount(32)).toBe();
  });

  it('Filters with ETH and BUY', async () => {
    unselect('LTC');
    await verifyRecordCount(45);
    unselect('BTC');
    await verifyRecordCount(4);
    unselect('BUY');
    expect(await verifyRecordCount(2)).toBe();
  });

  it('Filters with ETH and SELL or BUY', async () => {
    unselect('LTC');
    await verifyRecordCount(45);
    unselect('BTC');
    expect(await verifyRecordCount(4)).toBe();
  });

  it('Filters with ETH and nothing', async () => {
    unselect('LTC');
    await verifyRecordCount(45);
    unselect('BTC');
    await verifyRecordCount(4);
    unselect('BUY');
    await verifyRecordCount(2);
    unselect('SELL');
    await waitFor(() => { expect(screen.getByText('No executions found')).toBeInTheDocument(); });
  });

  it('Filters with ETH and LTC and SELL', async () => {
    unselect('BTC');
    await verifyRecordCount(6);
    unselect('BUY');
    expect(await verifyRecordCount(3)).toBe();
  });

  it('Filters with BTC and BUY', async () => {
    unselect('LTC');
    await verifyRecordCount(45);
    unselect('ETH');
    await verifyRecordCount(41);
    unselect('SELL');
    expect(await verifyRecordCount(9)).toBe();
  });

  it('Filters with BTC and SELL or BUY', async () => {
    unselect('LTC');
    await verifyRecordCount(45);
    unselect('ETH');
    await verifyRecordCount(41);
    expect(await verifyRecordCount(41)).toBe();
  });

  it('Filters with BTC and nothing', async () => {
    unselect('LTC');
    await verifyRecordCount(45);
    unselect('ETH');
    await verifyRecordCount(41);
    unselect('BUY');
    await verifyRecordCount(32);
    unselect('SELL');
    await waitFor(() => { expect(screen.getByText('No executions found')).toBeInTheDocument(); });
  });

  it('Filters with LTC and SELL', async () => {
    unselect('BTC');
    await verifyRecordCount(6);
    unselect('ETH');
    await verifyRecordCount(2);
    unselect('BUY');
    expect(await verifyRecordCount(1)).toBe();
  });

  it('Filters with LTC and BUY', async () => {
    unselect('BTC');
    await verifyRecordCount(6);
    unselect('ETH');
    await verifyRecordCount(2);
    unselect('SELL');
    expect(await verifyRecordCount(1)).toBe();
  });

  it('Filters with LTC and SELL or BUY', async () => {
    unselect('BTC');
    await verifyRecordCount(6);
    unselect('ETH');
    await verifyRecordCount(2);
    expect(await verifyRecordCount(2)).toBe();
  });

  it('Filters with LTC and nothing', async () => {
    unselect('BTC');
    await verifyRecordCount(6);
    unselect('ETH');
    await verifyRecordCount(2);
    unselect('BUY');
    await verifyRecordCount(1);
    unselect('SELL');
    expect(await waitFor(() => screen.getByText('No executions found'))).toBeInTheDocument();
  });
});