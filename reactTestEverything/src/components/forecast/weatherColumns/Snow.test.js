import React from 'react';
import { render, screen } from '@testing-library/react';
import Snow from './Snow';
import '@testing-library/jest-dom/extend-expect';

describe('Tests of snow component', () => {
  it('renders snow component with NO bolding alert', () => {
    render(<Snow inches = { 2 } />);
    const snow = screen.getByText(/2/);
    expect(snow).toBeInTheDocument();
    expect(snow).not.toHaveAttribute('class', 'alert');
  });
  it('renders snow component with BOLDing alert', () => {
    render(<Snow inches = { 12 } />);
    const snow = screen.getByTestId('snow');
    expect(snow).toHaveAttribute('class', 'alert');
  });
  it('renders snow component with zero inches', () => {
    render(<Snow inches = { 0 } />);
    const snow = screen.getByTestId('snow');
    expect(snow).toBeInTheDocument();
  });
  it('renders snow component with invalid character (not number)', () => {
    render(<Snow inches = { 'a' } />);
    const snow = screen.getByTestId('snow');
    expect(snow).toBeInTheDocument();
  });
  it('renders snow component with no inches attribute', () => {
    render(<Snow />);
    const snow = screen.getByTestId('snow');
    expect(snow).toBeInTheDocument();
  });
});