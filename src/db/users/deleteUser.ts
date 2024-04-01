import { pool } from "../../utils/setupDatabase";
import { AuthErrorHandler } from "../../error";

type Props = {
  id: string;
};

const deleteUser = async ({ id }: Props) => {
  try {
    if (!id) throw AuthErrorHandler.unauthorizedUser();

    const userQuery = `SELECT * FROM Auth WHERE id = $1`;
    const userValues = [id];
    const userResult = await pool.query(userQuery, userValues);

    if (userResult.rows.length === 0) throw AuthErrorHandler.unauthorizedUser();

    const deleteQuery = `DELETE FROM Auth WHERE id = $1`;
    await pool.query(deleteQuery, userValues);
  } catch (error) {
    throw error;
  }
};

export default deleteUser;
