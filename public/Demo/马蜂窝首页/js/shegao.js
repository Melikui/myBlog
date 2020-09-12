 // 的到li的高度
 var liH = $("#banner .datu_ul li").height();
 // 设置为banner这个盒子
 $("#banner").height(liH);
 
 $(window).resize(function(){
     // 的到li的高度
     var liH = $("#banner .datu_ul li").height();
     // 设置为banner这个盒子
     $("#banner").height(liH);
 });