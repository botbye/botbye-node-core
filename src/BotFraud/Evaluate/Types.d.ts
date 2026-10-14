import type { TEvent } from "../Event/Types";
declare const EVALUATE_DECISIONS: readonly ["ALLOW", "BLOCK", "CHALLENGE"];
type TDecision = (typeof EVALUATE_DECISIONS)[number];
type TCommonEvaluationResult = {
    decision: TDecision;
    botbye_result?: string;
};
type TSuccessfulEvaluationResult = TCommonEvaluationResult & {
    scores: Record<string, number>;
    request_id: string;
    signals: string[];
    risk_score: number;
    challenge?: {
        type: "CAPTCHA" | "MFA" | string;
    };
};
type TFailedEvaluationResult = TCommonEvaluationResult & {
    error: {
        message: string;
    };
};
type TEvaluationResult = TFailedEvaluationResult | TSuccessfulEvaluationResult;
type TEvaluate = (event: TEvent) => Promise<TEvaluationResult>;
export { EVALUATE_DECISIONS };
export type { TEvaluate, TDecision, TEvaluationResult, TCommonEvaluationResult, TSuccessfulEvaluationResult, TFailedEvaluationResult };
