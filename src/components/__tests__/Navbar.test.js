import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { Navbar } from '../layout/Navbar';

test('Check if Navbar renders', () => {
  const navLinks = [{ path: 'fakepath', content: 'somecontent'}]
  render(<BrowserRouter><Navbar navLinks={navLinks}/></BrowserRouter>);
  const linkElement = screen.getByText('somecontent');
  expect(linkElement).toBeInTheDocument();
});