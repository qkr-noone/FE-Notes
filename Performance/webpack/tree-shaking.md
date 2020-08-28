## tree shaking
用于描述移除 JavaScript 上下文中的未引用代码(dead-code)。它依赖于 ES2015 模块语法的 静态结构 特性，例如 import 和 export

使用模块打包(如 Webpack )将多个 JavaScript 文件打包为单个文件时自动删除未引用的代码。使最终文件具有简洁的结构和最小化大小\减少包的大小。

[webpack的原理，其实就是遍历所有的模块，把它们打包成一个文件，在这个过程中，它就知道哪些export的模块有被使用到。那我们同样也可以遍历所有的scope（作用域），简化没有用到的scope，最后只留下我们需要的](https://juejin.im/post/6844903669100445710)

[Tree-Shaking性能优化实践 - 原理篇](https://juejin.im/post/6844903544756109319)

[Tree-Shaking性能优化实践 - 实践篇](https://juejin.im/post/6844903544760336398)