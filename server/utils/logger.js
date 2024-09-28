// utils/logger.js

const { createLogger, format, transports } = require('winston');

const logger = createLogger({
    level: 'info', // Default logging level
    format: format.combine(
        format.timestamp(), // Add timestamp
        format.json() // Log in JSON format
    ),
    transports: [
        // Console transport
        new transports.Console({
            format: format.combine(
                format.colorize(), // Add color to console logs
                format.simple() // Use a simple format for console
            )
        }),
        // File transport
        new transports.File({ filename: 'combined.log' }) // Log all messages to a file
    ],
});

// Optionally handle uncaught exceptions
logger.exceptions.handle(
    new transports.File({ filename: 'exceptions.log' })
);

/**
 * Log messages in a similar format as the original logger
 * @type {Object}
 */
const customLogger = {
    /**
     * @param {string} message
     */
    info: (message) => {
        logger.info(message);
    },
    /**
     * @param {string} message
     */
    error: (message) => {
        logger.error(message);
    },
};

// Export the custom logger
module.exports = { logger: customLogger };
