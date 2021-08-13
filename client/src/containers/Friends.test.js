import React from 'react';
import { render } from '../test-utils';
import Friends from './Friends';

describe('Friends', () => {
    test('fetch and display friends upon page load', async () => {
        const { findByText } = render(<Friends />)
        expect(await findByText('Friend1')).toBeInTheDocument()
    })
})