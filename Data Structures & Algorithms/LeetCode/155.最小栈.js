/*
 * @lc app=leetcode.cn id=155 lang=javascript
 *
 * [155] 最小栈
 */

// @lc code=start
/**
 * initialize your data structure here.
 */
var MinStack = function() {
  this.stack = []
  this.min_stack = []
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
  this.stack.push(x)
  if (this.min_stack.length === 0 || this.min_stack[this.min_stack.length - 1] >= x) {
    this.min_stack.push(x)
  }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
  if (this.stack.pop() === this.min_stack[this.min_stack.length - 1]) {
    this.min_stack.pop()
  }
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
  return this.stack[this.stack.length - 1]
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
  return this.min_stack[this.min_stack.length - 1]
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
// @lc code=end
`
解法一：基栈 + 辅助栈
时间复杂度：O(1)
空间复杂度：O(n)
思路
额外维护一个最小值栈，初始化为第一个元素，用来保存历史最小值集合
入栈
  当有更小值入栈时，将当前值入最小栈中
出栈
  当出栈值 == 当前最小值时，最小栈的值也要删掉，最小值自热更新为前一步的最小值
取最小值
  返回与当前基栈同步的最小栈的栈顶元素即为最小值
`
`
入栈 3 
|   |    |   |
|   |    |   |
|_3_|    |_3_|
stack  minStack

入栈 5 ， 5 大于 minStack 栈顶，不处理
|   |    |   |
| 5 |    |   |
|_3_|    |_3_|
stack  minStack

入栈 2 ，此时右边的 minStack 栈顶就保存了当前最小值 2 
| 2 |    |   |
| 5 |    | 2 |
|_3_|    |_3_|
stack  minStack

出栈 2，此时右边的 minStack 栈顶就保存了当前最小值 3
|   |    |   |
| 5 |    |   |
|_3_|    |_3_|
stack  minStack

出栈 5，右边 minStack 不处理
|   |    |   |
|   |    |   |
|_3_|    |_3_|
stack  minStack

出栈 3
|   |    |   |
|   |    |   |
|_ _|    |_ _|
stack  minStack
`
