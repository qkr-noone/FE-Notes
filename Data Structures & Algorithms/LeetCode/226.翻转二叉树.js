/*
 * @lc app=leetcode.cn id=226 lang=javascript
 *
 * [226] 翻转二叉树
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
 * @return {TreeNode}
 */
var invertTree = function(root) {
  if (root === null) return null;
  let left = invertTree(root.left), right = invertTree(root.right)
  root.left = right
  root.right = left
  return root
};
// @lc code=end
`
解法一：递归
  时间复杂度：O(n)
  空间复杂度：O(n)
  思路
    递归交换当前节点的左右节点，当节点为null时返回
`
`
解法二：DFS 栈
  思路
    深度优先遍历
`
var invertTree = function (root) {
  let stack = [root]
  while (stack.length > 0) {
    let cur = stack.pop()
    if (cur === null) {
      continue
    }
    [cur.left, cur.right] = [cur.right, cur.left]
    stack.push(cur.right)
    stack.push(cur.left)
  }
  return root
};

`
解法三：BFS 队列
  时间复杂度：O(n)
  空间复杂度：O(n)
  思路
    广度优先遍历
`
var invertTree = function (root) {
  let queue = [root]
  while (queue.length > 0) {
    let cur = queue.pop()
    if (cur === null) {
      continue
    }
    [cur.left, cur.right] = [cur.right, cur.left]
    queue.unshift(cur.right)
    queue.unshift(cur.left)
  }
  return root
};

`
解法四：前序遍历
`
var invertTree = function (root) {
  if (root === null) return null;
  [root.left, root.right] = [root.right, root.left]
  invertTree(root.left)
  invertTree(root.right)
  return root
};

`
解法五：中序遍历
`
var invertTree = function (root) {
  if (root === null) return null;
  invertTree(root.left);
  [root.left, root.right] = [root.right, root.left]
  // 此时的 root.left 是上一步的 root.right
  invertTree(root.left)
  return root
};

`
解法六：后序遍历
`
var invertTree = function (root) {
  if (root === null) return null
  invertTree(root.left)
  invertTree(root.right);
  [root.left, root.right] = [root.right, root.left]
  return root
};