/* 
    应用程序的启动（入口）文件
*/
// 加载 express 模块
var express = require('express');
// 加载模版处理模块
var swig = require('swig');
// 加载数据库模块
var mongoose = require('mongoose');
// 加载body-parser，用来处理post提交过来的数据
var bodyParser = require('body-parser');
// 加载Markdown模块
// var markdown = require('markdown');
// var markdown = require('markdown').markdown;
// 加载cookies模块
var Cookies = require('cookies');
// const { Cookie } = require('cookies');

// 创建 app 应用 ==> Node.js 中的 Http.createServer();
var app = express();

var User = require('./models/User');

// 设置静态文件托管
app.use('/public', express.static(__dirname + '/public'));

// 配置应用模版
// 定义当前应用所使用的模版引擎
// 第一个参数：模版引擎的名称，同时也是模版文件的后缀, 第二个参数表示用于解析处理模版内容的方法。
app.engine('html', swig.renderFile);
// 设置模版文件存放的目录，第一个参数必须是views，第二个参数是目录
app.set('views', './views');
// 注册所使用的模版引擎，第一个参数必须是view engine，第二个参数和app.engine这个方法中的第一个参数是一样的
app.set('view engine', 'html');
// 在开发过程中，需要取消模版缓存
swig.setDefaults({ cache: false });


// bodyParser 设置
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}));
app.use(bodyParser.json({
    limit : '50mb'
}));  
// 设置cookie
app.use(function(req, res, next){
    req.cookies = new Cookies(req, res);
    // 解析登录用户的cookies信息
    req.userInfo = {};
    if(req.cookies.get('userInfo')){
        try {
            req.userInfo = JSON.parse(req.cookies.get('userInfo'));
            // 获取当前登录用户的类型，是否是管理员
            User.findById(req.userInfo._id).then(function(userInfo){
                req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
                next();
            })
        } catch (error) {
            next();
        }
    }else{
        next();
    }
})






/* 
    根据不同的功能划分模块
*/
app.use('/demo', require('./routers/demo'));
app.use('/admin', require('./routers/admin'));
app.use('/api', require('./routers/api'));
app.use('/', require('./routers/main'));


mongoose.connect('mongodb://localhost:27017/blog', function (err) {
    if (err) {
        console.log('数据库连接失败！');
    } else {
        console.log('数据库连接成功！');
        // 监听 http 请求
        app.listen(8081);
    }
});

