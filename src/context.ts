import {AttributeLike} from "./attribute/attribute-like";
import {CategoryLike} from "./category/category-like";
import {RuleLike} from "./rule/rule-like";
import {ProductLike} from "./product/product-like";

export interface Context {
    attributes: Array<AttributeLike>;
    categories: Array<CategoryLike>;
    rules: Array<RuleLike>;
    products: Array<ProductLike>;

}