import React from 'react';
import { render, screen } from '@testing-library/react';
import Wind from './Wind';

describe('Tests of rain component', () => {
  it('renders page', () => {
    render(<Wind speed = { 17 } direction = "NNE" />);
    const speed = screen.getByText(/17/);
    const direction = screen.getByText(/NNE/);
    expect(speed).toBeInTheDocument();
    expect(direction).toBeInTheDocument();
  });
  it('renders component with a blank wind direction', () => {
    render(<Wind speed = { 17 } direction = "" />);
    const speed = screen.getByText(/17/);
    expect(speed).toBeInTheDocument();
  });
  it('renders component with no wind speed', () => {
    render(<Wind speed = { { } } direction = "NNE" />);
    const direction = screen.getByText(/NNE/);
    expect(direction).toBeInTheDocument();
  });
  it('renders component with no attributes', () => {
    render(<Wind />);
    expect(screen).toBeTruthy();
  });
});