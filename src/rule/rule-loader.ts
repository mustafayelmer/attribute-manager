import fs from "fs";
import * as yaml from "js-yaml";

import {RuleLike} from "./rule-like";
import {RuleLoadException} from "./rule-load-exception";
import {Equation} from "../equation/equation";
import {Context} from "../context";
import {equationService} from "../equation/equation-service-impl";
import {ProductLike} from "../product/product-like";

export class RuleLoader {
    static load(path: string, context: Context): void {
        if (!fs.existsSync(path)) {
            throw new RuleLoadException('file-not-found', {path});
        }
        context.rules = yaml.load(fs.readFileSync(path, 'utf8')) as Array<RuleLike>;
        if (!Array.isArray(context.rules) || !context.rules.length) {
            throw new RuleLoadException('invalid-array', {type: typeof context.rules, length: context.rules?.length});
        }
        const equations = Object.values(Equation);
        const fields = context.attributes.map(attribute => attribute.name);
        context.rules.forEach((rule, index) => {
            if (!rule || Object.keys(rule).length < 1) {
                throw new RuleLoadException('invalid-rule', {index, typeOf: typeof rule});
            }
            if (typeof rule.isNegate !== 'boolean') {
                throw new RuleLoadException('invalid-negate', {index, typeOf: typeof rule.isNegate});
            }
            if (typeof rule.score !== 'number') {
                throw new RuleLoadException('invalid-score', {index, typeOf: typeof rule.score});
            }
            if (!Array.isArray(rule?.conditions) || rule.conditions.length < 1) {
                throw new RuleLoadException('invalid-conditions', {index, typeOf: typeof rule.conditions, length: rule.conditions?.length});
            }
            rule.conditions.forEach((condition, index2) => {
                if (!condition || Object.keys(condition).length < 1) {
                    throw new RuleLoadException('invalid-condition', {index, index2, typeOf: typeof condition});
                }
                if (typeof condition.field !== 'string') {
                    throw new RuleLoadException('invalid-field', {index, index2, typeOf: typeof condition.field});
                }
                if (!fields.includes(condition.field)) {
                    throw new RuleLoadException('not-found-field', {index, index2, field: condition.field});
                }
                if (typeof condition.equation !== 'string') {
                    throw new RuleLoadException('invalid-equation', {index, index2, typeOf: typeof condition.equation});
                }
                condition.equation = condition.equation.toUpperCase() as Equation;
                if (!equations.includes(condition.equation)) {
                    switch (condition.equation as string) {
                        case '==':
                            condition.equation = Equation.EQUALS;
                            break;
                        case '!=':
                        case '<>':
                            condition.equation = Equation.NOT_EQUAL;
                            break;
                        case '<':
                            condition.equation = Equation.LT;
                            break;
                        case '<=':
                            condition.equation = Equation.LTE;
                            break;
                        case '>':
                            condition.equation = Equation.GT;
                            break;
                        case '>=':
                            condition.equation = Equation.GTE;
                            break;
                        default:
                            throw new RuleLoadException('not-found-equation', {index, index2, equation: condition.equation});
                    }
                }
                condition.lambda = equationService.get(condition.equation);
            });
            rule.debugInfo = (): string => {
                return rule.conditions.map(c => `(${c.field} ${c.equation} ${c.value})`).join(' && ');
            }
            rule.matches = (product: ProductLike): boolean => {
                if (rule.conditions.length < 1) {
                    return true;
                }
                return rule.conditions.every(condition => condition.lambda(product[condition.field], condition.value));
            }
        });
    }
}