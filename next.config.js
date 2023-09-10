const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
})

module.exports = withNextra({
  async rewrites() {
    if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production')
      return [
        {
          source: '/_next/:path*',
          destination: 'https://pipeless.ai/docs/_next/:path*',
        },
      ]
    else
      return []
  },
  assetPrefix: process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' ? '/docs' : '',
  webpack(config) {
    const allowedSvgRegex = /components\/icons\/.+\.svg$/

    const fileLoaderRule = config.module.rules.find(rule =>
      rule.test?.test('.svg')
    )
    fileLoaderRule.exclude = allowedSvgRegex

    config.module.rules.push({
      test: allowedSvgRegex,
      use: ['@svgr/webpack']
    })
    return config
  }
})
