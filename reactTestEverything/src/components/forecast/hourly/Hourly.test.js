import React from 'react';
import { render, screen } from '@testing-library/react';
import Hourly from './Hourly';
import { BrowserRouter } from 'react-router-dom';

describe('Tests of hourly component', () => {
  it('renders component for a valid lat long', () => {
    const latLong = [71, 35];
    render(
      <BrowserRouter>
        <Hourly zip="02140" latLong={latLong} timeZone="EDT" />
      </BrowserRouter>
    );
    const linkToDaily = screen.getByTestId(/daily-link/i);
    const linkToHourly = screen.queryByTestId(/hourly-link/i);
    expect(linkToDaily).toBeInTheDocument();
    expect(linkToHourly).not.toBeInTheDocument();
  });
  it('renders component for a 0,0 lat long', () => {
    const latLong = [0, 0];
    render(
      <BrowserRouter>
        <Hourly zip="02140" latLong={latLong} timeZone="EDT" />
      </BrowserRouter>
    );
    const linkToDaily = screen.getByTestId(/daily-link/i);
    const linkToHourly = screen.queryByTestId(/hourly-link/i);
    expect(linkToDaily).toBeInTheDocument();
    expect(linkToHourly).not.toBeInTheDocument();
  });
  it('renders component for an empty array for lat long', () => {
    const latLong = [];
    render(
      <BrowserRouter>
        <Hourly zip="02140" latLong={latLong} timeZone="EDT" />
      </BrowserRouter>
    );
    const linkToDaily = screen.getByTestId(/daily-link/i);
    const linkToHourly = screen.queryByTestId(/hourly-link/i);
    expect(linkToDaily).toBeInTheDocument();
    expect(linkToHourly).not.toBeInTheDocument();
  });
  it('renders component with no attributes', () => {
    render(
      <BrowserRouter>
        <Hourly />
      </BrowserRouter>
    );
    expect(screen).toBeTruthy();
  });
});