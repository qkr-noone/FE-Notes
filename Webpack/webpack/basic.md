### webpack 官方定义
  本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

##  一、核心打包原理 
  ### 1.1 打包的主要流程如下
  
  1. 需要读到入口文件里面的内容。
  2. 分析入口文件，递归的去读取模块所依赖的文件内容，生成AST语法树。
  3. 根据AST语法树，生成浏览器能够运行的代码
  * 其他表述：webpack 打包的过程
    >1. 读取文件，分析模块依赖
    >2. 对模块进行解析执行（深度遍历）
    >3. 针对不同的模块使用不同的 loader
    >4. 编译模块，生成抽象语法树（AST）
    >5. 遍历 AST，输出 JS
  ### 1.2 具体细节
  
  1. 获取主模块内容
  2. 分析模块
      * 安装@babel/parser包（转AST）
  3. 对模块内容进行处理
  
      * 安装@babel/traverse包（遍历AST收集依赖）
      * 安装@babel/core和@babel/preset-env包   （es6转ES5）
  4. 递归所有模块
  5. 生成最终代码
  
  [作者：阳光是sunny](https://juejin.im/post/6854573217336541192)

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

##### Q1-3: webpack 的 loader 和 plugin 区别，举几个常用的 loader 和 plugin 并说出作用
1. loader
    > * loader 用于对模块的源代码进行转换。
    > * loader 可以使你在 import 或"加载"模块时预处理文件。
    > * 因此，loader 类似于其他构建工具中“任务(task)”，并提供了处理前端构建步骤的强大方法。
    > * loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript，或将内联图像转换为 data URL。loader 甚至允许你直接在 JavaScript 模块中 import CSS文件！
    > * 因为 webpack 本身只能处理 JavaScript，如果要处理其他类型的文件，就需要使用 loader 进行转换，loader 本身就是一个函数，接受源文件为参数，返回转换的结果。
2. Plugin
    > * Plugin 是用来扩展 Webpack 功能的，通过在构建流程里注入钩子实现，它给 Webpack 带来了很大的灵活性。
     > * 通过plugin（插件）webpack可以实 现 loader 所不能完成的复杂功能，使用 plugin 丰富的自定义 API 以及生命周期事件，可以控制 webpack 打包流程的每个环节，实现对 webpack 的自定义功能扩展。
1. [常用的 loader、plugin](https://www.jianshu.com/p/b43ff1bfa813)
2. [loader 和 plugin 的区别](https://blog.csdn.net/jiang7701037/article/details/98887179)
3. [更多区别](https://zhuanlan.zhihu.com/p/77342099)

### Webpack 中引入文件的几种写法
> Webpack支持以下规范
> 1. CommonJS 规范
```js
// moduleA.js
module.exports = function() {}
// moduleB.js
var moduleA = require('./moduleA')

// 写法
// 1. 同步
var moduleA = require('./moduleA')
moduleA.dosomething()

// 2. 异步 require.ensure() 方法， a、b.js 被打包成同一个名为 'bundleFileName' 文件
// 如果文件名称写成路径形式的话，webpack会按照指定路径进行打包生成
require.ensure([], function(require) {
  var a = require('./a')
  a.dosomething()
  var b = require('./b')
  b.dosomething()
}, 'bundleFileName')

// 3. 预加载懒执行
// a.js 会先被下载下来，直到出现 'require('./a')' 语句的时候才会执行
require.ensure(['./a'], function(require) {
  var a = require('./a')
  a.dosomething()
}, bundleFileName)
```
> 2. AMD 规范 (推崇依赖前置)
```js
define(['jquery', './math.js'], function($, math){
  // AMD 是依赖前置，将文件的依赖通过数组的形式导入，然后当做函数的参数传递进函数使用

  // 通过 return 来实现对外接口
  return helloWorld
})
```
> 3. CMD 规范 （推崇就近依赖，需要用到的时候再去加载模块）
>> 标准语法： define(id?, deps?, factory)
>> * 一个文件一个模块，所以经常用文件名作为模块 id
>> * CMD 推崇依赖就近，所以一般不在 define 的参数中写依赖，在 factory 中写
>> * factory 是一个函数，该函数拥有三个参数 function（require, exports, module）
>>> 1. require：一个方法，接收模块标识，用来获取其它模块提供的接口
>>> 2. exports：一个对象，用来向外提供模块接口
>>> 3. module：一个对象，存储了与当前模块相关联的一些属性和方法
```js
define(function(require, exports, module){
  var $ = require('jquery.js')
})
```
> 4. ES6 规范 (使用import和exports命令来导入和导出文件)

```js
exports const a = function(){}
// 写法
import funcA from './moduleA'
```


***2020.9.9 实践基于 Webpack 4.28.2 版本***
[第一版: Vue项目Webpack优化实践，构建效率提高50%](https://github.com/fengshi123/blog/issues/2)
[Webpack 4.28.2 版: Webpack 再深入再总结 ](https://github.com/fengshi123/blog/issues/18)

[2020年了,再不会webpack敲得代码就不香了(近万字实战)](https://zhuanlan.zhihu.com/p/99959392)