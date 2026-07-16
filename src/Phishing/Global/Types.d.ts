import { type TWithModuleInfo, type TWithLogger } from "../../Shared/Global/Types";
import { type TPhishingHttpClient } from "../HttpClients/Types";
type TPhishingGlobalOptions = TWithModuleInfo & TWithLogger & {
    url: string;
    clientKey: string;
    httpClient: TPhishingHttpClient;
    timeouts?: {
        fetchCatcher?: number;
    };
};
type TWithPhishingGlobalOptions = {
    global: TPhishingGlobalOptions;
};
export type { TPhishingGlobalOptions, TWithPhishingGlobalOptions, };
