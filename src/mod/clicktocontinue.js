/**
 * Click to continue
 */
app.mod.clicktocontinue = {
	id: 'a-clicktocontinue',
	defaultValue: true,
	title: 'Click to continue',
	description: 'Some pages sprout a "Click to continue" message. This tweak does that click for you.',
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
		var click = $("a:contains('Click here to continue.')");
		if (click.length) {
			click[0].click();
		}
	}
};
