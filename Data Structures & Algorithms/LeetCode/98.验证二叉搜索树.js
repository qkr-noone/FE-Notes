/*
 * @lc app=leetcode.cn id=98 lang=javascript
 *
 * [98] 验证二叉搜索树
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
 * @return {boolean}
 */
// 时间复杂度 : O(n)
// 空间复杂度: O(n) ，其中 n 为二叉树的节点个数。递归函数在递归过程中需要为每一层递归函数分配栈空间，所以这里需要额外的空间且该空间取决于递归的深度，即二叉树的高度。最坏情况下二叉树为一条链，树的高度为 n ，递归最深达到 n 层，故最坏情况下空间复杂度为 O(n) 。
// https://leetcode-cn.com/problems/validate-binary-search-tree/solution/yan-zheng-er-cha-sou-suo-shu-by-leetcode-solution/
/* var isValidBST = function(root) {
  let helper = (root, lower, upper) => {
    if (root === null) return true
    if (root.val <= lower || root.val >= upper) return false
    return helper(root.left, lower, root.val) && helper(root.right, root.val, upper)
  }
  return helper(root, -Infinity, Infinity)
}; */
// 中序遍历
var isValidBST = function (root) {
  let stack = []
  let inorder = -Infinity

  while (stack.length || root !== null) {
    while (root !== null) {
      stack.push(root)
      root = root.left
    }
    root = stack.pop()
    // 如果中序遍历得到的节点值小于等于前一个 inorder， 说明不是二叉搜索树
    if (root.val <= inorder) {
      return false
    }
    inorder = root.val
    root = root.right
  }
  return true
};
// @lc code=end

