import { type TGlobalOptions } from "../../Global/Types";
import { type TEventInfo, type TUpstreamEventInfo } from "../Types";
declare const FALLBACK_EVENT_EVENT_INFO: TUpstreamEventInfo;
declare const adaptEventInfo: (baseEventInfo: TEventInfo | unknown, global: TGlobalOptions) => TUpstreamEventInfo;
export { FALLBACK_EVENT_EVENT_INFO, adaptEventInfo };
