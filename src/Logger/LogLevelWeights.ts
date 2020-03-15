import { LogLevel } from "../index";

type LogLevelWeight = { [L in LogLevel]: number };

const LogLevelWeights: LogLevelWeight = {
    emergency: 600,
    alert: 550,
    critical: 500,
    error: 400,
    warning: 300,
    notice: 250,
    info: 200,
    debug: 100,
};

export default LogLevelWeights;
