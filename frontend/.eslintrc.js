module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jest/globals": true
    },
    "extends": ["eslint:recommended", "plugin:react/recommended"], "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react", "jest","react-hooks"],
    "rules": {
        "indent": [
            "warn",
            4
        ],
        "linebreak-style": [
            "warn",
            "windows"
        ],
        "quotes": [
            "warn",
            "double"
        ],
        "semi": [
            "warn",
            "always"
        ],
        "eqeqeq": "error", "no-trailing-spaces": "error",
        "object-curly-spacing": ["warn", "never"],
        "arrow-spacing": ["error", { "before": true, "after": true }],
        "no-console": 0,
        "react/prop-types": 0,
        "no-unused-vars": [
            "warn"
        ],
        "no-trailing-spaces": ["warn"],
        "react-hooks/rules-of-hooks": "error",
    }
};