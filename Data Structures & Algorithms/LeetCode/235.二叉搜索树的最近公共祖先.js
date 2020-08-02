/*
 * @lc app=leetcode.cn id=235 lang=javascript
 *
 * [235] 二叉搜索树的最近公共祖先
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
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
/* 
  我们来复习一下二叉搜索树（BST）的性质：

    节点 N 左子树上的所有节点的值都小于等于节点 N 的值
    节点 N 右子树上的所有节点的值都大于等于节点 N 的值
    左子树和右子树也都是 BST
    https://pic.leetcode-cn.com/d4ae198f46c063a84c91dc0488917f7d501d2ee352a398aec9d7e3f7ecd97fc2-image.png
    链接：https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-b

    https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-search-tree/solution/di-gui-he-die-dai-fa-by-hyj8/
 */
// 递归
var lowestCommonAncestor = function(root, p, q) {
  if (p.val < root.val && q.val < root.val) {
    return lowestCommonAncestor(root.left, p, q)
  }
  if (p.val > root.val && q.val > root.val) {
    return lowestCommonAncestor(root.right, p, q)
  }
  return root
};
// 迭代
var lowestCommonAncestor = function (root, p, q) {
  while (root) {
    if (p.val < root.val && q.val < root.val) {
      root = root.left
    } else if (p.val > root.val && q.val > root.val) {
      root = root.right
    } else {
      break
    }
  }
  return root
};
// @lc code=end

