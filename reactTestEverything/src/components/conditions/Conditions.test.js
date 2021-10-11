import React from 'react';
import { render, screen } from '@testing-library/react';
import Conditions from './Conditions';

describe('Renders Conditions', () => {
  it('renders conditions component without a zip', () => {
    render(<Conditions zip="" />);
    const result = screen.getByText(/mph/i);
    expect(result).toBeInTheDocument();
  });
  it('renders page with an invalid zip still has mph label', () => {
    render(<Conditions zip={'140'} />);
    const result = screen.getByText(/mph/i);
    expect(result).toBeInTheDocument();
  });
  it('renders page with valid zip conditions section', () => {
    render(<Conditions zip= { "02140" } />);
    const result = screen.getByText(/mph/i);
    expect(result).toBeInTheDocument();
  });
  it('renders page with no attribute', () => {
    render(<Conditions />);
    const result = screen.getByText(/mph/i);
    expect(result).toBeInTheDocument();
  });
});