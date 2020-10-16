// 使用mongoose操作mongodb数据库
// 引入mongoose
const mongoose = require('mongoose');
// 连接指定数据库
mongoose.connect('mongodb://localhost:27017/boos_test')
// 获取连接对象
const conn = mongoose.connection
// 绑定连接完成的监听
conn.on('connected', function() {
  console.log('数据库连接成功,YE!!!')
})