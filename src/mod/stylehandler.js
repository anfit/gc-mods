/**
 * CSS tweaks
 */
app.mod.stylehandler = {
	id: 'a-stylehandler',
	defaultValue: true,
	title: 'CSS tweaks',
	description: 'Adapts game CSS stylesheet.',
	items: [{
		type: 'checkbox',
		id: 'a-stylehandler-nobgimage',
		defaultValue: true,
		description: 'Remove background images from most gc pages.'
	}],
	/**
	 * Returns true only when this mod can be launched
	 */
	filter: function () {
		if (!gc.getValue('a-stylehandler')) {
			return false;
		}
		return true;
	},
	/**
	 * Mod's body function
	 */
	plugin: function () {
		if (gc.getValue('a-stylehandler-nobgimage') && gc.isPropertyPage()) {
			$("body").addClass('no-blue-image');
		}
	}
};
