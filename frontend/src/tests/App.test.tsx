import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

describe("Main application", () =>{
  jest.mock('../services/Env.ts', () => ({
    get Env() {
      return {
        api: {
          URL: "http://localhost:5000"
        },
      };
    }
  }))

  test('renders Sensor Readings link', () => {
    beforeEach(() => {
      process.env.ENVIRONMENT = "test";
    });

    const { getByText } = render(<App />);
    const linkElement = getByText(/Sensor Readings/i);
    expect(linkElement).toBeInTheDocument();
  });
})
