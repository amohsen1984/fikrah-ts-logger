"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractLogger_1 = require("./AbstractLogger");
class BufferingLogger extends AbstractLogger_1.default {
    constructor() {
        super(...arguments);
        this.logs = [];
    }
    log(level, message, context) {
        this.logs.push({
            level,
            message,
            context,
        });
    }
    cleanLogs() {
        const logs = this.logs;
        this.logs = [];
        return logs;
    }
}
exports.default = BufferingLogger;
