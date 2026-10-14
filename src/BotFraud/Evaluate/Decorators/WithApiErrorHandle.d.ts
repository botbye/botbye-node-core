import { type THttpClientCallResult } from "../../HttpClients/Types";
import { type TGlobalOptions } from "../../Global/Types";
import { type TEvaluationResult } from "../Types";
declare const withApiErrorHandle: (factory: () => THttpClientCallResult, _global: TGlobalOptions) => Promise<TEvaluationResult>;
export { withApiErrorHandle };
