/* eslint-disable no-param-reassign */
class CopyRightPlugin {
  static COPY_RIGHT = {
    source() {
      return 'copyright'
    },
    size() {
      return 20
    },
  }

  // eslint-disable-next-line class-methods-use-this
  getCopyRight(compilation, next) {
    setTimeout(() => {
      compilation.assets['copyright.txt'] =
        CopyRightPlugin.COPY_RIGHT
      next()
    }, 1000)
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync(
      'CopyRightPlugin',
      this.getCopyRight.bind(this),
    )
  }
}

module.exports = CopyRightPlugin
