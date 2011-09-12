/**
 * tabbed pms
 */
app.mod.tabbedpms = {
	id: 'a-tabbedpms',
	defaultValue: true,
	title: 'Tabbed private messages',
	description: 'When it spots the blinking yellow annoyance it opens a new tab with PM inbox. And more...',
	items: [{
		type: 'checkbox',
		id: 'a-tabbedpms-autoopen',
		defaultValue: true,
		description: 'Jump to new PMs automagically (in new tab each)?'
	}],
	/**
	 * @cfg filter function a function which returns true only when this mod can be launched
	 */
	filter: function () {
		if (!gc.getValue('a-tabbedpms')) {
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
		//on new pms --> open inbox
		if ($("td[background*='blink']").length && !gc.location.match(/.*f=pm/)) {
			GM_openInTab(app.gameServer + "i.cfm?f=pm");
		}
		//on inbox
		if (gc.location.match(/.*f=pm$/)) {
			var newPms = $("table.table_back[width='80%'] img[src='i/w/pm_n.gif']"); //new, unanswered pms
			if (newPms.length) {
				var newTitle;
				if (newPms.length > 1) {
					newTitle = newPms.length + " PMs";
				} else {
					newTitle = newPms.first().parent().siblings().eq(2).text();
				}
				document.title = newTitle;
				if (gc.getValue('a-tabbedpms-autoopen')) {
					newPms.each(function () {
						var newpmlink = $(this).first().parent().siblings().eq(3).children().first().attr("href");
						if (newPms.length > 1) {
							GM_openInTab(app.gameServer + newpmlink);
						} else {
							document.location.href = app.gameServer + newpmlink;
						}
					});
				}
			}
		}
		//on pms
		else if (gc.location.match(/.*f=pm/)) {
			document.title = $.trim($("img[src='i/w/pm_add.gif']").first().parent().parent().text());
		}
	}
};
