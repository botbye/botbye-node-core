import { type TLogger, type TLoggerLevel } from "./Types";
type TWithLogLevel = {
    setLevel: (level: TLoggerLevel) => void;
    level: TLoggerLevel;
};
declare const withSafeMixins: <T extends TLogger>(logger: T) => TLogger;
declare const withPackageName: <T extends TLogger>(logger: T) => TLogger;
declare const withLogLevel: <T extends TLogger>(logger: T) => T & TWithLogLevel;
declare const withTryCatch: <T extends TLogger>(logger: T) => T;
export type { TWithLogLevel, };
export { withLogLevel, withTryCatch, withSafeMixins, withPackageName, };
