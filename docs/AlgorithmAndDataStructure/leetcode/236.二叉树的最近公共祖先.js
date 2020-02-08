/*
 * @lc app=leetcode.cn id=236 lang=javascript
 *
 * [236] 二叉树的最近公共祖先
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
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
  var res = null
  function recurseTree(root, p, q) {
    if (!root) {
      return false
    }
    var left = recurseTree(root.left, p, q) ? 1 : 0
    var right = recurseTree(root.right, p, q) ? 1 : 0
    var mid = root === p || root === q ? 1 : 0
    if (left + right + mid >= 2) {
      res = root
    }
    return left + right + mid > 0
  }
  recurseTree(root, p, q)
  return res
}
// @lc code=end
