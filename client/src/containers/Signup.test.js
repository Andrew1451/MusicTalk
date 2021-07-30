import React from 'react';
import { render as rtlRender } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import store from '../store'
import Signup from './Signup';

const render = (component) => rtlRender(
    <Provider store={store()}>
        {component}
    </Provider>
)

describe('Signup', () => {
    test('cancelHandler function clears the form when Cancel button clicked', () => {
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