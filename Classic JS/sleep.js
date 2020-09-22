// 如何实现sleep的效果（es5或者es6）

// 1. while 循环的方式
function sleep(ms) {
  const start = Date.now(), expire = start + ms
  while (Date.now() < expire) {}
  console.log(111)
  return
}
sleep(1000)
// 执行sleep(1000)之后，休眠了1000ms之后输出了1111。循环的方式，容易造成死循环。

// 2. Promise
function sleep(ms) {
  return new Promise((resolve) => {
    console.log(111);
    setTimeout(resolve, ms)
  })
}
sleep(1500).then(() => {
  console.log(222)
})
// 等待 1500ms 后执行 打印 222

// 3. await/sync
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function test() {
  const temple = await sleep(1000);
  console.log(1111)
  return temple
}
test()
// 延迟1000ms输出了1111

// 4. Generator
function* sleep(ms) {
  yield new Promise((resolve, reject) => {
    console.log(111)
    setTimeout(resolve, ms)
  })
}
sleep(500).next().value.then(() => { console.log(2222) })


// recode 9.22
// while
function sleep(ms) {
  const start = Date.now(), expire = start + ms
  while (Date.now() < expire) {}
  console.log(110)
  return
}
sleep(5000)

// Promise
function sleep(ms) {
  return new Promise((resolve) => {
    console.log(100)
    setTimeout(resolve, ms)
  })
}
sleep(1500).then(() => {
  console.log(200)
})

// await/sync
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
async function test() {
  const temp = await sleep(1900)
  console.log(120)
  return temp
}
test()

// Generator
function* sleep(ms) {
  yield new Promise((resolve, reject) => {
    console.log(12323);
    setTimeout(resolve, ms)
  })
}
sleep(1200).next().value.then(() => {console.log(232323)})