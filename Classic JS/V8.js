// 描述一下 V8 执行一段JS代码的过程 参考 https://juejin.im/post/5dd8b3a851882572f56b578f#heading-6
// https://juejin.im/post/6844904186165870606
// https://juejin.im/post/6844903615300108302
// https://juejin.im/post/6844903833571688462
// https://juejin.im/post/6844903990073753613
// https://juejin.im/post/6882529843892731911
`
简述
机器是读不懂 JS 代码，机器只能理解特定的机器码，那如果要让 JS 的逻辑在机器上运行起来，就必须将 JS 的代码翻译成机器码，
然后让机器识别。JS属于解释型语言，对于解释型的语言说，解释器会对源代码做如下分析:

通过词法分析和语法分析生成 AST(抽象语法树)
生成字节码
`
`
图画理解：
机器 --理解-- => 机器码  
字节码是介于 AST 和 机器码之间的一种代码，但是与特定类型的机器码无关，字节码需要通过解释器将其转换为机器码然后执行
字节码是比机器码轻量得多的代码
字节码仍然需要转换为机器码，但和原来不同的是，现在不用一次性将全部的字节码都转换成机器码，
而是通过解释器来逐行执行字节码，省去了生成二进制文件的操作，这样就大大降低了内存的压力。

JS -- 翻译 --> 机器码 --> 机器识别 
（JS 解释型语言）分析：
解释器 对源代码分析 -- 通过词法分析、语法分析 --> AST (抽象语法树) -- V8 解释器 --> 字节码
接着 解释器逐行执行，遇到热点代码（HotSpot，重复出现的代码） -- 编译器 --> 机器码，保存起来 --> 优化执行效率

在这样的机制下，代码执行的时间越久，那么执行效率会越来越高，因为有越来越多的字节码被标记为热点代码，遇到它们时直接执行相应的机器码，不用再次将转换为机器码

有人说 JS 就是一门解释器语言的时候，其实这个说法是有问题的。因为字节码不仅配合了解释器，而且还和编译器打交道，
所以 JS 并不是完全的解释型语言。而编译器和解释器的 根本区别在于前者会编译生成二进制文件但后者不会
并且，这种字节码跟编译器和解释器结合的技术，我们称之为即时编译, 也就是我们经常听到的JIT
`