/**
 * Infrastructure building tweak
 */
app.mod.researchtweak = {
	id: 'a-researchtweak',
	defaultValue: true,
	title: 'Reasearch tweak',
	description: 'Reasearch at most 999 turns of anything (at once) instead of 9.',
	/**
	 * Returns true only when this mod can be launched
	 */
	filter: function () {
		if (!gc.getValue('a-researchtweak')) {
			return false;
		}
		if (gc.location.indexOf('com_research') !== -1) {
			return true;
		}
		return false;
	},
	/**
	 * Mod's body function
	 */
	plugin: function () {
		$("input[name='turns']").attr('maxlength', 3).val(999);
	}
};
