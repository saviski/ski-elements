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
      "@ski/decorators/decorators.js",
      "@ski/evalstream/evalstream.js",
      "@ski/events/events.js",
      "@ski/mixins/mixins.js",
      "@ski/spy/spy.js",
      "@ski/streams/streams.js"
    ]
  }
]
