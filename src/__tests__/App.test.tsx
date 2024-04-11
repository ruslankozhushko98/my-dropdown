import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import { App } from 'src/App';

it('App renders without crashing', () => {
  render(<App />);
  expect(true).toBeTruthy();
});
