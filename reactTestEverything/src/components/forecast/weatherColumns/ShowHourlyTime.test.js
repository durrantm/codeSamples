import React from 'react';
import { render, screen } from '@testing-library/react';
import ShowHourlyTime from './ShowHourlyTime';

describe('Tests of Hourly Time component', () => {

  const FourPM = 1608067030;

  it('renders component with valid time and timeZone', () => {
    render(<ShowHourlyTime time = { FourPM } tz = "EST" />);
    const time = screen.getByText(/4/);
    const AMPM = screen.getByText(/PM/);
    expect(time).toBeInTheDocument();
    expect(AMPM).toBeInTheDocument();
  });
  it('renders component with valid time and invalid timeZone', () => {
    render(<ShowHourlyTime time = { FourPM } tz = "042" />);
    const time = screen.getByText(/4/);
    const AMPM = screen.getByText(/PM/);
    expect(time).toBeInTheDocument();
    expect(AMPM).toBeInTheDocument();
  });
  it('renders component with valid time and blank timeZone', () => {
    render(<ShowHourlyTime time = { FourPM } tz = "" />);
    const time = screen.getByText(/4/);
    const AMPM = screen.getByText(/PM/);
    expect(time).toBeInTheDocument();
    expect(AMPM).toBeInTheDocument();
  });
  it('renders component with valid time and no timeZone', () => {
    render(<ShowHourlyTime time = { FourPM } />);
    const time = screen.getByText(/4/);
    const AMPM = screen.getByText(/PM/);
    expect(time).toBeInTheDocument();
    expect(AMPM).toBeInTheDocument();
  });
  it('renders component with zero time and no timeZone', () => {
    render(<ShowHourlyTime time = { 0 } />);
    const time = screen.getByText(/7/);
    const AMPM = screen.getByText(/PM/);
    expect(time).toBeInTheDocument();
    expect(AMPM).toBeInTheDocument();
  });
  it('renders component with no time and no timeZone', () => {
    render(<ShowHourlyTime />);
    const time = screen.getByText(/12/);
    const AMPM = screen.getByText(/AM/);
    expect(time).toBeInTheDocument();
    expect(AMPM).toBeInTheDocument();
  });
});