import { type TExplicitAny } from "../../Shared/Global/Utils";
type THttpClientCallInit = {
    method: string;
    headers: Record<string, string>;
    body: TExplicitAny;
    keepalive?: boolean;
};
type THttpClientCallResult = {
    result: Promise<string>;
    abort: () => void;
};
type THttpClientCall = (url: string, init: THttpClientCallInit) => THttpClientCallResult;
type THttpClient = {
    type: string;
    call: THttpClientCall;
};
export type { THttpClient, THttpClientCallInit, THttpClientCallResult };
