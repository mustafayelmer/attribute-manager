import {Context} from "../context";
import {ProductProcessorResponse} from "./index-type";
import {ProductScoreLike} from "./product-score-like";

export class ProductProcessor {
    static readonly CUT_OFF = 0.5;
    static run(context: Context): ProductProcessorResponse {
        const rules = context.rules;
        const result = {
            totalPrice: 0,
            selectedProducts: 0,
            averagePrice: 0,
        } as ProductProcessorResponse;
        context.products.forEach(product => {
            const productScore = {...product, score: 0, passedCount: 0} as ProductScoreLike;
            let totalScore = 0;
            rules.forEach((rule, ruleIndex) => {
                totalScore += rule.score;
                if (rule.matches(product)) {
                    // console.log(`Matched: ${product['code']} x ${ruleIndex} // ${rule.debugInfo()}`)
                    productScore.score += rule.score;
                    productScore.passedCount++;
                }
            });
            if (productScore.score >= this.CUT_OFF * totalScore) {
                result.totalPrice += product.price;
                result.selectedProducts++;
            }
        });
        if (result.selectedProducts > 0) {
            result.averagePrice = result.totalPrice / result.selectedProducts;
        }
        return result;
    }
}