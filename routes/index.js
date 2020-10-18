var express = require('express');
var router = express.Router();
const md5 = require('blueimp-md5');
const {UserModel} = require('../db/models');
const filter = {password:0} // 查询时指定过滤的属性

// 注册的路由
router.post('/register', function (req, res) {
  // 读取请求参数数据
  const { username, password, type } = req.body;
  // 处理：判断用户是否已经存在， 如果存在，返回提示错误的信息，如果不存在，保存
  // 查询(根绝username)
  UserModel.findOne({
    username,
  }, function (err, user) {
    // 如果 user 有值(已存在)
    if (user) {
      // 返回提示错误的信息
      res.send({
        code: 1,
        msg: '此用户已存在',
      })
    } else {
      // 保存
      new UserModel({
        username,
        password: md5(password),
        type,
      }).save((err, user) => {
        // 生成一个cookie(userid:user._id),并交给浏览器保存
        res.cookie('userid', user._id, {maxAge: 1000*60*60*24})
        // 返回包含user的json数据
        const data = { username, type, _id: user._id };
        res.send({
          code: 0,
          msg: '注册成功',
          data,
        })
      })
    }
  })
})

// 登录路由
router.post('/login', function (req, res) {
  const {username, password} = req.body
  // 根据username和password查询数据库users,如果没有返回提示错误的信息，如果有，返回登录成功信息
  UserModel.findOne({
    username,
    password: md5(password),
  }, filter, function(err, user) {
    if (user) {
      res.cookie('userid', user._id, {maxAge: 1000*60*60*24})
      res.send({
        code: 0,
        data: user,
        msg: '登录成功',
      })
    } else {
      res.send({
        code: 1,
        msg: '用户名或密码不正确',
      })
    }
  })
})

// 更新用户信息
router.post('/updateUserInfo', function (req, res) {
  // 从请求的cookie等到userid
  const userid = req.cookies.userid
  if (!userid) return res.send({ code: 401, msg: '请先登录' })
  // 得到提交的用户数据
  const user = req.body;
  UserModel.findByIdAndUpdate({
    _id: userid,
  }, user, function (err, oldUser) {
    if (!oldUser) {
      // 通知浏览器删除userid的cookie
      res.clearCookie('userid')
      res.send({ code: 401, msg: '请先登录' })
    } else {
      const {type, username, _id} = oldUser;
      const data = Object.assign(user, {type, username, _id});
      res.send({
        code: 0,
        data,
        msg: '用户信息更新成功',
      })
    }
  })
})
module.exports = router;
