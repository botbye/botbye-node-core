import { type TEvent, type TRequestInfo, type TRequestOrExtended } from "../../Event/Types";
import { type TGlobalOptions } from "../../Global/Types";
import { type TEvaluate } from "../Types";
type TExtractor<RequestObject> = (requestObject: RequestObject, global: TGlobalOptions) => TRequestInfo;
declare const evaluateWithExtractorFactory: <RequestObject>(extractor: TExtractor<RequestObject>, baseEvaluate: TEvaluate, global: TGlobalOptions) => (event: TEvent<TRequestOrExtended<RequestObject>>) => Promise<import("../Types").TEvaluationResult>;
export { evaluateWithExtractorFactory };
