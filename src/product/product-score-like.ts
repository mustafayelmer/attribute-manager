import {ProductLike} from "./product-like";

export interface ProductScoreLike extends ProductLike {
    /**
     * Score of product
     *
     * @runtime
     * */
    score: number;
    /**
     * Passed rule count
     *
     * @runtime
     * */
    passedCount: number;
}