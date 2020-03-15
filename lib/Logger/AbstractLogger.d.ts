import { ILogger } from "./ILogger";
export default abstract class AbstractLogger implements ILogger {
    emergency(message: string, context?: object): void;
    alert(message: string, context?: object): void;
    critical(message: string, context?: object): void;
    error(message: string, context?: object): void;
    warning(message: string, context?: object): void;
    notice(message: string, context?: object): void;
    info(message: string, context?: object): void;
    debug(message: string, context?: object): void;
    abstract log(level: string, message: string, context?: object): void;
}
