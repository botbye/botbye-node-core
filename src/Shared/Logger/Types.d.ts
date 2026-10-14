declare const LOGGER_LEVELS: readonly ["error", "warn", "info", "debug", "log"];
type TLoggerLevel = (typeof LOGGER_LEVELS)[number];
type TLogCall = (...args: unknown[]) => void;
type TLogger = Record<TLoggerLevel, TLogCall>;
type TLoggerInitOptions = {
    logger?: TLogger;
    level: TLoggerLevel;
};
type TWithLogger = {
    logger: TLoggerInitOptions;
};
export { LOGGER_LEVELS, type TLoggerLevel, type TLogCall, type TLogger, type TLoggerInitOptions, type TWithLogger };
