/**
 * key bindings
 */
app.mod.keybindings = {
	id: 'a-keybindings',
	title: 'Key bindings',
	description: 'Add key bindings of your choice to most GC pages (all except forum - if you feel forum should be included, contact me - Anfit).',
	items: [{
		type: 'list',
		id: 'a-keybindings-list',
		defaultValue: app.gameServer + 'forum2/;F\n' + app.gameServer + 'i.cfm?&antireload&f=com_ship2&shiptype=19;V',
		description: 'Replace SFGC\'s antireload with "antireload". V is capital v and stands for "Shift+v".'
	}],
	/**
	 * @cfg filter function a function which returns true only when this mod can be launched
	 */
	filter: function () {
		if (!gc.getValue('a-keybindings')) {
			return false;
		}
		if (!gc.getValue('a-keybindings-list')) {
			return false;
		}
		if (gc.location.match(/i.cfm/)) {
			return true;
		}
		return false;
	},
	/**
	 * @cfg plugin function the main functionality of the mod
	 */
	plugin: function () {
		$(window).keypress(function (event) {
			var wrongNodes = $(event.target).parentsUntil("TEXTAREA, INPUT, BUTTON");
			if (wrongNodes.length) {
				return;
			}
			var keys = gc.getValue('a-keybindings-list').replace(/antireload/g, gc.getValue('antiReload')).split("\n");
			for (var i = 0; i < keys.length; i++) {
				var parts = keys[i].split(";");
				var key = parts[1];
				var link = parts[0];
				if (parts.length !== 2 || key.length !== 1) {
					console.error("[Key bindings] config line " + keys[i] + " is wrong...");
					continue;
				}
				if (String.fromCharCode(event.which) === key) {
					document.location.href = link;
				}
			}
		});
	}
};
