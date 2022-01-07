module.exports = {
    singleQuote: true,
    bracketSpacing: false,
    printWidth: 120,
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
