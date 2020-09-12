var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Message = require('../models/Message');
var Content = require('../models/Content');

// 统一返回格式
var responseDate;
router.use(function (req, res, next) {
    responseDate = {
        code: 0,
        message: ''
    }
    next();
})


/* 用户注册 */
router.post('/user/register', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    // 用户名是否为空
    if (username == '') {
        responseDate.code = 1;
        responseDate.message = '用户名不能为空！';
        res.json(responseDate);
        return;
    }
    // 密码是否为空
    if (password == '') {
        responseDate.code = 2;
        responseDate.message = '密码不能为空！';
        res.json(responseDate);
        return;
    }

    // 用户名是否已经被注册了，如果数据库中已经存在和我们要注册的用户名同名的数据，表示改用户已经被注册了
    User.findOne({
        username: username
    }).then(function (userInfo) {
        if (userInfo) {
            responseDate.code = 4;
            responseDate.message = '用户名已经被注册了';
            res.json(responseDate);
            return;
        }
        var user = new User({
            username: username,
            password: password
        });
        return user.save();
    }).then(function (newUserInfo) {
        responseDate.message = '注册成功！';
        res.json(responseDate);
    });
});

/* 用户登录 */
router.post('/user/login', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    // 用户名是否为空
    // if (username == '') {
    //     responseDate.code = 1;
    //     responseDate.message = '用户名不能为空！';
    //     res.json(responseDate);
    //     return;
    // }
    // // 密码是否为空
    // if (password == '') {
    //     responseDate.code = 2;
    //     responseDate.message = '密码不能为空！';
    //     res.json(responseDate);
    //     return;
    // }
    // 查询和数据库中的用户名和密码是否相等
    User.findOne({
        username: username,
        password: password
    }).then(function (userInfo) {
        if (!userInfo) {
            responseDate.code = 2;
            responseDate.message = '用户名或密码错误！';
            res.json(responseDate);
            return;
        }
        // 用户名和密码正确
        responseDate.code = 666;
        responseDate.message = '登录成功';
        responseDate.userInfo = {
            _id: userInfo._id,
            username: userInfo.username
        }
        req.cookies.set('userInfo', JSON.stringify({
            _id: userInfo._id,
            username: userInfo.username
        }));
        res.json(responseDate);
        return;
    });
});

// 退出
router.get('/user/logout', function(req, res){
    req.cookies.set('userInfo', null);
    res.json(responseDate);
})  

// ================================================================
// 留言板
router.post('/liuyan', function (req, res) {
    var nickname = req.body.nickname;
    var msg = req.body.msg;
    var time = req.body.time;
    responseDate.code = 33;
    responseDate.message = '留言成功~';
    res.json(responseDate);
    var message = new Message({
        nickname: nickname,
        msg: msg,
        time: time
    });
    return message.save();
});



// 获取指定文章的所有评论
router.get('/comment', function(req, res){
    var contentId = req.query.contentid||'';
    Content.findOne({
        _id:contentId
    }).then(function(content){
        responseDate.data = content.comments;
        res.json(responseDate);
    })
})
// 评论提交
router.post('/comment/post', function(req, res){
    // 内容的id
    var contentId = req.body.contentid||'';
    var postData = {
        username: req.userInfo.username,
        postTime: new Date(),
        content: req.body.content
    };
    // 查询当前这篇内容的信息
    Content.findOne({
        _id:contentId
    }).then(function(content){
        content.comments.push(postData);
        return content.save();
    }).then(function(newContent){
        responseDate.message = '评论成功';
        responseDate.data = newContent;
        res.json(responseDate);
    })
});









module.exports = router;




