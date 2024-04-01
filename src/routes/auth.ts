import { Router, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { createUser, loginUser, updateUser, deleteUser, logoutUser } from '../db/users';
import { authenticateToken } from '../middleware'; 

const router = Router();
dotenv.config()

router.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const { accessToken, refreshToken } = await createUser({ email, password }); 

    res.status(201).json({ accessToken, refreshToken });
  } catch (error) {
    next(error)
  }
});

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const { accessToken, refreshToken } = await loginUser({ email, password });

    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    next(error)
  }
});

router.post('/logout', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;

    await logoutUser({ userId });

    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { email, password } = req.body;

    await updateUser({ id, email, password });

    res.status(204).json();
  } catch (error) {
    next(error)
  }
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    await deleteUser({ id });

    res.status(200).json();
  } catch (error) {
    next(error)
  }
});

export default router;

