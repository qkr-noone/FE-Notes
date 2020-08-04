/*
 * @lc app=leetcode.cn id=543 lang=javascript
 *
 * [543] 二叉树的直径
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
// 递归 DFS
/* var diameterOfBinaryTree = function(root) {
  let ans = 1
  function depth (rootNode) {
    if (!rootNode) return 0
    let L = depth(rootNode.left)
    let R = depth(rootNode.right)
    ans = Math.max(ans, L + R + 1)
    return Math.max(L, R) + 1
  }
  depth(root)
  return ans - 1
}; */
var diameterOfBinaryTree = function (root) {
  function depth(rootNode) {
    if (!rootNode) return 0
    let L = rootNode.left ? depth(rootNode.left) + 1 : 0
    let R = rootNode.right ? depth(rootNode.right) + 1 : 0
    let cur = L + R
    if (cur > max) max = cur
    return Math.max(L, R)
  }
  let max = 0
  if (!root) return 0
  depth(root)
  return max
};
// @lc code=end

