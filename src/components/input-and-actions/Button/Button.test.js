import { render, screen } from '@testing-library/react';
import { Button } from './Button';

test('Button should render text passed as children', () => {
  render(<Button>Test</Button>);
  const linkElement = screen.getByText('Test');
  expect(linkElement).toBeInTheDocument();
});

// test('Button should render className passed as a prop', () => {
//   const { container } = render(<Button styleClass={'testClass'}>Test</Button>);
//   const domElement = container.getElementsByClassName('testClass')[0];
//   expect(domElement).toBeInTheDocument();
// });