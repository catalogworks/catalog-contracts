module.exports = {
    singleQuote: true,
    bracketSpacing: false,
    printWidth: 80,
    tabWidth: 4,
    overrides: [
        {
            files: '*.sol',
            options: {
                printWidth: 99,
                tabWidth: 4,
                singleQuote: false,
                explicitTypes: 'always',
            },
        },
    ],
    plugins: [require.resolve('prettier-plugin-solidity')],
};
