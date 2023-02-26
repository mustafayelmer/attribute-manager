import {EquationService} from "./equation-service";
import {Equation} from "./equation";
import {EquationMatcherLambda} from "./index-type";

class EquationServiceImpl implements EquationService {
    private lambdaMap: Map<Equation, EquationMatcherLambda>;

    private static equals<T>(actual: T, conditionValue: T): boolean {
        return actual === conditionValue;
    }
    private static notEquals<T>(actual: T, conditionValue: T): boolean {
        return actual !== conditionValue;
    }
    private static greaterThan<T>(actual: T, conditionValue: T): boolean {
        return actual > conditionValue;
    }
    private static greaterThanOrEqualTo<T>(actual: T, conditionValue: T): boolean {
        return actual >= conditionValue;
    }
    private static lessThan<T>(actual: T, conditionValue: T): boolean {
        return actual < conditionValue;
    }
    private static lessThanOrEqualTo<T>(actual: T, conditionValue: T): boolean {
        return actual <= conditionValue;
    }
    private static includes<T>(actual: T, conditionValue: Array<T>): boolean {
        return conditionValue && Array.isArray(conditionValue) && conditionValue.includes(actual);
    }
    private static notIncludes<T>(actual: T, conditionValue: Array<T>): boolean {
        return !conditionValue || !Array.isArray(conditionValue) || !conditionValue.includes(actual);
    }
    constructor() {
        this.lambdaMap = new Map();
        this.lambdaMap.set(Equation.EQUALS, EquationServiceImpl.equals);
        this.lambdaMap.set(Equation.NOT_EQUAL, EquationServiceImpl.notEquals);
        this.lambdaMap.set(Equation.GT, EquationServiceImpl.greaterThan);
        this.lambdaMap.set(Equation.GTE, EquationServiceImpl.greaterThanOrEqualTo);
        this.lambdaMap.set(Equation.LT, EquationServiceImpl.lessThan);
        this.lambdaMap.set(Equation.LTE, EquationServiceImpl.lessThanOrEqualTo);
        this.lambdaMap.set(Equation.IN, EquationServiceImpl.includes);
        this.lambdaMap.set(Equation.NOT_IN, EquationServiceImpl.notIncludes);
    }
    get(equation: Equation): EquationMatcherLambda {
        if (this.lambdaMap.has(equation)) {
            return this.lambdaMap.get(equation);
        }
        throw new Error(`Not found lambda for equation: ${equation}`);
    }
}
export const equationService: EquationService = new EquationServiceImpl();