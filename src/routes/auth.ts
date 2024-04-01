import { Router, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import createUser from '../db/users/createUser';

const router = Router();
dotenv.config()

router.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const { accessToken, refreshToken } = await createUser({ email, password }); 

    res.status(201).json({ message: 'User created successfully', accessToken, refreshToken });
  } catch (error) {
    next(error)
  }
});


export default router;
