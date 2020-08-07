/*
 * @lc app=leetcode.cn id=257 lang=javascript
 *
 * [257] 二叉树的所有路径
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
 * @return {string[]}
 */
// DFS 递归
var binaryTreePaths = function(root) {
  let res = [], path = []
  let dfs = (node) => {
    if (!node) {
      return
    }
    path.push(node)
    dfs(node.left)
    dfs(node.right)
    if (!node.left && !node.right) {
      res.push(path.map(item => item.val).join('->'))
    }
    // 注意每访问完一个节点记得把它从path中删除，达到回溯效果
    path.pop()
  }
  dfs(root)
  return res
};
// var binaryTreePaths = function (root) {
//   if (root === null) {
//     return []
//   }
//   let stack = []
//   let p = root
//   let set = new Set()
//   let res = []
//   while (stack.length || p) {
//     while (p) {
//       stack.push(p)
//       p = p.left
//     }
//     let node = stack[stack.length - 1]
//     if (!node.right && !node.left) {
//       res.push(stack.map(item => item.val).join('->'))
//     }
//     if (node.right && !set.has(node.right)) {
//       p = node.right
//       set.add(node.right)
//     } else {
//       stack.pop()
//     }
//   }
//   return res
// };
// @lc code=end

