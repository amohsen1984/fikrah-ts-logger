import AbstractLogger from "../Logger/AbstractLogger";
import { ILog } from "../Logger/ILog";
export default class AssertingLogger extends AbstractLogger {
    private logs;
    log(level: string, message: string, context?: object): void;
    /**
     * Used to assert that log messages appear in the order provided, irrespective
     * of any additional log messages that may appear in the future. e.g. if you
     * provide the expectation that messages A, B and C and meant to appear in the
     * logs, the tests will not fail if subsequent changes to the code mean that
     * A, B, D and C are logged. The tests *will* fail however if A, C and B are
     * logged.
     *
     * @param entries ILog[]
     * @param cleanLogs
     */
    assertInLogsInOrder(entries: ILog[], cleanLogs?: boolean): void;
    cleanLogs(): void;
    /**
     * Checks the current log entry with the current expected entry. The context
     * field is only checked if an expectation has been set.
     *
     * @param entry
     * @param entries
     * @param currentIndex
     */
    private messageIsTheSame;
    private contextIsDefinedAndMatches;
}
