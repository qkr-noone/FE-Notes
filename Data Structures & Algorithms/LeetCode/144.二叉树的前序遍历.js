/*
 * @lc app=leetcode.cn id=144 lang=javascript
 *
 * [144] 二叉树的前序遍历
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
`
递归
`
// var preorderTraversal = function(root) {
//   let arr = []
//   let traverse = (root) => {
//     if (root === null) {
//       return
//     }
//     arr.push(root.val)
//     traverse(root.left)
//     traverse(root.right)
//   }
//   traverse(root)
//   return arr
// };

/* 非递归
解法二：DFS 栈
  思路
    深度优先遍历
 */
var preorderTraversal = function (root) {
  if (root === null) return []
  let stack = [root], res = []
  while(stack.length) {
    let node = stack.pop()
    res.push(node.val)
    // （栈）左孩子后进先出，进行先左后右的深度优先遍历
    if (node.right) stack.push(node.right)
    if (node.left) stack.push(node.left)
  }
  return res
};
// @lc code=end

