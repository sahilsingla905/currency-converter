import { render, screen } from '@testing-library/react';
import { SelectField } from '../input-and-actions/SelectField';

test('SelectField', () => {
  const options = [{ label: 'option1', value: 'option1'}];
  render(<SelectField label='testSelect' options={options}/>);
  const linkElement = screen.getByText('testSelect');
  expect(linkElement).toBeInTheDocument();
});

test('SelectField Options', () => {
  const options = [{ label: 'option1', value: 'option1'}, { label: 'option2', value: 'option2'}];
  render(<SelectField label='testSelect' options={options}/>);
  let optionsList = screen.getAllByTestId('select-option');
  expect(optionsList[0].selected).toBeTruthy();
  expect(optionsList.length).toBe(options.length);
});