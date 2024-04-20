import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './schema.graphql',
  generates: {
    '__generated__/types.ts': {
      plugins: ['typescript'],
      config: {
        enumsAsTypes: true,
        avoidOptionals: true,
        skipIsAbstractType: false,
      },
    },
    './__generated__/fabbrica.ts': {
      plugins: ['@mizdra/graphql-codegen-typescript-fabbrica'],
      config: {
        typesFile: './types',
      },
    },
  },
};

export default config;
