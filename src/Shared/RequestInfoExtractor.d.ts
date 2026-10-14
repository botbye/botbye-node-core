import { type TWithLogger } from "./Global/Types";
type TRequestInfoExtractor<RequestObject, TResult> = (requestObject: RequestObject, global: TWithLogger) => TResult;
export type { TRequestInfoExtractor };
