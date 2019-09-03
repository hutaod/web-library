// 创建一个记录学生成绩的对象，提供一个添加成绩的方法，以及一个显示学生平均成绩的方法。
function StudentKPI() {
  this.data = []
  this.add = function(score) {
    this.data.push(score)
  }
  this.getAvgScore = function() {
    return this.data.reduce((a, b) => a + b, 0) / this.data.length
  }
}

const kpis = new StudentKPI()
kpis.add(88)
kpis.add(78)
kpis.add(68)
kpis.add(98)
kpis.add(58)

console.log(kpis.getAvgScore())

// 将一组单词存储在一个数组中，并按正序和倒序分别显示这些单词。
var arr = ['hello', 'world', 'banana']
console.log(arr.sort()) // 正序
console.log(arr.sort((a, b) => b > a)) // 倒序

// 创建这样一个对象，它将字母存储在一个数组中，并且用一个方法可以将字母连在一起，显示成一个单词
