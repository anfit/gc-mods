/**
 * battles markup
 */
app.mod.battlesmarkup = {
	id: 'a-battlesmarkup',
	defaultValue: true,
	title: 'Battles markup',
	description: 'Replaces copy-pasted battle logs in fed chat and in the forums with a neat table.',
	/**
	 * Returns true only when this mod can be launched
	 */
	filter: function () {
		if (!gc.getValue('a-battlesmarkup')) {
			return false;
		}
		if (gc.location.match(/fed_forum/)) {
			return true;
		}
		return false;
	},
	/**
	 * Mod's body function
	 */
	plugin: function () {
		var regexp = /^\s*([\-\w \.\(\)]+)\s+([\d,]+)\s+([\d,]+)\s+([\d,]+)\s*$/gi;
		var template = '<ul class="a-battlesmarkup-ship"><li class="a-battlesmarkup-ship-name">$1</li><li class="a-battlesmarkup-ship-amount">$2</li><li class="a-battlesmarkup-ship-lost">$3</li><li class="a-battlesmarkup-ship-remaining">$4</li></ul>';
		var cells = $("table.table_back[width='500'] table tr td:odd");
		var buf = 0;
		var lastBreakLine;
		cells.each(function () {
			$(this).contents().each(function () {
				if (this.nodeType === 3 && this.textContent.match(regexp)) {
					if (buf === 0) {
						buf = 1;
					} else {
						$(lastBreakLine).remove();
					}
					$(this).replaceWith(this.textContent.replace(regexp, template));
				} else if (this.nodeType === 3) {
					if (buf === 1) {
						buf = 0;
					}
				} else if (this.nodeName === 'BR') {
					lastBreakLine = this;
				}
			});
		});
	}
};
