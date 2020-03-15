import { BufferingLogger } from "../index";
import { ILogger, LogLevel } from "./ILogger";

export default class CompositeBufferingLogger extends BufferingLogger {
    private readonly logger: ILogger;

    constructor(logger: ILogger) {
        super();

        this.logger = logger;
    }

    public log(level: LogLevel, message: string, context?: object): void {
        this.logger![level](message, context);

        super.log(level, message, context);
    }
}
