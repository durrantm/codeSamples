import CurrencyCheckboxGroup from '.';
import { render, screen } from '@testing-library/react';
import PageSettingsProvider from '../../providers/PageSettingsProvider';

describe('Tests CheckBoxGroupUtil', () => {
  it('Shows correct currencies', () => {
    render(
      <PageSettingsProvider>
        <CurrencyCheckboxGroup />
      </PageSettingsProvider>
    );
    expect(screen.getByText(/BTC/)).toBeInTheDocument();
    expect(screen.getByText(/ETH/)).toBeInTheDocument();
    expect(screen.getByText(/LTC/)).toBeInTheDocument();
  });
});
