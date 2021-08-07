import React from 'react';
import { render } from '../test-utils';
import { rest } from 'msw';
import { setupServer } from 'msw/node'
import FindFriends from './FindFriends';

const server = setupServer(
    rest.get('https://music-talk.herokuapp.com/find-friends', (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json (
            [{username: 'Friend1'}, {username: 'Friend2'}]
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
    test('fetch and display friends to add', async () => {
        const { findByText } = render(<FindFriends />)
        expect(await findByText('Friend1')).toBeInTheDocument()
    })
})