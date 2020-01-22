/*
 * @lc app=leetcode.cn id=141 lang=javascript
 *
 * [141] 环形链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
  let cur = head
  const obj = {}
  while (cur) {
    if (obj[cur.val] === cur) {
      return true
    } else {
      obj[cur.val] = cur
    }
    cur = cur.next
  }
  return false
}
// @lc code=end

/**
 * O(n)解法
 * @param {ListNode} head
 * @return {boolean}
 */
// var hasCycle = function(head) {
//   let cur = head
//   const obj = {}
//   while (cur) {
//     if (obj[cur.val] === cur) {
//       return true
//     } else {
//       obj[cur.val] = cur
//     }
//     cur = cur.next
//   }
//   return false
// }
