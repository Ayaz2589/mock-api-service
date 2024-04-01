import express, { Request, Response, NextFunction } from 'express';
import setupDatabase, { pool } from "./utils/setupDatabase";
import authRoutes from './routes/auth';
import { errorHandler } from './middleware';

process.on("SIGINT", async () => {
  await pool.end();
  process.exit();
});

setupDatabase().catch(console.error);

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

// Routes
app.use('/api/auth', authRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Mock API Service by Ayaz Uddin');
});

// Error handling middleware
app.use(errorHandler);
