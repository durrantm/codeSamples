import { render, screen, fireEvent } from '@testing-library/react';
import OrderList from './OrderList';
import APIErrorProvider from '../../providers/APIErrorProvider';
import PageSettingsProvider from '../../providers/PageSettingsProvider';
import { MOCKED_ORDER_HISTORY } from 'paxos_mock_data';

describe('The orders table', () => {
  const renderOrderList = (orders = MOCKED_ORDER_HISTORY.items) => {
    render(
      <APIErrorProvider >
        <PageSettingsProvider>
          <OrderList orders={orders} />
        </PageSettingsProvider>
      </APIErrorProvider>
    );
  };

  it('renders empty orders list text', () => {
    renderOrderList([]);
    const emptyOrdersText = screen.getByText(/No orders found/i);
    expect(emptyOrdersText).toBeInTheDocument();
  });

  it('renders the table headers', () => {
    renderOrderList();
    const marketText = screen.getByText(/Mkt/i);
    const sideText = screen.getByText(/Side/i);
    expect(marketText).toBeInTheDocument();
    expect(sideText).toBeInTheDocument();
  });

  it('renders the quantity and price totals', () => {
    renderOrderList();
    expect(screen.getAllByTestId('total-buy-sell')[0]).toHaveTextContent('$7,963.66');
    expect(screen.getAllByTestId('total-buy-sell')[0]).toHaveTextContent('$33,321.40');
  });

  it('renders the checkboxes', () => {
    renderOrderList();
    expect(screen.getAllByTestId('checkbox').length).toBe(3);
  });

  it('shows a batch delete button', () => {
    renderOrderList();
    expect(screen.getAllByText(/Batch Delete/)[0]).toBeInTheDocument();
  });

  it('toggles the batch state when clicked', () => {
    renderOrderList();
    expect(screen.getAllByText(/X/)).toHaveLength(MOCKED_ORDER_HISTORY.items.length);
    expect(screen.queryAllByTestId(/batch-checkbox/)).toHaveLength(0);

    fireEvent.click(screen.getAllByText(/Batch Delete/)[0]);
    expect(screen.queryAllByText(/X/)).toHaveLength(0);
    expect(screen.getAllByTestId(/batch-checkbox/)).toHaveLength(MOCKED_ORDER_HISTORY.items.length);
  });

  it('shows buttons when batch mode is on', () => {
    renderOrderList();
    expect(screen.queryAllByTestId('delete-batch-button')).toHaveLength(
      0
    );

    fireEvent.click(screen.getAllByText(/Batch Delete/)[0]);
    expect(screen.queryAllByTestId('delete-batch-button')).toHaveLength(
      2
    );
  });

  it('updates the buttons appropriately when selecting orders', () => {
    renderOrderList();
    fireEvent.click(screen.getAllByText(/Batch Delete/)[0]);

    const [confirmBtn, selectAllBtn, cancelBtn] = screen.getAllByRole('button');
    expect(cancelBtn).toHaveTextContent('Cancel');
    expect(confirmBtn).toHaveTextContent('Delete 0');
    expect(confirmBtn).toHaveAttribute('disabled');
    expect(selectAllBtn).toHaveTextContent('Select all');

    const batchCheckboxes = screen.getAllByTestId(/batch-checkbox/);
    fireEvent.click(batchCheckboxes[0]);
    expect(confirmBtn).toHaveTextContent('Delete 1 order (BTC: 1)');
    expect(confirmBtn).not.toHaveAttribute('disabled');
    expect(selectAllBtn).toHaveTextContent('Unselect all');

    fireEvent.click(batchCheckboxes[1]);
    expect(confirmBtn).toHaveTextContent('Delete 2 orders (BTC: 1, ETH: 1)');
  });

  it('works when clicking select all and unselect all', () => {
    renderOrderList();
    fireEvent.click(screen.getAllByText(/Batch Delete/)[0]);
    const batchCheckboxes = screen.getAllByTestId(/batch-checkbox/);

    batchCheckboxes.forEach(checkbox => {
      expect(checkbox.checked).toBe(false);
    });

    fireEvent.click(screen.getAllByText(/Select all/)[0]);
    batchCheckboxes.forEach(checkbox => {
      expect(checkbox.checked).toBe(true);
    });

    fireEvent.click(screen.getAllByText(/Unselect all/)[0]);
    batchCheckboxes.forEach(checkbox => {
      expect(checkbox.checked).toBe(false);
    });
  });
});
