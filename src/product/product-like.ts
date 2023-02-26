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
     * */
    [attribute: string]: unknown;
}