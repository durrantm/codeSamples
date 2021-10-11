import React from 'react';
import ZipForm from './ZipForm';
import { render, screen } from '@testing-library/react';

describe('Zip Form', () => {

  const fakeFn = () => { return () => {}; };

  it('renders with an empty zip', () => {
    render(<ZipForm zip="" updateZip= { fakeFn() } />);
    const placeholderTextZip = screen.getByPlaceholderText(/zip/i);
    expect(placeholderTextZip).toBeInTheDocument();
  });
  it('renders with a zip', () => {
    render(<ZipForm zip="02140" updateZip= { fakeFn() } />);
    const placeholderTextZip = screen.getByTestId('zip-input');
    screen.getByTestId('zip-input');
    expect(placeholderTextZip).toHaveAttribute('value', '02140');
  });
  it('renders Zip component with an invalid zip character, a letter instead of a number', () => {
    render(<ZipForm zip="a" updateZip= { fakeFn() } />);
    const placeholderTextZip = screen.getByTestId('zip-input');
    screen.getByTestId('zip-input');
    expect(placeholderTextZip).toHaveAttribute('value', 'a');
  });
});
