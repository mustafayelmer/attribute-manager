/**
 * Product interface
 *
 * @todo there may be a necessity to create a class with implementing this interface
 * Note: So use effective memory, dont use solid class
 *
 * Product behaves like Map so it is dynamic entity which can be managed by {@see AttributeLike}
 * */
export interface ProductLike {
    /**
     * Each product must have a category attribute
     *
     * @todo, we need to create cluster for different categories
     * */
    category: string;

    /**
     * Each product must have a price attribute
     * */
    price: number;

    /**
     * Product can have custom attributes
     * @see {@link AttributeLike}
     * */
    [attribute: string]: unknown;
}