import { type TGlobalOptions } from "../../Global/Types";
import { type THttpClientCallResult } from "../Types";
declare const httpClientCallWithTimeout: (callResult: THttpClientCallResult, global: TGlobalOptions, timeoutMs?: number, meta?: {
    name: string;
}) => THttpClientCallResult;
export { httpClientCallWithTimeout, };
