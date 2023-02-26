import {Equation} from "./equation";
import {EquationMatcherLambda} from "./index-type";

export interface EquationService {
    get(equation: Equation): EquationMatcherLambda;
}