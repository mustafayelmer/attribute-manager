import {Application} from "../application";
import {RuleLoader} from "./rule-loader";
import {RuleLoadException} from "./rule-load-exception";
import {AttributeLoader} from "../attribute/attribute-loader";
import {CategoryLoader} from "../category/category-loader";

describe('Rule', () => {
    beforeEach(() => {
        Application.clear();
        const context = Application.getContext();
        AttributeLoader.load(__dirname + '/../../data/attributes-valid.yaml', context);
        CategoryLoader.load(__dirname + '/../../data/categories-valid.yaml', context);
    });

    it('Should throw for not found file', () => {
        expect(() => RuleLoader.load(__dirname + '/../../data/rules-no-file', Application.getContext())).toThrow(RuleLoadException);
    });
    it('Should throw for invalid negate', () => {
        expect(() => RuleLoader.load(__dirname + '/../../data/rules-invalid-negate', Application.getContext())).toThrow(RuleLoadException);
    });
    it('Should throw for invalid score', () => {
        expect(() => RuleLoader.load(__dirname + '/../../data/rules-invalid-score', Application.getContext())).toThrow(RuleLoadException);
    });
    it('Should throw for invalid conditions', () => {
        expect(() => RuleLoader.load(__dirname + '/../../data/rules-invalid-conditions.yaml', Application.getContext())).toThrow(RuleLoadException);
    });
    it('Should throw for invalid condition field', () => {
        expect(() => RuleLoader.load(__dirname + '/../../data/rules-invalid-field', Application.getContext())).toThrow(RuleLoadException);
    });
    it('Should throw for invalid condition equation', () => {
        expect(() => RuleLoader.load(__dirname + '/../../data/rules-invalid-equation', Application.getContext())).toThrow(RuleLoadException);
    });
    it('Should not throw', () => {
        RuleLoader.load(__dirname + '/../../data/rules-valid.yaml', Application.getContext());
    });
});