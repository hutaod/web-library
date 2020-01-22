/*
 * @lc app=leetcode.cn id=206 lang=javascript
 *
 * [206] 反转链表
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
 * 递归方式
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
  let reverse = (prev, cur) => {
    if (!cur) {
      return prev
    }
    let next = cur.next
    cur.next = prev
    return reverse(cur, next)
  }

  return reverse(null, head)
}
// @lc code=end

/**
 * 迭代方式
 * @param {ListNode} head
 * @return {ListNode}
 */
// var reverseList = function(head) {
//   // 反转后第一个指向null，后面的执行方向改变
//   let prev = null
//   // 指针
//   let cur = head
//   while (cur) {
//     // 获取下一个指针
//     let next = cur.next
//     // 改变指针当前的next为prev，
//     // 比如：链表头部反转为尾部，next就为null，
//     // 之前的第二个元素的next就是cur
//     cur.next = prev
//     prev = cur
//     // 指针到next
//     cur = next
//   }
//   return prev
// }
