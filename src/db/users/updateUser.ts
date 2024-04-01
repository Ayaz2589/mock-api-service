import { pool } from "../../utils/setupDatabase";
import { AuthErrorHandler } from "../../error";
import bcrypt from 'bcryptjs';

type Props = {
  id: string;
  email: string;
  password: string;
}

const updateUser = async ({ id, email, password }: Props) => {
  try {
    const userQuery = `SELECT * FROM Auth WHERE id = $1`;
    const userValues = [id];
    const userResult = await pool.query(userQuery, userValues);

    if (userResult.rows.length === 0) {
      throw AuthErrorHandler.unauthorizedUser();
    }

    let hashedPassword: string | null = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    let updateQuery = `UPDATE Auth SET email = $1`;
    const updateValues = [email];

    if (password) {
      updateQuery += `, password = $2`;
      updateValues.push(hashedPassword!);
    }

    updateValues.push(id);
    await pool.query(updateQuery + ` WHERE id = $${updateValues.length}`, updateValues);

    return { message: 'User updated successfully' };
  } catch (error) {
    throw error;
  }
}

export default updateUser;
