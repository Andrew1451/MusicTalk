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
    rest.get('https://music-talk.herokuapp.com/VanHalen/posts'), (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                posts: []
            })
        );
    }
]