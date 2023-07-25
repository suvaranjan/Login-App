// Error middleware function to handle errors
const errorMiddleware = (err, req, res, next) => {
    // Default status code is 500 (Internal Server Error)
    let statusCode = err.statusCode || 500;

    // Default error message
    let errorMessage = 'Internal Server Error';

    // Check if the error has a message
    if (err.message) {
        errorMessage = err.message;
    }

    // Check if the error is a validation error
    if (err.name === 'ValidationError') {
        statusCode = 400; // Bad Request
    }

    // Log the error for debugging (optional)
    console.error(err);

    // Send the error response to the client
    res.status(statusCode).json({ error: errorMessage });
};

module.exports = errorMiddleware;
