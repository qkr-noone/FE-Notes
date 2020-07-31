/*
 * @lc app=leetcode.cn id=104 lang=javascript
 *
 * [104] 二叉树的最大深度
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
/* 递归 
  Time: O(n) n二叉树节点的个数
  Space: O(height), height 二叉树高度 递归函数需要栈空间，而栈空间取决于递归的深度，
  因此空间复杂度等价于二叉树的高度
*/
/* var maxDepth = function(root) {
  if (root === null) return 0
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
}; */

/* 广度优先搜索
  O(n) n二叉树节点的个数
  空间复杂度：此方法空间的消耗取决于队列存储的元素数量，其在最坏情况下会达到 O(n)
    3       queue = [3]
   / \
  9  20     queue = [9,20]
    /  \
   15   7   queue = [15,7]

  声明 queue 存放本层所有节点
  循环遍历层节点，移除本层节点同时添加其子节点
  记录切换层级的次数及最大深度
*/  
var maxDepth = function (root) {
  if (root === null) return 0
  let queue = [root]
  let level = 0
  while (queue.length) {
    let size = queue.length
    while (size--) {
      let front = queue.shift()
      if (front.left) queue.push(front.left)
      if (front.right) queue.push(front.right)
    }
    level ++
  }
  return level
};
// @lc code=end

