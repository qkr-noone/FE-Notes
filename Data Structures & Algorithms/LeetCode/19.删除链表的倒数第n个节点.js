/*
 * @lc app=leetcode.cn id=19 lang=javascript
 *
 * [19] 删除链表的倒数第N个节点
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
 * @param {number} n
 * @return {ListNode}
 */
// https://mp.weixin.qq.com/s/KMl8ZigBWeL7pOAtzekerw
// 双指针
var removeNthFromEnd = function(head, n) {
  if (n === 0) return head
  let p = new ListNode(-1)
  p.next = head
  let a = p, b = p
  while (n > 0) {
    b = b.next
    n--
  }
  while (b.next !== null) {
    a = a.next
    b = b.next
  }
  a.next = a.next.next
  console.log(p, p.next)
  return p.next
  // 去掉 p 新建的队头
  // 删除后返回 p.next，为什么不直接返回 head 呢，因为 head 有可能是被删掉的点
};
// @lc code=end

