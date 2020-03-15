"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("assert");
const assert = require("assert");
const AbstractLogger_1 = require("../Logger/AbstractLogger");
class AssertingLogger extends AbstractLogger_1.default {
    constructor() {
        super(...arguments);
        this.logs = [];
    }
    log(level, message, context) {
        this.logs.push({
            level,
            message,
            context,
        });
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
    assertInLogsInOrder(entries, cleanLogs = true) {
        let currentIndex = 0;
        for (const entry of this.logs) {
            if (this.messageIsTheSame(entry, entries, currentIndex) &&
                currentIndex < entries.length) {
                ++currentIndex;
            }
            if (currentIndex === entries.length) {
                break;
            }
        }
        if (currentIndex < entries.length) {
            assert_1.fail(`${JSON.stringify(entries)} were not found in ${JSON.stringify(this.logs)}`);
        }
        if (cleanLogs) {
            this.cleanLogs();
        }
    }
    cleanLogs() {
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
    messageIsTheSame(entry, entries, currentIndex) {
        return (entry.level === entries[currentIndex].level &&
            entry.message === entries[currentIndex].message &&
            this.contextIsDefinedAndMatches(entries, entry, currentIndex));
    }
    contextIsDefinedAndMatches(entries, entry, currentIndex) {
        if (entries[currentIndex].context === undefined) {
            return true;
        }
        assert.deepStrictEqual(entry.context, entries[currentIndex].context);
        return true;
    }
}
exports.default = AssertingLogger;
