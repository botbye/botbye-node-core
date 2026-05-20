import { type TLogger, type TLoggerLevel } from "../Logger/Types";
import { type TInitOptions } from "./Types";
declare const isLoggerValid: (logger: unknown) => logger is TLogger;
declare const isTimeoutsValid: (timeouts: unknown) => timeouts is TInitOptions["timeouts"];
declare const isLoggerLevelValid: (level: unknown) => level is TLoggerLevel;
declare const assertInitOptions: (options: TInitOptions) => void;
export { assertInitOptions, isTimeoutsValid, isLoggerLevelValid, isLoggerValid, };
