import { render, screen } from '@testing-library/react';
import { InputField } from './InputField';

test('InputField', () => {
  render(<InputField label="testInput"/>);
  const linkElement = screen.getByText('testInput');
  expect(linkElement).toBeInTheDocument();
});