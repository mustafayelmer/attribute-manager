import * as yaml from "js-yaml";
import * as fs from "fs";

import {CategoryLike} from "./category-like";
import {CategoryLoadException} from "./category-load-exception";
import {Context} from "../context";

export class CategoryLoader {
    static load(path: string, context: Context): void {
        if (!fs.existsSync(path)) {
            throw new CategoryLoadException('file-not-found', {path});
        }
        context.categories = yaml.load(fs.readFileSync(path, 'utf8')) as Array<CategoryLike>;
        if (!Array.isArray(context.categories) || !context.categories.length) {
            throw new CategoryLoadException('invalid-array', {type: typeof context.categories, length: context.categories?.length});
        }
        if (!context.categories.every(category => typeof category?.name === 'string')) {
            throw new CategoryLoadException('invalid-name', {names: context.categories.map(c => c.name)});
        }
        if (!context.categories.every(category => {
            if (!Array.isArray(category?.attributes) || category.attributes.length < 1) {
                return false;
            }
            return category.attributes.every(attribute => typeof attribute === 'string');
        })) {
            throw new CategoryLoadException('invalid-name', {names: context.categories.map(c => c.name)});
        }
    }
}