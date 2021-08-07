import React from 'react';
import { render } from '../test-utils';
import userEvent from '@testing-library/user-event';
import Signup from './Signup';

describe('Signup', () => {
    test('cancelHandler function clears the form when Cancel button clicked', async () => {
        const { getByText, getByLabelText } = render(<Signup />)
        expect(getByText('Cancel')).toBeInTheDocument()
        //grab inputs
        const usernameInput = getByLabelText('Username')
        const passwordInput = getByLabelText(/password/i)
        //type in inputs
        userEvent.type(usernameInput, 'ShredFlanders')
        userEvent.type(passwordInput, 'abc123')
        //check value of inputs
        expect(usernameInput).toHaveValue('ShredFlanders')
        expect(passwordInput).toHaveValue('abc123')
        //clear inputs
        userEvent.click(getByText('Cancel'))
        //check inputs are clear
        expect(usernameInput).toHaveValue('')
        expect(passwordInput).toHaveValue('')
    })
})