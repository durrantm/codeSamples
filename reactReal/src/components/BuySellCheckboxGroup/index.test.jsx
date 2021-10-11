import BuySellCheckboxGroup from '.';
import { render, screen } from '@testing-library/react';
import PageSettingsProvider from '../../providers/PageSettingsProvider';

describe('Tests CheckBoxGroupUtil', () => {
  it('Shows correct BUY/SELL FIlters', () => {
    render(
      <PageSettingsProvider>
        <BuySellCheckboxGroup />
      </PageSettingsProvider>
    );
    expect(screen.getByText(/BUY/)).toBeInTheDocument();
    expect(screen.getByText(/SELL/)).toBeInTheDocument();
  });
});
