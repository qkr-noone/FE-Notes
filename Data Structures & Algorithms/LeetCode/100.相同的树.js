/*
 * @lc app=leetcode.cn id=100 lang=javascript
 *
 * [100] 相同的树
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
//  递归 DFS O(n) O(n)
var isSameTree = function(p, q) {
  let isMirror = (p, q) => {
    if (p === null && q === null) return true
    else if (p === null || q === null || p.val !== q.val) return false
    return isMirror(p.left, q.left) && isMirror(p.right, q.right)
  }
  return isMirror(p, q)
};
//  迭代 BFS O(n) O(n)
var isSameTree = function (p, q) {
  let queue = [p, q], left, right
  while (queue.length) {
    left = queue.shift()
    right = queue.shift()
    if (left === null && right === null) continue
    if (left === null || right === null || left.val !== right.val) return false
    queue.push(left.left)
    queue.push(right.left)
    queue.push(left.right)
    queue.push(right.right)
  }
  return true
};
// @lc code=end

