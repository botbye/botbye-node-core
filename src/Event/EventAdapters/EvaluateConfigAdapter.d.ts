import { type TGlobalOptions } from "../../Global/Types";
import type { TEvaluateConfig, TUpstreamEvaluateConfig } from "../Types";
declare const FALLBACK_EVENT_EVALUATE_CONFIG: TUpstreamEvaluateConfig;
declare const adaptEvaluateConfig: (baseConfig: TEvaluateConfig | unknown, global: TGlobalOptions) => TUpstreamEvaluateConfig;
export { FALLBACK_EVENT_EVALUATE_CONFIG, adaptEvaluateConfig };
