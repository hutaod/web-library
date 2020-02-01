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
//   let cur = head
//   while (cur) {
//     // 用解构方式简化代码
//     ;[cur.next, prev, cur] = [prev, cur, cur.next]
//     // // 先存取链表后续数据
//     // let next = cur.next
//     // // 把cur指向prev
//     // cur.next = prev
//     // // 把prev和cur指针向后移动一位
//     // prev = cur
//     // cur = next
//   }
//   return prev
// }
