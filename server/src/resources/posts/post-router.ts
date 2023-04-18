import express from 'express';
import { PostModel } from './post-model';

export const postRouter = express
.Router()
.get('/api/posts', async (req, res) => {
    const posts = await PostModel.find({})
    res.json(posts)
})
.post('/api/posts', () => {

})