import {Equation} from "./equation";
import {EquationMatcherLambda} from "./index-type";

/**
 * Equation service interface
 * */
export interface EquationService {

    /**
     * Returns corresponding lambda expression by equation
     * */
    get(equation: Equation): EquationMatcherLambda;
}