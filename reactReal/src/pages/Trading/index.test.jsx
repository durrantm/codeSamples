import { cryptoTraderAPI } from '../../services/config';
import marketLastPrice from '../../services/marketLastPrice';
jest.mock('../../services/marketLastPrice');
import * as uuid from 'uuid';
jest.mock('uuid');
import { Router } from 'react-router-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Trading from '.';
import APIErrorProvider from '../../providers/APIErrorProvider';
import WalletAndPricesProvider from '../../providers/WalletAndPricesProvider';
import TradeProvider from '../../providers/TradeProvider';
import { localHost } from '../../urls.constant';

describe('Tests the trading page', () => {
  let pushMock;

  const MOCKED_TRADES_RESPONSE = {
    url: `${localHost}/trading`,
    trades: [{
      side: 'BUY',
      ref_id: '1abc',
    }],
    rejectedTrades: []
  };

  const MOCKED_MULTIPLE_TRADES_RESPONSE = {
    url: `${localHost}/trading`,
    trades: [{
      side: 'BUY',
      ref_id: '1abc',
    }, {
      side: 'SELL',
      ref_id: '6abc'
    }, {
      side: 'SELL',
      ref_id: '7abc'
    }],
    rejectedTrades: []
  };

  const MOCKED_TRADES_RESPONSE_ERROR = {
    status: 400,
    detail: 'Could only add 1 of 2 trades. Please check your wallet balance and try again.',
    data: {
      url: `${localHost}/trading`,
      trades: [{
        side: 'BUY',
        ref_id: '1abc'
      }],
      rejectedTrades: [{
        side: 'BUY',
        ref_id: '2abc'
      }]
    }
  };

  const mockApiServiceSuccess = (items = [], response = MOCKED_TRADES_RESPONSE) => {
    cryptoTraderAPI.create_trades = jest.fn().mockImplementation(() => Promise.resolve({
      status: 200,
      data: response,
      config: { url: `${localHost}/trades` }
    }));
    cryptoTraderAPI.wallet_balance = jest.fn().mockImplementation(() => Promise.resolve({
      status: 200,
      data: { items },
      config: { url: `${localHost}/wallet_balance` }
    }));
  };

  const mockApiServiceFail = (items = []) => {
    cryptoTraderAPI.create_trades = jest.fn().mockImplementation(() => Promise.reject({
      response: {
        status: 401,
        data: { error: MOCKED_TRADES_RESPONSE_ERROR },
        config: { url: `${localHost}/trades` }
      }
    }));
    cryptoTraderAPI.wallet_balance = jest.fn().mockImplementation(() => Promise.resolve({
      status: 200,
      data: { items },
      config: { url: `${localHost}/wallet_balance` }
    }));
  };

  const mockApiServiceFailWithError401 = (items = []) => {
    cryptoTraderAPI.create_trades = jest.fn().mockImplementation(() => Promise.reject({
      response: {
        status: 401,
        data: { error: MOCKED_TRADES_RESPONSE_ERROR },
        config: { url: `${localHost}/trades` }
      }
    }));
    cryptoTraderAPI.wallet_balance = jest.fn().mockImplementation(() => Promise.reject({
      status: 401,
      data: { items },
      config: { url: `${localHost}/wallet_balance` }
    }));
  };
  const mockApiServiceFailWithError500 = (items = []) => {
    cryptoTraderAPI.create_trades = jest.fn().mockImplementation(() => Promise.reject({
      response: {
        status: 500,
        data: { error: MOCKED_TRADES_RESPONSE_ERROR },
        config: { url: `${localHost}/trades` }
      }
    }));
    cryptoTraderAPI.wallet_balance = jest.fn().mockImplementation(() => Promise.reject({
      status: 401,
      data: { items },
      config: { url: `${localHost}/wallet_balance` }
    }));
  };

  const renderPage = () => {
    const historyMock = { push: pushMock, location: {}, listen: jest.fn() };
    render(
      <Router history={historyMock}>
        <APIErrorProvider>
          <WalletAndPricesProvider>
            <TradeProvider>
              <Trading />
            </TradeProvider>
          </WalletAndPricesProvider>
        </APIErrorProvider>
      </Router>
    );
  };

  beforeEach(() => {
    marketLastPrice.mockImplementation(() => {
      const url = `http://www.mocked.org/BTCUSD`;
      const lastPrice = '50000';
      return [{ lastPrice, url, currency: 'BTC' }];
    });

    let uuidCount = 0;
    pushMock = jest.fn();
    uuid.v4.mockImplementation(() => {
      uuidCount++;
      return `${uuidCount}abc`;
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('adds and removes rows correctly', async () => {
    await waitFor(renderPage);
    const addOneBtn = screen.getAllByText('+ 1')[0];
    const addFiveBtn = screen.getAllByText('+ 5')[0];
    const removeOneBtn = screen.getAllByText('- 1')[0];
    const removeFiveBtn = screen.getAllByText('- 5')[0];

    const numRows = screen.getAllByTestId('trading-table-row').length;

    fireEvent.click(addOneBtn);
    expect(screen.getAllByTestId('trading-table-row')).toHaveLength(numRows + 1);

    fireEvent.click(addFiveBtn);
    expect(screen.getAllByTestId('trading-table-row')).toHaveLength(numRows + 1 + 5);

    fireEvent.click(removeOneBtn);
    expect(screen.getAllByTestId('trading-table-row')).toHaveLength(numRows + 5);

    fireEvent.click(removeFiveBtn);
    expect(screen.getAllByTestId('trading-table-row')).toHaveLength(numRows);
  });

  it('shows errors when there are errors in inputs', async () => {
    await waitFor(renderPage);
    const base = screen.getAllByTestId('base_amount')[0];
    const price = screen.getAllByTestId('price')[0];

    fireEvent.change(base, { target: { name: 'base_amount', value: '0.000000001' } });
    fireEvent.blur(base);
    fireEvent.change(price, { target: { name: 'price', value: '1234567' } });
    fireEvent.blur(price);

    expect(screen.getByText('Quantity of 0.000000001 cannot be less than 0.000001')).toBeInTheDocument();
    expect(screen.getByText('Price of 1234567 is greater than 1000000')).toBeInTheDocument();
  });

  it('disables submit buttons when errors are present', async () => {
    await waitFor(renderPage);
    const buttons = [
      screen.getByText(/^Submit$/),
      screen.getByText('Submit & View'),
    ];
    const base = screen.getAllByTestId('base_amount')[0];

    buttons.forEach(btn => expect(btn).toBeEnabled());

    fireEvent.change(base, { target: { name: 'base_amount', value: '0.0000000001' } });
    fireEvent.blur(base);

    buttons.forEach(btn => expect(btn).toBeDisabled());

    fireEvent.change(base, { target: { name: 'base_amount', value: '0.000000001' } });

    buttons.forEach(btn => expect(btn).toBeEnabled());

    fireEvent.blur(base);

    buttons.forEach(btn => expect(btn).toBeDisabled());
  });

  it('replenishes the trade rows once they are successfully submitted', async () => {
    mockApiServiceSuccess([], MOCKED_MULTIPLE_TRADES_RESPONSE);
    await waitFor(renderPage);

    const numRows = screen.getAllByTestId('trading-table-row').length;
    const buyBase = screen.getAllByTestId('base_amount')[0];
    const buyPrice = screen.getAllByTestId('price')[0];
    const sellBase1 = screen.getAllByTestId('base_amount')[5];
    const sellPrice1 = screen.getAllByTestId('price')[5];
    const sellBase2 = screen.getAllByTestId('base_amount')[6];
    const sellPrice2 = screen.getAllByTestId('price')[6];

    const button = screen.getByText('Submit & View');

    fireEvent.change(buyBase, { target: { name: 'base_amount', value: '0.01' } });
    fireEvent.change(buyPrice, { target: { name: 'price', value: '20000' } });
    fireEvent.change(sellBase1, { target: { name: 'base_amount', value: '0.001' } });
    fireEvent.change(sellPrice1, { target: { name: 'price', value: '100000' } });
    fireEvent.change(sellBase2, { target: { name: 'base_amount', value: '0.01' } });
    fireEvent.change(sellPrice2, { target: { name: 'price', value: '150000' } });

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getAllByTestId('trading-table-row')).toHaveLength(numRows);
    });
  });

  it('redirects upon successful submit when the appropriate button is clicked', async () => {
    mockApiServiceSuccess();
    await waitFor(renderPage);

    const base = screen.getAllByTestId('base_amount')[0];
    const price = screen.getAllByTestId('price')[0];
    const button = screen.getByText('Submit & View');

    fireEvent.change(base, { target: { name: 'base_amount', value: '0.01' } });
    fireEvent.change(price, { target: { name: 'price', value: '20000' } });

    fireEvent.click(button);

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith({
        pathname: '/orders',
        state: { currency: 'BTCUSD' }
      });
    });
  });

  it('keeps any trades that were not successfully submitted', async () => {
    mockApiServiceFail();
    await waitFor(renderPage);

    const [base1, base2] = screen.getAllByTestId('base_amount').slice(0, 2);
    const [price1, price2] = screen.getAllByTestId('price').slice(0, 2);
    const button = screen.getByText(/^Submit$/);

    fireEvent.change(base1, { target: { name: 'base_amount', value: '0.01' } });
    fireEvent.change(price1, { target: { name: 'price', value: '20000' } });
    fireEvent.change(base2, { target: { name: 'base_amount', value: '0.02' } });
    fireEvent.change(price2, { target: { name: 'price', value: '40000' } });

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.queryByDisplayValue('0.01')).not.toBeInTheDocument();
      expect(screen.getByDisplayValue('0.02')).toBeInTheDocument();
    });
  });

  it('does not redirect if there are errors', async () => {
    mockApiServiceFail();
    await waitFor(renderPage);

    const base = screen.getAllByTestId('base_amount')[0];
    const price = screen.getAllByTestId('price')[0];
    const button = screen.getByText(/^Submit$/);

    fireEvent.change(base, { target: { name: 'base_amount', value: '0.01' } });
    fireEvent.change(price, { target: { name: 'price', value: '20000' } });

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.queryByDisplayValue('0.01')).not.toBeInTheDocument();
    });

    expect(pushMock).not.toHaveBeenCalled();
  });

  it('Allows the user to place multiple buy orders if total < available - example 1', async () => {
    mockApiServiceSuccess([{ asset: 'USD', available: '1000', trading: '1000' }]);
    await waitFor(renderPage);

    const base = screen.getAllByTestId('base_amount')[0];
    const price = screen.getAllByTestId('price')[0];
    const button = screen.getByText('Submit & View');

    fireEvent.change(base, { target: { name: 'base_amount', value: '0.003' } });
    fireEvent.change(price, { target: { name: 'price', value: '40000' } });

    expect(screen.getByText('$880.00')).toBeInTheDocument();
    expect(button).toBeEnabled();
  });

  it('Allows the user to place multiple buy orders if total < available - example 2', async () => {
    mockApiServiceSuccess([{ asset: 'USD', available: '1000', trading: '1000' }]);
    await waitFor(renderPage);

    const [base1, base2] = screen.getAllByTestId('base_amount').slice(0, 2);
    const [price1, price2] = screen.getAllByTestId('price').slice(0, 2);
    const button = screen.getByText('Submit & View');

    fireEvent.change(base1, { target: { name: 'base_amount', value: '0.0012' } });
    fireEvent.change(price1, { target: { name: 'price', value: '45000' } });
    fireEvent.change(base2, { target: { name: 'base_amount', value: '0.0014' } });
    fireEvent.change(price2, { target: { name: 'price', value: '40000' } });

    expect(screen.getByText('$890.00')).toBeInTheDocument();
    expect(button).toBeEnabled();
  });

  it('Allows the user to place multiple buy orders if total < available - example 3', async () => {
    mockApiServiceSuccess([{ asset: 'USD', available: '300', trading: '50' }]);
    await waitFor(renderPage);

    const currSelect = screen.getByTestId('currency-select');
    fireEvent.change(currSelect, { target: { name: 'currency', value: 'LTCUSD' } });

    const [base1, base2, base3] = screen.getAllByTestId('base_amount').slice(0, 3);
    const [price1, price2, price3] = screen.getAllByTestId('price').slice(0, 3);
    const button = screen.getByText(/^Submit$/);

    fireEvent.change(base1, { target: { name: 'base_amount', value: '0.5' } });
    fireEvent.change(price1, { target: { name: 'price', value: '120' } });
    fireEvent.change(base2, { target: { name: 'base_amount', value: '0.5' } });
    fireEvent.change(price2, { target: { name: 'price', value: '140' } });
    fireEvent.change(base3, { target: { name: 'base_amount', value: '0.5' } });
    fireEvent.change(price3, { target: { name: 'price', value: '160' } });

    expect(screen.getByText('$90.00')).toBeInTheDocument();
    expect(button).toBeEnabled();
  });

  it('Allows the user to place multiple sell orders if total < available - example 1', async () => {
    mockApiServiceSuccess([{ asset: 'BTC', available: '.02', trading: '.02' }]);
    await waitFor(renderPage);

    const base = screen.getAllByTestId('base_amount')[5];
    const price = screen.getAllByTestId('price')[5];
    const button = screen.getByText('Submit & View');

    fireEvent.change(base, { target: { name: 'base_amount', value: '0.0199' } });
    fireEvent.change(price, { target: { name: 'price', value: '60000' } });

    expect(screen.getByText('0.000100')).toBeInTheDocument();
    expect(button).toBeEnabled();
  });

  it('Allows the user to place multiple sell orders if total < available - example 2', async () => {
    mockApiServiceSuccess([{ asset: 'BTC', available: '.02', trading: '.02' }]);
    await waitFor(renderPage);

    const [base1, base2] = screen.getAllByTestId('base_amount').slice(5, 7);
    const [price1, price2] = screen.getAllByTestId('price').slice(5, 7);
    const button = screen.getByText('Submit & View');

    fireEvent.change(base1, { target: { name: 'base_amount', value: '0.0015' } });
    fireEvent.change(price1, { target: { name: 'price', value: '60000' } });
    fireEvent.change(base2, { target: { name: 'base_amount', value: '0.0017' } });
    fireEvent.change(price2, { target: { name: 'price', value: '60000' } });

    expect(screen.getByText('0.016800')).toBeInTheDocument();
    expect(button).toBeEnabled();
  });

  it('Allows the user to place multiple sell orders if total < available - example 3', async () => {
    mockApiServiceSuccess([{ asset: 'LTC', available: '2.0', trading: '2.0' }]);
    await waitFor(renderPage);

    const currSelect = screen.getByTestId('currency-select');
    fireEvent.change(currSelect, { target: { name: 'currency', value: 'LTCUSD' } });

    const [base1, base2, base3] = screen.getAllByTestId('base_amount').slice(5, 8);
    const [price1, price2, price3] = screen.getAllByTestId('price').slice(5, 8);
    const button = screen.getByText('Submit & View');

    fireEvent.change(base1, { target: { name: 'base_amount', value: '0.5' } });
    fireEvent.change(price1, { target: { name: 'price', value: '250' } });
    fireEvent.change(base2, { target: { name: 'base_amount', value: '0.5' } });
    fireEvent.change(price2, { target: { name: 'price', value: '270' } });
    fireEvent.change(base3, { target: { name: 'base_amount', value: '0.3' } });
    fireEvent.change(price3, { target: { name: 'price', value: '300' } });

    expect(screen.getByText('1.300000')).toBeInTheDocument();
    expect(button).toBeEnabled();
  });

  it('Stops the user from placing multiple buy orders if total > available', async () => {
    mockApiServiceSuccess([{ asset: 'USD', available: '1000', trading: '1000' }]);
    await waitFor(renderPage);

    const base = screen.getAllByTestId('base_amount')[0];
    const price = screen.getAllByTestId('price')[0];
    const button = screen.getByText('Submit & View');

    fireEvent.change(base, { target: { name: 'base_amount', value: '0.02' } });
    fireEvent.change(price, { target: { name: 'price', value: '60000' } });

    expect(screen.getByText('-$200.00')).toBeInTheDocument();
    expect(screen.getByText(
      'Available balance of $1,000.00 is insufficient to place trade(s) totaling $1,200.00'
    )).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it('Disables the submit form if the total after 2 buys > available', async () => {
    mockApiServiceSuccess([{ asset: 'USD', available: '1000', trading: '1000' }]);
    await waitFor(renderPage);

    const [base1, base2] = screen.getAllByTestId('base_amount').slice(0, 2);
    const [price1, price2] = screen.getAllByTestId('price').slice(0, 2);
    const button = screen.getByText('Submit & View');

    fireEvent.change(base1, { target: { name: 'base_amount', value: '0.012' } });
    fireEvent.change(price1, { target: { name: 'price', value: '60000' } });

    expect(screen.getByText('$280.00')).toBeInTheDocument();
    expect(button).toBeEnabled();

    fireEvent.change(base2, { target: { name: 'base_amount', value: '0.014' } });
    fireEvent.change(price2, { target: { name: 'price', value: '61000' } });

    expect(screen.getByText('-$574.00')).toBeInTheDocument();
    expect(screen.getByText(
      'Available balance of $1,000.00 is insufficient to place trade(s) totaling $1,574.00'
    )).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it('Disables the submit form if the total after 3 buys > available', async () => {
    mockApiServiceSuccess([{ asset: 'USD', available: '150', trading: '50' }]);
    await waitFor(renderPage);

    const currSelect = screen.getByTestId('currency-select');
    fireEvent.change(currSelect, { target: { name: 'currency', value: 'LTCUSD' } });

    const [base1, base2, base3] = screen.getAllByTestId('base_amount').slice(0, 3);
    const [price1, price2, price3] = screen.getAllByTestId('price').slice(0, 3);
    const button = screen.getByText('Submit & View');

    fireEvent.change(base1, { target: { name: 'base_amount', value: '0.5' } });
    fireEvent.change(price1, { target: { name: 'price', value: '80' } });

    expect(screen.getByText('$110.00')).toBeInTheDocument();
    expect(button).toBeEnabled();

    fireEvent.change(base2, { target: { name: 'base_amount', value: '0.5' } });
    fireEvent.change(price2, { target: { name: 'price', value: '150' } });

    expect(screen.getByText('$35.00')).toBeInTheDocument();
    expect(button).toBeEnabled();

    fireEvent.change(base3, { target: { name: 'base_amount', value: '1' } });
    fireEvent.change(price3, { target: { name: 'price', value: '80' } });

    expect(screen.getByText('-$45.00')).toBeInTheDocument();
    expect(screen.getByText(
      'Available balance of $150.00 is insufficient to place trade(s) totaling $195.00'
    )).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it('Stops the user from placing multiple sell orders if total > available', async () => {
    mockApiServiceSuccess([{ asset: 'BTC', available: '.02', trading: '.02' }]);
    await waitFor(renderPage);

    const base = screen.getAllByTestId('base_amount')[5];
    const price = screen.getAllByTestId('price')[5];
    const button = screen.getByText('Submit & View');

    fireEvent.change(base, { target: { name: 'base_amount', value: '0.022' } });
    fireEvent.change(price, { target: { name: 'price', value: '62000' } });

    expect(screen.getByText('-0.002000')).toBeInTheDocument();
    expect(screen.getByText(
      'Available balance of 0.020000 is insufficient to place trade(s) totaling 0.022000'
    )).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it('Disables the submit form if the total after 2 sells > available', async () => {
    mockApiServiceSuccess([{ asset: 'BTC', available: '.02', trading: '.01' }]);
    await waitFor(renderPage);

    const [base1, base2] = screen.getAllByTestId('base_amount').slice(5, 7);
    const [price1, price2] = screen.getAllByTestId('price').slice(5, 7);
    const button = screen.getByText('Submit & View');

    fireEvent.change(base1, { target: { name: 'base_amount', value: '0.015' } });
    fireEvent.change(price1, { target: { name: 'price', value: '60000' } });

    expect(screen.getByText('0.005000')).toBeInTheDocument();
    expect(button).toBeEnabled();

    fireEvent.change(base2, { target: { name: 'base_amount', value: '0.017' } });
    fireEvent.change(price2, { target: { name: 'price', value: '61000' } });

    expect(screen.getByText('-0.012000')).toBeInTheDocument();
    expect(screen.getByText(
      'Available balance of 0.020000 is insufficient to place trade(s) totaling 0.032000'
    )).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it('Disables the submit form if the total after 3 sells > available', async () => {
    mockApiServiceSuccess([{ asset: 'LTC', available: '2.0', trading: '2.0' }]);
    await waitFor(renderPage);

    const currSelect = screen.getByTestId('currency-select');
    fireEvent.change(currSelect, { target: { name: 'currency', value: 'LTCUSD' } });

    const [base1, base2, base3] = screen.getAllByTestId('base_amount').slice(5, 8);
    const [price1, price2, price3] = screen.getAllByTestId('price').slice(5, 8);
    const button = screen.getByText('Submit & View');

    fireEvent.change(base1, { target: { name: 'base_amount', value: '1' } });
    fireEvent.change(price1, { target: { name: 'price', value: '120' } });

    expect(screen.getAllByText('1.000000')[0]).toBeInTheDocument();
    expect(button).toBeEnabled();

    fireEvent.change(base2, { target: { name: 'base_amount', value: '0.5' } });
    fireEvent.change(price2, { target: { name: 'price', value: '140' } });

    expect(screen.getByText('0.500000')).toBeInTheDocument();
    expect(button).toBeEnabled();

    fireEvent.change(base3, { target: { name: 'base_amount', value: '1' } });
    fireEvent.change(price3, { target: { name: 'price', value: '160' } });

    expect(screen.getByText('-0.500000')).toBeInTheDocument();
    expect(screen.getByText(
      'Available balance of 2.000000 is insufficient to place trade(s) totaling 2.500000'
    )).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
  it('Show Not Authenticated message if not authenticated(401 error)', async () => {
    mockApiServiceFailWithError401();
    await waitFor(renderPage);
    expect(screen.getByText('You need to be authenticated to use this page')).toBeInTheDocument();
  });
  it('Show Not Authenticated message for server error(500 error)', async () => {
    mockApiServiceFailWithError500();
    await waitFor(renderPage);
    expect(screen.getByText('You need to be authenticated to use this page')).toBeInTheDocument();
  });
});