import type { TNullable, TPrettify } from "../Global/Utils";
import type { TLogger, TLoggerInitOptions, TLoggerLevel } from "../Logger/Types";
import type { TGlobalOptions } from "../Global/Types";
import type { TEvaluate, TEvaluationResult } from "../Evaluate/Types";
import { type THttpClient } from "../HttpClients/Types";
import { type TEvent, type TRequestInfo, type TRequestOrExtended } from "../Event/Types";
type TEventWithRequest<RequestObject> = TPrettify<TEvent<TRequestOrExtended<RequestObject>>>;
type TModuleApiFactoryOptions<RequestObject = never> = {
    httpClient: THttpClient;
    module?: {
        name: string;
        version: string;
    };
    url?: string;
    skipInitCall?: boolean;
    requestInfoExtractor?: (requestObject: RequestObject, global: TGlobalOptions) => TRequestInfo;
};
type TInitOptions = {
    serverKey: string;
    url?: TNullable<string>;
    logger?: TLoggerInitOptions;
    timeouts?: TGlobalOptions["timeouts"];
};
type TModuleApi<RequestObject = never> = {
    init(options: TInitOptions): void;
    evaluate: RequestObject extends never ? TEvaluate : (event: TEventWithRequest<RequestObject>) => Promise<TEvaluationResult>;
    dev: {
        setLoggerLevel(level: TLoggerLevel): void;
        sendInitCall(): void;
        getLogger(): TLogger;
    };
};
export type { TModuleApi, TModuleApiFactoryOptions, TInitOptions, TEventWithRequest, };
