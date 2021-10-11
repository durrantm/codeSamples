import { render, screen } from '@testing-library/react';
import Error404 from '.';

describe('The 404 - not found page', () => {

  it('renders the not found text', () => {
    render(<Error404 />);
    const linkElement = screen.getByText(/Page Not Found/i);
    expect(linkElement).toBeInTheDocument();
  });
});
