import pg from "pg";

export const pool = new pg.Pool({
  user: "mockUser",
  host: "postgres",
  database: "mockDB",
  password: "password",
  port: 5432,
});

const checkDatabaseConnection = async (triesLeft = 5) => {
  if (triesLeft === 0) {
    console.error("Failed to connect to the database.");
    process.exit(1);
  }
  try {
    await pool.query("SELECT 1");
    console.log("Successfully connected to the database.");
  } catch (error) {
    console.error(
      "Failed to connect to database, retrying...",
      triesLeft - 1,
      "tries left"
    );
    await new Promise((resolve) => setTimeout(resolve, 5000));
    await checkDatabaseConnection(triesLeft - 1);
  }
};

const createUserTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS Auth (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      refresh_token VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

  try {
    await pool.query(query);
    console.log("Auth table created successfully.");
  } catch (error) {
    console.error("Error creating user table:", error);
  }
};

const setupDatabase = async () => {
  try {
    await checkDatabaseConnection();
    await createUserTable();
  } catch (error) {
    console.error("Error setting up database:", error);
  }
};

export default setupDatabase;
