/*
 * @lc app=leetcode.cn id=21 lang=javascript
 *
 * [21] 合并两个有序链表
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
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

/* 迭代 */
// https://leetcode-cn.com/problems/merge-two-sorted-lists/solution/he-bing-liang-ge-you-xu-lian-biao-by-leetcode-solu/
// var mergeTwoLists = function (l1, l2) {
//   const prehead = new ListNode(-1)

//   let prev = prehead
//   while (l1 !== null && l2 !== null) {
//     if (l1.val <= l2.val) {
//       prev.next = l1
//       l1 = l1.next
//     } else {
//       prev.next = l2
//       l2 = l2.next
//     }
//     prev = prev.next
//   }

//   // 合并后 l1 和 l2 最多只有一个还未被合并完，我们直接将链表末尾指向未合并完的链表即可
//   prev.next = l1 === null ? l2 : l1
//   console.log(prehead, prehead.next)
//   return prehead.next
// };

/* 递归 */
// https://leetcode-cn.com/problems/merge-two-sorted-lists/solution/hua-jie-suan-fa-21-he-bing-liang-ge-you-xu-lian-bi/
// https://pic.leetcode-cn.com/001e4c2fdd8b5d725bc25df6373f7590404d9ef16efdea6e3700b68c23500a7a-frame_00003.png
var mergeTwoLists = function(l1, l2) {
  if (l1 === null) return l2
  if (l2 === null) return l1

  if (l1.val < l2.val) {
    l1.next = mergeTwoLists(l1.next, l2)
    return l1
  } else {
    l2.next = mergeTwoLists(l1, l2.next)
    return l2
  }
};
// @lc code=end

