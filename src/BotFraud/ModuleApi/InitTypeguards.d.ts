import { type TInitOptions } from "./Types";
declare const isTimeoutsValid: (timeouts: unknown) => timeouts is TInitOptions["timeouts"];
declare const assertInitOptions: (options: TInitOptions) => void;
export { assertInitOptions, isTimeoutsValid };
