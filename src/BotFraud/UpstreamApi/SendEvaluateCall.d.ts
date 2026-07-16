import { type TUpstreamEvent } from "../Event/Types";
import { type TWithGlobalOptions } from "../Global/Types";
type TSendEvaluateCall = {
    event: TUpstreamEvent;
} & TWithGlobalOptions;
declare const sendEvaluateCall: ({ global, event }: TSendEvaluateCall) => import("../HttpClients/Types").THttpClientCallResult;
export { sendEvaluateCall, };
