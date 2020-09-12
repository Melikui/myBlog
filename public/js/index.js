$(document).ready(function () {
    var $login = $('.loginBox');
    // 阻止冒泡
    $(".login").click(function (event) {
        event.stopPropagation();
    });
    // 显示登录框
    $("#loginbtn").click(function () {
        $login.show();
    });
    // 隐藏登录框
    $(".canclebtn").click(function () {
        $login.hide();
    });
    // 隐藏登录框
    $(".loginBox").click(function () {
        $login.hide();
    });

    // 注册
    // $('.loginbtn').click(function(){
    //     // 通过ajax提交信息
    //     $.ajax({
    //         type: 'post',
    //         url:'/api/user/register',
    //         data: {
    //             username: $login.find('#user').val(),
    //             password: $login.find('#password').val()
    //         },
    //         dataType: 'json',
    //         success: function(result){
    //             $login.find('.userTips').html(result.message);
    //         }
    //     })
    // });

    // 登录
    $('.loginbtn').click(function () {
        // 验证用户名和密码是否为空
        var username = $login.find('#user').val();
        var password = $login.find('#password').val();
        if (username == '') {
            $login.find('.userTips').html('用户名不能为空~~');
            $('#user').focus(function () {
                $login.find('.userTips').html('');
            });
            return false;
        }
        if (password == '') {
            $login.find('.pwdTips').html('密码不能为空~~');
            $('#password').focus(function () {
                $login.find('.pwdTips').html('');
            });
            return false;
        }
        if (username !== '' && password !== '') {
            // 通过ajax提交信息
            $.ajax({
                type: 'post',
                url: '/api/user/login',
                data: {
                    username: username,
                    password: password
                },
                dataType: 'json',
                success: function (result) {
                    $login.find('.loginTips').html(result.message);
                    if(result.code == '666'){
                        setTimeout(function(){
                            $login.hide();
                            window.open('/admin');
                            location.reload();
                        }, 1000);
                    }
                }
            });
        }
    });
});




