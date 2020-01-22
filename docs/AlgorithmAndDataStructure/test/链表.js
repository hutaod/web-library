class Node {
  constructor(element) {
    this.element = element
    this.next = null
  }
}

class LinkNodeList {
  constructor() {
    // 链表的第一个元素
    this.head = null
    this.length = 0
  }
  // 新增
  append(element) {
    const node = new Node(element)
    let cur = this.head
    // 2种情况 1.链表是空的，2.链表不是空的
    if (cur === null) {
      this.head = node
    } else {
      // 遍历
      while (cur.next) {
        cur = cur.next
      }
      cur.next = node
    }
    this.length += 1
  }
  // 打印
  print() {
    const res = []
    let cur = this.head
    while (cur) {
      res.push(cur.element)
      cur = cur.next
    }
    console.log(res.join(' ==> ') || 'no element!')
  }
  // 删除
  removeAt(index) {
    // 上一个节点指向下一个节点
    let cur = this.head
    let prev
    let i = 0
    if (index === 0) {
      this.head = cur.next
      cur.next = null
    } else {
      while (index > i) {
        // 上一个和当前都有保存
        prev = cur
        cur = cur.next
        i++
      }
      prev.next = cur.next
      cur.next = null
    }
    this.length -= 1
    return cur.element
  }
}

const link = new LinkNodeList()
link.print()
link.append('哈哈')
link.append('你是个憨憨')
link.append('英雄啊')
link.print()
link.removeAt(0)
link.print()
