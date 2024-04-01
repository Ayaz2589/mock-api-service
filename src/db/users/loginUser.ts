import { pool } from "../../utils/setupDatabase";
import { AuthErrorHandler } from "../../error";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

type Props = {
  email: string,
  password: string,
}

const loginUser = async ({ email, password }: Props) => {
  try {
    const userQuery = `SELECT * FROM Auth WHERE email = $1`;
    const userValues = [email];
    const userResult = await pool.query(userQuery, userValues);

    if (userResult.rows.length === 0) {
      throw AuthErrorHandler.unauthorizedUser();
    }

    const user = userResult.rows[0];

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw AuthErrorHandler.unauthorizedPassword();
    }

    const accessToken = jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET || "", { expiresIn: '1hr' });

    const refreshToken = jwt.sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET || "");

    const saveRefreshTokenQuery = `UPDATE Auth SET refresh_token = $1 WHERE id = $2`;
    const saveRefreshTokenValues = [refreshToken, user.id];
    await pool.query(saveRefreshTokenQuery, saveRefreshTokenValues);

    return { accessToken, refreshToken };
  } catch (error) {
    throw error;
  }
}

export default loginUser;
