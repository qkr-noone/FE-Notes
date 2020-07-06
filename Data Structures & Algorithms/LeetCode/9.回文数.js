/*
 * @lc app=leetcode.cn id=9 lang=javascript
 *
 * [9] 回文数
 */

// @lc code=start
/**
 * @param {number} x
 * @return {boolean}
 */
// var isPalindrome = function(x) {
//   if (x < 0) return false
//   let rev = 0
//   for (let i = x; i >= 1; i = Math.floor(i / 10)) {
//     rev = rev * 10 + i % 10
//   }
//   return rev === x
// };

// 方法一：反转一半数字
// 时间复杂度：O(\log n)O(logn)，对于每次迭代，我们会将输入除以 1010，因此时间复杂度为 O(\log n)O(logn)。
// 空间复杂度：O(1)O(1) 。我们只需要常数空间存放若干变量。
var isPalindrome = function(x) {
  // 特殊情况：
  // 如上所述，当 x < 0 时，x 不是回文数。
  // 同样地，如果数字的最后一位是 0，为了使该数字为回文，
  // 则其第一位数字也应该是 0
  // 只有 0 满足这一属性
  if (x < 0 || (x % 10 === 0 && x !== 0)) {
    return false;
  }

  let revertedNumber = 0;
  while (x > revertedNumber) {
    revertedNumber = revertedNumber * 10 + x % 10;
    x = Math.floor(x / 10);
  }

  // 当数字长度为奇数时，我们可以通过 revertedNumber/10 去除处于中位的数字。
  // 例如，当输入为 12321 时，在 while 循环的末尾我们可以得到 x = 12，revertedNumber = 123，
  // 由于处于中位的数字不影响回文（它总是与自己相等），所以我们可以简单地将其去除。
  return x === revertedNumber || x === Math.floor(revertedNumber / 10);
};
// @lc code=end

