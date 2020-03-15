import AbstractLogger from "./AbstractLogger";
import { ILog } from "./ILog";
import { LogLevel } from "./ILogger";
export default class BufferingLogger extends AbstractLogger {
    private logs;
    log(level: LogLevel, message: string, context?: object): void;
    cleanLogs(): ILog[];
}
