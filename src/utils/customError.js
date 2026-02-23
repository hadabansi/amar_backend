class CustomError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

class ValidationError extends CustomError {
    constructor(message = 'Validation Error') {
        super(message, 400);
    }
}

class AuthenticationError extends CustomError {
    constructor(message = 'Authentication Failed') {
        super(message, 401);
    }
}

class AuthorizationError extends CustomError {
    constructor(message = 'Access Denied') {
        super(message, 403);
    }
}

class NotFoundError extends CustomError {
    constructor(message = 'Resource Not Found') {
        super(message, 404);
    }
}

module.exports = {
    CustomError,
    ValidationError,
    AuthenticationError,
    AuthorizationError,
    NotFoundError,
};

