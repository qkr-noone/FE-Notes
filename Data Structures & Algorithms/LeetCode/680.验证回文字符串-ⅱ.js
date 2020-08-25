/*
 * @lc app=leetcode.cn id=680 lang=javascript
 *
 * [680] 验证回文字符串 Ⅱ
 */

// @lc code=start
/**
 * @param {string} str
 * @return {boolean}
 */
/* 双指针
时间复杂度：O(n) 其中 n 是字符串的长度。判断整个字符串是否是回文字符串的时间复杂度是 O(n)
空间复杂度：O(1)。只需要维护有限的常量空间 */

function isPalindrome (str, left, right) { // 辅助函数
  while (left < right) { // 指针相遇循环结束
    if (str[left] !== str[right]) {
      return false // 一票否决
    }
    left++
    right--
  }
  return true
}

var validPalindrome = function(str) {
  let left = 0, right = str.length - 1
  while (left < right) { // 头尾指针
    if (str[left] !== str[right]) { // 判断删除之后字符是否回文
      return isPalindrome(str, left + 1, right) || isPalindrome(str, left, right - 1)
    }
    left++
    right--
  }
  return true
};
// @lc code=end

