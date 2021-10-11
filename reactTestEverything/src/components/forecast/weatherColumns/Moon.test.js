import React from 'react';
import { render, screen } from '@testing-library/react';
import Moon from './Moon';

describe('Tests of moon component', () => {
  it('renders component with valid number for moon lunation phase', () => {
    render(<Moon moon_phase_lunation = { 0.5 } />);
    const result = screen.getByTestId('lunation');
    expect(result).toBeTruthy();
  });
  it('renders component with invalid number for moon lunation phase', () => {
    render(<Moon moon_phase_lunation = { 1.5 } />);
    const result = screen.getByTestId('lunation');
    expect(result).toBeTruthy();
  });
  it('renders component with moon phase lunation figure of zero', () => {
    render(<Moon moon_phase_lunation = { 0 } />);
    const result = screen;
    expect(result).toBeTruthy();
  });
  it('renders component with no number for moon phase lunation', () => {
    render(<Moon moon_phase_lunation = { {} } />);
    const result = screen;
    expect(result).toBeTruthy();
  });
  it('renders component with no prop for moon phase lunation', () => {
    render(<Moon />);
    const result = screen;
    expect(result).toBeTruthy();
  });
});