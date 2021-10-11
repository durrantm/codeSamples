import { render, screen } from '@testing-library/react';
import ExecutionList from './ExecutionList';
import { MOCKED_EXECUTIONS } from 'paxos_mock_data';
import PageSettingsProvider from '../../providers/PageSettingsProvider';

describe('The trades table', () => {
  const renderExecutionList = (trades) => {
    render(
      <PageSettingsProvider>
        <ExecutionList trades={trades} />
      </PageSettingsProvider>
    );
  };

  it('renders empty trades list text', () => {
    renderExecutionList([]);
    const emptyTradesText = screen.getByText(/No executions found/i);
    expect(emptyTradesText).toBeInTheDocument();
  });

  it('renders the table headers', () => {
    renderExecutionList(MOCKED_EXECUTIONS.items);
    const dateTimeText = screen.getByText(/Date/);
    const marketText = screen.getByText(/Mkt/);
    const sideText = screen.getByText(/Side/);
    expect(dateTimeText).toBeInTheDocument();
    expect(marketText).toBeInTheDocument();
    expect(sideText).toBeInTheDocument();
  });

  it('renders the totals row', () => {
    renderExecutionList(MOCKED_EXECUTIONS.items);
    expect(screen.getAllByTestId('total-fees')[0]).toHaveTextContent('$64.07');
    expect(screen.getAllByTestId('total-buys')[0]).toHaveTextContent('$9,438.59');
    expect(screen.getAllByTestId('total-sells')[0]).toHaveTextContent('$24,333.56');
  });
});
