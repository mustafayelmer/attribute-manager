import {Context} from "../context";
import {ProductProcessorResponse} from "./index-type";

export class ProductProcessor {
    static readonly CUT_OFF = 0.5;
    static run(context: Context): ProductProcessorResponse {
        const rules = context.rules;
        const cutOffLength = rules.length * this.CUT_OFF;
        const result = {
            totalPrice: 0,
            selectedProducts: 0,
            averagePrice: 0,
        } as ProductProcessorResponse;
        context.products.forEach(product => {
            let matchCount = 0.0;
            let productScore = 0.0;
            rules.forEach((rule, ruleIndex) => {
                productScore += (!rule.isNegate) ? rule.score : -1 * rule.score;
                if (rule.matches(product)) {
                    console.log(`Matched: ${product['code']} x ${ruleIndex} // ${rule.debugInfo()}`)
                    matchCount++;
                }
            });
            if (matchCount >= cutOffLength) {
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