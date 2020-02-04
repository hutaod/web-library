/*
 * @lc app=leetcode.cn id=98 lang=javascript
 *
 * [98] 验证二叉搜索树
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
 * 接收一个lower和upper用于判断
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function(root, lower, upper) {
  if (!root) {
    return true
  }
  let val = root.val
  // 判断lower存在并且如果val小于等于lower 返回false
  if (lower !== null && val <= lower) {
    return false
  }
  // 判断upper存在并且如果val大于等于upper 返回false
  if (upper !== null && val >= upper) {
    return false
  }
  if (!isValidBST(root.right, val, upper)) {
    return false
  }
  if (!isValidBST(root.left, lower, val)) {
    return false
  }
  return true
}
// @lc code=end
