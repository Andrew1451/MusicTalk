import React from 'react'
import { render } from '../test-utils'
import userEvent from '@testing-library/user-event'
import Post from './Post'

describe('Post', () => {
    test('render post', async () => {
        const { debug, findByText, getByText } = render(<Post key={'a1b2c3'} postid={'a1b2c3'} post={'Test post'} username={'Shred Flanders'} user={'VanHalen'} liked={false} />)
        expect(await findByText('Like')).toBeInTheDocument()
    })
})