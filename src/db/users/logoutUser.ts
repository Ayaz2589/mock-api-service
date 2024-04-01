import { pool } from "../../utils/setupDatabase";
import { AuthErrorHandler } from "../../error";

interface LogoutProps {
  userId: string;
}

const userLogout = async ({ userId }: LogoutProps) => {
  try {
    const invalidateTokenQuery = `UPDATE Auth SET refresh_token = NULL WHERE id = $1`;
    const invalidateTokenValues = [userId];
    await pool.query(invalidateTokenQuery, invalidateTokenValues);
  } catch (error) {
    throw error;
  }
};

export default userLogout;
