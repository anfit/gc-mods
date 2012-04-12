/**
 * ship builder
 */
app.mod.shipbuilder = {
	id: 'a-shipbuilder',
	defaultValue: true,
	title: 'Ship builder',
	description: 'Build many stacks at once, clean and fast.',
	items: [{
		type: 'info',
		text: 'This mod replaces the old fleet builder mod. Old functionalities are still there: a doubleclick removes a saved preset. The main new thing is that this mods acquires ship data dynamically, whenever you visit a build page of a particular ship. If some of the data (e.g. build rates) are wrong, just visit the apropriate ship page. Also: you can use this to manage existing fleets...'
	}, {
		type: 'checkbox',
		defaultValue: true,
		id: 'a-shipbuilder-resetafterbuild',
		description: 'Reset form after successful build'
	}],
	/**
	 * Returns true only when this mod can be launched
	 */
	filter: function () {
		if (!gc.getValue('a-shipbuilder')) {
			return false;
		}
		if (gc.location.indexOf('com_ship') !== -1) {
			return true;
		}
		return false;
	},
	/**
	 * Mod's body function
	 */
	plugin: function () {
		
		var harvestShipData, refreshExistingFleet, RESET_AFTER_BUILD, OPTIMIZE_UPKEEP;
		
		/**
		 * Read ship data from dom
		 * 
		 * @param {Node=} scope Dom node within which ship data should be looked for
		 * @return {Object} Ship data read from dom nodes on this page / within scope
		 */
		harvestShipData = function (scope) {
			if (scope === undefined) {
				scope = $("body");
			}
			var tables = $("table.table_back table", scope);
			var ship = {};
			ship.id = $("form[name='stepform']", scope).attr('action').replace(/.*shiptype=/, '') * 1;
			ship.type = $.trim($("td:contains('Class')", tables).next().text());
			ship.build = $.trim($("td:contains('1 turn produces')", tables).next().text().replace(/[^\.\d]/g, '')) * 1;
			ship.weapon = $.trim($("td:contains('Weapon')", tables).next().text().replace(/[^\.\d]/g, '')) * 1;
			ship.damage = {};
			ship.damage.energy = $.trim($("td:contains('Energy Damage')", tables).next().text().replace(/[^\.\d]/g, '')) * 1;
			ship.damage.kinetic = $.trim($("td:contains('Kinetic Damage')", tables).next().text().replace(/[^\.\d]/g, '')) * 1;
			ship.damage.missile = $.trim($("td:contains('Missile Damage')", tables).next().text().replace(/[^\.\d]/g, '')) * 1;
			ship.damage.chemical = $.trim($("td:contains('Chemical Damage')", tables).next().text().replace(/[^\.\d]/g, '')) * 1;
			ship.hull = $.trim($("td:contains('Hull')", tables).next().text().replace(/[^\.\d]/g, '')) * 1;
			ship.range = $.trim($("td:contains('Range')", tables).next().text().replace(/[^\.\d]/g, '')) * 1;
			ship.scanner = $.trim($("td:contains('Scanner rating')", tables).next().text().replace(/[^\.\d]/g, '')) * 1;
			ship.power = $.trim($("td:contains('Power rating')", tables).next().text().replace(/[^\.\d]/g, '')) * 1;
			ship.cost = $.trim($("td:contains('Cost per unit')", tables).next().text().replace(/[^\.\d]/g, '')) * 1;
			ship.upkeep = $.trim($("td:contains('Upkeep')", tables).next().text().replace(/[^\.\d]/g, '')) * 1;
			ship.minerals = {};
			ship.minerals.terranMetal = $.trim($("td:contains('Terran Metal')", tables).next().next().text().replace(/[^\.\d]/g, '')) * 1;
			ship.minerals.redCrystal = $.trim($("td:contains('Red Crystal')", tables).next().next().text().replace(/[^\.\d]/g, '')) * 1;
			ship.minerals.whiteCrystal = $.trim($("td:contains('White Crystal')", tables).next().next().text().replace(/[^\.\d]/g, '')) * 1;
			ship.minerals.rutile = $.trim($("td:contains('Rutile')", tables).next().next().text().replace(/[^\.\d]/g, '')) * 1;
			ship.minerals.composite = $.trim($("td:contains('Composite')", tables).next().next().text().replace(/[^\.\d]/g, '')) * 1;
			ship.minerals.strafezOrganism = $.trim($("td:contains('Strafez Organism')", tables).next().next().text().replace(/[^\.\d]/g, '')) * 1;
			
			return ship;
		};
		
		
		//TODO move ships to game abstraction
		if (!gc.getValue("a-allships", 'JSON_AS_ARRAY')) {
			gc.setValue("a-allships", '%ships.tpl%');
		}
		//get all ships. note: the ships array is indexed by shipid, which means that entries are nullable;
		var allShips = gc.getValue('a-allships', 'JSON_AS_ARRAY');

		/**
		 * ship items are @nullable
		 */
		var shipsAvailable = [];
		//refresh ship data and get the list of ships available to a user;
		$("table.table_back[width='95%'] table tr.table_row1").each(function (n) {
			
			var row = $(this);
			var id = $("td:eq(1) a", this).attr("href").replace(/.*shiptype=/, '') * 1;
			var ship = allShips[id];
			
			if (!ship) {
				ship = {};
			}
			ship.race = $.trim($("td:eq(0)", this).text());
			ship.name = $.trim($("td:eq(1)", this).text());
			ship.id = id;
			ship.type = $.trim($("td:eq(2)", this).text());
			ship.cost = $.trim($("td:eq(3)", this).text()).replace(/[^\.\d]/g, '') * 1;
			ship.upkeep = $.trim($("td:eq(4)", this).text()).replace(/[^\.\d]/g, '') * 1;
			ship.weapon = $.trim($("td:eq(5)", this).text()).replace(/[^\.\d]/g, '') * 1;
			ship.hull = $.trim($("td:eq(6)", this).text()).replace(/[^\.\d]/g, '') * 1;
			ship.range = $.trim($("td:eq(7)", this).text()).replace(/[^\.\d]/g, '') * 1;
			ship.power = $.trim($("td:eq(8)", this).text()).replace(/[^\.\d]/g, '') * 1;
			if (!ship.order) {
				ship.order = n;
			}
			
			if (!ship.build) {
				gc.showMessage('Incomplete ' + ship.name  + ' data', 'Data for ' + ship.name  + ' appears to be incomplete, please wait until it gets harvested. Reload this page after you see an appropriate success message in mod console (left bottom page corner).');
				gc.xhr({
					url: 'i.cfm?f=com_ship2&shiptype=' + id,
					onSuccess: function (response) {
						allShips[id] = harvestShipData(response);
						gc.setValue("a-allships", JSON.stringify(allShips));
						console.log('Harvested data of ' + ship.name + '.');
					},
					onFailure: function (response) {
						console.log('Query to the ship page for ' + ship.name + ' returned no reply. Terminated.');
					}
				});
			}
			
			allShips[id] = ship;
			shipsAvailable.push(ship);
		});
		
		shipsAvailable.sort(function (a, b) {
			var oA = 0, oB = 0;
					
			if (a && a.order) {
			    oA = a.order;
			}
			if (b && b.order) {
			    oB = b.order;
			}
			if (typeof oA === "string" || typeof oB === "string") {
				return (oA + "").localeCompare((oB + ""));
			}
			return oA - oB;
		});
		
		
		if (gc.location.match(/com_ship$/)) {
			gc.setValue("a-shipbuilder-shipsAvailable", JSON.stringify(shipsAvailable));
		}
		if (gc.location.match(/com_ship.*shiptype/)) {
			
			var id = (gc.location + '').replace(/.*shiptype=/, '') * 1;
			var ship = allShips[id];
			if (!ship) {
				ship = {};
			}
			
			$.extend(ship, harvestShipData());

			allShips[id] = ship;
		}

		gc.setValue("a-allships", JSON.stringify(allShips));
		var pageTitle = $("b:contains('BUILDING SHIPS')");
		
		//help on harvesting
		gc.showMessage('Ship data caching', 'For the ship builder to work it requires valid ship data (power rating, build rate, etc.). Some of that can and will be harvested from the <a href="i.cfm?f=com_ship">ship list page</a>. However, if any build rate on this page is incorrect or missing, it has to be harvested from that ship\'s respective build page (e.g. <a href="i.cfm?f=com_ship2&shiptype=10">this page for Small Strafez Fodder</a>). There, that ship\'s data will be harvested and cached, to be used in the ship builder and other mods which require detailed ship data. The ship builder page will have to be refreshed afterward to use the newly cached data. This process is automated in case of missing data, but it its incorrect, you have to do it on your own. I would be nice if you emailed me that that happened, though.', 'a-shipbuilder-shipdatahelp');
		
		//help on usage
		var usageHelpTitle = 'How to use the ship builder';
		var usageHelpMessage = 'Ship builder allows to build many different ships at once, fast. The ship types you can build are listed below. The input fields are where you place amounts, which is reflected by the stack building queue below the ship list. If you have enough turns to build what you selected, you will see a submit button there, too.<br />Please note, that some cells in the ship list change background when you move your mouse over them. Those are shortcuts to add/remove from given stack.<br />Furthermore, that above the ship list there are 10 slots for saving fleet presets - just click to save what is currently in the form, to be pasted later. These presets can be used by other mods to quickly build what you want e.g. from the ranking list.<br/ >Lastly, the stack list below the ship list shows not only the stacks you want to build but also the stacks you have already got (queried remotely from the disband page). If you wish to refresh it, either build something or click the "R" header. It may become inaccurate after a while.';
		gc.showMessage(usageHelpTitle, usageHelpMessage, 'a-shipbuilder-usagehelp');
		pageTitle.text('SHIP BUILDER');
		pageTitle.append('<img src="i/help.gif" title="' + usageHelpTitle + '" />').click(function () {
			if (!$("#a-shipbuilder-usagehelp").length) {
				gc.showMessage(usageHelpTitle, usageHelpMessage);
			}
		});
		
		pageTitle.siblings("b ~ a, b ~ table").remove();
		pageTitle.next().next().after("%shipbuilder_ships.tpl%");
		var shipMarkup = "%shipbuilder_ship.tpl%";
		$.tmpl(shipMarkup, shipsAvailable).appendTo("#a-shipbuilder-ships-wrap tbody");
		var stacks = [];
		var stackMarkup = "%shipbuilder_stack.tpl%";
		var stackTotalsMarkup = "%shipbuilder_stacklist.tpl%";
		var totals = {};
		var renderStacks = function () {
				var sortedStacks = jQuery.extend(true, [], stacks);
				sortedStacks.sort(app.util.sortByPowerDesc);
				$("#a-shipbuilder-stacks-wrap tbody tr.table_row1, #a-shipbuilder-ship-totals").remove();
				$.tmpl(stackMarkup, sortedStacks).appendTo("#a-shipbuilder-stacks-wrap tbody");
				//hitch again button on-off - these dom nodes are new to this
				$("#a-shipbuilder-stacks-wrap td.a-button").hover(

				function () {
					$(this).addClass("table_row0").removeClass("table_row1");
				}, function () {
					$(this).removeClass("table_row0").addClass("table_row1");
				});
				//add a disbander event
				$(".a-shipbuilder-disbandall").click(function () {
					gc.xhr({
						url: 'i.cfm?f=com_disband',
						data: 'submitflag=1&' + $(this).attr("disbandId") + '=' + $(this).attr("disbandAmount"),
						onSuccess: refreshExistingFleet
					});
				});
				totals = {};
				for (var i = 0; i < stacks.length; i = i + 1) {
					if (!stacks[i]) {
						continue;
					}
					for (var j in stacks[i]) {
						if (stacks[i].hasOwnProperty(j)) {

							if (!totals[j]) {
								totals[j] = 0;
							}
							totals[j] += stacks[i][j];
						}
					}
				}
				$.tmpl(stackTotalsMarkup, totals).appendTo("#a-shipbuilder-stacks-wrap tbody");
//TODO JCh 2012-01-19 this criteria change after new turns arrive and should be then reevaluated				
//				if (totals.turns > 0 && totals.turns <= gc.turns.getValue() && totals.cost <= gc.cash.getValue()) {
//					$("#a-shipbuilder-submit-wrap").fadeIn('slow');
//				} else {
//					$("#a-shipbuilder-submit-wrap").fadeOut('fast');
//				}
			};
			
		//RESET_AFTER_BUILD
        RESET_AFTER_BUILD = gc.getValue("a-shipbuilder-resetafterbuild") === true ? true : false;
		$("#a-shipbuilder-resetafterbuild").prop("checked", RESET_AFTER_BUILD);			

		$("#a-shipbuilder-resetafterbuild").click(function () {
			RESET_AFTER_BUILD = !RESET_AFTER_BUILD;
			gc.setValue("a-shipbuilder-resetafterbuild", RESET_AFTER_BUILD);
		});	
		
		//OPTIMIZE_UPKEEP
		OPTIMIZE_UPKEEP = gc.getValue("a-shipbuilder-optimize") === true ? true : false;
		$("#a-shipbuilder-optimize").prop("checked", OPTIMIZE_UPKEEP);			

		$("#a-shipbuilder-optimize").click(function () {
			OPTIMIZE_UPKEEP = !OPTIMIZE_UPKEEP;
			gc.setValue("a-shipbuilder-optimize", OPTIMIZE_UPKEEP);
		});	
		
		var changeAmount = function (el, changer) {
			
			var input = el.siblings(".a-shipbuilder-input").children().first();
			var currentAmount = input.val().replace(/\D/, '', 'g') * 1;
			var amount = changer(currentAmount);
			var sid = el.parent().attr("sid");
			
			//nothing to do
			if (!amount && !stacks[sid]) {
				return;
			}
			
			input.val(amount ? amount : '');
			var existing = 0;
			var ship = jQuery.extend(true, {}, allShips[sid]);
			if (stacks[sid] && stacks[sid].existing) {
				ship.existing = stacks[sid].existing;
				ship.disband = stacks[sid].disband;
				existing = stacks[sid].existing * 1;
			}
			
			if (stacks[sid] && !(amount + existing)) {
				delete stacks[sid];
			} else {
				stacks[sid] = ship;
				stacks[sid].amount = amount;
				stacks[sid].turns = Math.ceil(amount / ship.build);
				stacks[sid].cost = ship.cost * amount;
				stacks[sid].upkeep = ship.upkeep * (amount + existing);
				stacks[sid].weapon = ship.weapon * (amount + existing);
				stacks[sid].hull = ship.hull * (amount + existing);
				stacks[sid].power = ship.power * (amount + existing);
				stacks[sid].scanner = ship.scanner * (amount + existing);
			}
			renderStacks();
			
			el.siblings(".a-shipbuilder-stackpower").text(stacks[sid].power);
		};
			
		$(".a-shipbuilder-addone").click(function () {
			changeAmount($(this), function (v) {
				return v + 1;
			});
		});
		$(".a-shipbuilder-addturn").click(function () {
			var el = $(this);
			var sid = el.parent().attr("sid");
			var buildRate = allShips[sid].build;
			changeAmount(el, function (v) {
				return v + buildRate;
			});
		});
		$(".a-shipbuilder-removeturn").click(function () {
			var el = $(this);
			var sid = el.parent().attr("sid");
			var buildRate = allShips[sid].build;
			changeAmount(el, function (v) {
				return Math.max(v - buildRate, 0);
			});
		});
		$(".a-shipbuilder-double").click(function () {
			changeAmount($(this), function (v) {
				return v * 2;
			});
		});
		$(".a-shipbuilder-clear").click(function () {
			changeAmount($(this), function (v) {
				return 0;
			});
		});
		
		$(".a-shipbuilder-addoneall").click(function () {
			$("td.a-shipbuilder-input input").each(function () {
				var el = $(this).parent().next();
				changeAmount(el, function (v) {
					return v + 1;
				});
			});
		});
		$(".a-shipbuilder-addturnall").click(function () {
			$("td.a-shipbuilder-input input").each(function () {
				var el = $(this).parent().next();
				var sid = el.parent().attr("sid");
				var buildRate = allShips[sid].build;
				changeAmount(el, function (v) {
					return v + buildRate;
				});
			});
		});
		$(".a-shipbuilder-removeturnall").click(function () {
			$("td.a-shipbuilder-input input").each(function () {
				var el = $(this).parent().next();
				var sid = el.parent().attr("sid");
				var buildRate = allShips[sid].build;
				changeAmount(el, function (v) {
					return Math.max(v - buildRate, 0);
				});
			});
		});
		$(".a-shipbuilder-doubleall").click(function () {
			$("td.a-shipbuilder-input input").each(function () {
				var el = $(this).parent().next();
				changeAmount(el, function (v) {
					return v * 2;
				});
			});
		});
		$(".a-shipbuilder-clearall").click(function () {
			$("td.a-shipbuilder-input input").each(function () {
				var el = $(this).parent().next();
				changeAmount(el, function (v) {
					return 0;
				});
			});
		});
		$(".a-shipbuilder-resetorder").click(function () {
			for (var i = 0; i < allShips.length; i = i + 1) {
				if (allShips[i] && allShips[i].order) {
					delete allShips[i].order;
				}
			}
			gc.setValue("a-allships", JSON.stringify(allShips));
			console.log("Order was reset, please refresh page.");
		});
		$("td.a-shipbuilder-order input").change(function () {
			var el = $(this).parent();
			var sid = el.parent().attr("sid");
			var ship = allShips[sid];
			if (ship) {
				ship.order = $(this).val();
				
			}
		});
		$("td.a-shipbuilder-input input").change(function () {
			var el = $(this).parent().next();
			changeAmount(el, function (v) {
				return v;
			});
		});
		$(".a-shipbuilder-save").each(function () {
			var id = $(this).attr('id');
			var label = gc.getValue(id + "-name");
			if (label) {
				$(this).text(label);
			}
		});
		$(".a-shipbuilder-save").dblclick(function () {
			var id = $(this).attr('id');
			var value = gc.getValue(id + "-value");
			if (value && value !== '[]') {
				gc.setValue(id + "-value", '');
				gc.setValue(id + "-name", '');
				$(this).html('&nbsp;');
			}
		});
		$(".a-shipbuilder-save").click(function () {
			var i;
			var id = $(this).attr('id');
			var save = gc.getValue(id + '-value', 'JSON_AS_ARRAY');
			if (save.length) {
				for (i = 0; i < save.length; i = i + 1) {
					var el = $("#a-shipbuilder-ship-" + save[i].id + " td.a-shipbuilder-input").next();
					//regarding the jslint warning: i'm explicitely using the dangerous functionality, each function passes a different amount
					changeAmount(el, function (v) {
						return save[i].amount;
					});
				}
			} else {
				save = [];
				for (i = 0; i < stacks.length; i = i + 1) {
					if (stacks[i] && stacks[i].amount) {
						save.push({
							id: i,
							amount: stacks[i].amount
						});
					}
				}
				if (!save.length) {
					return;
				}
				var label = prompt("Enter a label for this stack preset, 10 characters at most, preferably 7");
				if (label) {
					gc.setValue(id + "-value", JSON.stringify(save));
					label = label.substring(0, 10);
					gc.setValue(id + "-name", label);
					$(this).text(label);
					console.log('[Ship builder] A preset ' + label + ' was created.');
				}
			}
		});
		
		var onMouseOver = function (e) {
			var id = $(this).attr('id');
			var value = gc.getValue(id + "-value");
			if (value && value !== '[]') {
				$(this).text('paste');
				var save = gc.getValue(id + "-value", 'JSON_AS_ARRAY');
				var savedStacks = [];
				for (var i = 0; i < save.length; i = i + 1) {
					var stack = jQuery.extend(true, {}, allShips[save[i].id]);
					stack.amount = save[i].amount;
					stack.turns = Math.ceil(save[i].amount / stack.build);
					savedStacks.push(stack);
				}
				savedStacks.sort(app.util.sortByPowerDesc);
				var saveMarkup = '<tr class="a-shipbuilder-save-body""><td align="left"  width="70%">${name}</td><td align="right" width="10%">${amount}</td><td align="right" width="10%">${turns}</td><td align="right" width="10%">${power}</td></tr>';
				$("#a-shipbuilder-save-infobox").attr("style", 'display: block; top: ' + (e.clientY + 15) + 'px; left: ' + $(this).position().left + 5 + 'px;');
				$.tmpl(saveMarkup, savedStacks).appendTo("#a-shipbuilder-save-infobox tbody");
			} else if (totals.power > 0) {
				$(this).text('save');
			}
		};
		
		var onMouseOut = function () {
			var id = $(this).attr('id');
			var value = gc.getValue(id + "-value");
			if (value && value !== '[]') {
				var label = gc.getValue(id + "-name");
				$(this).text(label);
				$("#a-shipbuilder-save-infobox tr").remove();
				$("#a-shipbuilder-save-infobox").hide();
			} else {
				$(this).html('&nbsp;');
			}
		};
		
		$(".a-shipbuilder-save").hover(onMouseOver, onMouseOut);
/**
			//unlock
		
			gc.xhr({
				method: 'GET',
				url: 'i.cfm?&popup=attackmsg&c=1',
				onSuccess: function (response) {
					unsafeWindow.console.log(response);
				},
				onFailure: function (response) {
					unsafeWindow.console.error(response);
				}
			});

		*/
		$(".a-shipbuilder-submit-wrap").click(function () {
			var el = $(this);
			
			var turns = 0, i, stackCount = 0;
			for (i = 0; i < stacks.length; i = i + 1) {
				if (stacks[i] && stacks[i].amount && stacks[i].id) {
					turns += stacks[i].turns * 1;
					stackCount = stackCount + 1;
				}
			}
			/**
			 * @param {string} response text returned from server
			 */
			var onSuccess = function (response) {
				var msg = $("td:contains('You bought ')", response).contents().filter(function () {
					return this.nodeType === 3 && this.textContent.match('You bought');
				});
				console.log('[Ship builder] ' + msg.text());
				gc.turns.subtractValue(this.extra.turns);
				gc.cash.subtractValue(this.extra.cost);
				stackCount = stackCount - 1;
				
				//clear form if all stacks were build
				if (RESET_AFTER_BUILD && stackCount === 0) {

					console.log('Resetting building form');
					//clear all
					//FIXME JCh 2012-01-19 fix code duplication
					$("td.a-shipbuilder-input input").each(function () {
						
						var e = $(this).parent().next();
						changeAmount(e, function (v) {
							return 0;
						});
					});
				}

				//refresh stacks if all stacks were build
				if (stackCount === 0) {
					refreshExistingFleet();
				}
			}; 
			
			/**
			 * @param {string} response text returned from server
			 */
			var onFailure = function (response) {
				var name = $("b:contains('SHIPS')", response).text();
				var msg = $("font[color='red'] > b", response).text();
				console.error('[Ship builder] ' + name + ': ' + msg);
			};
			
			if (turns > gc.turns.getValue()) {
				console.log('Not enough turns to build all stacks');
				return;
			}
			
			for (i = 0; i < stacks.length; i = i + 1) {
				if (stacks[i] && stacks[i].amount && stacks[i].id) {
					gc.xhr({
						extra: stacks[i],
						url: 'i.cfm?&f=com_ship2&shiptype=' + stacks[i].id,
						data: 'amount=' + stacks[i].amount,
						successCondition: "td:contains('You bought ')",
						onSuccess: onSuccess,
						onFailure: onFailure
					});
				}
			}
		});
		
		refreshExistingFleet = function () {
			gc.xhr({
				//extra: stacks,
				url: 'i.cfm?f=com_disband',
				method: 'GET',
				onSuccess: function (response) {
					var i;
					//clear archaiv data
					for (i = 0; i < stacks.length; i = i + 1) {
						if (stacks[i]) {
							stacks[i].existing = 0;
						}
					}
					//var stacks = this.extra;
					$("input[name^='dis']", response).each(function () {
						var el = $(this);
						var disband = el.attr("name");
						var name = $.trim(el.parent().prev().prev().text());
						var existing = el.parent().next().text().replace(/[^\.\d]/g, '');
						var id = 0;
						for (i = 0; i < allShips.length; i = i + 1) {
							if (allShips[i] && allShips[i].name === name) {
								id = i;
								break;
							}
						}
						//a ship as its taken from cache
						var ship = jQuery.extend(true, {}, allShips[id]);
						var amount = 0;
						//if stack exists in builds and isn't a historical entry, add existing and recalculate values
						if (stacks[id] && stacks[id].amount) {
							amount = stacks[id].amount;
						}
						//otherwise stack is new and we have to create it
						else {
							stacks[id] = jQuery.extend(true, {}, allShips[id]);
						}
						//either way we paint stack with new data
						stacks[id].existing = existing;
						stacks[id].disband = disband;
						//and multiply relevant values by amount
						stacks[id].turns = Math.ceil(amount / ship.build);
						stacks[id].cost = ship.cost * amount;
						stacks[id].upkeep = ship.upkeep * (amount + existing);
						stacks[id].weapon = ship.weapon * (amount + existing);
						stacks[id].hull = ship.hull * (amount + existing);
						stacks[id].power = ship.power * (amount + existing);
						stacks[id].scanner = ship.scanner * (amount + existing);
					});
					//delete disbanded stacks
					for (i = 0; i < stacks.length; i = i + 1) {
						if (stacks[i] && (!stacks[i].amount && !stacks[i].existing)) {
							delete stacks[i];
						}
					}
					renderStacks();
				}
			});
		};
		//after init get data from the disband page
		refreshExistingFleet();
		$("#a-shipbuilder-refresh-stacks").click(refreshExistingFleet);
	}
};
