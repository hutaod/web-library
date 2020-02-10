/*
 * @lc app=leetcode.cn id=79 lang=javascript
 *
 * [79] 单词搜索
 */

// @lc code=start
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
  let xLen = board[0].length,
    yLen = board.length
  if (xLen * yLen < word.length) {
    return false
  }
  let x = 0,
    y = 0
  while (x < xLen && y < yLen) {
    if (word[0] === board[y][x] && backTrack(x, y, 0)) {
      return true
    }
    x++
    if (x === xLen) {
      y++
      if (y < yLen) {
        x = 0
      }
    }
  }
  function backTrack(x, y, i) {
    // 回溯
    if (i === word.length - 1) {
      return true
    }
    var letter = board[y][x]
    board[y][x] = false
    let left = x > 0 ? board[y][x - 1] : null
    let right = x < xLen - 1 ? board[y][x + 1] : null
    let top = y > 0 ? board[y - 1][x] : null
    let bottom = y < yLen - 1 ? board[y + 1][x] : null
    if (left === word[i + 1] && backTrack(x - 1, y, i + 1)) {
      return true
    }
    if (right === word[i + 1] && backTrack(x + 1, y, i + 1)) {
      return true
    }
    if (top === word[i + 1] && backTrack(x, y - 1, i + 1)) {
      return true
    }
    if (bottom === word[i + 1] && backTrack(x, y + 1, i + 1)) {
      return true
    }
    // 重新赋值
    board[y][x] = letter
  }

  return false
}
// @lc code=end

// const board = [
//   ['a', 'a', 'a', 'a'],
//   ['a', 'a', 'a', 'a'],
//   ['a', 'a', 'a', 'a'],
//   ['a', 'a', 'a', 'a'],
//   ['a', 'a', 'a', 'b'],
// ]
// const word = 'aaaaaaaaaaaaaaaaaaaa'

// const board = [
//   ['a', 'a', 'a', 'a'],
//   ['a', 'a', 'a', 'a'],
//   ['a', 'a', 'a', 'a'],
// ]
// const word = 'aaaaaaaaaaaaa'
// console.log(word.length)
// console.log(exist(board, word))
