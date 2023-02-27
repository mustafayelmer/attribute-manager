import {Context} from "../context";
import {ProductProcessorResponse} from "./index-type";
import {ProductScoreLike} from "./product-score-like";

export class ProductProcessor {
    /**
     * Cut-Of (Threshold) for scores
     *
     * @todo It will be in property/environment file
     * */
    static readonly CUT_OFF = 0.5;

    /**
     * Executes processor with given context
     * - Returns response model
     * */
    static run(context: Context): ProductProcessorResponse {
        const rules = context.rules;

        // Initialize response
        const result = {
            totalPrice: 0,
            selectedProducts: 0,
            averagePrice: 0,
        } as ProductProcessorResponse;

        // For each product
        context.products.forEach(product => {
            const productScore = {...product, score: 0, passedCount: 0} as ProductScoreLike;
            let totalScore = 0;

            // For each rules in each product
            rules.forEach((rule, ruleIndex) => {
                totalScore += rule.score;

                // Rule matches product (All conditions should match)
                if (rule.matches(product)) {
                    // console.log(`Matched: ${product['code']} x ${ruleIndex} // ${rule.debugInfo()}`)
                    productScore.score += rule.score;
                    productScore.passedCount++;
                }
            });

            // Product is selected (score sufficiently highly)
            if (productScore.score >= this.CUT_OFF * totalScore) {
                result.totalPrice += product.price;
                result.selectedProducts++;
            }
        });

        // Handle zero division case, yes it's possible
        if (result.selectedProducts > 0) {
            result.averagePrice = result.totalPrice / result.selectedProducts;
        }
        return result;
    }
}