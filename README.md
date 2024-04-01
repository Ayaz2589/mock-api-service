
# Mock API Service

This is a mock API service built with Node.js and Express, providing authentication and user management functionalities. This service is meant to forked and used.

## Features

- User signup: Allows users to create an account with their email and password.
- User login: Enables users to authenticate and obtain access tokens for accessing protected routes.
- User logout: Provides a mechanism for users to log out and invalidate their access tokens.
- User management: Allows users to update their account information and delete their accounts.

## Prerequisites

- Node.js and npm installed on your machine
- PostgreSQL database running (you can use Docker to run a local PostgreSQL instance)

**PostgreSQL is not included and must be installed**

## Getting Started

1. Clone this repository to your local machine.
2. Install dependencies by running `npm install`.
3. Set up the PostgreSQL database by running the provided SQL script or using the provided Docker configuration.
4. Configure environment variables by creating a `.env` file based on the `.env.example` file and providing the required values.
5. Start the server by running `npm start`.

## API Endpoints

- `POST /api/auth/signup`: User signup endpoint.
- `POST /api/auth/login`: User login endpoint.
- `POST /api/auth/logout`: User logout endpoint.
- `PUT /api/users/:id`: Update user endpoint.
- `DELETE /api/users/:id`: Delete user endpoint.

## Environment Variables

- `ACCESS_TOKEN_SECRET`: Secret key for signing access tokens.
- `REFRESH_TOKEN_SECRET`: Secret key for signing refresh tokens.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
