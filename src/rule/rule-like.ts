import {ConditionLike} from "../condition/condition-like";
import {ProductLike} from "../product/product-like";

/**
 * Rule interface
 *
 * @todo there may be a necessity to create a class with implementing this interface
 * Note: So use effective memory, dont use solid class
 * */
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