class Lady {
    content = 'Hi, qkr'
    other = 'do something'
    sayHello() {
        return this.content
    }
    sayMore() {
        return this.other
    }
}

class XiaoQing extends Lady {
    sayHello() { // 重写
        return 'Hi,honey'
    }
    sayMore() { // super 关键字
        return super.sayMore() + ' keep move'
    }
    sayLove() {
        return 'I love you'
    }
}

const goddess = new XiaoQing()
console.log(goddess.sayHello())
console.log(goddess.sayLove())
console.log(goddess.sayMore())
export { }