/*
 * @lc app=leetcode.cn id=226 lang=javascript
 *
 * [226] 翻转二叉树
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
 * @return {TreeNode}
 */
var invertTree = function(root) {
  if (!root) {
    return root
  }
  // let left = root.left
  // root.left = invertTree(root.right)
  // root.right = invertTree(left)
  // 上面代码可简写为下面这样
  ;[root.left, root.right] = [invertTree(root.right), invertTree(root.left)]
  return root
}
// @lc code=end
