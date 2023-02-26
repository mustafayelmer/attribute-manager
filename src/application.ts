import clc from "cli-color";

import {Context} from "./context";
import {AttributeLoader} from "./attribute/attribute-loader";
import {CategoryLoader} from "./category/category-loader";
import {RuleLoader} from "./rule/rule-loader";
import {ProductLoader} from "./product/product-loader";
import {ProductProcessor} from "./product/product-processor";

export class Application {
    private static started: boolean;
    private static context: Context;

    private static load(): void {
        this.context = {
            attributes: [],
            categories: [],
            rules: [],
            products: [],
        };
        AttributeLoader.load(__dirname + '/assets/attributes.yaml', this.context);
        console.log(`${clc.bgYellow('Loaders is starting')} ...`);
        console.log(`   > ${clc.green('Attributes')} are loaded: ${clc.red(this.context.attributes.length)} items`);

        CategoryLoader.load(__dirname + '/assets/categories.yaml', this.context);
        console.log(`   > ${clc.green('Categories')} are loaded: ${clc.red(this.context.categories.length)} items`);

        RuleLoader.load(__dirname + '/assets/rules.yaml', this.context);
        console.log(`   > ${clc.green('Rules')} are loaded: ${clc.red(this.context.rules.length)} items`);

        ProductLoader.load(__dirname + '/assets/products.csv', this.context);
        console.log(`   > ${clc.green('Products')} are loaded: ${clc.red(this.context.products.length)} items`);
        console.log(`${clc.yellow('Loaders is finished')} .`);

    }

    static start(): void {
        if (this.started) {
            throw new Error('Already started');
        }
        this.started = true;
        this.load();

        const result = ProductProcessor.run(this.context);
        console.log(`${clc.yellow('Result')} .`, result);
    }
}
Application.start();
process.exit(0);