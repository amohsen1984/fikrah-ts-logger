import AbstractLogger from "./AbstractLogger";
export default class NullLogger extends AbstractLogger {
    log(level: string, message: string, context?: object): void;
}
