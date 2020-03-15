import AbstractLogger from "./AbstractLogger";
import IDefaultContextLogger from "./IDefaultContextLogger";
import { LogLevel } from "./ILogger";
export default class Logger extends AbstractLogger implements IDefaultContextLogger {
    private defaultContext?;
    private readonly console;
    private readonly minLevelWeighting;
    constructor(console: Console, minLevel?: LogLevel);
    setDefaultContext(context?: object): void;
    log(level: string, message: string, context?: object): void;
    private getMethodForLevel;
    private getLevelWeighting;
    /**
     * Merges both the default context and 'context' together, returning a
     * composite context.
     * If both the given 'context' and default context are 'undefined', then
     * exactly that is returned instead of an object.
     *
     * @param context
     */
    private composeContext;
}
