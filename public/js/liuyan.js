var $liuyan = $('.liuyan');
var lytime = new Date().toLocaleString();
$('#saveMsg').click(function () {
    // 验证昵称和留言是否为空
    var nickName = $('#nickName').val();
    var msgContent = $('#msgContent').val();
    if (nickName == '') {
        $liuyan.find('.nickname').html('起个好听的昵称吧~');
        $('#nickName').focus(function () {
            $liuyan.find('.nickname').html('');
        });
        return false;
    }
    if (msgContent == '') {
        $liuyan.find('.msgtips').html('说点什么吧~');
        $('#msgContent').focus(function () {
            $liuyan.find('.msgtips').html('');
        });
        return false;
    }
    if (nickName !== '' && msgContent !== '') {
        
        // 通过ajax提交信息
        $.ajax({
            type: 'post',
            url: '/api/liuyan',
            data: {
                nickname: nickName,
                msg: msgContent,
                time: lytime
            },
            dataType: 'json',
            success: function (result) {
                $liuyan.find('.lyTips').html(result.message);
                if(result.code == '33'){
                    setTimeout(function(){
                        $liuyan.find('.lyTips').html('');
                        location.reload();
                    }, 1000);
                }
            }
        });
    }
});
// ----------------------------