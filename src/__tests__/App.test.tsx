import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import { App } from 'src/App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
  });
});
