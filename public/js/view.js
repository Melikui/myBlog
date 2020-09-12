// 渲染笔记区域
$(document).ready(function () {
    $('#markdownBody').html($('#contentHtml').text());
});


// 提交评论
var comments = [];
$('#messageBtn').on('click', function () {
    var $messageContent = $('#messageContent').val()
    if($messageContent==''){
        $('.commentsTips').html('留言内容不能为空哦~');
        setTimeout(function(){
            $('.commentsTips').html('');
        }, 1000)
        return false;
    }else{
        $.ajax({
            type: 'POST',
            url: '/api/comment/post',
            data: {
                contentid: $('#contentId').val(),
                content: $messageContent
            },
            success: function (responseData) {
                // console.log(responseData.data);
                $('#messageContent').val('');
                comments = responseData.data.comments.reverse();
                renderComment();
            }
        });
    }
});

$.ajax({
    url: '/api/comment',
    data: {
        contentid: $('#contentId').val(),
    },
    success: function (responseData) {
        comments = responseData.data.reverse();
        renderComment();
    }
})


$('.commentlist').delegate('a', 'click', function () {
    if ($(this).parent().hasClass('previous')) {
        page--;
    } else {
        page++;
    }
    renderComment(comments);
})




var prepage = 5;
var page = 1;
var pages = 0;

function renderComment() {

    $('.comment-data').html('一共有' + comments.length + '条评论');

    pages = Math.max(Math.ceil(comments.length / prepage), 1);
    var start = Math.max(0, (page - 1) * prepage);
    var end = Math.min(start + prepage, comments.length);
    var $lis = $('.commentlist li');
    $lis.eq(1).html(page + '/' + pages);

    if (page <= 1) {
        page = 1;
        $lis.eq(0).html('<span>没有上一页了</span>');
    } else {
        $lis.eq(0).html('<a href="javascript:;">上一页</a>');
    }

    if (page >= pages) {
        page = pages;
        $lis.eq(2).html('<span>没有下一页了</span>');
    } else {
        $lis.eq(2).html('<a href="javascript:;">下一页</a>');
    }

    if (comments.length == 0) {
        $('.comments-content').html('<p class="messageBox">还没有评论~</p>');
    } else {
        var html = '';
        for (var i = start; i < end; i++) {
            html +='<div class="commentstxt"><p>' + comments[i].content + '</p><span>' + formatDate(comments[i].postTime) + '</span></div>'
        }
        $('.comments-content').html(html);
    }
}

function formatDate(d) {
    var date1 = new Date(d);
    return date1.getFullYear() + '年' + (date1.getMonth() + 1) + '月' + date1.getDate() + '日' + date1.getHours() + ':' + date1.getMinutes() + ':' + date1.getSeconds();
}











