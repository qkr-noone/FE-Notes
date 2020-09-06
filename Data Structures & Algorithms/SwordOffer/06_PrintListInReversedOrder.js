/* 
剑指 Offer 06. 从尾到头打印链表
输入一个链表的头节点，从尾到头反过来返回每个节点的值（用数组返回）。
*/
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {number[]}
 */
// 方法一：栈
/* 时间复杂度：O(n)。正向遍历一遍链表，然后从栈弹出全部节点，等于又反向遍历一遍链表。
空间复杂度：O(n)。额外使用一个栈存储链表中的每个节点。 */
var reversePrint = function (head) {
  let temp = head
  let stack = new Array()
  while (temp) {
    stack.push(temp.val)
    temp = temp.next
  }
  let res = []
  while (stack.length) {
    res.push(stack.pop())
  }
  return res
};

// 方法二：递归法
/* 
时间复杂度 O(N)： 遍历链表，递归 N 次。
空间复杂度 O(N)： 系统递归需要使用 O(N) 的栈空间。
 */
/* 
1. 递推阶段： 每次传入 head.next ，以 head == null（即走过链表尾部节点）为递归终止条件，此时直接返回。
2. 回溯阶段： 层层回溯时，将当前节点值加入列表，即temp.push(head.val)。
3. 最终，将列表 temp 转化为数组 res ，并返回即可。

作者：jyd
链接：https://leetcode-cn.com/problems/cong-wei-dao-tou-da-yin-lian-biao-lcof/solution/mian-shi-ti-06-cong-wei-dao-tou-da-yin-lian-biao-d/
 */
var reversePrint2 = function (head) {
  let temp = []
  function recur(head) {
    if (head === null) return
    recur(head.next)
    temp.push(head.val)
  }
  recur(head)
  let res = []
  for (let i = 0; i < temp.length; i++) {
    res.push(temp[i])
  }
  
  return res
};
