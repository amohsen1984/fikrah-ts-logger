import { BufferingLogger } from "../index";
import { ILogger, LogLevel } from "./ILogger";
export default class CompositeBufferingLogger extends BufferingLogger {
    private readonly logger;
    constructor(logger: ILogger);
    log(level: LogLevel, message: string, context?: object): void;
}
