// utils/logger.js

const { createLogger, format, transports } = require('winston');
const { Logger } = require('winston');

/**
 * @type {Logger}
 */
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
 * Custom logger with predefined logging methods
 * @typedef {Object} CustomLogger
 * @property {(message: string) => void} info Logs an info message
 * @property {(message: string) => void} error Logs an error message
 * @property {(message: string) => void} debug Logs a debug message
 * @property {(message: string) => void} warn Logs a warning message
 */

/**
 * Custom logger that wraps the original Winston logger
 * @type {CustomLogger}
 */
const customLogger = {
    /**
     * Logs an info message
     * @param {string} message
     */
    info: (message) => {
        logger.info(message);
    },
    /**
     * Logs an error message
     * @param {string} message
     */
    error: (message) => {
        logger.error(message);
    },
    /**
     * Logs a debug message
     * @param {string} message
     */
    debug: (message) => {
        logger.debug(message);
    },
    /**
     * Logs a warning message
     * @param {string} message
     */
    warn: (message) => {
        logger.warn(message);
    },
};

// Export the custom logger
module.exports = { logger: customLogger };
