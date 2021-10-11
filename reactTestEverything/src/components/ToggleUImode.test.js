import React from 'react';
import ToggleUImode from './ToggleUImode';
import { render, screen } from '@testing-library/react';

describe('Toggle UI mode switcher for themes', () => {
  it('renders toggle', () => {
    render(<ToggleUImode toggleUImode = { () => {} } />);
    const toggle = screen.findByTestId('edaUImodeSwitcher');
    expect(toggle).toBeTruthy();
  });
  it('renders toggle without attribute', () => {
    render(<ToggleUImode />);
    const toggle = screen.findByTestId('edaUImodeSwitcher');
    expect(toggle).toBeTruthy();
  });
  it('renders toggle without attribute by its CSS ID', () => {
    const toggle = render(<ToggleUImode />).container.querySelector('#ui-mode-switcher');
    expect(toggle).toBeTruthy();
  });
});
