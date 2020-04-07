/*
 * @lc app=leetcode.cn id=704 lang=javascript
 *
 * [704] 二分查找
 */

/* 
var search = function(nums, target) {
	let lo = 0, hi = nums.length-1;
	while (lo < hi) {
		let mid = lo + Math.floor((hi-lo+1)/2);
		if (target < nums[mid]) {
			hi = mid - 1
		} else {
			lo = mid;
		}
	}
	return nums[lo]==target?lo:-1;
};
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
  let start = 0,
    end = nums.length - 1
  while (start <= end) {
    const mid = Math.floor((start + end) / 2)
    const cur = nums[mid]

    if (cur === target) return mid

    if (cur < target) {
      start = mid + 1
    } else {
      end = mid - 1
    }
  }
  return -1
};
// @lc code=end

