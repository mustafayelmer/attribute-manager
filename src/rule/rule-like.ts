import {ConditionLike} from "../condition/condition-like";
import {ProductLike} from "../product/product-like";

export interface RuleLike {
    /**
     * Is negative scored?
     * */
    isNegate: boolean;

    /**
    * Score of rule
    * */
    score: number;

    /**
     * Conditions of rule
     * */
    conditions: Array<ConditionLike>;

    /**
     * Lambda expression for corresponding rule
     * @runtime
     * */
    matches?(product: ProductLike): boolean;

    /**
     * Debug info
     * @runtime
     * */
    debugInfo?(): string;
}