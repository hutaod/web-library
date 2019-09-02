# 数据结构

## 二叉树

### 二叉树的中序遍历

#### 题目

给定一个二叉树，返回它的中序遍历
示例：

```javascript
输入: [1,null,2,3]
   1
    \
     2
    /
   3
输出: [1,3,2]
```

进阶：递归算法很简单，尝试通过迭代算法完成？

#### 代码

递归实现

```javascript
var inorderTraversal = function(root, array = []) {
  if (root) {
    inorderTraversal(root.left, array)
    array.push(root.val)
    inorderTraversal(root.right, array)
  }
  return array
}
```
