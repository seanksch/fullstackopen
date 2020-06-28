module.exports = {
    'env': {
        'commonjs': true,
        'es2020': true,
        'node': true,
    },
    'extends': [
        'eslint:recommended',
        'airbnb',
    ],
    'parserOptions': {
        'ecmaVersion': 11,
    },
    'rules': {
        'indent': [
            'error',
            4,
        ],
        'linebreak-style': [
            'error',
            'windows',
        ],
        'quotes': [
            'error',
            'single',
        ],
        'semi': [
            'error',
            'never',
        ],
        'no-console': 0,
        'quote-props': ['error', 'always'],
    },
}
