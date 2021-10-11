import { render, screen } from '@testing-library/react';
import BatchButtons from './BatchButtons';

describe('The buttons', () => {
  const renderButtons = () => {
    render(
      <BatchButtons
        batchMode={false}
        toggleBatchMode={() => { }}
        selectAll={() => { }}
        deselectAll={() => { }}
        ordersInBatch={[{}]}
        deleteChecked={() => { }}
      />
    );
  };

  it('renders buttons', () => {
    renderButtons([]);

    const buttonsText = screen.getByText(/Batch Delete/i);
    expect(buttonsText).toBeInTheDocument();
  });
});