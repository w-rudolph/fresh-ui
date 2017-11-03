// https://eslint.org/docs/user-guide/configuring

module.exports = {
    "root": true,
    "parser": 'babel-eslint',
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true
        },
        "ecmaVersion": 6,
        "sourceType": "module"
    },
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "plugins": ["vue"],
    "rules": {
        "indent": ['error', 4, { "SwitchCase": 1 }],
        "quotes": ["off"],
        "semi": ["warn", "always"],
        "no-console": ["warn"],
        "comma-dangle": ["off"],
        "no-unused-vars": ['warn'],
        "no-extra-semi": ['warn'],
        "no-useless-escape": ['warn']
    }
}