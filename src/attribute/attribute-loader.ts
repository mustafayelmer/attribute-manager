import fs from "fs";
import * as yaml from "js-yaml";

import {AttributeLike} from "./attribute-like";
import {AttributeLoadException} from "./attribute-load-exception";
import {DataType} from "../data-type/data-type";
import {Context} from "../context";

export class AttributeLoader {
    static load(path: string, context: Context): void {
        if (!fs.existsSync(path)) {
            throw new AttributeLoadException('file-not-found', {path});
        }
        context.attributes = yaml.load(fs.readFileSync(path, 'utf8')) as Array<AttributeLike>;
        if (!Array.isArray(context.attributes) || !context.attributes.length) {
            throw new AttributeLoadException('invalid-array', {type: typeof context.attributes, length: context.attributes?.length});
        }
        if (!context.attributes.every(attribute => typeof attribute?.name === 'string')) {
            throw new AttributeLoadException('invalid-name', {names: context.attributes.map(c => c.name)});
        }
        const types = Object.values(DataType);
        if (!context.attributes.every(attribute => typeof attribute?.type === 'string' && types.includes(attribute.type))) {
            throw new AttributeLoadException('invalid-type', {types: context.attributes.map(c => c.type)});
        }
        context.attributes.forEach((attribute, index) => {
            if (attribute.type !== DataType.ENUM) {
                return true;
            }
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
        })
    }
}