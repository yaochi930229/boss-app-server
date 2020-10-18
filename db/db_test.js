const md5 = require('blueimp-md5');
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

//2.得到对应特定结合的Model
// 2.1 定义Schema (描述文档结构)ßßß
const userScheam = mongoose.Schema({
  userName: { type: String, require: true },
  password: { type: String, require: true },
  type: { type: String, require: true },
  header: { type: String }
})

// 2.2 定义Model（与集合对应，可以操作集合）
const UserModel = mongoose.model('user', userScheam)  // 集合的名称为：users

// 3.通过Model或其实例对集合数据进行CRUD操作
// 3.1 通过Model实例的save()添加数据
function testSave() {
  // 创建UserModel的实例
  const userModel = new UserModel({ userName: 'Lili', password: md5('323'), type: 'dashen' })
  // 调用save()保存
  userModel.save(function(error, user) {
    console.log(error, user)
  })
}

// testSave()

// 3.2 通过Model的 find()/findOne() 查询多个或一个数据
function testFind() {
  // 查询多个
  UserModel.find({_id: '5f8be2f5738d8e05b99c5452'}, function(error, users) {
    console.log('find', error, users)
  })

  UserModel.findOne({_id: '5f8be2f5738d8e05b99c5450'}, function(error, user) {
    console.log('findOne', error, user)
  })
}

// testFind()

// 3.3 通过Model的findByIdAndUpdate()更新某个数据
function testUpdate() {
  UserModel.findByIdAndUpdate({_id: '5f8be2f5738d8e05b99c5450'}, {
    userName: 'Leo',
  }, function(error, doc) {
    console.log(error, doc)
  })
}

// testUpdate()

// 3.4 通过 Model的remove()删除匹配的数据
function testDelete() {
  UserModel.remove({
    _id: '5f8be2f5738d8e05b99c5450',
  }, function(error, doc) {
    console.log('remove', error, doc)
  })
}

testDelete()