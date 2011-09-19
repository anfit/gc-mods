/**
 * preset builder
 */
app.mod.presetbuilder = {
	id: 'a-presetbuilder',
	defaultValue: true,
	title: 'Preset builder',
	description: 'Build stacks fast from saved presets.',
	items: [{
		type: 'info',
		text: 'This mod replaces the quick dial. It offers some of the functionalities its predecessor. Is quite likely to be actively developed in the future.'
	}],
	/**
	 * @cfg filter function a function which returns true only when this mod can be launched
	 */
	filter: function () {
		if (!gc.getValue('a-presetbuilder')) {
			return false;
		}
		if (gc.location.match(/rank/)) {
			return true;
		}
		if (gc.location.match(/com_explore/)) {
			return true;
		}
		if (gc.location.match(/com_attack/)) {
			return true;
		}
		return false;
	},
	/**
	 * @cfg plugin function the main functionality of the mod
	 */
	plugin: function () {
		$("body").append('<div id="a-presetbuilder-wrap" class="draggable" title="These presets can be edited from the Build Ships page"><b>Presets: </b><br/><table class="a-table" width="100%" id="a-presetbuilder-saves"><tbody><tr class="table_row2"><td id="a-ship-save-a" class="a-presetbuilder-save a-button">&nbsp;</td><td id="a-ship-save-b" class="a-presetbuilder-save a-button">&nbsp;</td><td id="a-ship-save-c" class="a-presetbuilder-save a-button">&nbsp;</td><td id="a-ship-save-d" class="a-presetbuilder-save a-button">&nbsp;</td><td id="a-ship-save-e" class="a-presetbuilder-save a-button">&nbsp;</td></tr><tr class="table_row2"><td id="a-ship-save-f" class="a-presetbuilder-save a-button">&nbsp;</td><td id="a-ship-save-g" class="a-presetbuilder-save a-button">&nbsp;</td><td id="a-ship-save-h" class="a-presetbuilder-save a-button">&nbsp;</td><td id="a-ship-save-i" class="a-presetbuilder-save a-button">&nbsp;</td><td id="a-ship-save-j" class="a-presetbuilder-save a-button">&nbsp;</td></tr></tbody></table></div><div id="a-presetbuilder-save-infobox" style="display: none;"><table width="100%"><tbody><tr></tr></tbody></table></div>');
		//get all ships. note: the ships array is indexed by shipid, which means that entries are nullable;
		var allShipsJson = gc.getValue('a-allships');
		var allShips = [];
		if (allShipsJson) {
			allShips = $.secureEvalJSON(allShipsJson);
			if (!allShips) {
				allShips = [];
			}
		}
		
		//help on usage
		var usageHelpTitle = 'How to use the preset builder';
		var usageHelpMessage = 'Preset builder allows to build many different ships at once, fast. You have to define a preset first in the ship builder. Afterwards you can just click on an item in the preset list to build it, if you have the resources and turns of course.';
		gc.showMessage(usageHelpTitle, usageHelpMessage, 'a-presetbuilder-usagehelp');
		var pageTitle = $("#a-presetbuilder-wrap b:contains('Presets')");
		pageTitle.append('<img src="i/help.gif" title="' + usageHelpTitle + '" />').click(function () {
			if (!$("#a-presetbuilder-usagehelp").length) {
				gc.showMessage(usageHelpTitle, usageHelpMessage);
			}
		});
		
		
		$('#a-presetbuilder-wrap').css('top', typeof gc.getValue('a-presetbuilder-wrap-top') === "undefined" ? 108 : gc.getValue('a-presetbuilder-wrap-top'));
		$('#a-presetbuilder-wrap').css('left', typeof gc.getValue('a-presetbuilder-wrap-left') === "undefined" ? 0 : gc.getValue('a-presetbuilder-wrap-left'));
		$('#a-presetbuilder-wrap').mousedown(app.util.startDragging);
		$(document).bind('dragStop', function (e, targetId, top, left) {
			gc.setValue(targetId + '-top', top);
			gc.setValue(targetId + '-left', left);		
		});
		
		$(".a-presetbuilder-save").each(function () {
			var id = $(this).attr('id');
			var label = gc.getValue(id + "-name");
			if (label) {
				$(this).text(label);
			}
		});
		$(".a-presetbuilder-save").click(function () {
			var id = $(this).attr('id');
			var save = [];
			var saveJson = gc.getValue(id + "-value");
			if (saveJson && saveJson !== '[]') {
				save = $.secureEvalJSON(saveJson);
				if (!save) {
					save = [];
				}
				for (var i = 0; i < save.length; i++) {
					gc.xhr({
						url: 'i.cfm?&f=com_ship2&shiptype=' + save[i].id,
						data: 'amount=' + save[i].amount,
						successCondition: "td:contains('You bought ')",
						onSuccess: function (response) {
							var msg = $("td:contains('You bought ')", response).contents().filter(function () {
								return this.nodeType === 3 && this.textContent.match('You bought');
							});
							console.log('[Preset builder] ' + msg.text());
						},
						onFailure: function (response) {
							var name = $("b:contains('SHIPS')", response).text();
							var msg = $("font[color='red'] > b", response).text();
							console.error('[Preset builder] ' + name + ': ' + msg);
						}
					});
				}
			}
		});
		$(".a-presetbuilder-save").hover(
		function (e) {
			var id = $(this).attr('id');
			var value = gc.getValue(id + "-value");
			if (value && value !== '[]') {
				$(this).text('build');
				var saveJson = gc.getValue(id + "-value");
				var save = $.secureEvalJSON(saveJson);
				if (!save) {
					save = [];
				}
				var totals = {
					name: "total", 
					amount: '',
					turns: 0,
					power: 0
				};
				var savedStacks = [];
				for (var i = 0; i < save.length; i++) {
					var stack = jQuery.extend(true, {}, allShips[save[i].id]);
					stack.amount = save[i].amount;
					stack.turns = Math.ceil(save[i].amount / stack.build);
					totals.turns += stack.turns;
					totals.power += stack.power;
					savedStacks.push(stack);
				}
				savedStacks.sort(app.util.sortByPowerDesc);
				var saveMarkup = '<tr class="a-presetbuilder-save-body"><td align="left"  width="70%">${name}</td><td align="right" width="10%">${amount}</td><td align="right" width="10%">${turns}</td><td align="right" width="10%">${power}</td></tr>';
				$("#a-presetbuilder-save-infobox").attr("style", 'display: block; top: ' + (e.clientY + 25) + 'px; left: ' + (e.clientX + 5) + 'px;');
				$.tmpl(saveMarkup, savedStacks).appendTo("#a-presetbuilder-save-infobox tbody");
				var totalsMarkup = '<tr id="a-presetbuilder-totals-body"><td align="left"  width="70%">${name}</td><td align="right" width="10%">${amount}</td><td align="right" width="10%">${turns}</td><td align="right" width="10%">${power}</td></tr>';
				$.tmpl(totalsMarkup, totals).appendTo("#a-presetbuilder-save-infobox tbody");
			}
		}, function () {
			var id = $(this).attr('id');
			var value = gc.getValue(id + "-value");
			if (value && value !== '[]') {
				var label = gc.getValue(id + "-name");
				$(this).text(label);
				$("#a-presetbuilder-save-infobox tr").remove();
				$("#a-presetbuilder-save-infobox").hide();
			} else {
				$(this).html('&nbsp;');
			}
		});
	}
};
