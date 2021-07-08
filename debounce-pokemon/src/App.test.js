import { render, screen } from '@testing-library/react';
import App from './App';

test('App is visible', () => {
  render(<App />);
});

test('Input to have a class "App__inputText"', () => {
  render (<App/>);
  const input = screen.queryByTestId("App__inputText");
  expect(input).toBeVisible();
});

test('Placeholder to be "Introduce Pokemon"', () => {
  render (<App/>);
  const input = screen.queryByTestId("App__inputText");
  expect(input).toHaveAttribute('placeholder', 'Introduce Pokemon');
})