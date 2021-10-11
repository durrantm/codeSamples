import React from 'react';
import { render, screen } from '@testing-library/react';
import Description from './Description';

describe('Tests of description component', () => {

  it('renders short text as is', () => {
    render(<Description text = "windy with rain" />);
    const conditions = screen.getByText(/windy with rain/i);
    expect(conditions).toBeInTheDocument();
  });
  it('renders long text with text after 17 chars in special div', () => {
    render(<Description text = "windy and heavy thunderstorms"/>);
    const conditionsStartText = screen.getByText(/windy and heavy t/i);
    expect(conditionsStartText).toBeInTheDocument();
    const conditionsEndText = screen.getByTestId('description-big-screen-only');
    expect(conditionsEndText).toHaveTextContent(/hunderstorms/i);
  });
  it('renders element without error when passed no text', () => {
    render(<Description text = "" />);
    const description = screen;
    expect(description).toBeTruthy();
  });
});