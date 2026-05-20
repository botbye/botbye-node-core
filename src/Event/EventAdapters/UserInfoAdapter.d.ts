import { type TGlobalOptions } from "../../Global/Types";
import type { TUpstreamUserInfo, TUserInfo } from "../Types";
declare const FALLBACK_EVENT_USER_INFO: TUpstreamUserInfo;
declare const adaptUserInfo: (baseUserInfo: TUserInfo | unknown, global: TGlobalOptions) => TUpstreamUserInfo;
export { FALLBACK_EVENT_USER_INFO, adaptUserInfo };
