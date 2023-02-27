import {EquationService} from "./equation-service";
import {Equation} from "./equation";
import {EquationMatcherLambda} from "./index-type";

/**
 * Equation service implementation
 * */
class EquationServiceImpl implements EquationService {
    /**
     * Runtime expression map to speed up
     * */
    private lambdaMap: Map<Equation, EquationMatcherLambda>;

    /**
     * Static "equality" expression which can be pushed into rule lambda expressions
     * */
    private static equals<T>(actual: T, conditionValue: T): boolean {
        return actual === conditionValue;
    }

    /**
     * Static "not equality" expression which can be pushed into rule lambda expressions
     * */
    private static notEquals<T>(actual: T, conditionValue: T): boolean {
        return actual !== conditionValue;
    }

    /**
     * Static "greater than" expression which can be pushed into rule lambda expressions
     * */
    private static greaterThan<T>(actual: T, conditionValue: T): boolean {
        return actual > conditionValue;
    }

    /**
     * Static "greater than or equal to" expression which can be pushed into rule lambda expressions
     * */
    private static greaterThanOrEqualTo<T>(actual: T, conditionValue: T): boolean {
        return actual >= conditionValue;
    }

    /**
     * Static "less than" expression which can be pushed into rule lambda expressions
     * */
    private static lessThan<T>(actual: T, conditionValue: T): boolean {
        return actual < conditionValue;
    }

    /**
     * Static "less than or equal to" expression which can be pushed into rule lambda expressions
     * */
    private static lessThanOrEqualTo<T>(actual: T, conditionValue: T): boolean {
        return actual <= conditionValue;
    }

    /**
     * Static "includes" expression which can be pushed into rule lambda expressions
     *
     * - Notes: type of actual value and type of array item must be same
     * */
    private static includes<T>(actual: T, conditionValue: Array<T>): boolean {
        return conditionValue && Array.isArray(conditionValue) && conditionValue.includes(actual);
    }

    /**
     * Static "not includes" expression which can be pushed into rule lambda expressions
     *
     * - Notes: type of actual value and type of array item must be same
     * */
    private static notIncludes<T>(actual: T, conditionValue: Array<T>): boolean {
        return !conditionValue || !Array.isArray(conditionValue) || !conditionValue.includes(actual);
    }

    /**
     * Builds lambda map for each expression
     * */
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

    /**
     * @inheritDoc
     * @override
     * */
    get(equation: Equation): EquationMatcherLambda {
        if (this.lambdaMap.has(equation)) {
            return this.lambdaMap.get(equation);
        }
        throw new Error(`Not found lambda for equation: ${equation}`);
    }
}
export const equationService: EquationService = new EquationServiceImpl();