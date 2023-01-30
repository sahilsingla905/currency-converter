import { render, screen } from '@testing-library/react';
import { InputField } from '../input-and-actions/InputField';

test('Check if InputField renders', () => {
  render(<InputField label="testInput"/>);
  const linkElement = screen.getByText('testInput');
  expect(linkElement).toBeInTheDocument();
});

test('Get InputField by value', () => {
  render(<InputField label="testInput" value="testing" onChange={() => {}} />);
  const linkElement = screen.getByDisplayValue('testing');
  expect(linkElement).toBeInTheDocument();
});
