// 图片懒加载 getBoundClientRect 的实现方式
let imgList = [...document.querySelectorAll('img')]
let num = imgList.length

let lazyLoad = (function () {
  let count = 0
  return function () {
    let deleteIndexList = []
    imgList.forEach((img, index) => {
      let rect = img.getBoundingClientRect()
      if (rect.top < window.innerHeight) {
        img.src = img.dataset.src
        deleteIndexList.push(index)
        count++
        if (count === num) {
          document.removeEventListener('scroll', lazyLoad)
        }
      }
    })
    imgList = imgList.filter((_, index) => !deleteIndexList.includes(index))
  }
})

// 图片懒加载 intersectionObserver 的实现方式
let imgsList = [...document.querySelectorAll('img')]

let lazysLoad = function () {
  let observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        entry.target.src = entry.target.data.src
        observer.unobserve(entry.target)
      }
    })
  })
  imgsList.forEach(img => {
    observer.observe(img)
  })
}