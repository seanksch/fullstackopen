module.exports = {
    'env': {
        'es2020': true,
        'node': true,
        'jest': true
    },
    'extends': [
        'eslint:recommended',
        'airbnb',
    ],
    'parserOptions': {
        'ecmaVersion': 11
    },
    'rules': {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'windows'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'
        ]
    }
}
