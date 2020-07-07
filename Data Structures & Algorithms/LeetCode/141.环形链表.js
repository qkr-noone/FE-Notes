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
// 变量标记法 时间复杂度为 O(n) ，空间复杂度为 O(n)
// var hasCycle = function(head) {
//   let cur = head
//   while (cur) {
//     if (cur.val === 'cycleFlag') {
//       return true
//     }
//     cur.val = 'cycleFlag'
//     cur = cur.next
//   }
//   return false
// };

// 哈希表
// 哈希表存储曾经遍历过的节点
// 遍历每一个节点，都查看哈希表是否存在当前节点，如果存在，则说明链表有环
// 如果不存在，则存入哈希表，并继续遍历下一节点
// 时间复杂度为 O(n) ，空间复杂度为 O(n)
var hasCycle = function (head) {
  let map = new Map()
  while (head) {
    if (map.has(head)) return true
    map.set(head, true)
    head = head.next
  }
  return false
}
// 暴力解法 时间复杂度为 O(n^2)，空间复杂度为 O(1)
// var hasCycle = (head) => {
//   let cur = head;
//   let step1 = 0
//   while (cur) {
//     step1++
//     let step2 = 0
//     let cur2 = head
//     while (cur2) {
//       step2++
//       if (cur == cur2) {
//         console.log(step1, step2)
//         if (step1 == step2) {
//           break
//         } else {
//           return true
//         }
//       }
//       cur2 = cur2.next
//     }
//     cur = cur.next
//   }
//   return false;
// };

// 快慢指针法 定义快慢2个指针，快的每次走2步，慢的每次走1步，当快慢指针相遇时，则有环
// 时间复杂度为 O(n) ，空间复杂度为 O(1)
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

