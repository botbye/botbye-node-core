declare const UNKNOWN_ERROR = "unknown error";
declare const TIMEOUT_ERROR = "timeout";
declare const CONNECTION_ERROR = "connection error";
declare const JSON_ERROR = "invalid json response";
declare const SDK_ERROR = "SDK error";
declare const classifyRequestError: (e: unknown) => string;
export { UNKNOWN_ERROR, TIMEOUT_ERROR, CONNECTION_ERROR, JSON_ERROR, SDK_ERROR, classifyRequestError };
