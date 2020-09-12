var mongoose = require('mongoose');

// 内容表结构
module.exports = new mongoose.Schema({
    // 关联字段--内容分类的ID
    category: {
        // 类型
        type: mongoose.Schema.Types.ObjectId,
        // 引用
        ref: 'Category'

    },
    // 内容标题
    title: String,
    // 关联字段--用户ID
    user: {
        // 类型
        type: mongoose.Schema.Types.ObjectId,
        // 引用
        ref: 'User'

    },
    // 添加时间
    addTime: {
        type: Date,
        default: new Date()
    },
    // 阅读数
    views: {
        type: Number,
        default: 0
    },
    // 简介
    description: {
        type: String,
        default: ''
    },
    // 内容
    content: {
        type: String,
        default: ''
    },
    comments: {
        type: Array,
        default: []
    }
})
























