import { render, screen, fireEvent } from '@testing-library/react';
import { TradeContext } from '../../providers/TradeProvider';
import TradingTableRow from './TradingTableRow';

describe('TradingTableRow', () => {
  const MOCK_TRADE_DATA = {
    base_amount: '0.0001',
    price: '20000',
    side: 'BUY',
    ref_id: '1',
  };

  const defaultProps = {
    marketPrice: 30000,
    trade: MOCK_TRADE_DATA,
    index: 0
  };

  const defaultContextValue = {
    removeRowsByUUID: jest.fn(),
    editTrade: jest.fn(),
    setTradeError: jest.fn(),
    currency: 'BTCUSD'
  };

  let tbody;
  const renderRow = (props = defaultProps, contextValue = defaultContextValue) => render(
    <TradeContext.Provider value={contextValue}>
      <TradingTableRow {...props} />
    </TradeContext.Provider>,
    { container: tbody }
  );

  beforeEach(() => {
    tbody = document.createElement('tbody');
    document.body.append(tbody);
  });

  it('shows differences and totals when no errors are present', () => {
    renderRow();
    const expectedDiff = '-10,000.00';
    const expectedTotal = '$2.00';
    expect(screen.getByText(expectedDiff)).toBeInTheDocument();
    expect(screen.getByText(expectedTotal)).toBeInTheDocument();
  });

  it('does not show differences or totals if errors are present', () => {
    const error = { base_amount: 'error', price: 'another error' };
    renderRow({...defaultProps, error });
    const expectedDiff = '-10,000.00';
    const expectedTotal = '$2.00';
    expect(screen.queryByText(expectedDiff)).not.toBeInTheDocument();
    expect(screen.queryByText(expectedTotal)).not.toBeInTheDocument();
  });

  it('highlights inputs with errors', () => {
    const error = { base_amount: 'error' };
    renderRow({...defaultProps, error });
    expect(screen.getByTestId('base_amount')).toHaveClass('error');
    expect(screen.getByTestId('price')).not.toHaveClass('error');
  });

  it('checks for new errors on blur, not change', () => {
    renderRow();
    const priceInput = screen.getByTestId('price');
    fireEvent.change(priceInput);
    expect(defaultContextValue.setTradeError).not.toHaveBeenCalled();
    fireEvent.blur(priceInput);
    expect(defaultContextValue.setTradeError).toHaveBeenCalled();
  });

  it('calls handleChange when the user types', () => {
    renderRow();
    const priceInput = screen.getByTestId('price');
    fireEvent.change(priceInput, { target: { name: 'price', value: '1000' } });
    expect(defaultContextValue.editTrade).toHaveBeenCalled();
  });

  it('calls remove if the X is clicked', () => {
    renderRow();
    const removeText = screen.getByText('X');
    fireEvent.click(removeText);
    expect(defaultContextValue.removeRowsByUUID).toHaveBeenCalledWith({
      side: MOCK_TRADE_DATA.side,
      uuids: new Set([MOCK_TRADE_DATA.ref_id])
    });
  });
});
