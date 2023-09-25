import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from './Button';

describe('Button', () => {
  it('renders children correctly', () => {
    // Render the Button component with some test text
    const { getByText } = render(<Button>Test Button</Button>);

    // Check if the button text is rendered
    const buttonText = getByText('Test Button');
    expect(buttonText).toBeTruthy();
  });

});
