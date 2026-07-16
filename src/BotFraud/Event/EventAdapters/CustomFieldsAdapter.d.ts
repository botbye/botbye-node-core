import { type TGlobalOptions } from "../../Global/Types";
import type { TUpstreamCustomFields } from "../Types";
declare const adaptCustomFields: (baseCustomFields: TUpstreamCustomFields | unknown, _global: TGlobalOptions) => TUpstreamCustomFields;
export { adaptCustomFields };
