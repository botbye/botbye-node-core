declare const DEFAULT_PHISHING_ENDPOINT = "https://verify.botbye.com";
declare const PHISHING_REQUEST_TIMEOUT = 5000;
declare const phishingErrorStatus: (errorCode: string) => number;
export { DEFAULT_PHISHING_ENDPOINT, PHISHING_REQUEST_TIMEOUT, phishingErrorStatus, };
