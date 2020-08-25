/*
 * @lc app=leetcode.cn id=524 lang=javascript
 *
 * [524] 通过删除字母匹配到字典里最长单词
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string[]} d
 * @return {string}
 */
/* https://leetcode-cn.com/problems/longest-word-in-dictionary-through-deleting/solution/js-qie-ge-zi-fu-chuan-shuang-zhi-zhen-by-lxow456/ */
function find(str, word) {
  let i = 0, j = 0;
  while (j < str.length) {
    if (word[i] === str[j]) {
      i++;
      j++;
    } else {
      j++;
    };
  };
  return i === word.length;
}

var findLongestWord = function(s, d) {
  if (!d) return ''
  d = d.sort()
  let longest = ''
  for (let i = 0; i < d.length; i++) {
    const curr = d[i]
    const isDel = find(s, curr)
    if (isDel && curr.length > longest.length) longest = curr
  }
  return longest
};
// @lc code=end

