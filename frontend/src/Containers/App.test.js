import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText((content, element) => {
    return element.tagName.toLowerCase() === 'div' && element.className === 'App'
  });
  expect(linkElement).toBeInTheDocument();
});