const tests = [`example`];

const defineTest = require(`jscodeshift/dist/testUtils`).defineTest;

// This won't work, we'll need to use inline or snapshot tests instead
describe(`codemods`, () => {
  tests.forEach((test) =>
    defineTest(__dirname, `mdx-v2`, { parser: `mdx` }, `${test}`)
  );
});
