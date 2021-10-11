import { render, screen } from '@testing-library/react';
import Order from './Order';
import APIErrorProvider from '../../providers/APIErrorProvider';
import PageSettingsProvider from '../../providers/PageSettingsProvider';

jest.mock('dayjs', () => () => ({format: () => '01-04 22:10'}));

describe('The order', () => {
  const exampleOrder = {
    modified_at: '2021-03-07T17:40:42.357Z',
    amount_filled: '0.0021',
    market: 'BTCUSD',
    side: 'BUY',
    base_amount: '12',
    price: '12'
  };

  const renderOrder = ({ order = exampleOrder, inBatchMode = false} = {}) => render(
    <APIErrorProvider >
      <PageSettingsProvider>
        <table>
          <tbody>
            <Order order={order} inBatchMode={inBatchMode} />
          </tbody>
        </table>
      </PageSettingsProvider>
    </APIErrorProvider>
  );

  it('Works for valid data', () => {
    renderOrder();
    const baseAmountText = screen.getByText(/12.0000/);
    const dayText = screen.getByText(/01-04 22:10/);
    const marketText = screen.getByText(/BTC/);

    expect(baseAmountText).toBeInTheDocument();
    expect(dayText).toBeInTheDocument();
    expect(screen.getByTestId('order-total')).toHaveTextContent('$144.00');
    expect(screen.getByTestId('order-price')).toHaveTextContent('$12');
    expect(marketText).toBeInTheDocument();
  });

  it('Works for empty trade', () => {
    renderOrder({ order: {}});
    const orderText = screen.getByText(/-/);
    expect(orderText).toBeInTheDocument();
  });

  it('Shows an X when batch mode is off', () => {
    renderOrder();
    const xSpan = screen.getByText(/X/);
    const checkbox = screen.queryByTestId(/batch-checkbox/);
    expect(xSpan).toBeInTheDocument();
    expect(checkbox).not.toBeInTheDocument();
  });

  it('Shows a checkbox when batch mode is on', () => {
    renderOrder({ inBatchMode: true });
    const xSpan = screen.queryByText(/X/);
    const checkbox = screen.getByTestId(/batch-checkbox/);
    expect(xSpan).not.toBeInTheDocument();
    expect(checkbox).toBeInTheDocument();
  });
});
