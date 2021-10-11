import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

jest.mock('./pages/Home');

describe('Tests the application', () => {
  it('renders paxos text', async () => {
    await waitFor(() => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>);
    });
    const linkElement = screen.getByText(/paxos/i);
    expect(linkElement).toBeInTheDocument();
  });
});
