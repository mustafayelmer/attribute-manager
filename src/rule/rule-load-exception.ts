export class RuleLoadException extends Error {
    constructor(reason: string, extended?: Record<string, unknown>) {
        super(`Rule load error ==> ${JSON.stringify({reason, ...extended})}`);
    }
}