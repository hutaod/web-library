/*
 * @lc app=leetcode.cn id=235 lang=javascript
 *
 * [235] 二叉搜索树的最近公共祖先
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
  let parentVal = root.val
  let pVal = p.val
  let qVal = q.val

  if (pVal > parentVal && qVal > parentVal) {
    // 如果两个节点都大于parentVal,就像右节点查找
    return lowestCommonAncestor(root.right, p, q)
  } else if (pVal < parentVal && qVal < parentVal) {
    // 如果两个节点都小于parentVal,就像左节点查找
    return lowestCommonAncestor(root.left, p, q)
  } else {
    // 这时候就只有一个节点小于parentVal，一个节点大于parentVal，
    // 符合二叉搜索树的特点，就直接返回该节点
    return root
  }
}
// @lc code=end
