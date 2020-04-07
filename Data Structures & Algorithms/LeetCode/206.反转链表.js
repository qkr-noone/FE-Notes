/*
 * @lc app=leetcode.cn id=206 lang=javascript
 *
 * [206] 反转链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
/* 图解  */
// https://leetcode-cn.com/problems/reverse-linked-list/solution/dong-hua-yan-shi-206-fan-zhuan-lian-biao-by-user74/
/* 双指针迭代 */
// https://pic.leetcode-cn.com/7d8712af4fbb870537607b1dd95d66c248eb178db4319919c32d9304ee85b602-%E8%BF%AD%E4%BB%A3.gif
/* 递归解法 */
// https://pic.leetcode-cn.com/dacd1bf55dec5c8b38d0904f26e472e2024fc8bee4ea46e3aa676f340ba1eb9d-%E9%80%92%E5%BD%92.gif
var reverseList = function(head) {
  if (!head || !head.next) {
    return head
  }
  let cur = head, pre = null, temp = null

  while (cur) {
    temp = cur.next
    cur.next = pre
    pre = cur
    cur = temp
  }
  return pre
};
// 递归
// var reverseList = function (head) {
//   if (!head || !head.next) {
//     return head
//   }
//   let cur = head, pre = null, temp = null

//   const p = reverseList(head.next)
//   head.next.next = head
//   head.next = null
//   return p
// };
// @lc code=end

