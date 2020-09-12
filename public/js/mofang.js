
// 让魔方运动
var oDiv = document.getElementById('demo');
var lastX = 0;
var lastY = 0;
var iSpeedX = 0;
var iSpeedY = 0;
oDiv.onmousedown = function (e) {
    clearInterval(this.Timer);
    var event = event || e;
    var disX = event.clientX - this.offsetLeft;
    var disY = event.clientY - this.offsetTop;
    var self = this;
    e.preventDefault();//阻止默认事件，取消文字选中
    document.onmousemove = function (e) {
        var event = event || e;
        var newLeft = event.clientX - disX;
        var newTop = event.clientY - disY;
        iSpeedX = newLeft - lastX;
        iSpeedY = newTop - lastY;
        lastX = newLeft;
        lastY = newTop;

        self.style.left = newLeft + 'px';
        self.style.top = newTop + 'px';
    }
    document.onmouseup = function () {
        document.onmouseup = null;
        document.onmousemove = null;
        sMove(self, lastX, lastY);

    }
}

function sMove(dom, iSpeedX, iSpeedY) {
    clearInterval(dom.Timer);
    // var a = 2;
    // var iSpeedX = 6;
    // var iSpeedY = 8;
    var g = 3;
    dom.Timer = setInterval(function () {
        iSpeedY += g;
        var newTop = dom.offsetTop + iSpeedY;
        var newLeft = dom.offsetLeft + iSpeedX;
        if (newTop >= document.documentElement.clientHeight - dom.clientHeight) {
            iSpeedY *= -1;
            iSpeedY *= 0.8;
            iSpeedX *= 0.8;
            newTop = document.documentElement.clientHeight - dom.clientHeight;
        }
        if (newTop <= 0) {
            iSpeedY *= -1;
            iSpeedY *= 0.8;
            iSpeedX *= 0.8;
            newTop = 0;
        }
        if (newLeft >= document.documentElement.clientWidth - dom.clientWidth) {
            iSpeedX *= -1;
            iSpeedY *= 0.8;
            iSpeedX *= 0.8;
            newLeft = document.documentElement.clientWidth - dom.clientWidth;
        }
        if (newLeft <= 0) {
            iSpeedX *= -1;
            iSpeedY *= 0.8;
            iSpeedX *= 0.8;
            newLeft = 0;
        }
        if (Math.abs(iSpeedX) < 1) {
            iSpeedX = 0;
        }
        if (Math.abs(iSpeedY) < 1) {
            iSpeedY = 0;
        }
        if (iSpeedX == 0 && iSpeedY == 0 && newTop == document.documentElement.clientHeight - dom.clientHeight) {
            clearInterval(dom.Timer);
        } else {
            dom.style.top = newTop + 'px';
            dom.style.left = newLeft + 'px';
        }
    }, 50);
}