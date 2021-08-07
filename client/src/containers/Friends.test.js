import React from 'react';
import { render } from '../test-utils';
import { rest } from 'msw';
import { setupServer } from 'msw/node'
import Friends from './Friends';

const server = setupServer(
    rest.get('https://music-talk.herokuapp.com/your-friends', (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json (
            [{friend: 'Friend1'}, {friend: 'Friend2'}]
        )
      )
    }),
  )
  
  beforeAll(() => server.listen({
    onUnhandledRequest: 'error',
  }))
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

describe('Friends', () => {
    test('fetch and display friends upon page load', async () => {
        const { findByText } = render(<Friends />)
        expect(await findByText('Friend1')).toBeInTheDocument()
    })
})