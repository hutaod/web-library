/*
 * @lc app=leetcode.cn id=203 lang=javascript
 *
 * [203] 移除链表元素
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
 * 添加哨兵，让所有元素的删除逻辑统一
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function(head, val) {
  // a => b => c
  // 哨兵 => a => b => c
  let ele = {
    next: head,
  }
  let cur = ele
  while (cur.next) {
    // 如果等于就删除
    if (cur.next.val === val) {
      cur.next = cur.next.next
    } else {
      cur = cur.next
    }
  }
  return ele.next
}
// @lc code=end

/**
 * 添加prev来存储前一个元素，cur存储当前元素
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
// var removeElements = function(head, val) {
//   let cur = head
//   let prev
//   while (cur) {
//     // 如果等于就删除
//     if (cur.val === val) {
//       // 如果prev存在，
//       if (prev) {
//         // 上一个节点指向下一个节点，就会删除当前节点
//         prev.next = cur.next
//         // 清除删除的节点的next
//         cur.next = null
//         // 给当前节点重新赋值
//         cur = prev.next
//       } else {
//         // 上一个节点指向下一个节点，就会删除当前节点
//         head = cur.next
//         // 清除删除的节点的next
//         cur.next = null
//         // 给当前节点重新赋值
//         cur = head
//       }
//     } else {
//       // 上一个和当前都有保存
//       prev = cur
//       cur = cur.next
//     }
//   }
//   return head
// }
