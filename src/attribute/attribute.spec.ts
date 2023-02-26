import {Application} from "../application";
import {AttributeLoader} from "./attribute-loader";
import {AttributeLoadException} from "./attribute-load-exception";

describe('Attribute', () => {
    beforeEach(() => {
        Application.clear();
    });

    it('Should throw for not found file', () => {
        expect(() => AttributeLoader.load(__dirname + '/../../data/attributes-no-file', Application.getContext())).toThrow(AttributeLoadException);
    });
    it('Should throw for invalid name', () => {
        expect(() => AttributeLoader.load(__dirname + '/../../data/attributes-invalid-name', Application.getContext())).toThrow(AttributeLoadException);
    });
    it('Should throw for invalid type', () => {
        expect(() => AttributeLoader.load(__dirname + '/../../data/attributes-invalid-type.yaml', Application.getContext())).toThrow(AttributeLoadException);
    });
    it('Should throw for invalid wrap', () => {
        expect(() => AttributeLoader.load(__dirname + '/../../data/attributes-invalid-wrap.yaml', Application.getContext())).toThrow(AttributeLoadException);
    });
    it('Should throw for invalid keys [for enum]', () => {
        expect(() => AttributeLoader.load(__dirname + '/../../data/attributes-invalid-keys.yaml', Application.getContext())).toThrow(AttributeLoadException);
    });
    it('Should not throw', () => {
        AttributeLoader.load(__dirname + '/../../data/attributes-valid.yaml', Application.getContext());
    });
});