/*
 * @lc app=leetcode.cn id=145 lang=javascript
 *
 * [145] 二叉树的后序遍历
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
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function(root, result = []) {
  if (!root) {
    return result
  }
  // 先处理左右，再处理自己
  postorderTraversal(root.left, result)
  postorderTraversal(root.right, result)
  result.push(root.val)
  return result
}
// @lc code=end
