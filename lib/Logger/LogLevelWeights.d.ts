import { LogLevel } from "../index";
declare type LogLevelWeight = {
    [L in LogLevel]: number;
};
declare const LogLevelWeights: LogLevelWeight;
export default LogLevelWeights;
