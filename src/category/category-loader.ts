import * as yaml from "js-yaml";
import * as fs from "fs";

import {CategoryLike} from "./category-like";
import {Context} from "../context";
import {CategoryLoadException} from "./category-load-exception";

export class CategoryLoader {

    /**
     * Loads a file and casts/validates values
     * */
    static load(path: string, context: Context): void {
        if (!fs.existsSync(path)) {
            throw new CategoryLoadException('file-not-found', {path});
        }
        context.categories = yaml.load(fs.readFileSync(path, 'utf8')) as Array<CategoryLike>;
        if (!Array.isArray(context.categories) || !context.categories.length) {
            throw new CategoryLoadException('invalid-array', {type: typeof context.categories, length: context.categories?.length});
        }
        context.categories.forEach((category, index) => {
            if (!category || Object.keys(category).length < 1) {
                throw new CategoryLoadException('empty-line', {index});
            }
            if (typeof category?.name !== 'string' || category.name.trim() === '') {
                throw new CategoryLoadException('invalid-name', {index, name: category.name});
            }
            if (!category.attributes || category.attributes.length < 1) {
                throw new CategoryLoadException('empty-attribute', {index, attributes: category.attributes});
            }
            category.attributes.forEach((attribute, attributeIndex) => {
                if (typeof attribute !== 'string') {
                    throw new CategoryLoadException('empty-attribute', {index, attributeIndex, attribute: attribute});
                }
            });
        });
    }
}