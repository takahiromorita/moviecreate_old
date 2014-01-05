/* global $ */
$(function(){
    var socket = io.connect('http://localhost:3000/');
    var s = socket.of('/socket');
    s.on('connect', function(msg) {
        console.log("conneted!!");
    });

	var x = y = z = 0;
	var color = 0;

	window.addEventListener('devicemotion', function(event) {
		var gv = event.accelerationIncludingGravity;
		x = gv.x;
		y = gv.y;
		z = gv.z;
		var R = Math.abs(Math.floor(x/10*255));
		var G = Math.abs(Math.floor(y/10*255));
		var B = Math.abs(Math.floor(z/10*255));
		color = 'rgb(' + R + ',' + G + ',' + B + ')';
		refresh();
	});

	// 画面を再描画する
	function refresh() {
	    // デバッグ用表示
	    $('#g_x').text(x);
	    $('#g_y').text(y);
	    $('#g_z').text(z);
	    $('#color').text(color);
	    $('body').css({backgroundColor:$.fmtColor(color)});
        send($.fmtColor(color));
	}
    function send(rgb) {
        s.emit('color', rgb);
    }

});

