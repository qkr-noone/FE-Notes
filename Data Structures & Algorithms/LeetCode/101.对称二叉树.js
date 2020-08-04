/*
 * @lc app=leetcode.cn id=101 lang=javascript
 *
 * [101] 对称二叉树
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
// 递归 DFS  O(n) O(n)
/* var isSymmetric = function(root) {
  let help = (node1, node2) => {
    if (!node1 && !node2) return true
    if (!node1 || !node2 || node1.val !== node2.val) return false
    return help(node1.left, node2.right) && help(node1.right, node2.left)
  }
  if (root === null) return true
  return help(root.left, root.right)
}; */

// 迭代 BFS 队列 O(n) O(n)  https://leetcode-cn.com/problems/symmetric-tree/solution/dong-hua-yan-shi-101-dui-cheng-er-cha-shu-by-user7/
/* continue 声明终止当前循环或标记循环的当前迭代中的语句执行，并在下一次迭代时继续执行循环。 */
var isSymmetric = function (root) {
  if (root === null || (root.left === null && root.right === null)) return true
  let queue = [root.left, root.right]
  let left, right
  while (queue.length) {
    // 从队列中取出两节点
    left = queue.shift()
    right = queue.shift()
    // 两节点都为空 继续循环
    if (left === null && right === null) continue
    if (left === null || right === null || left.val !== right.val) return false
    // 将左节点的左孩子，右节点的右孩子 放入队列
    queue.push(left.left)
    queue.push(right.right)
    // 将左节点的右孩子，右节点的左孩子 放入队列
    queue.push(left.right)
    queue.push(right.left)
  }
  return true
};
// @lc code=end

