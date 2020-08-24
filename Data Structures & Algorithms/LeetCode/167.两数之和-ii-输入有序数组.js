/*
 * @lc app=leetcode.cn id=167 lang=javascript
 *
 * [167] 两数之和 II - 输入有序数组
 */

// @lc code=start
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
/* 哈希表使用 O(n) 的时间复杂度和 O(n) 的空间复杂度， 针对无序数组的，没有利用到输入数组有序的性质 */
/* var twoSum = function(numbers, target) {
  let map = new Map()
  for (let i = 0; i < numbers.length; i++) {
    const element = numbers[i];
    if (map.has(numbers[i])) {
      return [map.get(numbers[i]) + 1, i + 1]
    } else {
      map.set(target - numbers[i], i)
    }
  }
}; */
/* 双指针 利用数组的有序性质 可以得到时间复杂度和空间复杂度更优的解法 */
// 时间复杂度为 O(N) 空间复杂度为 O(1)
var twoSum = function (numbers, target) {
  let left = 0, right = numbers.length - 1
  while (left < right) {
    let sum = numbers[left] + numbers[right]
    if (sum === target) return [left + 1, right + 1]
    else if (sum > target) right--
    else if (sum < target) left++
  }
}
// @lc code=end

