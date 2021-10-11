import React from 'react';
import { render, screen } from '@testing-library/react';
import Today from './Today';
import daysOfTheWeek from '../../util/formatDateTime/daysOfTheWeek';

describe('Tests of Today component', () => {
  it('renders component with no date passed - verify a ":" appears', () => {
    render(<Today />);
    const timeSeperator = screen.getByText(/:/);
    expect(timeSeperator).toBeInTheDocument();
  });
  it('renders component with correct day of week for today', () => {
    render(<Today />);
    const today = new Date();
    const dayName = today.getDay();
    const days = new Map(daysOfTheWeek.map((day, idx) => { return [idx, day]; }));
    const dayNameShort = days.get(dayName).substring(0, 3);
    const dayNameSearchRegex = new RegExp(dayNameShort);
    const result = screen.getByText(dayNameSearchRegex);
    expect(result).toBeInTheDocument();
  });
});