import fs from "fs";
import {parse} from 'csv-parse/sync';

import {ProductLike} from "./product-like";
import {CategoryLike} from "../category/category-like";
import {AttributeLike} from "../attribute/attribute-like";
import {Context} from "../context";
import {ProductLoadException} from "./product-load-exception";
import {DataType} from "../data-type/data-type";
import {WrapType} from "../wrap/wrap-type";

/**
 * Handles loading of rules
 * */
export class ProductLoader {

    /**
     * Finds category with given category name (value)
     *
     * - Index is used for error logs
     * - cache is used to speed up
     */
    private static findCategory(value: string, index: number, context: Context, cache: Record<string, CategoryLike>): CategoryLike {
        let found = cache[value];
        if (found === undefined) {
            found = context.categories.find(c => c.name === value);
            if (!found) {
                throw new ProductLoadException('invalid-category', {index, category: value});
            }
            cache[value] = found;
        }
        return found;
    }

    /**
     * Finds an attribute and cast property value of product according to this attribute
     * */
    private static castAttribute(product: ProductLike, key: string, index: number, context: Context, cache: Record<string, AttributeLike>): void {
        let found = cache[key];
        if (found === undefined) {
            found = context.attributes.find(c => c.name === key);
            if (!found) {
                throw new ProductLoadException('invalid-attribute', {index, key, attribute: product[key]});
            }
            cache[key] = found;
        }
        const typeOf = typeof product[key];
        switch (found.wrap) {
            case WrapType.PLAIN:
                switch (found.type) {
                    case DataType.STRING:
                        if (!['string', 'undefined'].includes(typeOf)) {
                            switch (typeOf) {
                                case "number":
                                    product[key] = (product[key] as number).toString(10);
                                    break;
                                case "boolean":
                                    product[key] = product[key] ? 'true' : 'false';
                                    break;
                                default:
                                    throw new ProductLoadException('invalid-data-type', {index, key, expected: 'string', actual: typeOf});
                            }
                        }
                        break;
                    case DataType.DOUBLE:
                        if (!['number', 'undefined'].includes(typeOf)) {
                            switch (typeOf) {
                                case "string":
                                    try {
                                        product[key] = parseFloat(product[key] as string);
                                    } catch (e) {
                                        throw new ProductLoadException('invalid-data-type', {index, key, expected: 'double', actual: typeOf, cause: e});
                                    }
                                    break;
                                case "boolean":
                                    product[key] = product[key] ? 1 : 0;
                                    break;
                                default:
                                    throw new ProductLoadException('invalid-data-type', {index, key, expected: 'double', actual: typeOf});
                            }
                        }
                        break;
                    case DataType.INTEGER:
                        if (typeOf !== 'undefined') {
                            switch (typeOf) {
                                case "number":
                                    if (!Number.isInteger(product[key])) {
                                        product[key] = Math.floor(product[key] as number);
                                    }
                                    break;
                                case "string":
                                    try {
                                        product[key] = parseInt(product[key] as string);
                                    } catch (e) {
                                        throw new ProductLoadException('invalid-data-type', {index, key, expected: 'integer', actual: typeOf, cause: e});
                                    }
                                    break;
                                case "boolean":
                                    product[key] = product[key] ? 1 : 0;
                                    break;
                                default:
                                    throw new ProductLoadException('invalid-data-type', {index, key, expected: 'integer', actual: typeOf});
                            }
                        }
                        break;
                    case DataType.BOOLEAN:
                        if (!['boolean', 'undefined'].includes(typeOf)) {
                            switch (typeOf) {
                                case "number":
                                    if (product[key] === 0) {
                                        product[key] = false;
                                    }
                                    else if (product[key] === 1) {
                                        product[key] = true;
                                    }
                                    else {
                                        throw new ProductLoadException('invalid-data-type', {index, key, expected: 'boolean', actual: typeOf});
                                    }
                                    break;
                                case "string":
                                    if (['true', 'on', 'ok', 'yes', '1'].includes((product[key] as string).toLowerCase())) {
                                        product[key] = true;
                                    }
                                    else if (['false', 'off', 'no', 'none', '0'].includes((product[key] as string).toLowerCase())) {
                                        product[key] = false;
                                    }
                                    else {
                                        throw new ProductLoadException('invalid-data-type', {index, key, expected: 'boolean', actual: typeOf});
                                    }
                                    break;
                                default:
                                    throw new ProductLoadException('invalid-data-type', {index, key, expected: 'boolean', actual: typeOf});
                            }
                        }
                        break;
                    case DataType.ENUM:
                        if (!['boolean', 'undefined'].includes(typeOf)) {
                            switch (typeOf) {
                                case "number":
                                    product[key] = (product[key] as number).toString(10);
                                    if (!found.keys.includes(product[key] as string)) {
                                        throw new ProductLoadException('invalid-enum-key', {index, key, expected: 'enum', actual: typeOf});
                                    }
                                    break;
                                case "string":
                                    product[key] = (product[key] as string).toLowerCase()
                                    if (!found.keys.includes(product[key] as string)) {
                                        throw new ProductLoadException('invalid-enum-key', {index, key, expected: 'enum', actual: typeOf});
                                    }
                                    break;
                                default:
                                    throw new ProductLoadException('invalid-data-type', {index, key, expected: 'boolean', actual: typeOf});
                            }
                        }
                        break;
                }
                break;
            case WrapType.ARRAY:
                // todo
                break;
            case WrapType.I18N:
                // todo
                break
            case WrapType.MAP:
                // todo
                break;
        }
    }

    /**
     * Loads a file and casts/validates values
     * */
    static load(path: string, context: Context): void {
        if (!fs.existsSync(path)) {
            throw new ProductLoadException('file-not-found', {path});
        }
        const content = fs.readFileSync(path, 'utf8');
        const categoryRec: Record<string, CategoryLike> = {};
        const attributesRec: Record<string, AttributeLike> = {};
        context.products = parse(content, {columns: true}) as Array<ProductLike>;
        if (!Array.isArray(context.products) || !context.products.length) {
            throw new ProductLoadException('invalid-array', {type: typeof context.products, length: context.products?.length});
        }
        context.products.forEach((product, index) => {
            if (!product) {
                throw new ProductLoadException('empty-line', {index});
            }
            const keys = Object.keys(product);
            if (keys.length < 1) {
                throw new ProductLoadException('empty-line', {index});
            }
            if (typeof product.category !== 'string' || product.category.trim() === '') {
                throw new ProductLoadException('empty-category', {index});
            }
            const category = this.findCategory(product.category, index, context, categoryRec);
            keys.forEach(key => {
                if (!category.attributes.includes(key)) {
                    delete product[key];
                }
                if (key !== 'category') {
                    this.castAttribute(product, key, index, context, attributesRec);
                }
            });
        });

        // clear cached/temporary data
        Object.keys(categoryRec).forEach(key => {
            delete categoryRec[key];
        });
        Object.keys(attributesRec).forEach(key => {
            delete attributesRec[key];
        });
    }
}