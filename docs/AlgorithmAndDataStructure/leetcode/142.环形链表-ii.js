/*
 * @lc app=leetcode.cn id=142 lang=javascript
 *
 * [142] 环形链表 II
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
 * @return {ListNode}
 */
var detectCycle = function(head) {
  // 操场跑圈，只要是个圈，跑的快的，一定会和跑的慢的再次相遇
  let slow = head
  let fast = head
  let start = head // 起始点
  while (fast && fast.next) {
    fast = fast.next.next
    slow = slow.next
    if (fast === slow) {
      while (slow && start) {
        if (slow === start) {
          return slow
        }
        slow = slow.next
        start = start.next
      }
    }
  }
  return null
}
// @lc code=end

/**
 * 空间复杂度O(n)
 * @param {ListNode} head
 * @return {ListNode}
 */
// var detectCycle = function(head) {
//   while (head && head.next) {
//     if (head.flag) {
//       return head
//     }
//     head.flag = 1
//     head = head.next
//   }
//   return null
// }
