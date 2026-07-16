import type { TPrettify } from "../../Shared/Global/Utils";
import type { TWithDevMethods, TWithModuleInfo } from "../../Shared/Global/Types";
import type { TWithLogger } from "../../Shared/Logger/Types";
import type { TRequestInfoExtractor } from "../../Shared/RequestInfoExtractor";
import type { TPhishingHttpClient } from "../HttpClients/Types";
import type { TPhishingGlobalOptions } from "../Global/Types";
import type { TUpstreamFetchCatcherBaseOptions, TUpstreamFetchCatcherOptions, TUpstreamFetchCatcherResult } from "../UpstreamApi/Types";
type TPhishingCatcherRequestInfo = {
    headers: Record<string, string>;
};
type TPhishingModuleApiFactoryOptions<RequestObject = never> = Partial<TWithModuleInfo> & {
    httpClient: TPhishingHttpClient;
    url?: string;
    skipInitCall?: boolean;
    catcherRequestInfoExtractor?: TRequestInfoExtractor<RequestObject, TPhishingCatcherRequestInfo>;
};
type TPhishingInitOptions = TWithLogger & {
    clientKey: string;
    url?: string;
    timeouts?: Partial<TPhishingGlobalOptions["timeouts"]>;
};
type TPhishingInit = (options: TPhishingInitOptions) => void;
type TPhishingFetchCatcher<RequestObject = never> = (options: TFetchCatcherOptions<RequestObject>) => Promise<TUpstreamFetchCatcherResult>;
type TFetchCatcherOptions<RequestObject = never> = TPrettify<[
    RequestObject
] extends [never] ? TUpstreamFetchCatcherOptions : ({
    request: RequestObject;
    headers?: never;
} & TUpstreamFetchCatcherBaseOptions) | ({
    request?: never;
} & TUpstreamFetchCatcherOptions)>;
type TPhishingModuleApi<RequestObject = never> = TWithDevMethods & {
    init: TPhishingInit;
    fetchCatcher: TPhishingFetchCatcher<RequestObject>;
};
export type { TPhishingModuleApiFactoryOptions, TPhishingModuleApi, TPhishingInit, TPhishingInitOptions, TPhishingFetchCatcher, TFetchCatcherOptions, TPhishingCatcherRequestInfo, };
