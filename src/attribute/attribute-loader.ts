import fs from "fs";
import * as yaml from "js-yaml";

import {AttributeLike} from "./attribute-like";
import {Context} from "../context";
import {AttributeLoadException} from "./attribute-load-exception";
import {DataType} from "../data-type/data-type";
import {WrapType} from "../wrap/wrap-type";

/**
 * Handles loading of attributes
 * */
export class AttributeLoader {

    /**
     * Loads a file and casts/validates values
     * */
    static load(path: string, context: Context): void {
        if (!fs.existsSync(path)) {
            throw new AttributeLoadException('file-not-found', {path});
        }
        context.attributes = yaml.load(fs.readFileSync(path, 'utf8')) as Array<AttributeLike>;
        if (!Array.isArray(context.attributes) || !context.attributes.length) {
            throw new AttributeLoadException('invalid-array', {type: typeof context.attributes, length: context.attributes?.length});
        }
        const types = Object.values(DataType);
        const wraps = Object.values(WrapType);

        context.attributes.forEach((attribute, index) => {
            if (!attribute || Object.keys(attribute).length < 1) {
                throw new AttributeLoadException('empty-line', {index});
            }
            if (typeof attribute?.name !== 'string' || attribute.name.trim() === '') {
                throw new AttributeLoadException('invalid-name', {index, name: attribute.name});
            }
            if (typeof attribute?.type !== 'string' || !types.includes(attribute.type)) {
                throw new AttributeLoadException('invalid-type', {index, type: attribute.type});
            }
            if (typeof attribute?.wrap !== 'string' || !wraps.includes(attribute.wrap)) {
                throw new AttributeLoadException('invalid-wrap', {index, wrap: attribute.wrap});
            }
            if (attribute.type === DataType.ENUM) {
                if (!Array.isArray(attribute.keys) || attribute.keys.length < 1) {
                    throw new AttributeLoadException('invalid-keys', {index, keys: attribute.keys});
                }
                attribute.keys.forEach((key, i2) => {
                    switch (typeof key) {
                        case "string":
                            attribute.keys[i2] = attribute.keys[i2].toLowerCase();
                            break;
                        case "number":
                            attribute.keys[i2] = (attribute.keys[i2] as unknown as number).toString(10);
                            break;
                        default:
                            throw new AttributeLoadException('invalid-keys', {index, i2, keys: attribute.keys});
                    }
                });
            }
        })
    }
}