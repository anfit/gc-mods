/**
 * market tweaks
 */
app.mod.markettweaks = {
	id: "a-markettweaks",
	defaultValue: true,
	title: "Market tweaks",
	description: "Adds small improvements to the market (buy faster and similar, see notes added to the market pages). Thx, Wingnut for the idea!.",
	items: [{
		type: 'info',
		text: 'Type in a price total and is calculates the amount; click on the topmost offer to fill in the purchase form with that amount; ctrl-click on the topmost offer to buy it.'
	}],
	/**
	 * Returns true only when this mod can be launched
	 */
	filter: function () {
		if (!gc.getValue('a-markettweaks')) {
			return false;
		}
		if (gc.location.indexOf('market2') !== -1) {
			return true;
		}
		return false;
	},
	/**
	 * Mod's body function
	 */
	plugin: function () {
		$("input[name^='total']").removeAttr("onfocus");
		$("input[name='totalbuy']").change(function (e) {
			$("input[name='amount']").val(Math.floor($("input[name='totalbuy']").val() / $("input[name='price']").val()));
		});
		$("input[name='totalsell']").change(function (e) {
			$("input[name='amount']").val(Math.floor($("input[name='totalsell']").val() / $("input[name='price']").val()));
		});
		var topOffer = $("table.bodybox[width='550'] table.table_back:eq(3) table tr:eq(1)");
		//set title
		topOffer.attr("title", "Click to fill the buy field with the amount from the topmost offer. Ctrl-click to buy this offer, instead.");
		topOffer.addClass("a-button");
		//on click
		topOffer.click(function (e) {
			$("input[name='amount']").val($("td:eq(1)", this).text().replace(/^\s*|,|\s*$/g, ''));
			if (e.ctrlKey === true) {
				$("input[name='buyflag']")[0].click();
			}
		});
		$("table.bodybox[width='550'] td:first").append('<div><ul><li>Type total price and amount gets calculated automagickally (idea by wingnut),</li><li>Click on the topmost offer to fill the buy field with that amount,</li><li>Ctrl-click on the topmost offer to BUY it.</li></ul></div>');
	}
};
