import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

export default [
  {
    input: 'src/index.ts',
    output: {
      file: pkg.module
    },
    plugins: [
      typescript()
    ],
    external: [
      "@ski/data/data.js",
      "@ski/decorators/decorators.js",
      "@ski/eval-stream/eval-stream.js",
      "@ski/events/events.js",
      "@ski/mixins/mixins.js",
      "@ski/spy/spy.js"
    ]
  }
]
