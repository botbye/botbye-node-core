import { type TLogger, type TLoggerLevel } from "../Logger/Types";
import { type TWithLogLevel } from "../Logger/Mixins";
type TWithModuleInfo = {
    module: {
        name: string;
        version: string;
    };
};
type TWithLogger = {
    logger: TLogger & TWithLogLevel;
};
type TWithDevMethods = {
    dev: {
        setLoggerLevel(level: TLoggerLevel): void;
        sendInitCall(): void;
        getLogger(): TLogger;
    };
};
export type { TWithModuleInfo, TWithLogger, TWithDevMethods, };
