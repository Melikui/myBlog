var express = require('express');
var router = express.Router();


// 魔方---------------
router.get('/moFang', function (req, res) {
    res.render('demo/moFang', {
        userInfo: req.userInfo
    });
});

// 旋转照片墙---------------
router.get('/rotatePhotos', function (req, res) {
    res.render('demo/rotatePhotos', {
        userInfo: req.userInfo
    });
});
// 音乐---------------
router.get('/Music/music', function (req, res) {
    res.render('/demo/Music/music', {
        userInfo: req.userInfo
    });
});

module.exports = router;
