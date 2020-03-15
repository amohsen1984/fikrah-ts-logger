import stringifyJson = require("json-stringify-safe");
import AbstractLogger from "./AbstractLogger";
import IDefaultContextLogger from "./IDefaultContextLogger";
import { LogLevel } from "./ILogger";
import LogLevelWeights from "./LogLevelWeights";

export default class Logger extends AbstractLogger
    implements IDefaultContextLogger {
    private defaultContext?: object;
    private readonly console: Console;
    private readonly minLevelWeighting: number;

    constructor(console: Console, minLevel: LogLevel = LogLevel.WARNING) {
        super();
        this.console = console;
        this.minLevelWeighting = this.getLevelWeighting(minLevel);
    }

    public setDefaultContext(context?: object): void {
        this.defaultContext = context;
    }

    public log(level: string, message: string, context?: object): void {
        const levelWeighting = this.getLevelWeighting(level as LogLevel);

        if (levelWeighting < this.minLevelWeighting) {
            return;
        }

        const logMethod = this.getMethodForLevel(level);
        const args: any[] = [`[${level}] ${message}`];
        const composedContext: object | undefined = this.composeContext(
            context,
        );
        if (undefined !== composedContext) {
            args.push(stringifyJson(composedContext));
        }

        (this.console as any)[logMethod].apply(this.console, args);
    }

    private getMethodForLevel(level: string): string {
        switch (level) {
            case LogLevel.CRITICAL:
            case LogLevel.EMERGENCY:
            case LogLevel.ERROR:
            case LogLevel.ALERT:
                return "error";
            case LogLevel.WARNING:
                return "warn";
            case LogLevel.DEBUG:
                return "debug";
            case LogLevel.INFO:
            case LogLevel.NOTICE:
                return "info";
            default:
                return "log";
        }
    }

    private getLevelWeighting(level: LogLevel): number {
        return LogLevelWeights[level];
    }

    /**
     * Merges both the default context and 'context' together, returning a
     * composite context.
     * If both the given 'context' and default context are 'undefined', then
     * exactly that is returned instead of an object.
     *
     * @param context
     */
    private composeContext(context?: object): object | undefined {
        if (undefined === context && undefined === this.defaultContext) {
            return undefined;
        }

        return {
            ...(this.defaultContext || {}),
            ...(context || {}),
        };
    }
}
