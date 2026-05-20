import { type TGlobalOptions } from "../Global/Types";
import { type TEvent, type TUpstreamEvent } from "./Types";
declare const adaptEvent: (baseEvent: TEvent, global: TGlobalOptions) => TUpstreamEvent;
export { adaptEvent };
