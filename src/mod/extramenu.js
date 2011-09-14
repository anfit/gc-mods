/**
 * Extra menu
 */
app.mod.extramenu = {
	id: 'a-extramenu',
	defaultValue: true,
	title: 'Extra menu',
	description: 'Add a new customisable menu (below normal ones) with shortcuts of your choice, visible on most GC pages.',
	items: [{
		type: 'list',
		id: 'a-extramenu-list',
		defaultValue: "http://www.sfcommunity.co.nr/;SFCommunity\n" + app.modsServer + ";Anfit's Scriptorium\ni.cfm?f=com_project2&id=3;Capsule Lab",
		description: 'List of menu items: one link per line, followed with a label after a semicolon'
	}, {
		type: 'info',
		text: 'SFGC links include a randomized antireload entry. Sometimes its imporant, sometimes not (e.g. market requires you to have a correct antireload value in your queries). In the settings above replace SFGC\'s antireload (four digits in some links) with "antireload".'
	}],
	/**
	 * @cfg filter function a function which returns true only when this mod can be launched
	 */
	filter: function () {
		if (!gc.getValue('a-extramenu')) {
			return false;
		}
		if (!$("table.bodybox tr td font.table_row0")[0]) {
			return false;
		}
		if (gc.location.match(/i.cfm.*f.com/)) {
			return true;
		}
		return false;
	},
	/**
	 * @cfg plugin function the main functionality of the mod
	 */
	plugin: function () {
		var links = [];
		//fuck yeah :P
		if (gc.empireName === 'Anfit') {
			links.push({
				url: 'i.cfm?&' + gc.getValue('antiReload') + '&f=com_col_find&colid=20085661&tid=23',
				name: 'U.Spaz'
			});
		}
		//user links
		if (gc.getValue('a-extramenu-list')) {
			var userLinks = gc.getValue('a-extramenu-list').replace(/antireload/g, gc.getValue('antiReload')).split("\n");
			for (var i = 0; i < userLinks.length; i++) {
				var parts = userLinks[i].split(";");
				if (parts.length === 2) {
					links.push({
						url: parts[0],
						name: parts[1]
					});
				} else if (parts.length === 1) {
					links.push({
						url: parts[0],
						name: '[unnamed link]'
					});
				}
			}
		}
		//show extra menu if there are any links
		if (links.length > 0) {
			var wrap = $("table.bodybox tr td font.table_row0:first");
			wrap.append('<br /><br />Extra');
			$.tmpl('<br /><a href="${url}">${name}</a>', links).appendTo(wrap);
		}
	}
};
