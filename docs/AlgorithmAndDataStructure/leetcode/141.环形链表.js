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
 * 空间复杂度O(1)
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
  // 操场跑圈，只要是个圈，跑的快的，一定会和跑的慢的再次相遇
  let slow = head
  let fast = head
  while (fast && fast.next) {
    fast = fast.next.next
    slow = slow.next
    if (fast === slow) {
      return true
    }
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
