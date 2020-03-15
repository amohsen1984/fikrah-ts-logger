import AbstractLogger from "./AbstractLogger";

export default class NullLogger extends AbstractLogger {
    public log(level: string, message: string, context?: object): void {
        // Do nothing.
    }
}
