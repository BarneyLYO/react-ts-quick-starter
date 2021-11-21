/* plugins */
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
  CleanWebpackPlugin,
} = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const WebpackBar = require('webpackbar')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const TeserPlugin = require('terser-webpack-plugin')
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

/* post css plugin */
const POST_CSS_PLUGIN_FLEX_BUG_FIXER = require('postcss-flexbugs-fixes')
const POST_CSS_PLUGIN_PRESET_ENV = require('postcss-preset-env')
const POST_CSS_PLUGIN_NORMALIZER = require('postcss-normalize')
const POST_CSS_AUTOPREFIX = require('autoprefixer')

/* Customized */
const paths = require('../paths')
const { isDevelopment, isProduction } = require('../env')
const { imageInlineSizeLimit } = require('../conf')

/* Functions */
const getCssLoaders = (importLoaders) => {
  const postCssPlugin = [POST_CSS_PLUGIN_FLEX_BUG_FIXER]
  if (isProduction) {
    postCssPlugin.push(
      POST_CSS_PLUGIN_PRESET_ENV({
        stage: 3,
      }),
    )

    postCssPlugin.push(POST_CSS_PLUGIN_NORMALIZER)

    postCssPlugin.push(POST_CSS_PLUGIN_NORMALIZER)

    postCssPlugin.push(
      POST_CSS_AUTOPREFIX({
        grid: true,
        flexbox: 'no-2009',
      }),
    )
  }

  return [
    isDevelopment
      ? 'style-loader'
      : MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        modules: false,
        sourceMap: isDevelopment,
        importLoaders, // loader before css-loader
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          ident: 'postcss',
          plugins: postCssPlugin,
        },
        sourceMap: isDevelopment,
      },
    },
  ]
}

const entry = {
  app: paths.appIndex,
}

const cache = {
  type: 'filesystem',
  buildDependencies: {
    config: [__filename],
  },
}

const resolveExtions = {
  extensions: ['.tsx', '.ts', '.js', '.json', '.jsx'],
  alias: {
    Src: paths.appSrc,
    Components: paths.appSrcComponents,
    Utils: paths.appSrcUtils,
  },
}

const externals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  axios: 'axios',
}

// deprecated
// const htmlWebpackPluginMinifyOpt = {
//   removeAttributeQuotes: true,
//   collapseWhitespace: true,
//   removeComments: true,
//   collapseBooleanAttributes: true,
//   collapseInlineTagWhitespace: true,
//   removeRedundantAttributes: true,
//   removeScriptTypeAttributes: true,
//   removeStyleLinkTypeAttributes: true,
//   minifyCSS: true,
//   minifyJS: true,
//   minifyURLs: true,
//   useShortDoctype: true,
// }

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: paths.appHtml,
  filename: 'index.html',
  cache: true,
  // minify: IS_DEV ? false : htmlWebpackPluginMinifyOpt,
})

const cleanWebpackPlugin = new CleanWebpackPlugin()

const copyPlugin = new CopyPlugin({
  patterns: [
    {
      context: paths.appPublic,
      from: '*',
      to: paths.appBuild,
      toType: 'dir',
      globOptions: {
        dot: true,
        gitignore: true,
        ignore: ['**/index.html'],
      },
    },
  ],
})

const webpackbar = new WebpackBar({
  name: isDevelopment ? 'RUNNING' : 'BUNDLING',
  color: isDevelopment ? '#52c41a' : '#722ed1',
})

const forkTsCheckerWebpackPlugin =
  new ForkTsCheckerWebpackPlugin({
    typescript: {
      configFile: paths.appTsConfig,
    },
  })

const plugins = [
  htmlWebpackPlugin,
  cleanWebpackPlugin,
  copyPlugin,
  webpackbar,
  forkTsCheckerWebpackPlugin,
]

// deprecated
// if (isProduction) {
//   plugins.push(
//     new MiniCssExtractPlugin({
//       filename: 'css/[name].[contenthash:8].css',
//       chunkFilename: 'css/[name].[contenthash:8].css',
//       ignoreOrder: false,
//     }),
//   )
// }

const STYLE_LODERS = {
  test: /\.css$/,
  use: getCssLoaders(1),
}

const LESS_LODERS = {
  test: /\.less$/,
  use: [
    ...getCssLoaders(2),
    {
      loader: 'less-loader',
      options: {
        sourceMap: isDevelopment,
      },
    },
  ],
}

const SCSS_LOADER = {
  test: /\.scss$/,
  use: [
    ...getCssLoaders(2),
    {
      loader: 'sass-loader',
      options: {
        sourceMap: isDevelopment,
      },
    },
  ],
}

const FONT_LOADER = {
  test: /\.(ttf|woff|woff2|eot|otf)$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        name: '[name].[contenthash:8].[ext]',
        outputPath: 'assets/fonts',
      },
    },
  ],
}

const IMG_LOADER = {
  test: /\.(bmp|gif|jpe|jpeg|png)$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: imageInlineSizeLimit,
        name: '[name].[contenthash:8].[ext]',
        outputPath: 'assets/images',
      },
    },
  ],
}

const BABEL_LOADER = {
  test: /\.(tsx?|jsx?)$/,
  loader: 'babel-loader',
  options: {
    cacheDirectory: true,
  },
  exclude: /node_modules/,
}

const BARNEY_LOADER = {
  test: /\.barney$/,
  loader: 'barney-loader',
}

const rules = [
  STYLE_LODERS,
  LESS_LODERS,
  SCSS_LOADER,
  FONT_LOADER,
  IMG_LOADER,
  BABEL_LOADER,
  BARNEY_LOADER,
]

// const terserPlugin = new TeserPlugin({
//   extractComments: false,
//   terserOptions: {
//     compress: {
//       pure_funcs: ['console.log'],
//     },
//   },
// })

// const optimizeCssAssetsPlugin =
//   new OptimizeCssAssetsPlugin()

// const minimizer = []

// if (!IS_DEV) {
//   minimizer.push(terserPlugin)
//   minimizer.push(optimizeCssAssetsPlugin)
// }

// const optimization = {
//   splitChunks: {
//     chunks: 'all',
//     minSize: 0,
//   },
//   minimize: !IS_DEV,
//   minimizer,
// }

const resolveLoader = {
  modules: [
    resolve(__dirname, '..', '..', 'node_modules'),
    resolve(__dirname, '..', 'loaders'),
  ],
}

module.exports = {
  entry,
  cache,
  resolve: resolveExtions,
  plugins,
  module: {
    rules,
  },
  resolveLoader,
}
