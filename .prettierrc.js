module.exports = {
    singleQuote: true,
    bracketSpacing: false,
    printWidth: 80,
    tabWidth: 2,
    override: [
        {
            files: '*.sol',
            options: {
                printWidth: 120,
                tabWidth: 4,
                singleQuote: false,
                explicitTypes: 'always',
            },
        },
    ],
    plugins: [require.resolve('prettier-plugin-solidity')],
};
