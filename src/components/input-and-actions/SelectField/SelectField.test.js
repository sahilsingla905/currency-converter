import { render, screen } from '@testing-library/react';
import { SelectField } from './SelectField';

test('SelectField', () => {
  const options = [{ label: 'option1', value: 'option1'}];
  render(<SelectField label='testSelect' options={options}/>);
  const linkElement = screen.getByText('testSelect');
  expect(linkElement).toBeInTheDocument();
});