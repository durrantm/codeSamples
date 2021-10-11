import { render, screen } from '@testing-library/react';
import Totals from './Totals';
import APIErrorProvider from '../../providers/APIErrorProvider';
import PageSettingsProvider from '../../providers/PageSettingsProvider';
import { MOCKED_ORDER_HISTORY } from 'paxos_mock_data';

describe('The orders table', () => {
  const renderOrderList = (orders = MOCKED_ORDER_HISTORY.items) => {
    render(
      <APIErrorProvider >
        <PageSettingsProvider>
          <table>
            <thead>
              <Totals orders={orders} />
            </thead>
          </table>
        </PageSettingsProvider>
      </APIErrorProvider>
    );
  };
  it('renders the quantity and price totals', () => {
    renderOrderList();
    expect(screen.getByTestId('total-buy-sell')).toHaveTextContent('$7,963.66');
    expect(screen.getByTestId('total-buy-sell')).toHaveTextContent('$33,321.40');
  });
});
