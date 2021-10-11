import React from 'react';
import { render, screen } from '@testing-library/react';
import Icon from './Icon';

describe('Tests of Icon component', () => {
  it('renders component and has correct alt text', () => {
    render(<Icon code ="test" />);
    const result = screen.getByAltText('icon-weather');
    expect(result).toBeTruthy();
  });
  it('renders component without error when no attributes are passed', () => {
    render(<Icon />);
    expect(screen).toBeTruthy();
  });
});