export enum LogLevel {
    EMERGENCY = "emergency",
    ALERT = "alert",
    CRITICAL = "critical",
    ERROR = "error",
    WARNING = "warning",
    NOTICE = "notice",
    INFO = "info",
    DEBUG = "debug",
}

/**
 * @see https://github.com/php-fig/log/blob/master/Psr/Log/LoggerInterface.php
 */
export interface ILogger {
    /**
     * System is unusable.
     *
     * @param message
     * @param context
     */
    emergency(message: string, context?: object): void;

    /**
     * Action must be taken immediately.
     *
     * Example: Entire website down, database unavailable, etc. This should
     * trigger the SMS alerts and wake you up.
     *
     * @param message
     * @param context
     */
    alert(message: string, context?: object): void;

    /**
     * Critical conditions.
     *
     * Example: Application component unavailable, unexpected exception.
     *
     * @param message
     * @param context
     */
    critical(message: string, context?: object): void;

    /**
     * Runtime errors that do not require immediate action but should typically
     * be logged and monitored.
     *
     * @param message
     * @param context
     */
    error(message: string, context?: object): void;

    /**
     * Exceptional occurrences that are not errors.
     *
     * Example: Use of deprecated APIs, poor use of an API, undesirable things
     * that are not necessarily wrong.
     *
     * @param message
     * @param context
     */
    warning(message: string, context?: object): void;

    /**
     * Normal but significant events.
     *
     * @param message
     * @param context
     */
    notice(message: string, context?: object): void;

    /**
     * Interesting events.
     *
     * Example: User logs in, SQL logs.
     *
     * @param message
     * @param context
     */
    info(message: string, context?: object): void;

    /**
     * Detailed debug information.
     *
     * @param message
     * @param context
     */
    debug(message: string, context?: object): void;

    /**
     * Logs with an arbitrary level.
     *
     * @param level
     * @param message
     * @param context?
     */
    log(level: string, message: string, context?: object): void;
}
