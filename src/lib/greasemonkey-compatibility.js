/*!
 * Non-Firefox support for main GM functions
 * Requires jQuery 1.6.3
 *
 * Copyright 2011, Jan Chimiak
 * This document is licensed as free software under the terms of the
 * MIT License: http://www.opensource.org/licenses/mit-license.php
 */
if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported") > -1)) {
	this.GM_getValue = function (key, def) {
		return localStorage[key] || def;
	};
	this.GM_setValue = function (key, value) {
		return (localStorage[key] = value);
	};
	this.GM_deleteValue = function (key) {
		return delete localStorage[key];
	};
}
