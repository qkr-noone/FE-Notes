/*
 * @lc app=leetcode.cn id=111 lang=javascript
 *
 * [111] 二叉树的最小深度
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
  时间复杂度为O(N) 其中 NN 是节点个数
  空间复杂度：最坏情况下，整棵树是非平衡的，例如每个节点都只有一个孩子，递归会调用 N （树的高度）次，因此栈的空间开销是 O(N)。
  但在最好情况下，树是完全平衡的，高度只有 log(N)，因此在这种情况下空间复杂度只有 O(log(N)
*/
/* var minDepth = function(root) {
  if (root === null) return 0
  if (root.left && root.right) {
    return Math.min(minDepth(root.left), minDepth(root.right)) + 1 
  } else if (root.left) {
    return minDepth(root.left) + 1
  } else if (root.right) {
    return minDepth(root.right) + 1
  } else {
    return 1
  }
}; */

/* 非递归 */
var minDepth = function (root) {
  if (root === null) return 0
  let count = 0, queue = [root]
  while (queue.length) {
    let size = queue.length
    while (size--) {
      let node = queue.shift()
      if (!node.left && !node.right) return count + 1
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }
    count ++
  }
  return count
};
// @lc code=end

