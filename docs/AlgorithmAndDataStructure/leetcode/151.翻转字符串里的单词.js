/*
 * @lc app=leetcode.cn id=151 lang=javascript
 *
 * [151] 翻转字符串里的单词
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
  let res = ""
  let len = s.length
  let cur = ""
  for (let i = 0; i < len; i++) {
      if(s[i] !== " ") {
          cur = ""
          while (s[i] !== " " && s[i] !== undefined) {
              cur+=s[i]
              i++
          }
          res = cur + " " + res
      }
  }
  return res.trim()
};
// @lc code=end


/**
 * @name js自带方法暴力解法
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
  return s.trim().split(/[\s]+/).reverse().join(" ")
};
