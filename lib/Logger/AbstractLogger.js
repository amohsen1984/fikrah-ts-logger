"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ILogger_1 = require("./ILogger");
class AbstractLogger {
    emergency(message, context) {
        this.log(ILogger_1.LogLevel.EMERGENCY, message, context);
    }
    alert(message, context) {
        this.log(ILogger_1.LogLevel.ALERT, message, context);
    }
    critical(message, context) {
        this.log(ILogger_1.LogLevel.CRITICAL, message, context);
    }
    error(message, context) {
        this.log(ILogger_1.LogLevel.ERROR, message, context);
    }
    warning(message, context) {
        this.log(ILogger_1.LogLevel.WARNING, message, context);
    }
    notice(message, context) {
        this.log(ILogger_1.LogLevel.NOTICE, message, context);
    }
    info(message, context) {
        this.log(ILogger_1.LogLevel.INFO, message, context);
    }
    debug(message, context) {
        this.log(ILogger_1.LogLevel.DEBUG, message, context);
    }
}
exports.default = AbstractLogger;
