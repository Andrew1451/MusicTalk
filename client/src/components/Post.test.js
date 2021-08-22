import React from 'react'
import { render } from '../test-utils'
import userEvent from '@testing-library/user-event'
import Post from './Post'

describe('Post', () => {
    test('render post', () => {
        const { getByText } = render(<Post key={'a1b2c3'} postid={'a1b2c3'} post={'Test post'} username={'Shred Flanders'} user={'VanHalen'} liked={false} />)
        expect(getByText('Test post')).toBeInTheDocument()
    })
    test('type and submit a comment, then render the comment', async () => {
        const { getByText, findByText, findByRole } = render(<Post key={'a1b2c3'} postid={'a1b2c3'} post={'Test post'} username={'Shred Flanders'} user={'VanHalen'} liked={false} />)
        userEvent.click(getByText('Comments'))
        userEvent.type(await findByRole('textbox'), 'Test comment')
        expect(await findByText('Test comment')).toBeInTheDocument()
    })
})