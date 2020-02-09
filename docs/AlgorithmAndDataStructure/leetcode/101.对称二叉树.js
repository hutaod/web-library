/*
 * @lc app=leetcode.cn id=101 lang=javascript
 *
 * [101] 对称二叉树
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
 * 对称二叉树 - 迭代
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {
  if (!root) {
    return true
  }
  let queue = []
  queue.push(root.left, root.right)
  while (queue.length > 0) {
    let q1 = queue.shift()
    let q2 = queue.shift()
    if (!q1 && !q2) {
      continue
    }
    if (!q1 || !q2) {
      return false
    }
    if (q1.val !== q2.val) {
      return false
    }
    queue.push(q1.left, q2.right, q1.right, q2.left)
  }
  return true
}
// @lc code=end

/**
 * 对称二叉树 - 递归
 * @param {TreeNode} root
 * @return {boolean}
 */
// var isSymmetric = function(root) {
//   if (!root) {
//     return true
//   }
//   function leftIsLikeRight(left, right) {
//     if (!left || !right) {
//       return left === right
//     }
//     return (
//       left.val === right.val &&
//       leftIsLikeRight(left.left, right.right) &&
//       leftIsLikeRight(left.right, right.left)
//     )
//   }
//   return leftIsLikeRight(root.left, root.right)
// }
