import { Request, Response, NextFunction } from 'express';
import { AuthErrorHandler } from '../error';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

  if (err instanceof AuthErrorHandler) {
    res.status(err.statusCode).send({ ...err });
    return
  }
  
  res.status(500).send("Something went wrong: " + err.message);
}

export default errorHandler;