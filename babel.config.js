module.exports = (api) => {
  const isTest = api.env('test');
  
  return {
    presets: [
      ['next/babel', { 'preset-react': { runtime: 'automatic' } }],
      '@babel/preset-typescript',
      ...(isTest ? [['@babel/preset-env', { targets: { node: 'current' } }]] : []),
    ],
    plugins: [
      '@babel/plugin-transform-runtime',
      ['@babel/plugin-transform-class-properties', { loose: true }],
      '@babel/plugin-transform-optional-chaining',
      '@babel/plugin-transform-nullish-coalescing-operator',
    ],
  };
};
