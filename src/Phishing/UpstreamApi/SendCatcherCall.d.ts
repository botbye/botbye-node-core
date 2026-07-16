import { type TPhishingGlobalOptions } from "../Global/Types";
import { type TUpstreamFetchCatcherOptions, type TUpstreamFetchCatcherResult } from "./Types";
declare const sendPhishingCatcherCall: (global: TPhishingGlobalOptions, options: TUpstreamFetchCatcherOptions) => Promise<TUpstreamFetchCatcherResult>;
export { sendPhishingCatcherCall, };
