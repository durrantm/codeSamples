import { render, screen } from '@testing-library/react';
import ErrorArea from './ErrorArea';

describe('ErrorArea', () => {
  it('shows nothing by default', () => {
    render(<ErrorArea />);
    expect(screen.queryByTestId('trading-error-list')).not.toBeInTheDocument();
  });

  it('shows errors if they exist', () => {
    const errors = ['nope', 'too high', 'too low', 'also nope'];
    render(
      <ErrorArea errors=
        {{
          err1: { base_amount: errors[0], price: errors[1] },
          err2: { price: errors[2] },
          err3: { base_amount: errors[3] }
        }}
      />
    );
    expect(screen.queryByTestId('trading-error-list')).toBeInTheDocument();
    expect(screen.getAllByTestId('trading-error')).toHaveLength(errors.length);
    errors.forEach(err => {
      expect(screen.getByText(err)).toBeInTheDocument();
    });
  });

  it('works with a combination of string and object errors', () => {
    const errors = ['nope', 'too high', 'too low', 'also nope'];
    render(
      <ErrorArea errors=
        {{
          err1: { base_amount: errors[0], price: errors[1] },
          err2: { price: errors[2] },
          err3: errors[3]
        }}
      />
    );
    expect(screen.queryByTestId('trading-error-list')).toBeInTheDocument();
    expect(screen.getAllByTestId('trading-error')).toHaveLength(errors.length);
    errors.forEach(err => {
      expect(screen.getByText(err)).toBeInTheDocument();
    });
  });
});