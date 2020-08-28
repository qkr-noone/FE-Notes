### webpack 官方定义
  本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

  一、核心打包原理 
  1.1 打包的主要流程如下
  
  需要读到入口文件里面的内容。分析入口文件，递归的去读取模块所依赖的文件内容，生成AST语法树。根据AST语法  树，生成浏览器能够运行的代码
  1.2 具体细节
  
  获取主模块内容分析模块
  
  安装@babel/parser包（转AST）
  对模块内容进行处理
  
  安装@babel/traverse包（遍历AST收集依赖）
  安装@babel/core和@babel/preset-env包 （ES6 转 ES5）
  递归所有模块生成最终代码
  
  作者：阳光是sunny
  链接：https://juejin.im/post/6854573217336541192

1. [webpack loader和plugin编写](https://juejin.im/post/6844903689442820110)

2. [Webpack4打包机制原理简析](https://juejin.im/post/6844904007463337997)

3. [实现一个简单的Webpack](https://juejin.im/post/6844903858179670030)

4. [tree shaking](./tree-shaking.md)


[webpack 的优化瓶颈](https://juejin.im/book/6844733750048210957/section/6844733750102720526)

## webpack: 
1. webpack 的构建过程太花时间

2. webpack 打包的结果体积太大
#### Webpack 优化打包速度
1. Webpack4 默认压缩并行
2. Happypack 并发调用
3. babel 也可以缓存编译
    > babel-loader 开启缓存将转译结果缓存至文件系统
    > ```loader: 'babel-loader?cacheDirectory=true'```
4. DllPlugin 插件会把第三方库单独打包到一个文件中,当依赖自身发生版本变化时才会重新打包。
    >用 DllPlugin 处理文件，要分两步走：
    1. 基于 dll 专属的配置文件，打包 dll 库
    2. 基于 webpack.config.js 文件，打包业务代码
    - 实践项目文件 mk-portal/build/webpack.dll.config.js
    - 依赖库更新时，运行 npm run dll 重新打包, 生成两个文件
    > - vendor-manifest.json
    > - vendor.js
5. Happypack——将 loader 由单进程转为多进程,CPU 在多核并发执行，大大提升打包效率
6. 减少文件搜索范围 ?
----------
#### 文件结构可视化，找出导致体积过大的原因(缩小打包体积)
webpack-bundle-analyzer 指导代码
1. 拆分资源 --- DllPlugin
2. 删除冗余代码 --- Tree-Shaking (UglifyJsPlugin webpack4 默认使用)