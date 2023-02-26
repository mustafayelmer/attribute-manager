export class CategoryLoadException extends Error {
    constructor(reason: string, extended?: Record<string, unknown>) {
        super(`Category load error ==> ${JSON.stringify({reason, ...extended})}`);
    }
}