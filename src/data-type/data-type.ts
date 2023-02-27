/**
 * Scalar data type enumeration
 * */
export enum DataType {
    /**
     * Scalar string value
     * */
    STRING = 'STRING',

    /**
     * Scalar integer value
     * */
    INTEGER = 'INTEGER',


    /**
     * Scalar double value
     * */
    DOUBLE = 'DOUBLE',


    /**
     * Scalar boolean value
     * */
    BOOLEAN = 'BOOLEAN',

    /**
     * Scalar string or number value
     *
     * - It should be validated with {@link AttributeLike#keys}
     * */
    ENUM = 'ENUM',
}