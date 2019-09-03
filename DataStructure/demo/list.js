class List {
  // 列表大小
  size = 0
  // 位置
  pos = 0
  // 初始化一个空数组来保存列表元素
  dataStore = []
  // 清空列表
  clear() {}
  // 查找元素
  find(element) {
    for (let i = 0; i < this.dataStore.length; i++) {
      if (this.dataStore[i] === element) {
        return i
      }
    }

    return -1
  }
  toString() {}
  // 插入
  insert() {}
  // 给列表的下一个位置增加一个新的元素
  append(element) {
    this.dataStore[this.size++] = element
  }
  // 删除
  remove(element) {
    var foundAt = this.find(element)
    if (foundAt > -1) {
      this.dataStore.splice(foundAt, 1)
      --this.size
      return true
    }

    return false
  }
  // 获取最前面的元素
  front() {}
  // 获取尾部元素
  end() {}
  // 获取前一个元素
  prev() {}
  // 获取后一个元素
  next() {}
  // 获取列表长度
  length() {
    return this.size
  }
  // 获取当前位置
  currPos() {}
  // 元素移动
  moveTo() {}
  // 获取元素
  getElement() {}
  // 判断是否存在于列表中
  contains() {}
}
