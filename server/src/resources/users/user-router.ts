import express from 'express';
import { UserModel } from './user-model';

export const userRouter = express
.Router()
.get('/api/users', async (req, res) => {
    const users = await UserModel.find({})
    res.json(users)
})
.post('/api/users', () => {

})