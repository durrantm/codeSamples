import React from 'react';
import { render, screen } from '@testing-library/react';
import Daily from './Daily';
import { BrowserRouter } from 'react-router-dom';

describe('Test of Daily component', () => {
  it('renders daily row', () => {
    render(
      <BrowserRouter>
        <Daily zip="02140" latLong={[0, 0]} timeZone="EDT" />
      </BrowserRouter>);
    const linkToDaily = screen.queryByTestId(/daily-link/i);
    const linkToHourly = screen.getByTestId(/hourly-link/i);
    expect(linkToHourly).toBeInTheDocument();
    expect(linkToDaily).not.toBeInTheDocument();
  });
  it('renders daily row with no attributes', () => {
    render(
      <BrowserRouter>
        <Daily />
      </BrowserRouter>);
    expect(screen).toBeTruthy();
  });
});