import {expect} from "chai";
import {ILog} from "../../src/Logger/ILog";
import {LogLevel} from "../../src/Logger/ILogger";
import Logger from "../../src/Logger/Logger";
import { buildTestConsole } from "./TestConsole";
import CompositeBufferingLogger from "../../src/Logger/CompositeBufferingLogger";

describe("CompositeBufferingLogger", () => {

    describe("Printing in the console", () => {

        it("Should print in the console", () => {
            const testConsole = buildTestConsole()
        
            const logger = new Logger(testConsole);

            const sut = new CompositeBufferingLogger(logger);

            sut.log(LogLevel.ALERT, "This is an alert", {
                foo: "bar",
            });

            expect(testConsole.cleanLogs()).to.deep.equal([
                {
                    method: "error",
                    message: "[alert] This is an alert",
                    optionalParams: [
                        [
                            {
                                foo: "bar"
                            }
                        ]
                    ]
                },
            ]);
        });
    });

    describe("cleanLogs", () => {

        it("Should return and clear all logs once cleanLogs has been invoked", () => {
            const testConsole = buildTestConsole()
        
            const logger = new Logger(testConsole);

            const sut = new CompositeBufferingLogger(logger);

            sut.log(LogLevel.ALERT, "This is an alert", {
                foo: "bar",
            });

            sut.log(LogLevel.DEBUG, "This is a debug", {
                debug: "message",
            });

            expect(sut.cleanLogs()).to.deep.equal([
                {
                    level: LogLevel.ALERT,
                    message: "This is an alert",
                    context: {
                        foo: "bar",
                    },
                } as ILog,
                {
                    level: LogLevel.DEBUG,
                    message: "This is a debug",
                    context: {
                        debug: "message",
                    },
                } as ILog,
            ]);

            expect(sut.cleanLogs()).to.deep.equal([]);
        });
    });
});
