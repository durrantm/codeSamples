import { render, screen } from '@testing-library/react';
import AllocationBarRollover from '.';

describe('Rollover', () => {
  it('is positioned based on x and y props', () => {
    render(<AllocationBarRollover x={100} y={10} />);
    const rollover = screen.getByTestId('rollover');
    expect(rollover).toHaveStyle({ left: '100px', top: '10px' });
  });

  it('renders all messages', () => {
    const content = ['message 1', 'message 2'];
    render(<AllocationBarRollover content={content} />);
    const rollover = screen.getByTestId('rollover');
    expect(rollover.children).toHaveLength(2);
    expect(rollover.children[0]).toHaveTextContent('message 1');
  });
});
