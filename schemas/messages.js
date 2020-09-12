var mongoose = require('mongoose');

// 留言表结构
module.exports = new mongoose.Schema({
    // 分类名
    nickname: String,
    msg: String, 
    time: String
})
























