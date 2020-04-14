/*
    call和apply的模拟实现  https://github.com/mqyqingfeng/Blog/issues/11
    所以我们模拟的步骤可以分为：
      将函数设为对象的属性
      执行该函数
      删除该函数
  */
Function.prototype.call2 = function (context) {
  var context = context || window;
  context.fn = this;

  var args = [];
  for (var i = 1, len = arguments.length; i < len; i++) {
    args.push('arguments[' + i + ']');
  }

  var result = eval('context.fn(' + args + ')');

  delete context.fn
  return result;
}
// apply的模拟实现
// apply 的实现跟 call 类似，在这里直接给代码

Function.prototype.apply = function (context, arr) {
  var context = Object(context) || window;
  context.fn = this;

  var result;
  if (!arr) {
    result = context.fn();
  }
  else {
    var args = [];
    for (var i = 0, len = arr.length; i < len; i++) {
      args.push('arr[' + i + ']');
    }
    result = eval('context.fn(' + args + ')')
  }

  delete context.fn
  return result;
}
// Q:
/*
   1. var context = Object(context) || window; 这里有问题吗？ context为null时Object(null)返回空对象，不会被赋值为window
   An  没有什么问题哈，非严格模式下，指定为 null 或 undefined 时会自动指向全局对象，郑航写的是严格模式下的，我写的是非严格模式下的，实际上现在的模拟代码有一点没有覆盖，就是当值为原始值（数字，字符串，布尔值）的 this 会指向该原始值的自动包装对象。

   eval函数接收参数是个字符串
    定义和用法

    eval() 函数可计算某个字符串，并执行其中的的 JavaScript 代码。

    语法：
    eval(string)

    string必需

    简单来说吧，就是用JavaScript的解析引擎来解析这一堆字符串里面的内容，这么说吧，你可以这么理解，你把eval看成是<script>标签。


     最终目的是为了拼出一个参数字符串，我们一步一步看：

    var args = [];
    for(var i = 1, len = arguments.length; i < len; i++) {
            args.push('arguments[' + i + ']');
    }
    最终的数组为：

    var args = [arguments[1], arguments[2], ...]
    然后

     var result = eval('context.fn(' + args +')');
    在eval中，args 自动调用 args.toString()方法，eval的效果如 jawil所说，最终的效果相当于：

     var result = context.fn(arguments[1], arguments[2], ...);
    这样就做到了把传给call的参数传递给了context.fn函数
*/

// 实现call / apply
// 思路: 利用this的上下文特性。

//实现apply只要把下一行中的...args换成args即可 
Function.prototype.myCall = function (context = window, ...args) {
  let func = this;
  let fn = Symbol("fn");
  context[fn] = func;

  let res = context[fn](...args);//重点代码，利用this指向，相当于context.caller(...args)

  delete context[fn];
  return res;
}

// 实现函数 call 方法
const selfCall = function (context, ...args) {
  let func = this
  content || (context = window)
  if (typeof func !== 'function') throw new TypeError('this is not function')
  let caller = Symbol('caller')
  context[caller] = func
  let res = context[caller](...args)
  delete context[caller]
  return res
}