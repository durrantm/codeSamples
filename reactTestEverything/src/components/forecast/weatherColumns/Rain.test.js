import React from 'react';
import { render, screen } from '@testing-library/react';
import Rain from './Rain';

describe('Tests of rain component', () => {
  it('renders component with a valid rain number', () => {
    render(<Rain inches = "0.512387" />);
    const rain = screen.getByText(/0\.5/);
    expect(rain).toBeInTheDocument();
  });
  it('renders component with a rain number of zero', () => {
    render(<Rain inches = "0.0" />);
    const rain = screen.getByText(/0\.0/);
    expect(rain).toBeInTheDocument();
  });
  it('renders component with an empty rain number with rain 0.0', () => {
    render(<Rain inches = "" />);
    const rain = screen.getByText(/0\.0/);
    expect(rain).toBeInTheDocument();
  });
  it('renders component with no rain prop', () => {
    render(<Rain />);
    const rain = screen;
    expect(rain).toBeTruthy();
  });
});