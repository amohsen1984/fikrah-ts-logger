import { LogLevel } from "./ILogger";
export interface ILog {
    level: LogLevel;
    message: string;
    context?: any;
}
