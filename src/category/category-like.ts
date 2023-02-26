import {AttributeLike} from "../attribute/attribute-like";

export interface CategoryLike<A extends string | AttributeLike = string> {
    name: string;
    attributes: Array<A>;
}