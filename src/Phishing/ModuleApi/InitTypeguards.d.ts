import { type TPhishingInitOptions } from "./Types";
declare const isTimeoutsValid: (timeouts: unknown) => timeouts is TPhishingInitOptions["timeouts"];
declare const assertInitOptions: (options: TPhishingInitOptions) => void;
export { isTimeoutsValid, assertInitOptions, };
