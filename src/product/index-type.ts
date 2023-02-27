/**
 * Response DTO for processor
 * */
export interface ProductProcessorResponse {
    /**
     * Total price for all the products that score sufficiently highly.
     * */
    totalPrice: number

    /**
     * Average price for all the products that score sufficiently highly.
     * */
    averagePrice: number;

    /**
     * Number of the products that score sufficiently highly.
     * */
    selectedProducts: number;

}