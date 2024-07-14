const winston = require('winston');
const { blue, red, yellow } = require('colorette');

class Logger {
    constructor() {
        this.logger = winston.createLogger({
            level: 'debug',
            format: winston.format.combine(
                winston.format.printf(({ level, message }) => {
                    const formattedMessage = `[${level.toUpperCase()}] ${message}`;
                    if (level === 'info') {
                        return yellow(formattedMessage); // Blue for info
                    } else if (level === 'error') {
                        return red(formattedMessage); // Red for error
                    } else if (level === 'debug') {
                        return blue(formattedMessage);
                    } else {
                        return blue(formattedMessage);
                    }
                })
            ),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({ filename: 'error.log', level: 'error' }),
                new winston.transports.File({ filename: 'combined.log' })
            ]
        });
    }

    log(message) {
        this.logger.log('info', message);
    }

    info(message){
        this.logger.log('info', message);
    }

    error(message) {
        this.logger.log('error', message);
    }

    debug(message) {
        this.logger.log('debug', message);
    }
}

module.exports = Logger;
