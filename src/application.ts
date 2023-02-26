import clc from "cli-color";

import {Context} from "./context";
import {AttributeLoader} from "./attribute/attribute-loader";
import {CategoryLoader} from "./category/category-loader";
import {RuleLoader} from "./rule/rule-loader";
import {ProductLoader} from "./product/product-loader";
import {ProductProcessor} from "./product/product-processor";

export class Application {
    private static context: Context;

    private static load(): void {
        AttributeLoader.load(__dirname + '/assets/attributes.yaml', this.context);
        console.log(`${clc.yellow('Loader is starting')} ...`);
        console.log(`  - ${clc.green('Attributes')}: ${clc.red(this.context.attributes.length)} items`);

        CategoryLoader.load(__dirname + '/assets/categories.yaml', this.context);
        console.log(`  - ${clc.green('Categories')}: ${clc.red(this.context.categories.length)} items`);

        RuleLoader.load(__dirname + '/assets/rules.yaml', this.context);
        console.log(`  - ${clc.green('Rules')}     : ${clc.red(this.context.rules.length)} items`);

        ProductLoader.load(__dirname + '/assets/products.csv', this.context);
        console.log(`  - ${clc.green('Products')}  : ${clc.red(this.context.products.length)} items`);
        console.log(`${clc.yellow('Loader is finished')} .`);
        console.log('');
    }
    private static process(): void {
        console.log(`${clc.blue('Processor is starting')} ...`);
        const result = ProductProcessor.run(this.context);
        console.log(`  - ${clc.cyan('Total Price')}      : ${clc.magenta(result.totalPrice)} USD`);
        console.log(`  - ${clc.cyan('Average Price')}    : ${clc.magenta(result.averagePrice)} USD`);
        console.log(`  - ${clc.cyan('Selected Products')}: ${clc.magenta(result.selectedProducts)} items`);
        console.log(`${clc.blue('Processor is finished')} .`);
        console.log('');
    }
    static getContext(): Context {
        return this.context;
    }
    static clear(): void {
        this.context = {
            attributes: [],
            categories: [],
            rules: [],
            products: [],
        };
    }
    static start(): void {
        this.clear();
        this.load();
        this.process();
        if (!global.is_testing) {
            process.exit(0);
        }
    }
}