var express = require('express');
var router = express.Router();

var Category = require('../models/Category');
var Content = require('../models/Content');
const Message = require('../models/Message');

var data;
// 处理通用数据
router.use(function (req, res, next) {
    data = {
        userInfo: req.userInfo,
        categories: [],
    }
    Category.find().then(function (categories) {
        data.categories = categories;
        next();
    });
});


// 首页
router.get('/', function (req, res, next) {

    data.category = req.query.category || '';
    data.count = 0;
    data.page = Number(req.query.page || 1);
    data.limit = 5;
    data.pages = 0;
    var where = {};
    if (data.category) {
        where.category = data.category;
    }
    // 读取所有的分类信息
    Content.where(where).count().then(function (count) {
        data.count = count;
        // 计算总页数
        data.pages = Math.ceil(data.count / data.limit);
        // 取值不能超过pages
        data.page = Math.min(data.page, data.pages);
        // 取值不能小于1
        data.page = Math.max(data.page, 1);

        var skip = (data.page - 1) * data.limit;
        return Content.where(where).find().sort({ _id: -1 }).limit(data.limit).skip(skip).populate(['category', 'user']).sort({
            addTime: -1
        });

    }).then(function (contents) {
        data.contents = contents;
        res.render('main/index', data);
    });
});

// 笔记内容区
router.get('/notes', function (req, res, next) {
    data.category = req.query.category || '';
    data.count = 0;
    data.page = Number(req.query.page || 1);
    data.limit = 5;
    data.pages = 0;
    var where = {};
    if (data.category) {
        where.category = data.category;
    }
    // 读取所有的分类信息
    Content.where(where).count().then(function (count) {
        data.count = count;
        // 计算总页数
        data.pages = Math.ceil(data.count / data.limit);
        // 取值不能超过pages
        data.page = Math.min(data.page, data.pages);
        // 取值不能小于1
        data.page = Math.max(data.page, 1);

        var skip = (data.page - 1) * data.limit;
        return Content.where(where).find().sort({ _id: -1 }).limit(data.limit).skip(skip).populate(['category', 'user']).sort({
            addTime: -1
        });

    }).then(function (contents) {
        data.contents = contents;
        res.render('main/notes', data);
    });
});

router.get('/view', function (req, res) {
    var contentid = req.query.contentid || '';
    Content.findOne({
        _id: contentid
    }).then(function (content) {
        data.content = content;
        content.views++;
        content.save();
        res.render('main/view', data);
    });
});































// 扫雷---------------
router.get('/saolei', function (req, res) {
    res.render('main/saolei', {
        userInfo: req.userInfo
    });
});

// 博客---------------
router.get('/blog', function (req, res) {
    res.render('main/blog', {
        userInfo: req.userInfo
    });
});

// 笔记---------------
router.get('/notes', function (req, res) {
    res.render('main/notes', {
        userInfo: req.userInfo
    });
});

// 留言板---------------
router.get('/liuyan', function (req, res) {
    Message.find().sort({ _id: -1 }).then(function (messages) {
        res.render('main/liuyan', {
            userInfo: req.userInfo,
            messages: messages
        });
    });
});
module.exports = router;
