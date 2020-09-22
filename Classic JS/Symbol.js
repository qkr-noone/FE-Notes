/*
    Symbol 原始数据类型 独一无二的值 知识点:
    https://juejin.im/post/5b1f4c21f265da6e0f70bb19
    (可以实现)
    Symbol 函数前不能使用 new 命令 否则报错， 因为生成的Symbol 是一个原始类型的值， 不是对象
    instanceof 的结果为false
    如果 Symbol 参数是一个对象， 就会调用该对象的 toString 方法，将其转为字符串，然后才生成一个 Symbol 值
    Symbol 函数的参数只是表示对当期 Symbol 值的描述， 相同的参数的 Symbol 函数的返回值是不相等
    Symbol 值可以作为标志符， 用于对象的属性名，可以保证不会出现同名的属性
    Symbol.for 接受一个字符串参数， 搜索该参数作为名称的 Symbol 值，有则返回 Symbol 值； 否则，就新建并返回一个以该字符串为名称的 Symbol 值
    Symbol.keyFor() 方法返回一个已登记的 Symbol 类型值的 key
    (不可实现)
    Symbol 值通过 Symbol 函数生成，使用 typeof，结果为 'symbol'
    Symbol 函数可以接受一个字符串作为参数， 表示对 Symbol 实例的描述, 在控制台显示或转为字符串是 比较容易区分
    Symbol 值不能与其他类型的值进行运算，会报错
    Symbol 值可以显示转为字符串
    Symbol 作为属性名，该属性不会出现在 for...in/of 循环中,
        也不会被 Object.keys()、Object.getOwnPropertyNames()、JSON.stringify() 返回。
        但是它也不是私有属性，有一个 Object.getOwnPropertySymbols 方法，
        可以获取指定对象的所有 Symbol 属性名
  */
// 实现一个 Symbol
; (function () {
  var root = this

  var generateName = (function () {
    var postfix = 0
    return function (descString) {
      postfix++
      return `@@${descString}_${postfix}`
    }
  })()

  var forMap = {}

  var SymbolPolyfill = function Symbol(description) {
    if (this instanceof SymbolPolyfill) {
      throw new TypeError('Symbol is not a constructor')
    }

    var descString = description === undefined ? undefined : String(description)

    var symbol = Object.create({
      toString: function () {
        return this.__Name__
      },
      valueOf: function () {
        return this
      }
    })

    Object.defineProperties(symbol, {
      '__Description__': {
        value: descString,
        writable: false,
        enumerable: false,
        configurable: false
      },
      '__Name__': {
        value: generateName(descString),
        writable: false,
        enumerable: false,
        configurable: false
      }
    })
    return symbol
  }

  Object.defineProperties(SymbolPolyfill, {
    'for': {
      value: function (description) {
        var descString = description === undefined ? undefined : String(description)
        return forMap[descString] ? forMap[descString] : forMap[descString] = SymbolPolyfill(descString)
      },
      writable: true,
      enumerable: false,
      configurable: true
    },
    'keyFor': {
      value: function (symbol) {
        for (const key in forMap) {
          if (forMap[key] === symbol) return key
        }
      },
      writable: true,
      enumberable: false,
      configurable: true
    }
  })

  root.SymbolPolyfill = SymbolPolyfill

})()

// recode 9.22
;(function() {
  var root = this

  var generateName = (function () {
    var postfix = 0
    return function (descString) {
      postfix++
      return `@@${descString}_${postfix}`
    }
  })

  var forMap = {}

  var SymbolPolyfill = function Symbol(description) {
    if (this instanceof Symbolyfill) {
      throw new TypeError('Symbol is not a constructor')
    }

    var descString = description === undefined ? undefined : String(description)

    var symbol = Object.create({
      toString: function () {
        return this.__Name__
      },
      valueOf: function () {
        return this
      }
    })

    Object.defineProperties(symbol, {
      '__Description__': {
        value: descString,
        writable: false,
        enumerable: false,
        configurable: false
      },
      '__Name__': {
        value: generateName(descString),
        writable: false,
        enumerable: false,
        configurable: false
      }
    })
    return symbol
  }

  Object.defineProperties(SymbolPolyfill, {
    'for': {
      value: function (description) {
        var descString = description === undefined ? undefined : String(description)
        return forMap[descString] ? forMap[descString] : forMap[descString] = SymbolPolyfill(descString)
      },
      writable: true,
      enumerable: false,
      configurable: true
    },
    'keyFor': {
      value: function(symbol) {
        for (const key in forMap) {
          if (forMap[key] === symbol) {
            return key
          }
        }
      },
      writable: true,
      enumerable: false,
      configurable: true
    }
  })

  root.SymbolPolyfill = SymbolPolyfill

})()