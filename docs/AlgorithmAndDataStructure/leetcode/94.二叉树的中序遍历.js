/*
 * @lc app=leetcode.cn id=94 lang=javascript
 *
 * [94] 二叉树的中序遍历
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
 * 迭代解法
 * 思路：
 * 1. 找出所有左节点（包含根节点）
 * 2. 出栈后的节点一点是前一个出栈节点的父节点
 * 3. 除去左节点（包含根节点）就只剩下右节点，在进行查找右节点
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
  let result = []
  let stack = []
  let cur = root
  while (cur || stack.length > 0) {
    if (cur) {
      stack.push(cur)
      cur = cur.left
    } else {
      cur = stack.pop()
      result.push(cur.val)
      cur = cur.right
    }
  }
  return result
}
// @lc code=end

/**
 * 递归解法
 * @param {TreeNode} root
 * @return {number[]}
 */
// var inorderTraversal = function(root, result = []) {
//   if (root) {
//     inorderTraversal(root.left, result)
//     result.push(root.val)
//     inorderTraversal(root.right, result)
//   }
//   return result
// }
