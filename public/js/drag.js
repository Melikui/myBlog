var dragDiv = document.getElementById('dragBox');
dragDiv.onmousedown = function (e) {
    var event = event || e;
    var disX = event.clientX - this.offsetLeft;
    var disY = event.clientY - this.offsetTop;
    var self = this;
    document.onmousemove = function (e) {
        var event = event || e;
        var newLeft = event.clientX - disX;
        var newTop = event.clientY - disY;

        self.style.left = newLeft + 'px';
        self.style.top = newTop + 'px';
    }
    document.onmouseup = function () {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
