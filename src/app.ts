// app.ts
import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import retry from 'retry';

const app = express();
const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient();

async function startServer() {
  const operation = retry.operation({
    retries: 3, // Number of retry attempts
    factor: 2, // Factor by which to increase the delay between retries (exponential backoff)
    minTimeout: 1000, // Minimum delay between retries (in milliseconds)
    maxTimeout: 5000, // Maximum delay between retries (in milliseconds)
  });

  operation.attempt(async (currentAttempt: number) => {
    console.log(`Attempting to connect to database (attempt ${currentAttempt})`);
    try {
      await prisma.$connect();
      console.log('Database connection successful.');

      app.get('/', (req, res) => {
        res.send('Welcome to the Mock API Service by Ayaz Uddin');
      });

      app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
      });
    } catch (error) {
      if (operation.retry(error as Error)) {
        console.log(`Retrying after error: ${(error as Error).message}`);
        return;
      }
      console.error('Failed to connect to the database after multiple attempts:', error);
      process.exit(1);
    }
  });
}


startServer();