import {Application} from "../application";
import {CategoryLoader} from "./category-loader";
import {CategoryLoadException} from "./category-load-exception";

describe('Category', () => {
    beforeEach(() => {
        Application.clear();
    });

    it('Should throw for not found file', () => {
        expect(() => CategoryLoader.load(__dirname + '/../../data/categories-no-file', Application.getContext())).toThrow(CategoryLoadException);
    });
    it('Should throw for invalid name', () => {
        expect(() => CategoryLoader.load(__dirname + '/../../data/categories-invalid-name', Application.getContext())).toThrow(CategoryLoadException);
    });
    it('Should throw for invalid attributes', () => {
        expect(() => CategoryLoader.load(__dirname + '/../../data/categories-invalid-attributes.yaml', Application.getContext())).toThrow(CategoryLoadException);
    });
    it('Should not throw', () => {
        CategoryLoader.load(__dirname + '/../../data/categories-valid.yaml', Application.getContext());
    });
});