/*
 * @lc app=leetcode.cn id=144 lang=javascript
 *
 * [144] 二叉树的前序遍历
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
 * 迭代方式
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function(root) {
  let result = []
  let stack = []
  let cur = root
  while (cur || stack.length > 0) {
    while (cur) {
      result.push(cur.val)
      stack.push(cur)
      cur = cur.left
    }
    cur = stack.pop()
    cur = cur.right
  }
  return result
}
// @lc code=end

/**
 * 递归方式
 * @param {TreeNode} root
 * @return {number[]}
 */
// var preorderTraversal = function(root, result = []) {
//   if (!root) {
//     return result
//   }
//   // 先处理自己，再处理左右
//   result.push(root.val)
//   preorderTraversal(root.left, result)
//   preorderTraversal(root.right, result)
//   return result
// }
