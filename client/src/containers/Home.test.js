import React from 'react';
import { render } from '../test-utils';
import userEvent from '@testing-library/user-event';
import Home from './Home';

describe('Home', () => {
    test('load post(s) upon page load', async () => {
        const { findByText } = render(<Home />)
        expect(await findByText('Test post')).toBeInTheDocument()
    })
    test('type and submit a post, then show post', async () => {
        const { findAllByRole, findByText, getByText } = render(<Home />)
        expect(await findByText('Test post')).toBeInTheDocument()
        const textarea = await findAllByRole('textbox')
        userEvent.type(textarea[0], 'Another test post.')
        userEvent.click(getByText('Post'))
        expect(await findByText('Another test post.')).toBeInTheDocument()
    })
})