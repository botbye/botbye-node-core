export type TBotByeResult = {
  isAllowed: boolean;
}

export type TBotByeError = {
  message: string,
}

export type TBotByeResponse = {
  reqId: string,
  result: TBotByeResult | null
  error: TBotByeError | null
}

export type THeaders = Record<string, string>;
export type TRequestInfo = {
  remote_addr: string;
  request_method: string;
  request_uri: string;
};

export type TValidateRequestOptions = {
  token: string;
  headers: THeaders;
  requestInfo: TRequestInfo;
  customFields?: Record<string, string>;
}

export type TBotByeInitOptions = {
  serverKey: string;
}

export function init(options: TBotByeInitOptions): typeof validateRequest;

export function validateRequest(options: TValidateRequestOptions): Promise<TBotByeResponse>;

export function initPackageInfo(packageInfo: {name: string, version: string}): void;