// 滑动窗口最大值 问题 http://47.98.159.95/leetcode-js/stack-queue/dequeue.html#滑动窗口最大值
let maxSlidingWindow = function (nums, k) {
  // 异常处理
  if (nums.length === 0 || !k) return []
  let window = [], res = []
  for (let i = 0; i < nums.length; i++) {
    if (window[0] !== undefined && window[0] <= i - k) {
      window.shift();
    }
    while (nums[window[window.length - 1]] <= nums[i]) {
      window.pop()
    }
    window.push(i)
    if (i >= k - 1) {
      res.push(nums[window[0]])
    }
  }
  return res
}

// 自己实现
let maxSliding = function (nums, k) {
  // 结果和窗口下标（队首是最大）
  let res = [], range = []
  for (let i = 0; i < nums.length; i++) {
    // 把滑动窗口之外删除
    if (range[0] !== undefined && range[0] <= i - k) range.shift()
    // 保证队首最大
    while (nums[range[range.length - 1]] <= nums[i]) {
      range.pop()
    }
    range.push(i)
    if (i >= k - 1) res.push(nums[range[0]])
  }
}

// 9.27 recode
// 超出时间限制
let maxSlidingAlpha = function (nums, k) {
  let res = [], range = []
  if (nums === null || nums.length === 1) {
    return nums
  }
  if (nums.length === 0 || !k) return []
  for (let i = 0; i < nums.length; i++) {
    if (i < k - 1) {
      range.push(nums[i])
    } else {
      if (i === k - 1) {
        range.push(nums[i])
        res.push(Math.max(...range))
      } else {
        range.push(nums[i])
        range.shift()
        res.push(Math.max(...range))
      }
    }
  }
  return res
}

var nums = [1, 3, -1, -3, 5, 3, 6, 7], k = 3

console.log(maxSlidingAlpha(nums, k));
