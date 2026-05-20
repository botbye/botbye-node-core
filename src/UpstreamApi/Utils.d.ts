import { type TGlobalOptions } from "../Global/Types";
declare const getModuleHeaders: (options: TGlobalOptions) => {
    "Module-Name": string;
    "Module-Version": string;
};
export { getModuleHeaders, };
