import React from 'react';
import { render } from '../test-utils';
import userEvent from '@testing-library/user-event'
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Home from './Home';

describe('Home', () => {
    test('load post(s) upon page load', async () => {
        const { findByText } = render(<Home />)
        expect(await findByText('Test post')).toBeInTheDocument()
    })
})