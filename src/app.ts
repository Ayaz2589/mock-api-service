// app.ts
import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient();

async function startServer() {
  try {
    await prisma.$connect();
    console.log('Database connection successful.');

    app.get('/', (req: Request, res: Response) => {
      res.send('Welcome to the Mock API Service by Ayaz Uddin');
    });


    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

startServer();