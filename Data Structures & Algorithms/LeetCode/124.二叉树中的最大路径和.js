/*
 * @lc app=leetcode.cn id=124 lang=javascript
 *
 * [124] 二叉树中的最大路径和
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
// https://leetcode-cn.com/problems/binary-tree-maximum-path-sum/solution/shou-hui-tu-jie-hen-you-ya-de-yi-dao-dfsti-by-hyj8/
// Time O(N) where N is number of nodes, since we visit each node not more than 2 times.
// Space O(log(N)). We have to keep a recursion stack of the size of the tree height, which is O(log(N)) for the binary tree.
var maxPathSum = function(root) {
  let maxSum = Number.MIN_SAFE_INTEGER // 保存的值
  const dfs = (root) => {
    if (root === null) return 0 // 递归出口
    // 递归计算左右子节点的醉倒贡献值
    // 最有在最大贡献值大于 0 时， 才会选取对应子节点
    const left = Math.max(0, dfs(root.left)) // left max gain. If < 0, returning 0 means ignoring this branch
    const right = Math.max(0, dfs(root.right)) // right max gain
    maxSum = Math.max(maxSum, left + root.val + right) // 当前子树 maxSum 挑战的最大值
    return root.val + Math.max(left, right) // 向父节点提供最大和，要包括自己
  }
  dfs(root) // 递归入口
  return maxSum
};
// @lc code=end

