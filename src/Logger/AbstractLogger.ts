import { ILogger, LogLevel } from "./ILogger";

export default abstract class AbstractLogger implements ILogger {
    public emergency(message: string, context?: object): void {
        this.log(LogLevel.EMERGENCY, message, context);
    }

    public alert(message: string, context?: object): void {
        this.log(LogLevel.ALERT, message, context);
    }

    public critical(message: string, context?: object): void {
        this.log(LogLevel.CRITICAL, message, context);
    }

    public error(message: string, context?: object): void {
        this.log(LogLevel.ERROR, message, context);
    }

    public warning(message: string, context?: object): void {
        this.log(LogLevel.WARNING, message, context);
    }

    public notice(message: string, context?: object): void {
        this.log(LogLevel.NOTICE, message, context);
    }

    public info(message: string, context?: object): void {
        this.log(LogLevel.INFO, message, context);
    }

    public debug(message: string, context?: object): void {
        this.log(LogLevel.DEBUG, message, context);
    }

    public abstract log(level: string, message: string, context?: object): void;
}
