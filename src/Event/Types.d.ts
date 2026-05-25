import { type TNullable } from "../Global/Utils";
type TUpstreamRequestInfo = {
    ip: string;
    headers: Record<string, string>;
    token?: string;
    request_method?: string;
    request_uri?: string;
};
declare const EVENT_INFO_EVENT_STATUSES: readonly ["SUCCESSFUL", "FAILED", "ATTEMPTED", "UNKNOWN"];
type TUpstreamEventStatus = (typeof EVENT_INFO_EVENT_STATUSES)[number];
type TUpstreamEventInfo = {
    type: string;
    status: TUpstreamEventStatus;
};
type TUpstreamUserInfo = {
    account_id: string;
    username?: string;
    email?: string;
    phone?: string;
};
type TUpstreamCustomFields = Record<string, string>;
declare const EVENT_VALIDATION_TYPE: readonly ["validate", "risk", "full"];
type TUpstreamEventValidationType = (typeof EVENT_VALIDATION_TYPE)[number];
type TUpstreamBaseEvent = {
    type: TUpstreamEventValidationType;
};
interface IUpstreamFullEvent extends TUpstreamBaseEvent {
    type: "full";
    request: TUpstreamRequestInfo;
    event: TUpstreamEventInfo;
    user: TUpstreamUserInfo;
    custom_fields?: TUpstreamCustomFields;
}
interface IUpstreamRiskScoringEvent extends TUpstreamBaseEvent {
    type: "risk";
    request: TUpstreamRequestInfo;
    event: TUpstreamEventInfo;
    user: TUpstreamUserInfo;
    custom_fields?: TUpstreamCustomFields;
    botbye_result?: string;
}
interface IUpstreamValidationEvent extends TUpstreamBaseEvent {
    type: "validate";
    request: TUpstreamRequestInfo;
    custom_fields?: TUpstreamCustomFields;
}
type TUpstreamEvent = IUpstreamFullEvent | IUpstreamRiskScoringEvent | IUpstreamValidationEvent;
type TRequestInfo = {
    ip: string;
    headers: Record<string, string>;
    token?: TNullable<string>;
    requestMethod?: TNullable<string>;
    requestUri?: TNullable<string>;
};
type TRiskRequestInfo = Omit<TRequestInfo, "headers"> & {
    headers?: TRequestInfo["headers"];
};
type TEventInfo = {
    type: string;
    status: TUpstreamEventStatus;
};
type TUserInfo = {
    accountId: string;
    username?: TNullable<string>;
    email?: TNullable<string>;
    phone?: TNullable<string>;
};
type TExtendedRequest<RequestObject> = {
    request: RequestObject;
    token?: TNullable<string>;
};
type TRequestOrExtended<R> = TRequestInfo | TExtendedRequest<R>;
interface IFullEvent<Request = TRequestInfo> {
    type: "full";
    request: Request;
    event: TEventInfo;
    user: TUserInfo;
    customFields?: TUpstreamCustomFields;
}
interface IRiskScoringEvent<Request = TRiskRequestInfo> {
    type: "risk";
    request: Request;
    event: TEventInfo;
    user: TUserInfo;
    customFields?: TUpstreamCustomFields;
    botbyeResult?: string;
}
interface IValidationEvent<Request = TRequestInfo> {
    type: "validate";
    request: Request;
    customFields?: TUpstreamCustomFields;
}
type TRiskRequest<T> = T extends TRequestInfo ? TRiskRequestInfo : T;
type TEvent<Request = TRequestInfo> = IFullEvent<Request> | IRiskScoringEvent<TRiskRequest<Request>> | IValidationEvent<Request>;
export { EVENT_VALIDATION_TYPE, EVENT_INFO_EVENT_STATUSES, type TUpstreamEventValidationType, type TUpstreamRequestInfo, type TUpstreamEventStatus, type TUpstreamEventInfo, type TUpstreamUserInfo, type TUpstreamCustomFields, type IUpstreamFullEvent, type IUpstreamRiskScoringEvent, type IUpstreamValidationEvent, type TUpstreamEvent, type TUpstreamBaseEvent, type TRequestInfo, type TRiskRequestInfo, type TEventInfo, type TUserInfo, type TExtendedRequest, type TRequestOrExtended, type IFullEvent, type IRiskScoringEvent, type IValidationEvent, type TEvent, };
