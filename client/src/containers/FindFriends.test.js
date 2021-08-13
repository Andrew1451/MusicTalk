import React from 'react';
import { render } from '../test-utils';
import userEvent from '@testing-library/user-event';
import FindFriends from './FindFriends';

describe('Friends', () => {
    test('fetch and display friends to add', async () => {
        const { findByText } = render(<FindFriends />)
        expect(await findByText('Friend1')).toBeInTheDocument()
    })
    test('adds friend when username clicked', async () => {
        const { findByText } = render(<FindFriends />)
        userEvent.click(await findByText('Friend1'))
        expect(await findByText('Added!')).toBeInTheDocument()
    })
})