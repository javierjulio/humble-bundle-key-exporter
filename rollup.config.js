import terser from "@rollup/plugin-terser";

const bookmarkletify = function() {
  return {
    name: 'bookmarkletify',
    renderChunk(code) {
      return "javascript:" + code;
    }
  }
}

export default [
  {
    input: 'src/index.js',
    plugins: [terser({ compress: true })],
    output: {
      file: 'dist/humble-bundle-key-exporter.js',
      format: 'iife',
      name: 'HumbleBundleKeyExporter',
      sourcemap: true
    }
  },
  {
    input: 'src/loader.js',
    plugins: [terser(), bookmarkletify()],
    output: {
      file: 'dist/bookmarklet-loader.js',
      format: 'iife'
    }
  }
];
