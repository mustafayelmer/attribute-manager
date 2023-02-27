import {AttributeLike} from "./attribute/attribute-like";
import {CategoryLike} from "./category/category-like";
import {RuleLike} from "./rule/rule-like";
import {ProductLike} from "./product/product-like";

/**
 * Context interface
 * */
export interface Context {

    /**
     * Loaded attributes
     * */
    attributes: Array<AttributeLike>;

    /**
     * Loaded categories
     * */
    categories: Array<CategoryLike>;

    /**
     * Loaded rules
     * It use {@see attributes} and {@see categories} to verify records
     * */
    rules: Array<RuleLike>;

    /**
     * Loaded products
     * It use {@see attributes} and {@see categories} to verify records
     * */
    products: Array<ProductLike>;

}