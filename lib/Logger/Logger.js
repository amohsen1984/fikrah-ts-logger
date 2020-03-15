"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stringifyJson = require("json-stringify-safe");
const AbstractLogger_1 = require("./AbstractLogger");
const ILogger_1 = require("./ILogger");
const LogLevelWeights_1 = require("./LogLevelWeights");
class Logger extends AbstractLogger_1.default {
    constructor(console, minLevel = ILogger_1.LogLevel.WARNING) {
        super();
        this.console = console;
        this.minLevelWeighting = this.getLevelWeighting(minLevel);
    }
    setDefaultContext(context) {
        this.defaultContext = context;
    }
    log(level, message, context) {
        const levelWeighting = this.getLevelWeighting(level);
        if (levelWeighting < this.minLevelWeighting) {
            return;
        }
        const logMethod = this.getMethodForLevel(level);
        const args = [`[${level}] ${message}`];
        const composedContext = this.composeContext(context);
        if (undefined !== composedContext) {
            args.push(stringifyJson(composedContext));
        }
        this.console[logMethod].apply(this.console, args);
    }
    getMethodForLevel(level) {
        switch (level) {
            case ILogger_1.LogLevel.CRITICAL:
            case ILogger_1.LogLevel.EMERGENCY:
            case ILogger_1.LogLevel.ERROR:
            case ILogger_1.LogLevel.ALERT:
                return "error";
            case ILogger_1.LogLevel.WARNING:
                return "warn";
            case ILogger_1.LogLevel.DEBUG:
                return "debug";
            case ILogger_1.LogLevel.INFO:
            case ILogger_1.LogLevel.NOTICE:
                return "info";
            default:
                return "log";
        }
    }
    getLevelWeighting(level) {
        return LogLevelWeights_1.default[level];
    }
    /**
     * Merges both the default context and 'context' together, returning a
     * composite context.
     * If both the given 'context' and default context are 'undefined', then
     * exactly that is returned instead of an object.
     *
     * @param context
     */
    composeContext(context) {
        if (undefined === context && undefined === this.defaultContext) {
            return undefined;
        }
        return Object.assign(Object.assign({}, (this.defaultContext || {})), (context || {}));
    }
}
exports.default = Logger;
