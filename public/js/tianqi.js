
// 首页时间展示区域函数----------------------------------------------------
function fnTime() {
    window.setTimeout("fnTime()", 1000);
    var now = new Date();
    var year = now.getFullYear();
    var month = (now.getMonth() + 1) < 10 ? '0' + (now.getMonth() + 1) : (now.getMonth() + 1);
    var date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate();
    var day = now.getDay();
    var week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    var hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
    var minute = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
    var second = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();
    var nowTime = year + "<span>年</span>" + month + "<span>月</span>" + date + "<span>日</span>" + "&nbsp;&nbsp;" + week[day] + "&nbsp;&nbsp;" + hour + "<span>时</span>" + minute + "<span>分</span>" + second + "<span>秒</span>";
    document.getElementsByClassName('presentTime')[0].innerHTML = nowTime;
}
fnTime();
// function addZero(t) {
//     if (t < 10) return "0" + "" + t;
//     else return t;
// }
// 发送 Ajax 请求，返回的结果是 Promise 对象
function sendAjax(url) {
    return new Promise((resolve, reject) => {
        // 1.创建对象
        const xhr = new XMLHttpRequest();
        // 2.初始化
        xhr.open('GET', url, true);
        // 3.发送
        xhr.send();
        // 4.事件绑定
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    // 成功了
                    resolve(xhr.responseText);
                } else {
                    // 如果失败
                    reject(xhr.status);
                }
            }
        }
    });
}
// async 和 await 测试
async function main() {
    // 发送 Ajax 请求
    let tianqi = await sendAjax('https://tianqiapi.com/api?version=v1&appid=42999496&appsecret=0i7tBj2Q');
    var txt = JSON.parse(tianqi);
    function getEle(ele) {
        return document.getElementsByClassName(ele)[0];
    }
    var tqdz = getEle('tqdz'),
        tqtips = getEle('tqtips'),
        tqkqsp = getEle('tqkqsp'),
        tqwd = getEle('tqwd'),
        tqwea = getEle('tqwea'),
        tqwin = getEle('tqwin');
    // 地址
    tqdz.innerHTML = '中国 - 安徽 - ' + txt.city;
    // 空气水平
    tqkqsp.innerHTML = '空气水平: ' + txt.data[0].air_level;
    // 建议
    tqtips.innerHTML = txt.data[0].air_tips;
    // 温度
    tqwd.innerHTML = txt.data[0].tem;
    // 天气
    tqwea.innerHTML = txt.data[0].wea;
    // 风向
    tqwin.innerHTML = txt.data[0].win[0];
    // 天气预报
    var tqdays = document.getElementsByClassName('tqday');
    var len = tqdays.length;
    var str = '';
    for (var i = 0; i < len; i++) {
        str += '<p>' + txt.data[i].day + '</p>' + '<p>' + txt.data[0].tem + '</p>' + '<p>' + txt.data[i].wea + '</p>' + '<p>' + txt.data[i].win[0] + '</p>' + '<p>' + txt.data[i].win_speed + '</p>';
        tqdays[i].innerHTML = str;
        str = '';
    }
}
main();


var iconFontSize = document.getElementById('iconFontSize');
setInterval(function(){
    (iconFontSize.className == 'chageSize30') ? (iconFontSize.className = 'chageSize40'):(iconFontSize.className = 'chageSize30');
}, 300);
