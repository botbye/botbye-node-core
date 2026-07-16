import { type TPhishingModuleApi, type TPhishingModuleApiFactoryOptions } from "./Types";
declare const phishingModuleApiFactory: <RequestObject = never>(options: TPhishingModuleApiFactoryOptions<RequestObject>) => TPhishingModuleApi<RequestObject>;
export { phishingModuleApiFactory, };
