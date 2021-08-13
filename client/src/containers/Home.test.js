import React from 'react';
import { render } from '../test-utils';
import Home from './Home';

describe('Home', () => {
    test('load post(s) upon page load', async () => {
        const { findByText } = render(<Home />)
        expect(await findByText('Test post')).toBeInTheDocument()
    })
})