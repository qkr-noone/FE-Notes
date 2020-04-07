/*
 * @lc app=leetcode.cn id=141 lang=javascript
 *
 * [141] 环形链表
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
 * @return {boolean}
 */
// 变量标记法
var hasCycle = function(head) {
  let cur = head
  while (cur) {
    if (cur.val === 'cycleFlag') {
      return true
    }
    cur.val = 'cycleFlag'
    cur = cur.next
  }
  return false
};
// 快慢指针法 定义快慢2个指针，快的每次走2步，慢的每次走1步，当快慢指针相遇时，则有环
// var hasCycle = function (head) {
//   if (!head || !head.next) {
//     return false
//   }
//   let slow = head
//   let fast = head.next
//   while (fast !== slow) {
//     if (!fast || !fast.next) {
//       return false
//     }
//     fast = fast.next.next
//     slow = slow.next
//   }
//   return true
// };
// @lc code=end

