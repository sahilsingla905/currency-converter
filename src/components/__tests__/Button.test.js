import { render, screen } from '@testing-library/react';
import { Button } from '../input-and-actions/Button';

test('Button should render text passed as children', () => {
  render(<Button>Test</Button>);
  const linkElement = screen.getByText('Test');
  expect(linkElement).toBeInTheDocument();
});
