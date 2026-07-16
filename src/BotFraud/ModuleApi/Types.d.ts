import type { TNullable, TPrettify } from "../../Shared/Global/Utils";
import { type TWithLogger } from "../../Shared/Logger/Types";
import { type TWithDevMethods } from "../../Shared/Global/Types";
import { type TRequestInfoExtractor } from "../../Shared/RequestInfoExtractor";
import { type TGlobalOptions } from "../Global/Types";
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
    requestInfoExtractor?: TRequestInfoExtractor<RequestObject, TRequestInfo>;
};
type TInitOptions = Partial<TWithLogger> & {
    serverKey: string;
    url?: TNullable<string>;
    timeouts?: TGlobalOptions["timeouts"];
};
type TModuleApi<RequestObject = never> = TWithDevMethods & {
    init(options: TInitOptions): void;
    evaluate: RequestObject extends never ? TEvaluate : (event: TEventWithRequest<RequestObject>) => Promise<TEvaluationResult>;
};
export type { TModuleApi, TModuleApiFactoryOptions, TInitOptions, TEventWithRequest, };
