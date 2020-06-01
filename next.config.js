module.exports = {
  webpack: (cfg) => {
    cfg.module.rules.push({
      test: /\.(vs|fs)$/i,
      use: ['babel-loader']
    });

    cfg.module.rules.push({
      test: /\.(vert|frag)$/i,
      exclude: /node_modules/,
      use: [
        'raw-loader',
        'glslify-loader'
      ]
    });
    
    return cfg;
  },
};
