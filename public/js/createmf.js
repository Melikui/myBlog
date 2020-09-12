// 创建魔方
var mofang = document.getElementById('mofang');
var mfDiv = '';
for (var i = 0; i < 6; i++) {
    var minbox = '';
    for (var j = 0; j < 9; j++) {
        minbox += '<div class="minbox"></div>';
    }
    mfDiv += '<div class="box' + (i + 1) + '">'+minbox+'</div>';
}
mofang.innerHTML = mfDiv;
