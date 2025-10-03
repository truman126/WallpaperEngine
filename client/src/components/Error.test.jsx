import { describe, it, expect } from 'vitest';
import {render, screen} from '@testing-library/react';
import {Error} from './Error'; // Assuming Error is the component being tested

// // Import necessary modules

// Test suite for the Error component
describe('Error Component', () => {
    it('renders the error message', () => {
        render(<Error message="Something went wrong" />);
        expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    });

    it('renders a default message if no message is provided', () => {
        render(<Error />);
        expect(screen.getByText(/An unknown error has occurred./i)).toBeInTheDocument();
    });

});

// // We recommend installing an extension to run vitest tests.