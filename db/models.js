// 1. 连接数据库
// 1.1 引入mongoose
const mongoose = require('mongoose');
// 1.2 连接指定数据库(URL只有数据库是变化的)
mongoose.connect('mongodb://localhost:27017/gzhipin')
// 1.3 获取连接对象
const conn = mongoose.connection;
conn.on('connected', () => {
  console.log('db connect success!');
});

// 2. 定义出对应特定集合的Model并向外暴露
// 2.1 定义 Schema (描述文档结构)
const userSchema = mongoose.Schema({
  username: { type: String, require: true }, // 用户名
  password: { type: String, require: true }, // 密码
  type: { type: String, require: true }, // 用户类型： dashen/laoban
  header: { type: String }, // 头像名称
  post: { type: String }, // 职位
  info: { type: String }, // 个人或职位简介
  company: { type: String }, // 公司名称
  salary: { type: String }, // 月薪
})

// 2.2 定义Model(与集合对应，可以操作集合)
const UserModel = mongoose.model('user', userSchema);
// 2.3 向外暴露Model
exports.UserModel = UserModel;

// 向外暴露的两种方式
// module.exports = xxx
// exports.xxx = value


const chatSchema = mongoose.Schema({
  from: { type: String, require: true }, // 发送用户的id
  to: { type: String, require: true }, // 接收用户的id
  chat_id: { type: String, require: true }, // from 和 to 组成的字符串
  content: { type: String }, // 内容
  read: { type: Boolean, default: false }, // 标记是否已读
  create_time: { type: Number } // 创建时间
})
const ChatModel = mongoose.model('chat', chatSchema);
exports.ChatModel = ChatModel;