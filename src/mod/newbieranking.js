/**
 * newbie protection ranking
 */
app.mod.newbieranking = {
	id: "a-newbieranking",
	defaultValue: true,
	title: "Ranking around newbie protection",
	description: "Replaces the absurd empty 'Rank near me' page for empires in Newbie Protection with something which may show some empires around thr 5000PR threashold. If your servers is underpopulated you might want to change the threshold value below to something higher (idea: wingnut).",
	items: [{
		id: 'a-newbieranking-threshold',
		defaultValue: '7000',
		type: 'list',
		description: 'Show empires with power rating this high or lower. If no empires above newbie protection, but below this value exist, then the usual "Nothing listed here" message will be shown...'
	}],
	/**
	 * Returns true only when this mod can be launched
	 */
	filter: function () {
		if (!gc.getValue('a-newbieranking')) {
			return false;
		}
		if (!gc.location.match(/rank/)) {
			return false;
		}
		if (gc.power.getValue() >= 5000) {
			return false;
		}
		return true;
	},
	/**
	 * Mod's body function
	 */
	plugin: function () {
		$("a[href$='rank2']").attr('href', 'i.cfm?f=rank2&nx=' + gc.getValue('a-newbieranking-threshold'));
	}
};
