/*
 * @lc app=leetcode.cn id=92 lang=javascript
 *
 * [92] 反转链表 II
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
 * @param {number} m
 * @param {number} n
 * @return {ListNode}
 */
var reverseBetween = function(head, m, n) {
  let mockHead = new ListNode()
  mockHead.next = head
  let prev = null
  let leftHead = mockHead
  let cur = head
  while(m - 1 > 0) {
      leftHead = cur
      cur = cur.next
      m--
      n--
  }
  // prev = leftHead
  // prev.next = null
  let leftCur = cur;
  while(n > 0) {
      n--
      const next = cur.next
      cur.next = prev
      prev = cur
      cur = next
  }
  console.log(leftHead, JSON.stringify(prev), cur)
  leftCur.next = cur
  leftHead.next = prev
  console.log(JSON.stringify(mockHead.next))
  return mockHead.next
};
// @lc code=end

function ListNode(val) {
  this.val = val;
  this.next = null;
}

// const list = {
//   val: 1,
//   next: {
//     val: 2,
//     next: {
//       val: 3,
//       next: {
//         val: 4,
//         next: {
//           val: 5,
//           next: null
//         }
//       }
//     }
//   }
// }

const list = {
  val: 3,
  next: {
    val: 5,
    next: null
  }
}

reverseBetween(list, 1, 2)