import AbstractLogger from "./AbstractLogger";
import { ILog } from "./ILog";
import { LogLevel } from "./ILogger";

export default class BufferingLogger extends AbstractLogger {
    private logs: ILog[] = [];

    public log(level: LogLevel, message: string, context?: object): void {
        this.logs.push({
            level,
            message,
            context,
        });
    }

    public cleanLogs(): ILog[] {
        const logs = this.logs;
        this.logs = [];

        return logs;
    }
}
