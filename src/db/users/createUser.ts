import { pool } from "../../utils/setupDatabase";
import { AuthErrorHandler } from "../../error";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  email: string,
  password: string,
}

const createUser = async ({ email, password }: Props) => {
  try {
    const userExistsQuery = `SELECT * FROM Auth WHERE email = $1`;
    const userExistsValues = [email];
    const userExistsResult = await pool.query(userExistsQuery, userExistsValues);

    if (userExistsResult.rows.length > 0) {
      throw AuthErrorHandler.unauthorizedUserAlreadyExists();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = uuidv4();

    const createUserQuery = `
      INSERT INTO Auth (id, email, password, created_at, updated_at)
      VALUES ($1, $2, $3, NOW(), NOW())
      RETURNING *
    `;
    const createUserValues = [userId, email, hashedPassword];
    const newUserResult = await pool.query(createUserQuery, createUserValues);
    const newUser = newUserResult.rows[0];

    const accessToken = jwt.sign({ userId: newUser.id }, process.env.ACCESS_TOKEN_SECRET || "", { expiresIn: '1hr' });

    const refreshToken = jwt.sign({ userId: newUser.id }, process.env.REFRESH_TOKEN_SECRET || "");

    const saveRefreshTokenQuery = `UPDATE Auth SET refresh_token = $1 WHERE id = $2`;
    const saveRefreshTokenValues = [refreshToken, newUser.id];
    await pool.query(saveRefreshTokenQuery, saveRefreshTokenValues);

    return { accessToken, refreshToken };
  } catch (error) {
    throw error;
  }
}

export default createUser;
