type TUpstreamSvgFetch = {
    format: "svg";
    innerPngUrl: string;
    skipExecution?: boolean;
};
type TUpstreamPngFetch = {
    format: "png";
};
type TUpstreamFetchCatcherBaseOptions = TUpstreamSvgFetch | TUpstreamPngFetch;
type TUpstreamFetchCatcherOptions = TUpstreamFetchCatcherBaseOptions & {
    headers: Record<string, string>;
};
type TUpstreamFetchCatcherResult = {
    status: number;
    headers: Record<string, string>;
    body: Uint8Array;
    error?: {
        message: string;
    };
};
export type { TUpstreamFetchCatcherBaseOptions, TUpstreamFetchCatcherOptions, TUpstreamFetchCatcherResult };
