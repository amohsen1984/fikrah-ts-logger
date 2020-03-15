export interface ILog {
    method: string;
    message?: any;
    optionalParams: any[];
}

export interface ITestConsole extends Console {
    cleanLogs(): ILog[];
}

export function buildTestConsole(): ITestConsole {
    let memory: ILog[] = [];
    const memoryPushFn = (method: string, message?: any, ...optionalParams: any[]) => {
        memory.push({
            method,
            message,
            optionalParams: optionalParams.map((args: any[]): any => {
                return args.map((arg: any) => {
                    if ("string" === typeof arg) {
                        arg = JSON.parse(arg);
                    }

                    return arg;
                });
            }),
        } as ILog);
    };

    return {
        cleanLogs: (): ILog[] => {
            const logs = memory;
            memory = [];

            return logs;
        },
        debug: (message?: any, ...optionalParams: any[]) => memoryPushFn("debug", message , optionalParams),
        error: (message?: any, ...optionalParams: any[]) => memoryPushFn("error", message , optionalParams),
        info: (message?: any, ...optionalParams: any[]) => memoryPushFn("info", message , optionalParams),
        log: (message?: any, ...optionalParams: any[]) => memoryPushFn("log", message , optionalParams),
        warn: (message?: any, ...optionalParams: any[]) => memoryPushFn("warn", message , optionalParams),
    } as ITestConsole;
}
