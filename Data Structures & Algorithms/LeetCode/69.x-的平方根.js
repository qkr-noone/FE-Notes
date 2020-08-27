/*
 * @lc app=leetcode.cn id=69 lang=javascript
 *
 * [69] x 的平方根
 */

// @lc code=start
/**
 * @param {number} x
 * @return {number}
 */
/* 二分查找，逼近目标值 https://leetcode-cn.com/problems/sqrtx/solution/jserba-ti-jiang-tou-er-fen-cha-zhao-wei-yun-suan-d/ */
// 时间复杂度：O(logx)，即为二分查找需要的次数。

// 空间复杂度：O(1)
var mySqrt = function(x) {
  if (x < 2) return x
  let left = 1, right = x >>> 1
  while (left + 1 < right) {
    let mid = (left + right) >>> 1
    if (mid === x/mid) {
      return mid
    } else if(mid < x/mid) {
      left = mid
    } else {
      right = mid
    }
  }
  return right > x/right ? left : right
};
// @lc code=end

