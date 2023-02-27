/**
 * Equation or operation enumeration
 * */
export enum Equation {

    /**
     * Equals to
     * - Alternative: "=="
     * */
    EQUALS = 'EQUALS',

    /**
     * Not Equal to
     * - Alternative: "<>" or "!="
     * */
    NOT_EQUAL = 'NOT_EQUAL',

    /**
     * Greater than
     * - Alternative: ">"
     * */
    GT = 'GT',

    /**
     * Greater than or equal to
     * - Alternative: ">="
     * */
    GTE = 'GTE',

    /**
     * Less than
     * - Alternative: "<"
     * */
    LT = 'LT',

    /**
     * Less than or equal to
     * - Alternative: ">="
     * */
    LTE = 'LTE',

    /**
     * Includes or in values
     *
     * @todo implement for scalar or array values
     * */
    IN = 'IN',

    /**
     * Not include or not in values
     *
     * @todo implement for scalar or array values
     * */
    NOT_IN = 'NOT_IN',
}