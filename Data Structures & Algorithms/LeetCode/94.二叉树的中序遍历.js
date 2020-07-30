/*
 * @lc app=leetcode.cn id=94 lang=javascript
 *
 * [94] 二叉树的中序遍历
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
/*
  递归
  时间复杂度：O(n)。递归函数 T(n) = 2⋅T(n/2)+1
  空间复杂度：最坏情况下需要空间O(n)，平均情况为 O(logn)。
 */
var inorderTraversal = function(root) {
  let res = []
  let tra = (root) => {
    if (root === null) return
    tra(root.left)
    res.push(root.val)
    tra(root.right)
  }
  tra(root)
  return res
};
/* 非递归
    解法二：DFS 栈
      思路
        深度优先遍历
  时间复杂度：O(n)
  空间复杂度：O(n)
 */
var inorderTraversal = function(root) {
  if (root === null) return []
  let res = [], stack = [], cur = root
  while (stack.length || cur) {
    while (cur) {
      stack.push(cur)
      cur = cur.left
    }
    cur = stack.pop()
    res.push(cur.val)
    cur = cur.right
  }
  return res
};
// @lc code=end
