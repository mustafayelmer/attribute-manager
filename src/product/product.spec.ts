import {Application} from "../application";
import {ProductLoadException} from "./product-load-exception";
import {ProductLoader} from "./product-loader";
import {AttributeLoader} from "../attribute/attribute-loader";
import {CategoryLoader} from "../category/category-loader";
import {deepEqual} from "assert";
import {ProductProcessor} from "./product-processor";
import {RuleLoader} from "../rule/rule-loader";

describe('Product', () => {
    beforeEach(() => {
        Application.clear();
        const context = Application.getContext();
        AttributeLoader.load(__dirname + '/../../data/attributes-valid.yaml', context);
        CategoryLoader.load(__dirname + '/../../data/categories-valid.yaml', context);

    });

    it('Should throw for not found file', () => {
        expect(() => ProductLoader.load(__dirname + '/../../data/products-no-file.csv', Application.getContext())).toThrow(ProductLoadException);
    });
    it('Should throw for invalid name', () => {
        expect(() => ProductLoader.load(__dirname + '/../../data/products-no-line.csv', Application.getContext())).toThrow(ProductLoadException);
    });
    it('Should throw for invalid attributes', () => {
        expect(() => ProductLoader.load(__dirname + '/../../data/products-invalid-category.csv', Application.getContext())).toThrow(ProductLoadException);
    });
    it('Should not throw', () => {
        ProductLoader.load(__dirname + '/../../data/products-valid.csv', Application.getContext());
    });

    it('Should process with 1 rule', () => {
        const context = Application.getContext();
        RuleLoader.load(__dirname + '/../../data/rules-valid-1.yaml', context);
        ProductLoader.load(__dirname + '/../../data/products-valid.csv', context);
        deepEqual(ProductProcessor.run(context), {totalPrice: 80, averagePrice: 80, selectedProducts: 1});
    });

    it('Should process with 2 rules', () => {
        const context = Application.getContext();
        RuleLoader.load(__dirname + '/../../data/rules-valid-2.yaml', context);
        ProductLoader.load(__dirname + '/../../data/products-valid.csv', context);
        // SKU07065,NewBalance,shoe,Navy,81,USD,860,TRUE,"S,M,L"
        // SKU07733,NewBalance,shoe,Red,64,USD,0,FALSE,"S,M,L"
        // SKU07602,NewBalance,shoe,Blue,92,USD,596,TRUE,"M,L,XL"

        deepEqual(ProductProcessor.run(context), {totalPrice: 237, averagePrice: 79, selectedProducts: 3});
    });

});