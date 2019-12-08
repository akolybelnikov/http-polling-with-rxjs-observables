module.exports = {
    transform: {
        '^.+\\.(ts|js)$': 'ts-jest',
        '^.+\\.svelte$': [
            'svelte-jester',
            {
                preprocess: true,
            },
        ],
    },
    moduleFileExtensions: ['js', 'ts', 'svelte'],
    bail: false,
    verbose: true,
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect']
}
