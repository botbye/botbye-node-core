import { type TModuleApiFactoryOptions, type TModuleApi } from "./Types";
declare const moduleApiFactory: <RequestObject = never>(options: TModuleApiFactoryOptions<RequestObject>) => TModuleApi<RequestObject>;
export { moduleApiFactory };
