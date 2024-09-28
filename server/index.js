const { server } = require('./app');
const dotenv = require('dotenv');
const { logger } = require('./utils/logger');

dotenv.config(); // Load environment variables from .env file

/**
 * Port on which the server will listen.
 * @constant {number}
 * @default 5000
 */
const PORT = process.env.PORT || 5000;

/**
 * Start the server and listen on the specified port.
 * Logs the server status using the logger utility.
 */
server.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});
