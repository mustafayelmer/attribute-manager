export class ProductLoadException extends Error {
    constructor(reason: string, extended?: Record<string, unknown>) {
        super(`Product load error ==> ${JSON.stringify({reason, ...extended})}`);
    }
}