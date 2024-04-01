import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AuthErrorHandler } from "../error";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];
  
    if (!token) throw AuthErrorHandler.accessTokenNotFound();
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "", (err, decodedToken) => {
      if (err) throw AuthErrorHandler.JWTExpired();
      
      if (decodedToken) {
        req.user = decodedToken as JwtPayload;
      }
    });
  
    next();
  } catch (error) {
    next(error);
  }
};

export default authenticateToken;
