import { render, screen } from '@testing-library/react';
import App from './App';

test('renders spacex app', () => {
  render(<App />);
  const pageTitle = screen.getByText(/SpaceX/i);
  expect(pageTitle).toBeInTheDocument();
});

test('verify list view is selected by default', () => {  
  const { container } = render(<App />);
  const selectedViewType = container.querySelector('[aria-pressed="true"]');
  expect(selectedViewType.title).toBe("List View");
});

test('verify pagination option is loaded', async () => {
  const { container } = render(<App />);
  const pagination = await container.querySelector('[aria-label="pagination navigation"]')
  expect(pagination).toBeInTheDocument();
});