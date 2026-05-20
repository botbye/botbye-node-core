import { type THttpClient } from "../HttpClients/Types";
import { type TLogger } from "../Logger/Types";
import { type TWithLogLevel } from "../Logger/Mixins";
type TGlobalOptions = {
    url: string;
    serverKey: string;
    module: {
        name: string;
        version: string;
    };
    httpClient: THttpClient;
    logger: TLogger & TWithLogLevel;
    timeouts?: {
        evaluate?: number;
    };
};
type TWithGlobalOptions = {
    global: TGlobalOptions;
};
export type { TGlobalOptions, TWithGlobalOptions, };
