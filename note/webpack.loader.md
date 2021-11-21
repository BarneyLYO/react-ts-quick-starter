# Webpack Loader

Loader is

```js
/**
 * @param {string|Buffer} cont source file content
 * @param {object} [map] sourceMap data
 * @param {any} [meta] meta data, can be anything
 * @return {string|Buffer|void}
 */
const webpackLoader = function (cnt, map, meta) {
  // TODO: Perform operation
  return cnt // transformed cnt {}
}

module.export = webpackLoader
```

Loader is not pure function, have the access to this

## classification

### Pre Loader

```js
{
  test:/\.aaaa/i,
  use:['pre-loader'],
  enforce:'pre'
}
```

### Post Loader

```js
{
  test:/\.aaaa/i,
  use:['post-loader'],
  enforce:'post'
}
```

### Inline Loader

```js
// 使用 ! 将资源中的 loader 分开
import Styles from 'style-loader!css-loader?modules!./styles.css'

// 在Inline loader中使用 !、!!、-! 前缀，可以禁用配置文件中的部分loader
import Styles from '!style-loader!css-loader?modules!./styles.css'
import Styles from '!!style-loader!css-loader?modules!./styles.css'
import Styles from '-!style-loader!css-loader?modules!./styles.css'
import Styles from 'style-loader?key=valuefoo=bar!css-loader?modules!./styles.css'
// 或者
import Styles from 'style-loader?{"key": "value","foo": "bar"}!css-loader?modules!./styles.css'
// ====
;[
  {
    loader: 'style-loader',
    options: { key: 'value', foo: 'bar' },
  },
  {
    loader: 'css-loader',
    options: { modules: true },
  },
]
```

### Normal Loader

```js
{
  test:/\.aaaa/i,
  use:['normal-loader'],
 }
```

## receive raw data

normally resource will be transform to UTF-8 and then pass to the loader, we can set module.export.raw = true to get the original buffer

## Loader can be synced or asynced

### Sync Loader

```js
module.exports = function SyncLoader(cnt, map, meta) {
  const output = syncOperation(cnt)
  return output
}
// or
module.exports = function SyncLoader2(cnt, map, meta) {
  // (err, cnt,map,meta)
  this.callback(null, syncOperation(cnt), map, meta)
  return // when invoke this.callback, always return undefine
}
```

### Async Loader

```js
module.export = function AsyncLoader(cnt, map, meta) {
  this.cacheable(false) // remove cache
  const cb = this.async()
  asyncOperation(cnt, (err, result, map, meta) => {
    if (err) return cb(err)
    return cb(null, result, map, meta)
  })
}
```

## Exec Order

Normally right to left
But Loader execution include 2 phase

1. pitch
   before loader execution, if return someting in pitch, this loader's normal phase will be executed but the following normal phase and pitch phase will be ignored
2. normal
   loader transpile the source file

```js
module.export = function withPatchLoader(cnt) {
  return someOp(cnt)
}
module.exports.pitch = function withPatchLoaderPitch(
  remainingReq,
  precedingReq,
  data,
) {
  /*
    remainingRequest: loader链中在自己之后的loader的request字符串
    precedingRequest: loader链中在自己之前的loader的request字符串
    data: data对象，该对象在normal阶段可以通过this.data获取，可用于传递共享的信息
  */
}
```

### sequence

for loaders [a,b,c]
will be
[a.pitch, b.pitch, c.pitch, c.normal, b.normal, a.normal]

#### pitch phase

[pre, inline, normal, post]

#### normal phase

[post, normal, inline, pre]

## loader runner

Loader is actually method, when input a module, Webpack use loader-runner for organize and call loader

```js
;[
  /* 
    Context, create method and props on this for loaders 
  */
  InitLoaderContext,
  /*
    Generate the loader calling chain
   */
  GenerateLoaderChain,
  /*
    Execure the loader.pitch
    left to right
   */
  CallEachLoaderPitch,
  /*
    Execute the loader.normal
    right to left
    with file as input
  */
  CallEachLoaderNormal,
  OUTPUT,
]
```

## Local Dev

```js
// webpack.config.js
{
  resolveLoader: {
    modules:[
      'node_modules',
      'path_to_loader'
    ]
  },
  module:{
    rules:[
      {
        test: /\.xxx/,
        use:['your-loader-name']
      }
    ]
  }
}
```
