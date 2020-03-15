import { fail } from "assert";
import assert = require("assert");
import AbstractLogger from "../Logger/AbstractLogger";
import { ILog } from "../Logger/ILog";

export default class AssertingLogger extends AbstractLogger {
    private logs: ILog[] = [];

    public log(level: string, message: string, context?: object): void {
        this.logs.push({
            level,
            message,
            context,
        } as ILog);
    }

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
    public assertInLogsInOrder(
        entries: ILog[],
        cleanLogs: boolean = true,
    ): void {
        let currentIndex = 0;
        for (const entry of this.logs) {
            if (
                this.messageIsTheSame(entry, entries, currentIndex) &&
                currentIndex < entries.length
            ) {
                ++currentIndex;
            }
            if (currentIndex === entries.length) {
                break;
            }
        }

        if (currentIndex < entries.length) {
            fail(
                `${JSON.stringify(entries)} were not found in ${JSON.stringify(
                    this.logs,
                )}`,
            );
        }

        if (cleanLogs) {
            this.cleanLogs();
        }
    }

    public cleanLogs(): void {
        this.logs = [];
    }

    /**
     * Checks the current log entry with the current expected entry. The context
     * field is only checked if an expectation has been set.
     *
     * @param entry
     * @param entries
     * @param currentIndex
     */
    private messageIsTheSame(
        entry: ILog,
        entries: ILog[],
        currentIndex: number,
    ): boolean {
        return (
            entry.level === entries[currentIndex].level &&
            entry.message === entries[currentIndex].message &&
            this.contextIsDefinedAndMatches(entries, entry, currentIndex)
        );
    }

    private contextIsDefinedAndMatches(
        entries: ILog[],
        entry: ILog,
        currentIndex: number,
    ) {
        if (entries[currentIndex].context === undefined) {
            return true;
        }

        assert.deepStrictEqual(entry.context, entries[currentIndex].context);

        return true;
    }
}
