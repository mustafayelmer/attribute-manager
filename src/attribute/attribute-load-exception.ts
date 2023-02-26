export class AttributeLoadException extends Error {
    constructor(reason: string, extended?: Record<string, unknown>) {
        super(`Attribute load error ==> ${JSON.stringify({reason, ...extended})}`);
    }
}