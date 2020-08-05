### webpack 官方定义
  本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

  一、核心打包原理 
  1.1 打包的主要流程如下
  
  需要读到入口文件里面的内容。分析入口文件，递归的去读取模块所依赖的文件内容，生成AST语法树。根据AST语法  树，生成浏览器能够运行的代码
  1.2 具体细节
  
  获取主模块内容分析模块
  
  安装@babel/parser包（转AST）
  对模块内容进行处理
  
  安装@babel/traverse包（遍历AST收集依赖）安装@babel/core和@babel/preset-env包   （es6转ES5）
  递归所有模块生成最终代码
  
  作者：阳光是sunny
  链接：https://juejin.im/post/6854573217336541192

1. [webpack loader和plugin编写](https://juejin.im/post/6844903689442820110)

2. [Webpack4打包机制原理简析](https://juejin.im/post/6844904007463337997)

3. [实现一个简单的Webpack](https://juejin.im/post/6844903858179670030)
