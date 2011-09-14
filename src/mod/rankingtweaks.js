/**
 * Ranking tweaks
 */
app.mod.rankingtweaks = {
	id: 'a-rankingtweaks',
	defaultValue: true,
	title: "Ranking tweaks",
	description: "Many tweaks to the ranking list. See below for a details.",
	items: [{
		type: 'checkbox',
		id: 'a-rankingtweaks-statuses',
		defaultValue: true,
		description: 'Enable empire statuses'
	}, {
		type: 'info',
		text: 'Show your empire\'s status and other empires\' statuses in the ranking list below empire name (others will still see yours). Status is a short text meant to be visible to others. It will be visible to other users of this mod. Statuses are stored on my (Anfit\'s) server, so they can be changed and re-checked only if that server is up and running.'
	}, {
		type: 'input',
		id: 'a-rankingtweaks-statuses-mystatus',
		defaultValue: 'I have installed Anfit Mods',
		description: 'Your empire\'s status:'
	}, {
		type: 'input',
		id: 'a-rankingtweaks-statuses-forceupdate',
		description: 'Statuses are re-checked (redownloaded) only every two days, but you can do it manualy by clicking here:'
	}, {
		type: 'checkbox',
		id: 'a-rankingtweaks-labels',
		defaultValue: true,
		description: 'Enable empire labels?'
	}, {
		type: 'info',
		text: 'A label is a short text you add. This tweak adds a new column (titled "Label") in the ranking list in which you can set custom labels. If you doubleclick a cell in this column, you will be prompted to add your label. It can be anything as it will be visible just for you.'
	}, {
		type: 'checkbox',
		id: 'a-rankingtweaks-fedtags',
		defaultValue: true,
		description: 'Enable empire fed tags?'
	}, {
		type: 'info',
		text: 'Fed tag is the name of the federation an empire is in (or "N/A"). This tweak makes it possible to show fed tags in the the ranking list, below empire names. To make it less server intensive you have to doubleclick on the race field of the empire, which fed tag you want to check. Please note that (to save server load), once checked it will be cached for 7 days - unless you doubleclick again.'
	}, {
		type: 'checkbox',
		id: 'a-rankingtweaks-fedtags-showall',
		defaultValue: true,
		description: 'Show all cached fed tags'
	}, {
		type: 'checkbox',
		id: 'a-rankingtweaks-bloodwar',
		description: 'Enable Blood War?'
	}, {
		type: 'info',
		text: 'Blood War is an extension of the fed tag tweak. If you enable it tweak, you\'ll see federations your federation is in war with in red, allies will be shown in green, and neutrals in blue. This is not automatic, you have to define which fed is which below. Just fed names, no extra data, one per line!'
	}, {
		type: 'list',
		id: 'a-rankingtweaks-bloodwar-enemies',
		description: 'Name your blood enemies.',
		defaultValue: "Example Fed One\nExample Fed Two"
	}, {
		type: 'list',
		id: 'a-rankingtweaks-bloodwar-allies',
		description: 'Name your kin.',
		defaultValue: "Example Fed One\nExample Fed Two"
	}, {
		type: 'list',
		id: 'a-rankingtweaks-bloodwar-neutrals',
		description: 'Name the neutral bystanders.',
		defaultValue: "Example Fed One\nExample Fed Two"
	}],
	/**
	 * Additional server interaction for this component's options panel 
	 */
	onAfterRender: function () {
		//special mods for this page...
		var mystatus = $('#a-rankingtweaks-statuses-mystatus');
		if (mystatus.length) { 
			mystatus.change(function (e) {
				var status = $(this).val();
				//TODO post to gc.mmanir.net, check authentication, etc
			});
		}
		var forceUpdate = $('#a-rankingtweaks-statuses-forceupdate');
		if (forceUpdate.length) {
			//forceUpdate.attr('type', 'submit');
			//jquery cannot change input type, workaround
			document.getElementById('a-rankingtweaks-statuses-forceupdate').type = 'submit';
			forceUpdate.val('Force update');
			forceUpdate.click(function (e) {
				gc.setValue('a-rankingtweaks-lastupdate', (new Date(0)).toString());
			});
		}
	},
	/**
	 * @cfg filter function a function which returns true only when this mod can be launched
	 */
	filter: function () {
		if (!gc.getValue('a-rankingtweaks')) {
			return false;
		}
		if (gc.location.match(/rank/)) {
			return true;
		}
		return false;
	},
	/**
	 * @cfg plugin function the main functionality of the mod
	 */
	plugin: function () {
		var all;
		if (!gc.getValue('a-rankingtweaks-statuses-list')) {
			gc.setValue('a-rankingtweaks-statuses-list', '\n');
		}
		//statuses
		if (gc.getValue('a-rankingtweaks-statuses')) {
			all = gc.getValue('a-rankingtweaks-statuses-list').split('\n');
			var nicks = all[0].split(" ");
			var tags = all[1].split(",");
		}
		//labels
		if (gc.getValue('a-rankingtweaks-labels')) {
			var headers = $("table.table_back[width='350'] table tr.table_row0, table.table_back[width='70%'] table tr.table_row0");
			headers.append('<td>Label</td>');
		}
		//fedtags: blood war
		if (gc.getValue('a-rankingtweaks-bloodwar')) {
			var enemies = gc.getValue('a-rankingtweaks-bloodwar-enemies') ? gc.getValue('a-rankingtweaks-bloodwar-enemies').split('\n') : [];
			var allies = gc.getValue('a-rankingtweaks-bloodwar-allies') ? gc.getValue('a-rankingtweaks-bloodwar-allies').split('\n') : [];
			var neutrals = gc.getValue('a-rankingtweaks-bloodwar-neutrals') ? gc.getValue('a-rankingtweaks-bloodwar-neutrals').split('\n') : [];
		}
		var rows = $("table.table_back[width='350'] table tr.table_row1, table.table_back[width='70%'] table tr.table_row1");
		rows.each(function () {
			var row = $(this);
			var name = $.trim($("td:eq(2)", this).text());
			var eid = $("td:eq(1) a", this).attr("href").replace(/.*eid=/, '');
			var nameCell = $("td:eq(2)", this);
			var raceCell = $("td:eq(3)", this);
			nameCell.attr("id", name);
			nameCell.append('<div class="a-rankingtweaks-statustag a-hidden" /><div class="a-rankingtweaks-fedtag a-hidden" />');
			var statusNode = $("div.a-rankingtweaks-statustag", nameCell);
			var fedNode = $("div.a-rankingtweaks-fedtag", nameCell);
			//status
			if (gc.getValue('a-rankingtweaks-statuses')) {
				if ($.inArray(name, nicks) !== -1 && tags[nicks.indexOf(name)]) {
					var status = tags[nicks.indexOf(name)];
					statusNode.text(status).removeClass("a-hidden");
				}
			}
			//fed tag
			if (gc.getValue('a-rankingtweaks-fedtags')) {
				//planter

				var setFedTag = function (fed) {
					fedNode.text(fed).removeClass("a-hidden");
					if (gc.getValue('a-rankingtweaks-bloodwar')) {
						//add blood war support
						if ($.inArray(fed, enemies) !== -1) {
							fedNode.addClass("a-rankingtweaks-bloodwar-enemy");
						} else if ($.inArray(fed, allies) !== -1) {
							fedNode.addClass("a-rankingtweaks-bloodwar-ally");
						} else if ($.inArray(fed, neutrals) !== -1) {
							fedNode.addClass("a-rankingtweaks-bloodwar-neutral");
						}
					}
				};
				//getter event
				raceCell.dblclick(function (e) {
					//GET fed and assign it						
					gc.xhr({
						url: 'i.cfm?&f=com_intel&eid=' + eid,
						method: 'GET',
						successCondition: "b:contains('EMPIRE INTELLIGENCE')",
						onSuccess: function (response) {
							var fed = $.trim($("table.table_back[width='280'] table td:contains('Federation')", response).next().contents().first().text());
							setFedTag(fed);
							//save
							gc.setValue('player.' + name + '.fed', fed);
							gc.setValue('player.' + name + '.lastcheck', (new Date()).toString());
						}
					});
				});
				raceCell.addClass("a-button");
				raceCell.attr("title", "Double click to show federation");
				//on show all anyway
				if (gc.getValue('a-rankingtweaks-fedtags-showall') && gc.getValue('player.' + name + '.fed')) {
					//ok, there is something to show and user chose to show it, but we'll show only fresh tags, all right?
					var aSingleDay = 86400000;
					var now = new Date();
					var lastFedTagUpdate = gc.getValue('player.' + name + '.lastcheck') ? new Date(gc.getValue('player.' + name + '.lastcheck')) : new Date(0);
					//show only fresh ones, ha!
					if (now - lastFedTagUpdate < aSingleDay * 7) {
						var fed = gc.getValue('player.' + name + '.fed');
						setFedTag(fed);
					}
				}
			}
			//labels
			if (gc.getValue('a-rankingtweaks-labels')) {
				row.append('<td class="a-rankingtweaks-label" >&nbsp;</td>');
				var label = gc.getValue('player.' + name + '.label');
				var labelCell = $("td.a-rankingtweaks-label", row);
				labelCell.text(label);
				labelCell.dblclick(function (e) {
					var existingValue = label ? label : "";
					var newLabel = prompt('Label this empire', existingValue);
					if (newLabel || newLabel === "") {
						gc.setValue('player.' + name + '.label', newLabel);
						$("td.a-rankingtweaks-label", row).text(newLabel);
					}
				});
				labelCell.addClass("a-button");
				labelCell.attr("title", "Double click to set a label");
			}
		});
		//reget statuses
		var aSingleDay = 86400000;
		var now = new Date();
		var lastTagUpdate = gc.getValue('a-rankingtweaks-lastupdate') ? new Date(gc.getValue('a-rankingtweaks-lastupdate')) : new Date(0);
		if (now - lastTagUpdate > aSingleDay) {
			//update tags
			gc.xhr({
				method: 'GET',
				url: app.modsServer + 'status/get.php?u=all&s=' + gc.server.name,
				onSuccess: function onloadCallback(response) {
					gc.setValue('a-rankingtweaks-statuses-list', response);
					gc.setValue('a-rankingtweaks-lastupdate', now.toString()); //timestamp
				}
			});
		}
	}
};
