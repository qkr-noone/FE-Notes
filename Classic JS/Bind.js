/* 
实现bind方法
核心要点:

1.对于普通函数，绑定this指向

2.对于构造函数，要保证原函数的原型对象上的属性不能丢失
*/

Function.prototype.bind = function (context, ...args) {
  let self = this;//谨记this表示调用bind的函数
  let fBound = function () {
    //this instanceof fBound为true表示构造函数的情况。如new func.bind(obj)
    return self.apply(this instanceof fBound ? this : context || window, args.concat(Array.prototype.slice.call(arguments)));
  }
  fBound.prototype = Object.create(this.prototype);//保证原函数的原型对象上的属性不丢失
  return fBound;
}
