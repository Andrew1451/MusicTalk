import React from 'react';
import { render } from '../test-utils';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Home from './Home';

const server = setupServer(
    rest.get('https://music-talk.herokuapp.com/VanHalen/all-posts', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                allPosts: [{
                    post_id: 'a1b2c3',
                    post: 'Test post',
                    username: 'Shred Flanders',
                    likeErr: null,
                    liked: false
                }]
            })
        )
    })
)
beforeAll(() => server.listen({
    onUnhandledRequest: 'error'
}))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Home', () => {
    test('load post(s) upon page load', async () => {
        const { findByText } = render(<Home />)
        expect(await findByText('Test post')).toBeInTheDocument()
    })
})