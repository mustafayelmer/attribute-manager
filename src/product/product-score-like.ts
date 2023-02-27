import {ProductLike} from "./product-like";

/**
 * Product with score DTO
 *
 * - It will be used when printing of selected products are needed
 * */
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