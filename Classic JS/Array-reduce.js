/* 
用ES5实现数组的reduce方法
核心要点:

1、初始值不传怎么处理

2、回调函数的参数有哪些，返回值如何处理。
*/
Array.prototype.myReduce = function (fn, initialValue) {
  var arr = Array.prototype.slice.call(this);
  var res, startIndex;
  res = initialValue ? initialValue : arr[0];
  startIndex = initialValue ? 0 : 1;
  for (var i = startIndex; i < arr.length; i++) {
    res = fn.call(null, res, arr[i], i, this);
  }
  return res;
}
