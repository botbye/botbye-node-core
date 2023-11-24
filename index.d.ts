export type TBotByeResult = {
  isBot: boolean,
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
  remote_addr?: string;
  request_method?: string;
  request_uri?: string;
};

export function init(serverKey: string): typeof validateRequest;

export function validateRequest(token: string, headers: THeaders, requestInfo: TRequestInfo, customFields?: string[]): Promise<TBotByeResponse>;
