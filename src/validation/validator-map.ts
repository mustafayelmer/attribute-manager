import {DataType} from "../data-type/data-type";
import {ValidationType} from "./validation-type";
import {WrapType} from "../wrap/wrap-type";

export const validatorMap: Map<DataType, Array<ValidationType>> = new Map();

validatorMap.set(DataType.STRING, [ValidationType.REQUIRED, ValidationType.MIN_LENGTH, ValidationType.MAX_LENGTH]);
validatorMap.set(DataType.INTEGER, [ValidationType.REQUIRED, ValidationType.MIN, ValidationType.MAX]);
validatorMap.set(DataType.DOUBLE, [ValidationType.REQUIRED, ValidationType.MIN, ValidationType.MAX]);
validatorMap.set(DataType.BOOLEAN, [ValidationType.REQUIRED]);
validatorMap.set(DataType.ENUM, [ValidationType.REQUIRED]);

export const wrapMap: Map<WrapType, Array<ValidationType>> = new Map();
wrapMap.set(WrapType.PLAIN, [ValidationType.REQUIRED, ValidationType.DEFAULT]);
wrapMap.set(WrapType.ARRAY, [ValidationType.REQUIRED, ValidationType.DEFAULT, ValidationType.MIN_ITEMS, ValidationType.MAX_ITEMS, ValidationType.UNIQUE]);
wrapMap.set(WrapType.MAP, [ValidationType.REQUIRED, ValidationType.DEFAULT, ValidationType.MIN_ITEMS, ValidationType.MAX_ITEMS]);
wrapMap.set(WrapType.I18N, [ValidationType.REQUIRED, ValidationType.DEFAULT, ValidationType.MIN_ITEMS, ValidationType.MAX_ITEMS]);
