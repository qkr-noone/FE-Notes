// 实现 ES6 的 class 语法
function inherit(subType, superType) {
  subType.prototype = Object.create(superType.prototype, {
    constructor: {
      enumerable: false,
      configurable: true,
      writable: true,
      value: subType
    }
  })

  Object.setPrototypeOf(subTyep, superType)
}

function _inherits(subClass, superClass) {
  // extend 的继承目标必须是函数或者是 null
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  // 类似于 ES5 的寄生组合式继承，使用 Object.create，设置子类 prototype 属性的 __proto__ 属性指向父类的 prototype 属性
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  // 设置子类的 __proto__ 属性指向父类
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}


function Parent5() {
  this.name = 'parent5';
  this.play = [1, 2, 3];
}
function Child5() {
  Parent5.call(this);
  this.type = 'child5';
}
Child5.prototype = Object.create(Parent5.prototype);
Child5.prototype.constructor = Child5;
