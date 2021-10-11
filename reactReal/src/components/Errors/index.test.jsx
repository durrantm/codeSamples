import { render, screen } from '@testing-library/react';
import APIErrorProvider from '../../providers/APIErrorProvider';
import useAPIError from '../../hooks/useAPIError';
import Errors from '.';

jest.mock('../../hooks/useAPIError');

describe('Errors', () => {
  it('shows nothing by default', () => {
    useAPIError.mockReturnValue({ errors: {} });
    render(<APIErrorProvider><Errors /></APIErrorProvider>);
    const errorElements = screen.queryAllByTestId(/error/);
    expect(errorElements.length).toBeFalsy();
  });

  it('shows errors if they exist', () => {
    useAPIError.mockReturnValue({ errors: {
      orders: { status: 500, detail: 'this is broken'},
      executions: { status: 403, detail: 'not authorized'}
    }});
    render(<APIErrorProvider><Errors /></APIErrorProvider>);
    const firstError = screen.getByText(/500 error at orders: this is broken/);
    const secondError = screen.getByText(/403 error at executions: not authorized/);
    expect(firstError).toBeInTheDocument();
    expect(secondError).toBeInTheDocument();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});