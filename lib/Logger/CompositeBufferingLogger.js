"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
class CompositeBufferingLogger extends index_1.BufferingLogger {
    constructor(logger) {
        super();
        this.logger = logger;
    }
    log(level, message, context) {
        this.logger[level](message, context);
        super.log(level, message, context);
    }
}
exports.default = CompositeBufferingLogger;
