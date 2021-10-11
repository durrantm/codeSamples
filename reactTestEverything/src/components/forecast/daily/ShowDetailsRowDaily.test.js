import React from 'react';
import { render, screen } from '@testing-library/react';
import ShowDetailsRowDaily from './ShowDetailsRowDaily';

describe('Tests of temperature', () => {
  it('renders component with minimal props', () => {
    const day = { "valid_date": "12-15-2020", "weather": { } };
    render(<table><tbody><ShowDetailsRowDaily day={day} /></tbody></table>);
    const windLabelMPH = screen.getByText(/mph/i);
    expect(windLabelMPH).toBeInTheDocument();
  });
  it('renders detailed page info correctly', () => {
    const day = {
      "valid_date": "12-25-2020",
      "weather": { "description": "windy" },
      "high_temp": 33, "low_temp": 22,
      "wind_spd": 12.6, "wind_cdir": "E",
      "snow": 4, "precip": 0.5, "rh": 95
    };
    render(<table><tbody><ShowDetailsRowDaily day={day} /></tbody></table>);
    const dayName = screen.getByText(/Sat/i);
    const description = screen.getByText(/windy/i);
    const low_temp = screen.getByText(/22/);
    const high_temp = screen.getByText(/33/);
    const wind_spd = screen.getByText(/13/);
    const wind_cdir = screen.getByText(/E/);
    const snow = screen.getByText(/4/);
    const precip = screen.getByText(/0.5/);
    const humidity = screen.getByText(/95/);
    expect(dayName).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(low_temp).toBeInTheDocument();
    expect(high_temp).toBeInTheDocument();
    expect(wind_spd).toBeInTheDocument();
    expect(wind_cdir).toBeInTheDocument();
    expect(snow).toBeInTheDocument();
    expect(precip).toBeInTheDocument();
    expect(humidity).toBeInTheDocument();
  });
});