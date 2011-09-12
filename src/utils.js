/**
 * utils namespace
 */
app.util = {};
/**
 * @param mixed
 * @param mixed
 */
app.util.sortByPowerDesc = function (a, b) {
	return ((a.power > b.power) ? -1 : ((a.power < b.power) ? 1 : 0));
};
/**
 * @param string
 */
app.util.cleanBeforeSend = function (string) {
	return string.replace('+', 'xyzplus', 'g').replace('&', 'xyzand', 'g');
};
/**
 * @param node
 */
app.util.startDragging = function (e) {
	dragObj = {
		zIndex: 0
	};
	dragObj.elNode = e.target;
	if (dragObj.elNode.nodeType == 3) {
		dragObj.elNode = dragObj.elNode.parentNode;
	}
	if (dragObj.elNode.nodeName == 'INPUT' || dragObj.elNode.nodeName == 'SPAN') {
		return;
	}
	while (!dragObj.elNode.className.match('draggable')) {
		dragObj.elNode = dragObj.elNode.parentNode;
	}
	var targetId = dragObj.elNode.id;
	dragObj.cursorStartX = e.clientX + window.scrollX;
	dragObj.cursorStartY = e.clientY + window.scrollY;
	dragObj.elStartLeft = parseInt(dragObj.elNode.style.left, 10);
	dragObj.elStartTop = parseInt(dragObj.elNode.style.top, 10);
	dragObj.elStartRight = dragObj.elStartLeft + parseInt(dragObj.elNode.clientWidth, 10);
	dragObj.elStartBottom = dragObj.elStartTop + parseInt(dragObj.elNode.clientHeight, 10);
	dragObj.elNode.style.zIndex = ++dragObj.zIndex;

	function dragGo(e) {
		var x = e.clientX + window.scrollX;
		var y = e.clientY + window.scrollY;
		var top;
		var left;
		top = dragObj.elStartTop + y - dragObj.cursorStartY;
		left = dragObj.elStartLeft + x - dragObj.cursorStartX;
		bottom = dragObj.elStartBottom + y - dragObj.cursorStartY;
		right = dragObj.elStartRight + x - dragObj.cursorStartX;
		if (top > 0 && left > 0 && bottom + 5 < window.innerHeight && right + 5 < window.innerWidth) {
			dragObj.elNode.style.left = left + "px";
			dragObj.elNode.style.top = top + "px";
			gc.setValue(targetId + '-top', top);
			gc.setValue(targetId + '-left', left);
		}
	}

	function dragStop(e) {
		$(document).unbind("mousemove." + targetId, dragGo);
		$(document).unbind("mouseup." + targetId, dragStop);
	}
	$(document).bind("mousemove." + targetId, dragGo);
	$(document).bind("mouseup." + targetId, dragStop);
};
/**
 * @param mixed
 * @param array
 */
app.util.countInArray = function (value, array) {
	var c = 0;
	for (var i = 0; i < array.length; i++) {
		if (array[i] === value) {
			c++;
		}
	}
	return c;
};
/**
 * @param number
 */
app.util.getRandomString = function (length) {
	chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
	result = [];
	for (var i = 0; i < length; i++) {
		c = Math.floor(Math.random() * 62);
		result.push(chars.charAt(c));
	}
	return result.join();
};
/**
 * @param number
 */
app.util.formatCurrency = function (value) {
	var string = value + '';
	for (var i = 0; i < Math.round(string.length / 3 - 0.5); i++) {
		string = string.replace(/(\d)(\d{3})($|,)/g, '$1,$2$3');
	}
	return string;
};
/**
 * @param number
 * @param number
 */
app.util.getRandomNumber = function (min, max) {
	return Math.random() * (max - min) + min;
};