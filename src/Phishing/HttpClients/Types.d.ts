import type { TExplicitAny } from "../../Shared/Global/Utils";
type TPhishingHttpResponse = {
    status: number;
    headers: Record<string, string>;
    body: Uint8Array;
};
type TPhishingHttpRequestInit = {
    method: string;
    headers: Record<string, string>;
    body?: TExplicitAny;
};
type TPhishingHttpClientCallResult = {
    result: Promise<TPhishingHttpResponse>;
    abort: () => void;
};
type TPhishingHttpClient = {
    type: string;
    call(url: string, init: TPhishingHttpRequestInit): TPhishingHttpClientCallResult;
};
export type { TPhishingHttpResponse, TPhishingHttpRequestInit, TPhishingHttpClientCallResult, TPhishingHttpClient };
