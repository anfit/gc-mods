/**
 * Click to continue
 */
app.mod.clicktocontinue = {
	id: 'a-clicktocontinue',
	defaultValue: true,
	title: 'Click to continue',
	description: 'Some pages show a "Click to continue" message. This mod clicks there automatically.',
	/**
	 * Returns true only when this mod can be launched
	 */
	filter: function () {
		if (!gc.getValue('a-clicktocontinue')) {
			return false;
		}
		return true;
	},
	/**
	 * Mod's body function
	 */
	plugin: function () {
		var el = $("a:contains('Click here to continue.')");
		if (el.length) {
			el[0].click();
		}
	}
};
