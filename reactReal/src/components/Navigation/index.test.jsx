import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navigation from '.';

describe('Tests the navigation page', () => {
  it('renders navigation links', () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>);
    const linkElement = screen.getByText(/Executions/i);
    const homeElement = screen.getByText(/Home/i);

    expect(linkElement).toBeInTheDocument();
    expect(homeElement).toBeInTheDocument();
  });
});
