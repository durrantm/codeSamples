import axios from 'axios';
import { act, render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Orders from '.';
import Errors from '../../components/Errors';
import APIErrorProvider from '../../providers/APIErrorProvider';
import PageSettingsProvider from '../../providers/PageSettingsProvider';
import { MOCKED_TOKEN_DATA, MOCKED_ORDER_HISTORY } from 'paxos_mock_data';
import { localHost } from '../../urls.constant';

jest.mock('axios');

describe('Tests the orders page', () => {
  const renderOrders = () => {
    render(
      <BrowserRouter>
        <APIErrorProvider>
          <PageSettingsProvider>
            <Errors />
            <Orders />
          </PageSettingsProvider>
        </APIErrorProvider>
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    axios.get.mockImplementation((url, options) => {
      if (url === `${localHost}/orders`) {
        const markets = options?.params?.markets;
        const data = {
          ...MOCKED_ORDER_HISTORY,
          items: MOCKED_ORDER_HISTORY.items.filter(item => !markets || markets.includes(item.market))
        };
        return Promise.resolve({
          status: 200,
          data,
          config: { url }
        });
      } else if (url === `${localHost}/token`) {
        return Promise.resolve({
          data: MOCKED_TOKEN_DATA
        });
      }
    });
    jest.spyOn(window, 'confirm').mockImplementation(() => true);
  });

  it('renders orders text', async () => {
    await waitFor(() => renderOrders());
    const linkElement = screen.getByTestId('orders');
    expect(linkElement).toBeInTheDocument();
  });

  it('shows errors if appropriate', async () => {
    axios.get.mockImplementation((url) =>
      Promise.reject({
        response: {
          status: 401,
          data: { error: { status: 401, detail: 'unauthorized' } },
          config: { url }
        }
      })
    );
    jest.spyOn(console, 'log').mockImplementation();

    await waitFor(() => renderOrders());

    const errorElement = screen.getByText(`401 error at ${localHost}/orders: unauthorized`);
    expect(errorElement).toBeInTheDocument();
  });

  it('can delete an order', async () => {
    axios.delete.mockImplementation((url) => Promise.resolve({
      data: { orderIds: ['63701a'] },
      config: { url }
    }));
    act(() => renderOrders());
    let deleteButtons;
    let numOrders;
    await waitFor(() => {
      numOrders = MOCKED_ORDER_HISTORY.total_count;
      deleteButtons = screen.queryAllByText('X');
      expect(deleteButtons.length).toEqual(numOrders);
    });
    fireEvent.click(deleteButtons[0]);
    await waitFor(() => {
      const newDeleteButtons = screen.queryAllByText('X');
      expect(newDeleteButtons.length).toEqual(numOrders - 1);
      expect(deleteButtons[0]).not.toBeInTheDocument();
    });
  });

  it('shows an error if the order is not deleted', async () => {
    jest.spyOn(console, 'log').mockImplementation();
    axios.delete.mockImplementation((url) =>
      Promise.reject({
        response: {
          status: 401,
          data: { error: { detail: 'unauthorized', status: 401 } },
          config: { url }
        }
      })
    );

    act(() => renderOrders());
    let deleteButtons;
    await waitFor(() => {
      deleteButtons = screen.queryAllByText('X');
      expect(deleteButtons.length).toEqual(MOCKED_ORDER_HISTORY.total_count);
    });
    fireEvent.click(deleteButtons[0]);
    await waitFor(() => {
      const errorMsg = screen.getByText(
        /401 error at http:\/\/localhost:8000\/orders: unauthorized/
      );
      expect(errorMsg).toBeInTheDocument();
      const newDeleteButtons = screen.queryAllByText('X');
      expect(newDeleteButtons.length).toEqual(MOCKED_ORDER_HISTORY.total_count + 1);
    });
  });

  it('can batch delete orders', async () => {
    const ordersToDelete = ['63701a', '94503a'];
    axios.delete.mockImplementation((url) => Promise.resolve({
      data: { orderIds: ordersToDelete },
      config: { url }
    }));

    await waitFor(() => renderOrders());

    fireEvent.click(screen.getAllByText(/Batch Delete/)[0]);

    const numToDelete = ordersToDelete.length;
    const batchCheckboxes = screen.getAllByTestId(/batch-checkbox/);
    batchCheckboxes.slice(0, numToDelete).forEach(checkbox => fireEvent.click(checkbox));

    fireEvent.click(screen.getAllByText(/Delete 2/)[0]);

    await waitFor(() => {
      expect(screen.getAllByText('X')).toHaveLength(batchCheckboxes.length - numToDelete);
    });
  });

  it('partially deletes if the batch delete request is partially successful', async () => {
    jest.spyOn(console, 'log').mockImplementation();
    axios.delete.mockImplementation((url) =>
      Promise.reject({
        response: {
          status: 400,
          data: {
            error: {
              detail: 'Could only delete 1 of 2 orders. Please try again.',
              status: 400,
              data: { orderIds: ['63701a'] }
            }
          },
          config: { url }
        }
      })
    );

    await waitFor(() => renderOrders());

    fireEvent.click(screen.getAllByText(/Batch Delete/)[0]);

    const numToDelete = 10;
    const numSuccessfullyDeleted = 1;
    const batchCheckboxes = screen.getAllByTestId(/batch-checkbox/);
    batchCheckboxes.slice(0, numToDelete).forEach(checkbox => fireEvent.click(checkbox));

    fireEvent.click(screen.getAllByText(/Delete 10/)[0]);

    await waitFor(() => {
      expect(screen.getAllByTestId(/order-price/)).toHaveLength(batchCheckboxes.length - numSuccessfullyDeleted);
      const errorMsg = screen.getByText(
        /400 error at http:\/\/localhost:8000\/orders: Could only delete 1 of 2 orders. Please try again./
      );
      expect(errorMsg).toBeInTheDocument();
    });
  });

  it('shows the correct confirm message when deleting', async () => {
    const spy = jest.spyOn(window, 'confirm').mockReturnValue(false);
    await waitFor(() => renderOrders());

    fireEvent.click(screen.getAllByText(/X/)[0]);

    expect(spy).toHaveBeenCalledWith('Are you sure you want to cancel 1 order?');

    fireEvent.click(screen.getAllByText(/Batch Delete/)[0]);
    fireEvent.click(screen.getAllByText(/Select all/)[0]);
    fireEvent.click(screen.getAllByText(/Delete 61/)[0]);

    expect(spy).toHaveBeenCalledWith('Are you sure you want to cancel 61 orders?');

    fireEvent.click(screen.getAllByTestId('batch-checkbox')[0]);
    fireEvent.click(screen.getAllByText(/Delete 60/)[0]);

    expect(spy).toHaveBeenCalledWith('Are you sure you want to cancel 60 orders?');
  });

  it('maintains state properly between checkboxes and batch delete', async () => {
    await waitFor(() => renderOrders());

    fireEvent.click(screen.getAllByText(/Batch Delete/)[0]);

    const currencyCheckboxes = screen.getAllByTestId('checkbox');
    const btcCheckbox = currencyCheckboxes[0];
    const deleteCheckboxes = screen.getAllByTestId('batch-checkbox');

    fireEvent.click(deleteCheckboxes[0]);
    fireEvent.click(deleteCheckboxes[1]);

    const deleteBtn = screen.getAllByText(/Delete 2/)[0];
    fireEvent.click(btcCheckbox);

    await waitFor(() => {
      expect(screen.queryByText(/please wait/i)).not.toBeInTheDocument();
    });

    expect(deleteBtn).toBeInTheDocument();
    expect(deleteBtn).toHaveTextContent('Delete 1 order (ETH: 1)');

    fireEvent.click(btcCheckbox);

    await waitFor(() => {
      expect(screen.queryByText(/please wait/i)).not.toBeInTheDocument();
    });

    expect(deleteBtn).toBeInTheDocument();
    expect(deleteBtn).toHaveTextContent('Delete 1 order (ETH: 1)');
  });
});
