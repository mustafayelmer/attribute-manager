import {Equation} from "../equation/equation";
import {EquationMatcherLambda} from "../equation/index-type";

export interface ConditionLike {
    /**
     * Field in the condition
     * */
    field: string;
    /**
     * Equation in the condition
     * */
    equation: Equation;

    /**
     * value in the condition
     * */
    value?: unknown; // it can be absent for is-null and not-null cases

    /**
     * Lambda expression/function
     * @runtime
     * */
    lambda?: EquationMatcherLambda;
}