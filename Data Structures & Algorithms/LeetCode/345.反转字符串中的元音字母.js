/*
 * @lc app=leetcode.cn id=345 lang=javascript
 *
 * [345] 反转字符串中的元音字母
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
/*
时间复杂度为 O(N)：只需要遍历所有元素一次
空间复杂度 O(1)：只需要使用两个额外变量
*/
var reverseVowels = function(s) {
  let set = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'])
  let arr = s.split('')
  let left = 0, right = arr.length - 1
  while (left < right) {
    if (set.has(arr[left])) {
      if (set.has(arr[right])) {
        [arr[left], arr[right]] = [arr[right], arr[left]]
        left++
        right--
      } else {
        right--
      }
    } else {
      left++
    }
  }
  return arr.join('')
};
// @lc code=end

