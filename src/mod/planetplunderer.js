/**
 * planet plunderer
 */
app.mod.planetplunderer = {
	id: 'a-planetplunderer',
	defaultValue: true,
	title: 'Planet plunderer',
	description: 'Fast plunder for non-paid accounts.',
	items: [{
		type: 'info',
		text: 'Adds direct plunder buttons to planet list. Support Stephen so he can update GC oh so often. Or be a cheap bastard and use this tweak... And, no, you cannot plunder somebody else\'s planets, I have checked >:)'
	}],
	/**
	 * Returns true only when this mod can be launched
	 */
	filter: function () {
		if (!gc.getValue('a-planetplunderer')) {
			return false;
		}
		//unpaid accounts only
		if (gc.isPaid) {
			return false;
		}
		if (gc.location.match(/f=com_col$/)) {
			return true;
		}
		return false;
	},
	/**
	 * Mod's body function
	 */
	plugin: function () {
		var table = $("table.table_back[width='100%'] table[width='100%']");
		$("tr:first", table).append('<td>&nbsp;x&nbsp;</td>');
		$("tr td:first", table).remove();
		var rows = $("tr.table_row1", table);
		rows.each(function () {
			var planetId = $("input", this).val();
			$(this).children().first().remove();
			if (planetId) {
				$(this).append('<td class="a-planetplunderer-plunderable a-button" planetid="' + planetId + '">&nbsp;x&nbsp;</td>');
			} else {
				$(this).append('<td>&nbsp;&nbsp;&nbsp;</td>');
			}
		});
		$(".a-planetplunderer-plunderable").click(function () {
			var planetId = $(this).attr("planetid");
			gc.xhr({
				url: app.gameServer + 'i.cfm?&f=com_col_plunder&cid=' + planetId + '&co=1',
				successCondition: "b:contains('Colony has been destroyed')",
				onSuccess: function (response) {
					console.log("[Planet plunderer] Planet " + planetId + " was destroyed.");
					$("td.a-planetplunderer-plunderable[planetid='" + planetId + "']").parent().remove();
				},
				onFailure: function (response) {
					console.error("[Planet plunderer] XHR query to plunder aa planet " + planetId + " failed.");
				}
			});
		});
		var button = $("input[value='Plunder Colony']");
		button.hide();
	}
};
