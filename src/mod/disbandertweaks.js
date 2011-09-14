/**
 * disbander tweaks
 */
app.mod.disbandertweaks = {
	id: 'a-disbandertweaks',
	defaultValue: true,
	title: 'Fleet disbander tweaks',
	description: 'Slightly improves the "Manage Fleet" page. Calculates total PR and fleet PR after disbanding, shows 130% and 150% threshold, etc.',
	items: [{
		type: 'info',
		text: 'You can also disband stacks entire from the manage fleet page if you have that mod enabled.'
	}],
	/**
	 * @cfg filter function a function which returns true only when this mod can be launched
	 */
	filter: function () {
		if (!gc.getValue('a-disbandertweaks')) {
			return false;
		}
		if (gc.location.match(/com_disband$/)) {
			return true;
		}
		return false;
	},
	/**
	 * @cfg plugin function the main functionality of the mod
	 */
	plugin: function () {
		//info
		$("table.bodybox[width='550'] td:first").append('<div>Anfit\'s tweaks:<ul><li>All you have to do is type in the input fields.</li><li>Quick disband (-10/-50) idea by VorteX...</li></ul></div>');
		var table = $("table.table_back[width='500'] table");
		var rows = $("tr", table);
		if (rows && rows.length === 1) {
			return;
		}
		//table headers
		rows.first().append('<td class="a-revbutton a-disbandertweaks-disband10" title="Click to prepare a 10% stack disband query">-10</td><td class="a-revbutton a-disbandertweaks-disband50" title="Click to prepare a 50% stack disband query">-50</td><td class="a-revbutton a-disbandertweaks-disbandall" title="Click to prepare a full stack disband query">all</small></td>');
		rows.filter("tr:gt(0)").append('<td class="a-button a-disbandertweaks-disband10" title="Click to prepare a 10% stack disband query">-10</td><td class="a-button a-disbandertweaks-disband50" title="Click to prepare a 50% stack disband query">-50</td><td class="a-button a-disbandertweaks-disbandall" title="Click to prepare a full stack disband query">all</small></td>');
		$("tr.table_row0:first", table).parent().attr("id", "a-disbandertweaks-parentTable");
		$("td.a-disbandertweaks-disband10:first").click(function () {
			$("td.a-disbandertweaks-disband10:gt(0)").each(function () {
				$(this)[0].click();
			});
		});
		$("td.a-disbandertweaks-disband50:first").click(function () {
			$("td.a-disbandertweaks-disband50:gt(0)").each(function () {
				$(this)[0].click();
			});
		});
		$("td.a-disbandertweaks-disbandall:first").click(function () {
			$("td.a-disbandertweaks-disbandall:gt(0)").each(function () {
				$(this)[0].click();
			});
		});
		$("tr:gt(0)", table).each(function () {
			var name = $.trim($("td:eq(0)", this).text());
			var pr = $("td:eq(5)", this).text().replace(/\D/g, '');
			var amount = $("td:eq(3)", this).text().replace(/\D/g, '');
			var stackUpkeep = $("td:eq(4)", this).text().replace(/\D/g, '');
			var upkeep = stackUpkeep / amount;
			var inputNode = $("td:eq(2) input", this);
			inputNode.val(0);
			var amountNode = $("td:eq(3)", this);
			var stackUpkeepNode = $("td:eq(4)", this);
			var stackPrNode = $("td:eq(6)", this);
			stackPrNode.addClass("a-disbandertweaks-stackpr");
			$("td.a-disbandertweaks-disband10", this).click(function (e) {
				inputNode.val(Math.floor(amount * 0.10));
				inputNode.trigger("change");
			});
			$("td.a-disbandertweaks-disband50", this).click(function (e) {
				inputNode.val(Math.floor(amount * 0.50));
				inputNode.trigger("change");
			});
			$("td.a-disbandertweaks-disbandall", this).click(function (e) {
				inputNode.val(amount);
				inputNode.trigger("change");
			});
			inputNode.change(function (e) {
				var disbandedAmount = $(this).val().replace(/\D/g, '') * 1;
				var newAmount = Math.max(amount - disbandedAmount, 0);
				amountNode.html(app.util.formatCurrency(newAmount) + "&nbsp;");
				stackUpkeepNode.html(app.util.formatCurrency(newAmount * upkeep) + "&nbsp;");
				stackPrNode.html(app.util.formatCurrency(newAmount * pr));
				var fleetPr = 0;
				$("td.a-disbandertweaks-stackpr").each(function () {
					fleetPr += $(this).text().replace(/\D/g, '') * 1;
				});
				var basePr = $("#a-disbandertweaks-fleetPr").attr("basePr") * 1;
				$("#a-disbandertweaks-fleetPr").text(app.util.formatCurrency(fleetPr));
				$('#a-disbandertweaks-totalPr').text(app.util.formatCurrency(basePr + fleetPr));
				$('#a-disbandertweaks-totalPr130').text(app.util.formatCurrency(Math.floor((basePr + fleetPr) / 1.3)));
				$('#a-disbandertweaks-totalPr150').text(app.util.formatCurrency(Math.floor((basePr + fleetPr) / 1.5)));
			});
		});
		var fleetPr = 0;
		$("td.a-disbandertweaks-stackpr").each(function () {
			fleetPr += $(this).text().replace(/\D/g, '') * 1;
		});
		var basePr = 1 * gc.power.get() - fleetPr;
		var markup = '<tr class="table_row0"><td colspan="5"/><td>total fleet pr:</td><td id="a-disbandertweaks-fleetPr" align="right" basepr="${basePr}">${fleetPr}</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr class="table_row0"><td colspan="5"/><td>total pr:</td><td id="a-disbandertweaks-totalPr" align="right">${totalPr}</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr class="table_row0"><td colspan="5"/><td>pr / 130%:</td><td id="a-disbandertweaks-totalPr130" align="right">${totalPr130}</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr class="table_row0"><td colspan="5"/><td>pr / 150%:</td><td id="a-disbandertweaks-totalPr150" align="right">${totalPr150}</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>';
		$.tmpl(markup, {
			basePr: basePr,
			fleetPr: app.util.formatCurrency(fleetPr),
			totalPr: app.util.formatCurrency(gc.power.get()),
			totalPr130: app.util.formatCurrency(Math.floor(gc.power.get() / 1.3)),
			totalPr150: app.util.formatCurrency(Math.floor(gc.power.get() / 1.5))
		}).appendTo("#a-disbandertweaks-parentTable", table);
	}
};
