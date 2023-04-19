import express, { Request, Response } from 'express';
import { PostModel } from './post-model';
import { auth } from '../../middlewares/auth';

export const postRouter = express
.Router()
.get('/api/posts', async (req: Request, res: Response) => {
    const posts = await PostModel.find({})
    res.json(posts)
})
.post('/api/posts', auth, async (req: Request, res: Response) => {
    const loggedInUser = req.session
    const { title, content } = req.body

    // CHECK FOR MISSING OR INCORRECT VALUES
    if( !title || typeof title !== 'string' || title.length < 1) {
        res.status(400).json('Your post needs a title.');
        return
    }
    if( !content || typeof content !== 'string' || content.length < 1) {
        res.status(400).json('Your post cant be empty.');
        return
    }

    const post = {
        title: title,
        content: content,
        author: loggedInUser
    }
    const newPost = await PostModel.create(post)

    res.status(201).json({
        title: newPost.title,
        content: newPost.content,
        author: newPost.author,
    })
})