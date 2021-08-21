import { rest } from 'msw'

export const handlers = [
    rest.post('https://music-talk.herokuapp.com/sign-up', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                username: 'VanHalen' 
            })
        );
    }),
    rest.get('https://music-talk.herokuapp.com/your-friends', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(
                [{friend: 'Friend1'}, {friend: 'Friend2'}]
            )
        );
    }),
    rest.get('https://music-talk.herokuapp.com/VanHalen/posts', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                posts: [{
                    post_id: 'a1b2c3',
                    created_at: '8/12/21 12:28',
                    post: 'Test post',
                    username: 'Shred Flanders',
                    liked: false
                }]
            })
        );
    }),
    rest.get('https://music-talk.herokuapp.com/VanHalen/all-posts', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                allPosts: [{
                    post_id: 'a1b2c3',
                    post: 'Test post',
                    username: 'Shred Flanders',
                    likeError: null,
                    liked: false
                }]
            })
        )
    }),
    rest.post('https://music-talk.herokuapp.com/VanHalen/like', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({ data: {liked: true}})
        )
    }),
    rest.get('https://music-talk.herokuapp.com/find-friends', (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json (
            [{username: 'Friend1'}, {username: 'Friend2'}]
        )
      )
    }),
    rest.post('https://music-talk.herokuapp.com/VanHalen/add-friend', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                added: 'friend added!'
            })
        )
    }),
    rest.post('https://music-talk.herokuapp.com/VanHalen/add-post', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({result: {insertId: 2}})
        )
    })
]