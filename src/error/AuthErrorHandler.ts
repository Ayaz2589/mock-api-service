class AuthErrorHandler {
  public statusCode: number;
  public message: string;

  constructor(statusCode: number, message: string) {
    this.statusCode = statusCode;
    this.message = message;
  }

  static unauthorizedUser() {
    return new AuthErrorHandler(401, "Unauthorized: User Not Found");
  }

  static unauthorizedUserAlreadyExists() {
    return new AuthErrorHandler(409, "Unauthorized: User Already Exists");
  }

  static unauthorizedPassword() {
    return new AuthErrorHandler(401, "Unauthorized: Incorrect Password");
  }

  static unauthorized() {
    return new AuthErrorHandler(401, "Unauthorized");
  }

  static forbidden() {
    return new AuthErrorHandler(403, "Forbidden");
  }

  static JWTExpired() {
    return new AuthErrorHandler(403, "Unauthorized: JWT token expired");
  }

  static refreshTokenNotFound() {
    return new AuthErrorHandler(401, "Unauthorized: Refresh token not found");
  }

  static invalidAccessToken() {
    return new AuthErrorHandler(401, "Unauthorized: Invalid access token");
  }

  static accessTokenNotFound() {
    return new AuthErrorHandler(401, "Unauthorized: Access token not found");
  }

  static invalidRefreshToken() {
    return new AuthErrorHandler(401, "Unauthorized: Invalid refresh token");
  }

  static serverError() {
    return new AuthErrorHandler(500, "Internal server error");
  }

  getStatusCode() {
    return this.statusCode;
  }

  getMessage() {
    return this.message;
  }
}

export default AuthErrorHandler;