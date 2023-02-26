/**
 * Validation types for attributes
 * */
export enum ValidationType {
    /**
     * It validates null or undefined case
     *
     * @validator
     * */
    REQUIRED = 'required',

    /**
     * It can be used as default value
     *
     * @sanitizer
     * */
    DEFAULT = 'default',

    /**
     * Min value for numeric attributes
     *
     * @validator
     * */
    MIN = 'min',

    /**
     * Max value for numeric attributes
     *
     * @validator
     * */
    MAX = 'max',

    /**
     * Min text length for string attributes
     *
     * @validator
     * */
    MIN_LENGTH = 'minLength',

    /**
     * Max text length for string attributes
     *
     * @validator
     * */
    MAX_LENGTH = 'maxLength',

    /**
     * Min item size for array, map and I18n attributes
     *
     * @validator
     * */
    MIN_ITEMS = 'minItems',

    /**
     * Max item size for array, map and I18n attributes
     *
     * @validator
     * */
    MAX_ITEMS = 'maxItems',

    /**
     * Uniqueness validator for array attributes
     *
     * @validator
     * */
    UNIQUE = 'unique',
}