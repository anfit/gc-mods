/*!
 * Non-Firefox support for main GM functions
 * Requires jQuery 1.6.3
 *
 * Copyright 2011, Jan Chimiak
 * This document is licensed as free software under the terms of the
 * MIT License: http://www.opensource.org/licenses/mit-license.php
 */
// ie support relies on user agent. if ua is spoofed, it will crash
if ($.browser.msie) {
	if ((typeof PRO_setValue) != "undefined") {		
		this.GM_getValue = function (key, def) {
			return PRO_getValue(key) || def;
		};
		this.GM_setValue = function (key, value) {
			return PRO_setValue(key, value);
		};
		this.GM_deleteValue = function (key) {
			return PRO_deleteValue(name);
		};
		this.GM_listValues = function () {
			return PRO_listValues();
		};
		this.GM_xmlhttpRequest = function (config) {
			return PRO_xmlhttpRequest(config);
		};
		this.GM_openInTab = function (link) {
			return PRO_openInTab(link);
		};
	}
}
//webkit (chrome) support relies on user agent. if ua is spoofed, it will crash
else if($.browser.webkit) {
	if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported") > -1)) {
		this.GM_getValue = function (key, def) {
			return localStorage[key] || def;
		};
		this.GM_setValue = function (key, value) {
			return localStorage[key] = value;
		};
		this.GM_deleteValue = function (key) {
			return delete localStorage[key];
		};
	}
}
