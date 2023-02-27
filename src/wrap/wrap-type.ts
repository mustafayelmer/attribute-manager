export enum WrapType {
    /**
     * Scalar values
     * Samples: string, integer, double, boolean, ...
    * */
    PLAIN = 'PLAIN',

    /**
     * Array of scalar values
     * Samples: Array<string>, Array<integer>, Array<double>, Array<boolean>, ...
     * */
    ARRAY = 'ARRAY',

    /**
     * Map of scalar values
     * Samples: Record<string, string>, Record<string, integer>, Record<string, double>, Record<string, boolean>, ...
     * */
    MAP = 'MAP',

    /**
     * Language map of scalar values
     * Samples: Record<Locale, string>, Record<Locale, integer>, Record<Locale, double>, Record<Locale, boolean>, ...
     * Locale: en, en-US, ...
     * */
    I18N = 'I18N',
}