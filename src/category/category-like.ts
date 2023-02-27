import {AttributeLike} from "../attribute/attribute-like";

/**
 * Category interface
 *
 * @todo there may be a necessity to create a class with implementing this interface
 * Note: So use effective memory, dont use solid class
 * */
export interface CategoryLike<A extends string | AttributeLike = string> {
    /**
     * Name or unique identifier of category
     * */
    name: string;

    /**
     * Array of attribute names that can be used in this category
     * */
    attributes: Array<A>;
}