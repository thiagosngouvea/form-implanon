/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@ant-design/icons',
    '@ant-design/icons-svg',
    'antd',
    'rc-util',
    'rc-pagination',
    'rc-picker',
    'rc-table',
    'rc-tree',
    'rc-select',
    'rc-cascader',
    'rc-checkbox',
    'rc-dropdown',
    'rc-menu',
    'rc-input',
    'rc-input-number',
    'rc-motion',
    'rc-notification',
    'rc-tooltip',
    'rc-trigger',
    '@rc-component/trigger',
    '@rc-component/util',
    '@babel/runtime'
  ],
  experimental: {
    esmExternals: false // Alterado para false para evitar problemas com módulos ESM
  },
  webpack: (config: any) => {
    config.resolve.extensionAlias = {
      '.js': ['.js', '.ts', '.tsx'],
      '.jsx': ['.jsx', '.tsx']
    };
    return config;
  }
};

module.exports = nextConfig;
