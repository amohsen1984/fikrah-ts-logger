import { expect } from "chai";
import { LogLevel } from "../../src";
import Logger from "../../src/Logger/Logger";
import { buildTestConsole, ILog, ITestConsole } from "./TestConsole";
import LogLevelWeights from "../../src/Logger/LogLevelWeights";

let testConsole: ITestConsole;
let minLevel: LogLevel;
const logs: any = {
    emergency: {
        level: LogLevel.EMERGENCY,
        method: "error",
        weighting: 600,
    },
    alert: {
        level: LogLevel.ALERT,
        method: "error",
        weighting: 550,
    },
    critical: {
        level: LogLevel.CRITICAL,
        method: "error",
        weighting: 500,
    },
    error: {
        level: LogLevel.ERROR,
        method: "error",
        weighting: 400,
    },
    warning: {
        level: LogLevel.WARNING,
        method: "warn",
        weighting: 300,
    },
};

const debugLogs: any = {
    notice: {
        level: LogLevel.NOTICE,
        method: "info",
        weighting: 250,
    },
    info: {
        level: LogLevel.INFO,
        method: "info",
        weighting: 200,
    },
    debug: {
        level: LogLevel.DEBUG,
        method: "debug",
        weighting: 100,
    },
};

const allLogs: any = {
    ...logs,
    ...debugLogs,
};

describe("Logger", () => {
    beforeEach(() => {
        testConsole = buildTestConsole();
        minLevel = LogLevel.WARNING;
    });

    afterEach(() => testConsole.cleanLogs());

    describe("log", () => {
        Object.keys(logs).forEach((logLevel: string) => {
            const expectation = logs[logLevel];
            const expectedLevel: LogLevel = expectation.level;
            const expectedMethod: string = expectation.method;

            it(`Should log a ${expectedLevel} as a console.${expectedMethod}`, () => {
                (buildSut() as any)[logLevel](`This is a ${logLevel} log.`, {
                    an_int: 123,
                    a_string: "test",
                    the_level: logLevel,
                });

                expect(testConsole.cleanLogs()).to.deep.equal([
                    {
                        method: expectedMethod,
                        message: `[${logLevel}] This is a ${logLevel} log.`,
                        optionalParams: [
                            [
                                {
                                    an_int: 123,
                                    a_string: "test",
                                    the_level: logLevel,
                                },
                            ],
                        ],
                    } as ILog,
                ]);
            });
        });

        Object.keys(debugLogs).forEach((logLevel: string) => {
            const expectation = debugLogs[logLevel];
            const expectedLevel: LogLevel = expectation.level;
            const expectedMethod: string = expectation.method;

            it(`Should not log a ${expectedLevel} as a console.${expectedMethod}`, () => {
                (buildSut() as any)[logLevel](`This is a ${logLevel} log.`, {
                    an_int: 123,
                    a_string: "test",
                    the_level: logLevel,
                });

                expect(testConsole.cleanLogs()).to.deep.equal([]);
            });
        });

        Object.keys(allLogs).forEach((logLevel: string) => {
            const expectation = allLogs[logLevel];
            const expectedWeighting: number = expectation.weighting;

            it(`Should a ${logLevel} when the minimum weighting is set to ${expectedWeighting} or higher`, () => {
                Object.keys(LogLevelWeights).forEach((minLogLevel: string) => {
                    const shouldLog = expectedWeighting >= LogLevelWeights[minLogLevel as LogLevel];
                    minLevel = minLogLevel as LogLevel;

                    (buildSut() as any)[logLevel](`This is a ${logLevel} log.`, {
                        an_int: 123,
                        a_string: "test",
                        the_level: logLevel,
                    });

                    expect(testConsole.cleanLogs()).to.be.length(shouldLog ? 1 : 0);
                });
            });
        });

        it("Should log an arbitrary level as a console.log", () => {
            buildSut().log("other", "This is a log.", {
                an_int: 123,
                a_string: "test",
                the_level: "other",
            });

            expect(testConsole.cleanLogs()).to.deep.equal([
                {
                    method: "log",
                    message: "[other] This is a log.",
                    optionalParams: [
                        [
                            {
                                an_int: 123,
                                a_string: "test",
                                the_level: "other",
                            },
                        ],
                    ],
                } as ILog,
            ]);
        });

        it("Should not log the context if it is not provided", () => {
            buildSut().log("other", "This is a log.");

            expect(testConsole.cleanLogs()).to.deep.equal([
                {
                    method: "log",
                    message: "[other] This is a log.",
                    optionalParams: [[]],
                } as ILog,
            ]);
        });

        it("Should be able to log a context that contains circular references", () => {
            const obj: any = {name: "Should contain a circular reference"};
            obj.self = obj;
            buildSut().log("other", "Log that contains a circular reference in context", obj);

            expect(testConsole.cleanLogs()).to.deep.equal([
                {
                    method: "log",
                    message: "[other] Log that contains a circular reference in context",
                    optionalParams: [
                        [
                            {
                                name: "Should contain a circular reference",
                                self: {
                                    name: "Should contain a circular reference",
                                    self: "[Circular ~.self]",
                                },
                            },
                        ]
                    ],
                } as ILog,
            ]);
        });
    });

    describe("setDefaultContext", () => {
        it("Should log the default context if one is set", () => {
            minLevel = LogLevel.DEBUG;

            const sut = buildSut();
            sut.setDefaultContext({
                default: "context",
                with_numbers: 123.45,
            });

            Object.values(allLogs).forEach((log: any) => {
                const logLevel = log.level;
                sut.log(logLevel, "Testing the logger");

                expect(testConsole.cleanLogs()).to.deep.equal([
                    {
                        method: log.method,
                        message: `[${logLevel}] Testing the logger`,
                        optionalParams: [
                            [
                                {
                                    default: "context",
                                    with_numbers: 123.45,
                                },
                            ]
                        ],
                    }
                ]);
            });
        });

        it("Should log a combination of the given context and the default context if one is set", () => {
            minLevel = LogLevel.DEBUG;

            const sut = buildSut();
            sut.setDefaultContext({
                default: "context",
                with_numbers: 123.45,
                overriding_value: null,
            });

            Object.values(allLogs).forEach((log: any) => {
                const logLevel = log.level;
                sut.log(logLevel, "Testing the logger", {
                    given: "context",
                    with_boolean: true,
                    overriding_value: "I should be overridden",
                });

                expect(testConsole.cleanLogs()).to.deep.equal([
                    {
                        method: log.method,
                        message: `[${logLevel}] Testing the logger`,
                        optionalParams: [
                            [
                                {
                                    default: "context",
                                    with_numbers: 123.45,
                                    given: "context",
                                    with_boolean: true,
                                    overriding_value: "I should be overridden",
                                },
                            ]
                        ],
                    }
                ]);
            });
        });

        it("Should not log the default context if not set", () => {
            minLevel = LogLevel.DEBUG;

            const sut = buildSut();
            sut.setDefaultContext(undefined);

            Object.values(allLogs).forEach((log: any) => {
                const logLevel = log.level;
                sut.log(logLevel, "Testing the logger");

                expect(testConsole.cleanLogs()).to.deep.equal([
                    {
                        method: log.method,
                        message: `[${logLevel}] Testing the logger`,
                        optionalParams: [
                            [],
                        ],
                    }
                ]);
            });
        });
    });
});

function buildSut(): Logger {
    return new Logger(
        testConsole,
        minLevel,
    );
}
