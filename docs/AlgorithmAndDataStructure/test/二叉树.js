/**
 * 前序遍历
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function(root) {
  let stack = [] // 用于存放每个节点
  let result = [] // 用于获取二叉树的所有val值
  let cur = root // 当前节点
  // 1，先把当前节点的左节点放入栈中，并获取当前节点的val，然后改变当前节点为当前节点的左节点，如果没有左节点就会终止这一步
  // 2，这时候栈中存在了一系列左节点，然后出栈拿取栈中最后一个节点，并把节点的右节点设置为当前节点
  // 3. 如果当前节点存在，就会返回操作1执行，如果不存在，就会返回操作2执行
  // 上面的操作顺序就是先直接拿取每个节点的值，然后拿该节点的左节点，最后获取该节点右节点
  while (cur || stack.length > 0) {
    while (cur) {
      // console.log(cur)
      stack.push(cur)
      result.push(cur.val)
      cur = cur.left
    }
    cur = stack.pop()
    // console.log(cur)
    cur = cur.right
  }
  return result
}

const root = {
  val: 1,
  left: {
    val: 5,
    left: {
      val: 3,
    },
    right: {
      val: 4,
    },
  },
  right: {
    val: 5,
    left: {
      val: 4,
    },
    right: {
      val: 3,
    },
  },
}

// console.log(preorderTraversal(root))

/**
 * 中序遍历
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
  let stack = [] // 用于存放每个节点
  let result = [] // 用于获取二叉树的所有val值
  let cur = root // 当前节点
  // 1，先把所有左节点放入栈中，然后改变当前节点为当前节点的左节点，如果没有左节点就会终止这一步
  // 2，这时候栈中存在了一系列左节点，然后出栈拿取栈中最后一个节点，并获取val，并把节点的右节点设置为当前节点
  // 3，如果当前节点存在，就会返回操作1执行，如果不存在，就会返回操作2执行
  while (cur || stack.length > 0) {
    while (cur) {
      // console.log(cur)
      stack.push(cur)
      cur = cur.left
    }
    cur = stack.pop()
    result.push(cur.val)
    // console.log(cur)
    cur = cur.right
  }
  return result
}

// console.log(inorderTraversal(root))

/**
 * 后序遍历
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function(root) {
  let stack = [] // 用于存放每个节点
  let result = [] // 用于获取二叉树的所有val值
  let cur = root // 当前节点
  // 思路：
  // 1. 遍历方式和前序遍历类似，但是先遍历节点的右节点，这时候也是前序遍历，但是最后值的顺序变成了 cur => right => left ,
  // 2. 如果想把cur => right => left 变成 left => right => cur，把存入result的值变换一下顺序，或者说是直接进行unshift，类似反向入栈即可
  while (cur || stack.length > 0) {
    while (cur) {
      // console.log(cur)
      stack.push(cur)
      result.unshift(cur.val)
      cur = cur.right
    }
    cur = stack.pop()
    // console.log(cur)
    cur = cur.left
  }
  return result
}

// console.log(postorderTraversal(root))

// /**
//  * 层序遍历 - 递归
//  * @param {TreeNode} root
//  * @return {number[][]}
//  */
// var levelOrder = function(root, result = [], depth = 0) {
//   if (!root) {
//     return result
//   }
//   let val = root.val
//   if (result[depth]) {
//     result[depth].push(val)
//   } else {
//     result[depth] = [val]
//   }
//   levelOrder(root.left, result, depth + 1)
//   levelOrder(root.right, result, depth + 1)
//   return result
// }

/**
 * 层序遍历 - 迭代
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
  if (!root) {
    return []
  }
  let res = []
  let queue = [root]
  while (queue.length > 0) {
    let arr = [],
      nextQueue = []
    while (queue.length > 0) {
      let cur = queue.shift()
      arr.push(cur.val)
      if (cur.left) {
        nextQueue.push(cur.left)
      }
      if (cur.right) {
        nextQueue.push(cur.right)
      }
    }
    queue = nextQueue
    res.push(arr)
  }
  return res
}

// console.log(levelOrder(root))

/**
 * 二叉树的最大深度
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root, depth = 0) {
  if (!root) {
    return 0
  }
  let leftDepth = maxDepth(root.left, depth + 1)
  let rightDepth = maxDepth(root.right, depth + 1)
  return Math.max(leftDepth, rightDepth) + 1
}

/**
 * 对称二叉树 - 递归
 * @param {TreeNode} root
 * @return {boolean}
 */
// var isSymmetric = function(root) {
//   if (!root) {
//     return true
//   }
//   function leftIsLikeRight(left, right) {
//     if (!left || !right) {
//       return left === right
//     }
//     return (
//       left.val === right.val &&
//       leftIsLikeRight(left.left, right.right) &&
//       leftIsLikeRight(left.right, right.left)
//     )
//   }
//   return leftIsLikeRight(root.left, root.right)
// }

/**
 * 对称二叉树 - 迭代
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {
  if (!root) {
    return true
  }
  let stack = []
  let cur = root
  let res = true
  while (cur) {
    while (cur) {
      if (!cur.left || !cur.right) {
        if (cur.left !== cur.right) {
          return false
        }
      } else if (cur.left.val !== cur.right.val) {
        return false
      }
      stack.push(cur)
      cur = cur.left
    }
    cur = cur.pop()
    cur = cur.right
  }
  return res
}

console.log(isSymmetric(root))
