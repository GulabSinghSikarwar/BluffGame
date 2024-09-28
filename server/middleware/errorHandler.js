/**
 * Error handling middleware for Express applications.
 * 
 * @param {Error} err - The error that occurred.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 * @param {import('express').NextFunction} next - The next middleware function.
 */
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
};

module.exports = { errorHandler }; // Export the errorHandler function
