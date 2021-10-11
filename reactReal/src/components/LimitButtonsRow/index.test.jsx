import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LimitButtonsRow from '.';
import { numRowsLimits } from '../../shared.constants';
import PageSettingsProvider from '../../providers/PageSettingsProvider';

describe('Tests the LimitButtons page', () => {
  const renderRow = () => {
    return (
      <PageSettingsProvider>
        <table>
          <thead>
            <LimitButtonsRow />
          </thead>
        </table>
      </PageSettingsProvider>
    );
  };

  it('renders a button for each page limit', () => {
    render(renderRow());
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(numRowsLimits.length);
  });

  it('renders an active button and inactive buttons', () => {
    render(renderRow());
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveClass('active');
    expect(buttons[1]).not.toHaveClass('active');
    expect(buttons[2]).not.toHaveClass('active');
  });

  it('sets a new value when an inactive button is clicked on', async () => {
    render(renderRow());
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[2]);

    await waitFor(() => {
      expect(buttons[0]).not.toHaveClass('active');
      expect(buttons[1]).not.toHaveClass('active');
      expect(buttons[2]).toHaveClass('active');
    });
  });
});
