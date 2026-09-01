import { render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  window.scrollTo = jest.fn();
});

test('renders the home page hero content', () => {
  render(<App />);

  expect(
    screen.getByRole('heading', { name: /what can we cook with what you have\?/i })
  ).toBeInTheDocument();
});
