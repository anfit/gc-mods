/**
 * Common css. This should be run as the last mod
 */
app.mod.commoncss = {
	id: 'a-commoncss',
	defaultValue: true,
	title: 'Common css actions',
	description: 'Css manipulations common to most mods, eg.: on mouse over background change for action buttons.',
	items: [{
		type: 'info',
		text: 'You really should not disable this part, but if you want to take the eye candy off, feel free to do so.'
	}],
	/**
	 * Returns true only when this mod can be launched
	 */
	filter: function () {
		if (!gc.getValue('a-commoncss')) {
			return false;
		}
		return true;
	},
	/**
	 * Mod's body function
	 */
	plugin: function () {
		$(".a-button").hover(

		function () {
			$(this).addClass("table_row0").removeClass("table_row1");
		}, function () {
			$(this).removeClass("table_row0").addClass("table_row1");
		});
		$(".a-revbutton").hover(

		function () {
			$(this).removeClass("table_row0").addClass("table_row1");
		}, function () {
			$(this).addClass("table_row0").removeClass("table_row1");
		});
	}
};
