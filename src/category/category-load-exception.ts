/**
 * Category load exception
 *
 * @todo It will be nice to split up into more named exceptions for each reason (Error Driven)
 * */
export class CategoryLoadException extends Error {

    /**
     * Errors can be logged according to reason because it's effective key
     * */
    constructor(reason: string, extended?: Record<string, unknown>) {
        super(`Category load error ==> ${JSON.stringify({reason, ...extended})}`);
    }
}