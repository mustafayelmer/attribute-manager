import {WrapType} from "../wrap/wrap-type";
import {DataType} from "../data-type/data-type";
import {ValidationType} from "../validation/validation-type";

export interface AttributeLike {
    /**
     * Name of attribute
     * */
    name: string;

    /**
     * Wrap type of attribute
     * PLAIN: string | number | boolean | ...
     * ARRAY: Array<string> | Array<number>, ...
     * MAP: Record<string, string> | Record<string, number>, ...
     * I18N: Record<Locale, string> | Record<Locale, number>, ...
     * */
    wrap: WrapType;

    /**
     * Data type of attribute
     * */
    type: DataType;

    /**
     * If attribute type is enum then
     * - keys of enumeration
     * */
    keys?: Array<string>;

    /**
     * Validations for this attribute
     * */
    validations?: Record<ValidationType, Array<unknown>>;
}