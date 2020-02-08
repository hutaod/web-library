/*
 * @lc app=leetcode.cn id=102 lang=javascript
 *
 * [102] 二叉树的层次遍历
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
 * 层序遍历 - 递归
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root, result = [], depth = 0) {
  if (!root) {
    return result
  }
  let val = root.val
  if (result[depth]) {
    result[depth].push(val)
  } else {
    result[depth] = [val]
  }
  levelOrder(root.left, result, depth + 1)
  levelOrder(root.right, result, depth + 1)
  return result
}
// @lc code=end

/**
 * 层序遍历 - 迭代
 * @param {TreeNode} root
 * @return {number[][]}
 */
// var levelOrder = function(root) {
//   let res = []
//   let queue = [root]
//   while (queue.length) {
//     let arr = [],
//       nextQueue = []
//     while (queue.length) {
//       let cur = queue.shift()
//       arr.push(cur.val)
//       if (cur.left) {
//         nextQueue.push(cur.left)
//       }
//       if (cur.right) {
//         nextQueue.push(cur.right)
//       }
//     }
//     queue = nextQueue
//     res.push(arr)
//   }
//   return res
// }
