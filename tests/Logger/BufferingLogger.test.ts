import BufferingLogger from "../../src/Logger/BufferingLogger";
import {expect} from "chai";
import {ILog} from "../../src/Logger/ILog";
import {LogLevel} from "../../src/Logger/ILogger";
import Logger from "../../src/Logger/Logger";

describe("BufferingLogger", () => {
    describe("cleanLogs", () => {
        it("Should return all logs", () => {
            const sut = new BufferingLogger();

            sut.log(LogLevel.ALERT, "This is an alert", {
                foo: "bar",
            });

            sut.log(LogLevel.DEBUG, "This is a debug", {
                debug: "message",
            });

            const logs = sut.cleanLogs();

            expect(logs).to.deep.equal([
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
        });

        it("Should clear all logs once cleanLogs has been invoked", () => {
            const sut = new BufferingLogger();

            sut.log(LogLevel.ALERT, "This is an alert", {
                foo: "bar",
            });

            sut.cleanLogs();

            expect(sut.cleanLogs()).to.deep.equal([]);
        });
    });
});
