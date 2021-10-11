import { waitFor, render, screen } from '@testing-library/react';
import marketLastPrice from '../../services/marketLastPrice';
import textToLED from '../../util/textToLED';
import APIErrorProvider from '../../providers/APIErrorProvider';
import WalletAndPricesProvider from '../../providers/WalletAndPricesProvider';
import market from '../../util/currency';

jest.mock('../../services/marketLastPrice');
jest.mock('../../util/textToLED');

import PriceTicker from '.';

describe('PriceTicker component', () => {

  beforeEach(() => {
    marketLastPrice.mockImplementation(() =>
      [{ lastPrice: '1234.56', url: `http://www.mocked.org/BTCUSD`, currency: market('BTCUSD') },
      { lastPrice: '1234.56', url: `http://www.mocked.org/ETHUSD`, currency: market('ETHUSD') },
      { lastPrice: '1234.56', url: `http://www.mocked.org/LTCUSD`, currency: market('LTCUSD') },
      { lastPrice: '1234.56', url: `http://www.mocked.org/BCHUSD`, currency: market('BCHUSD') }
    ]
    );
    textToLED.mockImplementation(str => str);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('generates a grid of dots', async () => {
    await waitFor(() => {
      render(
        <WalletAndPricesProvider>
          <APIErrorProvider >
            <PriceTicker />
          </APIErrorProvider>
        </WalletAndPricesProvider>
      );
    });
    const cells = screen.getAllByTestId('ticker-cell');
    expect(cells).toHaveLength(2611);
  });

  it('ensures there are always 7 rows, regardless of width and height', async () => {
    const newWidth = 1200;
    const newHeight = 60;
    const numCols = Math.floor(newWidth * 7 / newHeight);
    const numRows = 7;
    await waitFor(() => {
      render(
        <WalletAndPricesProvider>
          <APIErrorProvider >
            <PriceTicker width={newWidth} height={newHeight} />
          </APIErrorProvider>
        </WalletAndPricesProvider>
      );
    });
    const cells = screen.getAllByTestId('ticker-cell');
    expect(cells).toHaveLength(numCols * numRows);
  });

  it('generates a message based on market prices', async () => {
    await waitFor(() => {
      render(
        <WalletAndPricesProvider>
          <APIErrorProvider >
            <PriceTicker />
          </APIErrorProvider>
        </WalletAndPricesProvider>
      );
    });
    // eslint-disable-next-line max-len
    const expected = 'BTC: 1234.56                        ETH: 1234.56                        LTC: 1234.56                        BCH: 1234.56';
    expect(textToLED).toHaveBeenCalledWith(expected);
  });
});
