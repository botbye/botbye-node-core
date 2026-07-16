import { type TWithModuleInfo, type TWithLogger } from "../../Shared/Global/Types";
import { type THttpClient } from "../HttpClients/Types";
type TGlobalOptions = TWithModuleInfo & TWithLogger & {
    url: string;
    serverKey: string;
    httpClient: THttpClient;
    timeouts?: {
        evaluate?: number;
    };
};
type TWithGlobalOptions = {
    global: TGlobalOptions;
};
export type { TGlobalOptions, TWithGlobalOptions, };
