import express, { Request, Response } from 'express';
import authRouter from './routes/auth';

const app = express();
const PORT = 8080;

app.use(express.json());

app.use('/api/auth', authRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Mock API Service by Ayaz Uddin');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
