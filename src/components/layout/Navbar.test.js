import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { Navbar } from './Navbar';

test('Navbar', () => {
  const navLinks = [{ path: 'fakepath', content: 'somecontent'}]
  render(<BrowserRouter><Navbar navLinks={navLinks}/></BrowserRouter>);
  const linkElement = screen.getByText('somecontent');
  expect(linkElement).toBeInTheDocument();
});