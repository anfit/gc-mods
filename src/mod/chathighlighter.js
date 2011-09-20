/**
 * Chat highlighter
 */
app.mod.chathighlighter = {
	id: 'a-chathighlighter',
	title: 'Chat highlighter',
	description: 'Assign colours to particular phrases in the chat! (requested by Certicom).',
	items: [{
		type: 'list',
		id: 'a-chathighlighter-list',
		defaultValue: "ace700;FF0000\nborrok;00FF00",
		description: 'One entry per line, marked phrase separated from a hexadecimal color with a semi-colon:'
	}],
	/**
	 * @cfg filter function a function which returns true only when this mod can be launched
	 */
	filter: function () {
		if (!gc.getValue('a-chathighlighter')) {
			return false;
		}
		if (!gc.getValue('a-chathighlighter-list')) {
			return false;
		}
		if (!$("#chat, table.bodybox[width='105'], td[colspan='3'] table.table_back").length) {
			return false;
		}
		return true;
	},
	/**
	 * @cfg plugin function the main functionality of the mod
	 */
	plugin: function () {
		function highlightInner($el, phrase, colour) {
			$el.contents().each(function () {
				if (this.nodeType === 3 && $(this).text().match(phrase)) { // Text only, matching
					$(this).replaceWith($(this).text().replace(phrase, '<span style="color: #' + colour + '">' + phrase + '</span>', 'g'));
				} else if (this.nodeType === 3) { // Text only
					//ignore
				} else if ($(this).text().match(phrase)) { // Child element
					highlightInner($(this), phrase, colour);
				}
			});
		}
		var setttings = gc.getValue('a-chathighlighter-list') ? gc.getValue('a-chathighlighter-list').split("\n") : [];
		var highlight = function () {
				for (var i = 0; i < setttings.length; i = i + 1) {
					if (!setttings[i].match(';')) {
						console.error("[Chat highlighter] Setting '" + setttings[i] + "' is incorrect. There should be a semicolon in it.");
						continue;
					}
					var parts = setttings[i].split(";");
					var phrase = parts[0];
					var colour = parts[1];
					if ((colour.length !== 6 && colour.length !== 3) || colour.replace(/\D/g, '') === "") {
						console.error("[Chat highlighter] Setting '" + setttings[i] + "' is incorrect. The assigned colour value is incorrect.");
						continue;
					}
					highlightInner($("#chat, table.bodybox[width='105'], td[colspan='3'] table.table_back"), phrase, colour);
				}
			};
		highlight();
		if (gc.location.match(/i_chat.cfm/)) {
			window.setInterval(highlight, 10000);
		}
	}
};
