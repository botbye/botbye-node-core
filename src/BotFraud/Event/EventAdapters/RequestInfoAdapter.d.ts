import { type TGlobalOptions } from "../../Global/Types";
import type { TRequestInfo, TUpstreamRequestInfo } from "../Types";
declare const FALLBACK_EVENT_REQUEST_INFO: TUpstreamRequestInfo;
declare const adaptRequestInfoWithRequiredHeaders: (baseRequestInfo: TRequestInfo | unknown, global: TGlobalOptions) => TUpstreamRequestInfo;
declare const adaptRequestInfoWithOptionalHeaders: (baseRequestInfo: TRequestInfo | unknown, global: TGlobalOptions) => TUpstreamRequestInfo;
export { FALLBACK_EVENT_REQUEST_INFO, adaptRequestInfoWithRequiredHeaders, adaptRequestInfoWithOptionalHeaders };
