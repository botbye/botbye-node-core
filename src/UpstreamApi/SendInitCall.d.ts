import { type TGlobalOptions } from "../Global/Types";
import { type THttpClientCallResult } from "../HttpClients/Types";
type TSendInitCallOptions = {
    global: TGlobalOptions;
};
declare const sendInitCall: ({ global }: TSendInitCallOptions) => THttpClientCallResult;
export { sendInitCall, };
