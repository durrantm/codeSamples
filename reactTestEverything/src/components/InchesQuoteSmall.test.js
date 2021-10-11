import React from 'react';
import { render, screen } from '@testing-library/react';
import InchesQuoteSmall from './InchesQuoteSmall';

describe('tests', () => {
  it('test', () => {
    render(<InchesQuoteSmall/>);
    const result  = screen.getByText('”');
    expect(result).toBeInTheDocument();
  });
});
