/*!
 * Log console
 * Requires jQuery 1.6.3
 *
 * Copyright 2011, Jan Chimiak
 * This document is licensed as free software under the terms of the
 * MIT License: http://www.opensource.org/licenses/mit-license.php
 */
var console = (function () {
	//log appender
	$("body").append('<div id="a-logappender-wrap"><div class="body"><div id="a-logappender"></div></div>');
	/**
	 * @param {Collection} collection array or arguments 
	 * @param {String} separator
	 */

	function join(collection, separator) {
		var string, i;
		
		if (collection.join) {
			return collection.join(separator);
		}
		string = '';
		for (i = 0; i < collection.length; i = i + 1) {
			string += collection[i];
			if (i + 1 < collection.length) {
				collection += separator;
			}
		}
		return string;
	}
	/**
	 * @param {Collection} messages
	 * @param {Number} timeout in ms
	 * @param {String} level lowercase log, error, warn, info or debug
	 */

	function log(messages, timeout, level) {
		var entry, entryDom;
		entry = join(messages, ', ');
		entryDom = level !== 'log' ? $('<div>[' + level + '] ' + entry + '</ div>') : $('<div> ' + entry + '</ div>');
		$('#a-logappender').prepend(entryDom);
		entryDom.fadeOut(timeout);
		if (unsafeWindow.console && jQuery.browser.mozilla) {
			unsafeWindow.console[level].apply(this, messages);
		}
	}
	var console = {
		/**
		 *	@cfg {String} DEBUG > INFO > WARN > ERROR
		 */
		level: 'INFO',
		//always
		log: function () {
			log(arguments, 5000, 'log');
		},
		//always
		error: function () {
			log(arguments, 11000, 'error');
		},
		//always, unless level error
		warn: function () {
			//ignore if logger level is too low
			if (console.level === 'ERROR') {
				return;
			}
			log(arguments, 9000, 'warn');
		},
		//always, unless level error or warn
		info: function () {
			//ignore if logger level is too low
			if (console.level === 'WARN' || console.level === 'ERROR') {
				return;
			}
			log(arguments, 7000, 'info');
		},
		//always, unless level error or warn or ingo
		debug: function () {
			//ignore if logger level is too low
			if (console.level === 'WARN' || console.level === 'INFO' || console.level === 'ERROR') {
				return;
			}
			log(arguments, 5000, 'debug');
		}
	};
	// Expose console to the global object
	return console;
})();