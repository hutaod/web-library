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
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function(head, val) {
  let cur = head
  let prev
  while (cur) {
    // 如果等于就删除
    if (cur.val === val) {
      // 如果prev存在，
      if (prev) {
        // 上一个节点指向下一个节点，就会删除当前节点
        prev.next = cur.next
        // 清除删除的节点的next
        cur.next = null
        // 给当前节点重新赋值
        cur = prev.next
      } else {
        // 上一个节点指向下一个节点，就会删除当前节点
        head = cur.next
        // 清除删除的节点的next
        cur.next = null
        // 给当前节点重新赋值
        cur = head
      }
    } else {
      // 上一个和当前都有保存
      prev = cur
      cur = cur.next
    }
  }
  return head
}
// @lc code=end
