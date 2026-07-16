import { type TLogger, type TLoggerLevel } from "./Types";
type TWithLogLevel = {
    setLevel: (level: TLoggerLevel) => void;
    level: TLoggerLevel;
};
declare const DEFAULT_LOG_LEVEL: TLoggerLevel;
declare const decorateLogger: (logger: TLogger) => TLogger & TWithLogLevel;
declare const redeclareLogger: <T extends TLogger>(newLogger: unknown, defaultLogger: T) => T | (TLogger & TWithLogLevel);
declare const isLoggerLevelValid: (level: unknown) => level is TLoggerLevel;
export type { TWithLogLevel, };
export { decorateLogger, redeclareLogger, isLoggerLevelValid, DEFAULT_LOG_LEVEL, };
