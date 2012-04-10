/**
 * forum killfile
 */
app.mod.forumkillfile = {
	id: 'a-forumkillfile',
	title: 'Forum killfile',
	description: 'Removes forum posts and threads by users you list in the settings.',
	items: [{
		type: 'list',
		id: 'a-forumkillfile-list',
		defaultValue: 'usernameOne,usernameTwo',
		description: 'Enter name of people you want to ignore, comma-separated (in one line)'
	}],
	/**
	 * Returns true only when this mod can be launched
	 */
	filter: function () {
		if (!gc.getValue('a-forumkillfile')) {
			return false;
		}
		if (!gc.getValue('a-forumkillfile-list')) {
			return false;
		}
		if (gc.location.indexOf('hef') !== -1) {
			return true;
		}
		return false;
	},
	/**
	 * Mod's body function
	 */
	plugin: function () {
		var shitlist = gc.getValue('a-forumkillfile-list').replace(/ /g, '').split(',');
		for (var i = 0; i < shitlist.length; i = i + 1) {
			var name = shitlist[i];
			if (!name) {
				continue;
			}
			$("tr td.fs font:contains('" + name + "')").parent().parent().addClass("a-forumkillfile-hidden");
			$("tr td:first-child a:contains('" + name + "')").parent().parent().addClass("a-forumkillfile-hidden");
			$("tr.tb1 td:first-child").attr("width", "1%");
		}
	}
};
