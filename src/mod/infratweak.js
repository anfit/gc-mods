/**
 * Infrastructure building tweak
 */
app.mod.infratweak = {
	id: 'a-infratweak',
	defaultValue: true,
	title: 'Infrastructure building tweak',
	description: 'Build at most 99999 of anything on a colony (at once) instead of 999.',
	/**
	 * Returns true only when this mod can be launched
	 */
	filter: function () {
		if (!gc.getValue('a-infratweak')) {
			return false;
		}
		if (gc.location.match(/com_col.*colid/)) {
			return true;
		}
		return false;
	},
	/**
	 * Mod's body function
	 */
	plugin: function () {
		$("input[maxlength='3']").attr('maxlength', 5);
	}
};
