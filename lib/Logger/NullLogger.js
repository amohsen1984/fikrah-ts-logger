"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractLogger_1 = require("./AbstractLogger");
class NullLogger extends AbstractLogger_1.default {
    log(level, message, context) {
        // Do nothing.
    }
}
exports.default = NullLogger;
