import 'mocha';
import AssertingLogger from "../../src/TestUtil/AssertingLogger";
import {LogLevel} from "../../src";
import {expect} from "chai";

describe("AssertingLogger", () => {
    it("should pass if the logs appear in the correct order", () => {
        const sut = new AssertingLogger();
        sut.info("First message");
        sut.info("Second message");
        sut.info("Third message");

        sut.assertInLogsInOrder([
            {level: LogLevel.INFO, message: "First message"},
            {level: LogLevel.INFO, message: "Third message"},
        ]);
    });

    it("should fail if the logs appear in the wrong order", () => {
        const sut = new AssertingLogger();
        sut.info("First message");
        sut.info("Second message");
        sut.info("Third message");

        expect(
            sut.assertInLogsInOrder.bind(sut, [
                {level: LogLevel.INFO, message: "First message"},
                {level: LogLevel.INFO, message: "Third message"},
                {level: LogLevel.INFO, message: "Second message"},
            ])
        ).to.throw(/were not found in/);
    });

    it('should pass if the context is supplied and matches', () => {
        const sut = new AssertingLogger();
        sut.info("First message", {'context': 'object'});

        sut.assertInLogsInOrder([
            {level: LogLevel.INFO, message: "First message", context: {'context': 'object'}},
        ]);
    });

    it('should fail if the context is supplied and does not match', () => {
        const sut = new AssertingLogger();
        sut.info("First message", {'context': 'object'});
        expect(
            sut.assertInLogsInOrder.bind(sut, [
                {level: LogLevel.INFO, message: "First message", context: {'no-context': 'object'}},
            ])
        ).to.throw(/no-context/);
    });
});
