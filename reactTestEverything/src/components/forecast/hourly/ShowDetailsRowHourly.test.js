import React from 'react';
import { render, screen } from '@testing-library/react';
import ShowDetailsRowHourly  from './ShowDetailsRowHourly';

describe('Tests of hourly and component', () => {

  it('renders page', () => {
    const day = {"wind_spd": 1, "weather": { description: "clouds"}};
    render(<table><tbody><ShowDetailsRowHourly day = { day } /></tbody></table>);
    const windLabelMPH = screen.getByText(/mph/i);
    expect(windLabelMPH).toBeInTheDocument();
  });
  it('renders details', () => {
    const day = {
      "weather": { description: "snow"},
      "temp": 44, "app_temp": 55,
      "clouds": 95, "wind_spd": 16.6, "wind_cdir": "E",
      "precip": 0.5, "pres": 995,
      "timestamp_local":1608067030,
      "datetime": "2020-12-15:8"
    };
    render(<table><tbody><ShowDetailsRowHourly day = { day } /></tbody></table>);
    const dayName = screen.getByText(/Tue/i);
    const description = screen.getByText(/snow/i);
    const temp = screen.getByText(/44/);
    const app_temp = screen.getByText(/55/);
    const precip = screen.getByText(/0\.5/);
    const pres = screen.getByText(/995/);
    const wind_spd = screen.getByText(/17/);
    const wind_cdir = screen.getByText(/E/);
    expect(description).toBeInTheDocument();
    expect(temp).toBeInTheDocument();
    expect(app_temp).toBeInTheDocument();
    expect(precip).toBeInTheDocument();
    expect(pres).toBeInTheDocument();
    expect(wind_spd).toBeInTheDocument();
    expect(wind_cdir).toBeInTheDocument();
    expect(dayName).toBeInTheDocument();
  });
});