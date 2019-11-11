const db = wx.cloud.database()
const todos = db.collection('todos')

Page({
  data: {
    val: '',
    todos: []
  },

  handleInput(e) {
    this.setData({
      val: e.detail.value
    })
  },

  handleClick() {
    console.log("dbs", todos)
    todos.get().then(data => {
      console.log(data)
    })
  },

  bindPhone(...args) {
    console.log(args)
  }
})
