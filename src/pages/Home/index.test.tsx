import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';

import HomePage from '.';

test('renders HomePage', () => {
  render(<HomePage />);

  expect(screen.getByText(/Hello/i)).toBeInTheDocument();
});
