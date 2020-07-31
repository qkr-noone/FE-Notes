/*
 * @lc app=leetcode.cn id=145 lang=javascript
 *
 * [145] 二叉树的后序遍历
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
 * @return {number[]}
 */
/* 递归 Time: O(n)  Space: O(n) */
/* var postorderTraversal = function(root) {
  let res = []
  let post = (root) => {
    if (root === null) return
    post(root.left)
    post(root.right)
    res.push(root.val)
  }
  post(root)
  return res
}; */
/* 非递归
  解题思路： 后序遍历与前序遍历不同的是：
  后序遍历是左右根   而前序遍历是根左右
  如果我们把前序遍历的 list.push(node.val) 变更为 list.unshift(node.val) （遍历结果逆序），
  那么遍历顺序就由 根左右 变更为 右左根
  然后我们仅需将 右左根 变更为 左右根 即可完成后序遍
 */
/* var postorderTraversal = function (root) {
  let res = [], stack = []
  if (root) stack.push(root)
  while (stack.length > 0) {
    let node = stack.pop()
    // 根左右 => 右左根
    res.unshift(node.val)
    // 先进栈左子树后右子树
    // 出栈的顺序就变更为先右后左
    // 右先头插法入list
    // 左再头插法入list
    // 实现右左根=>左右根

    if (node.left) stack.push(node.left)
    if (node.right) stack.push(node.right)
  }
  return res
}; */
var postorderTraversal = function (root) {
  let res = [], stack = []
  if (root) stack.push(root)
  while (stack.length) {
    let node = stack.shift()
    res.unshift(node.val)
    if (node.left) stack.unshift(node.left)
    if (node.right) stack.unshift(node.right)
  }
  /* while (stack.length) {
    let node = stack.pop()
    res.unshift(node.val)
    if (node.left) stack.push(node.left)
    if (node.right) stack.push(node.right)
  } */
  return res
}
// @lc code=end

