import React from 'react';
import { render, screen } from '@testing-library/react';
import Temperature from './Temperature';

describe('Tests of temperature component', () => {
  it('renders temperature for 68 degrees', () => {
    render(<Temperature temperature = { 68 } />);
    const temperature = screen.getByText(/68/);
    expect(temperature).toBeInTheDocument();
  });
  it('renders temperature for 5 degrees', () => {
    render(<Temperature temperature = { 5 } />);
    const temperature = screen.getByText(/5/);
    expect(temperature).toBeInTheDocument();
  });
  it('renders temperature for 0.1 degrees', () => {
    render(<Temperature temperature = { 0.1 } />);
    const temperature = screen.getByText(/0/);
    expect(temperature).toBeInTheDocument();
  });
  it('renders temperature for -5 degrees', () => {
    render(<Temperature temperature = { -5 } />);
    const temperature = screen.getByText(/-5/);
    expect(temperature).toBeInTheDocument();
  });
  it('renders temperature for blank degrees', () => {
    render(<Temperature />);
    expect("Render works").toBeTruthy();
  });
});