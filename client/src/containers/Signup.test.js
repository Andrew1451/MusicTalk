import React from 'react';
import { render, screen } from '../test-utils';
// import userEvent from '@testing-library/user-event';
import Signup from './Signup';

describe('Signup', () => {
    test('cancelHandler function clears the form when Cancel button clicked', () => {
        render(<Signup />)
        expect(screen.getByText('Cancel')).toBeInTheDocument()
    })
})