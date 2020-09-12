
// 首页页脚时间区域函数----------------------------------------------------
var divTime = document.getElementsByClassName('webRunTime')[0];
function webRunTime() {
    window.setTimeout("webRunTime()", 1000);
    //开始时间
    beginDay = new Date("3/10/2020 00:00:00");
    //获取当前时间
    var today = new Date();
    var timeold = (today.getTime() - beginDay.getTime()); //总豪秒数
    var secondsold = Math.floor(timeold / 1000);          //总秒数
    var e_daysold = timeold / (24 * 60 * 60 * 1000);
    var daysold = Math.floor(e_daysold) < 10 ? '0' + Math.floor(e_daysold) : Math.floor(e_daysold);                 //相差天数
    var e_hrsold = (e_daysold - daysold) * 24;
    var hrsold = Math.floor(e_hrsold) < 10 ? '0' + Math.floor(e_hrsold) : Math.floor(e_hrsold);                   //相差小时数
    var e_minsold = (e_hrsold - hrsold) * 60;
    var minsold = Math.floor(e_minsold) < 10 ? '0' + Math.floor(e_minsold) : Math.floor(e_minsold);                 //相差分钟数
    var seconds = Math.floor((e_minsold - minsold) * 60) < 10 ? '0' + Math.floor((e_minsold - minsold) * 60) : Math.floor((e_minsold - minsold) * 60);  //相差秒数
    //将所获取的时间拼接到一起，再把值显示到页面
    divTime.innerHTML = "本站已安全运行 " + daysold + " 天 " + hrsold + " 小时 " + minsold + " 分 " + seconds + " 秒";
}
webRunTime();
