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