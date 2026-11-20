import { build } from 'esbuild';
await build({ entryPoints: ['src/main.js'], outfile: 'town.js', bundle: true, minify: true, format: 'iife', legalComments: 'eof' });
