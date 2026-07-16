import { type TWithPhishingGlobalOptions } from "../Global/Types";
declare const sendPhishingInitCall: ({ global }: TWithPhishingGlobalOptions) => {
    result: Promise<import("..").TPhishingHttpResponse>;
    abort: () => void;
};
export { sendPhishingInitCall, };
