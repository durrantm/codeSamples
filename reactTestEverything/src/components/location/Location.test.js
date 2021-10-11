import React from 'react';
import { render, screen } from '@testing-library/react';
import Location from './Location';

describe('Renders Location', () => {
  it('Renders location component with an empty location', () => {
    render(<Location location={{}} />);
    const result = screen.getByTestId('location-city-state');
    expect(result).toBeTruthy();
  });
  it('Renders location city', () => {
    render(<Location location={{ city: "Cambridge" }} />);
    const result = screen.getByText(/cambridge/i);
    expect(result).toBeInTheDocument();
  });
  it('Renders location state code', () => {
    render(<Location location={{ state: 'NY' }} />);
    const result = screen.getByText(/NY/i);
    expect(result).toBeInTheDocument();
  });
  it('Renders location component with no city or state code', () => {
    render(<Location location={{}} />);
    const result = screen;
    expect(result).toBeTruthy();
  });
  it('Renders location component with no location prop', () => {
    render(<Location />);
    const result = screen;
    expect(result).toBeTruthy();
  });
});