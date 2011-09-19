/**
 * Core component
 */
var ModControl = function (config) {
	
	//config
	if (!config || !config.mods) {
		console.error("No mods passed in config");
		return;
	}
	this.mods = config.mods;
	
	this.forceDefaultSettings();
	
	/**
	 * description
	 */
	this.location = document.location.href.replace(new RegExp(".*\/"), '').replace(/&\d\d\d\d&/, '');
	this.timestamp = (new Date()).getTime().toString();
	this.initDate = new Date();
	/*
	 * establish page type
	 */
	var pms = $("table.smallfont td.bodybox:has(a:contains('Private Messages')), table.smallfont td:has(a > font:contains('Private Messages'))");
	if (pms.length) {
		pms.attr('id', 'a-privatemessages');
		this.propertiesAreAvailable = true;
	} else {
		this.propertiesAreAvailable = false;
	}
	/*
	 * establish user credentials
	 */
	var serverName;
	var boxes;
	
	
	if (this.propertiesAreAvailable && this.isNewest()) {
		
		var b = $("td.bodybox:contains('$'),td.bodybox:contains('$') ~ td.bodybox");
		var cashNode = b.eq(0);
		var foodNode = b.eq(1);
		var powerNode = b.eq(2);
		var turnNode = b.eq(3);
		var serverNode = b.eq(4);
		var empireNode = b.eq(5);	
		
		//server, empire, user
		serverName = serverNode.attr('id', 'a-server-name').text().replace(/\W/g, '');
		this.empireName = $.trim(empireNode.text());
		this.userName = serverName + '.' + this.empireName;

		this.setGlobalValue('empireName', this.empireName);
		this.setGlobalValue('userName', this.userName);
		
		//server
		for (var i = 0; i < app.servers.length; i++) {
			if (app.servers[i].name === serverName) {
				this.server = app.servers[i];
				break;
			}
		}
		
		//paid
		if ($("img[src*='logo_gc1']").length) {
			this.isPaid = false;
		}
		else if ($("img[src*='logo_gc2']").length) {
			this.isPaid = true;
		}
		else {
			this.isPaid = this.getValue('isPaid') ? true : false;
		}
		this.setValue('isPaid', this.isPaid);
		
		if (this.isPaid) {
			this.server.turnRate = this.server.turnRate *  0.85;
			this.server.turnHold = this.server.turnHold *  1.5;
		}
		
		this.cash = new Property({
			parent: this,
			id: 'cash',
			dom: cashNode,
			max: 999999999999,
			min: 0
		});
		this.food = new Property({
			parent: this,
			id: 'food',
			dom: foodNode,
			max: 2000000000,
			min: 0
		});
		this.power = new Property({
			parent: this,
			id: 'power',
			dom: powerNode,
			max: 1199999999,
			min: 0
		});
		this.turns = new Property({
			parent: this,
			id: 'turns',
			dom: turnNode,
			max: this.server.turnHold,
			min: 0
		});
		
		this.antiReload = $("#a-privatemessages a").attr('href').replace(/.*\&(\d*)\&.*/, "$1");
		
		
		this.setValue('antiReload', this.antiReload);
		
		
		this.setGlobalValue('a-last-property-check', (new Date()).toString());
		this.setValue('a-last-property-check', (new Date()).toString());
		
	} else {
		//from cache
		serverName = this.getGlobalValue('serverName');
		
		this.empireName = this.getGlobalValue('empireName');
		this.userName = this.getGlobalValue('userName');
		this.antiReload = this.getValue('antiReload');
		
		//set server
		for (i = 0; i < app.servers.length; i++) {
			if (app.servers[i].name === serverName) {
				this.server = app.servers[i];
				break;
			}
		}
		
		this.isPaid = this.getValue('isPaid');
		if (this.isPaid) {
			this.server.turnRate = this.server.turnRate *  0.85;
			this.server.turnHold = this.server.turnHold *  1.5;
		}	
		
		//from cache
		this.cash = new Property({
			parent: this,
			id: 'cash',
			max: 999999999999,
			min: 0
		});
		this.food = new Property({
			parent: this,
			id: 'food',
			max: 2000000000,
			min: 0
		});
		this.power = new Property({
			parent: this,
			id: 'power',
			max: 1199999999,
			min: 0
		});
		this.turns = new Property({
			parent: this,
			id: 'turns',
			max: this.server.turnHold,
			min: 0
		});
	}
	
	if (!this.server) {
		this.loaded = false;
		return;
	} else {
		this.loaded = true;
	}

	/*
	 * establish properties
	 */
	if (this.server.name === 'Dm') {
		app.gameServer += 'dm/';
	}

	if (this.propertiesAreAvailable) {
		this.food.dom.parent().removeAttr('onmouseover');
		this.food.dom.parent().removeAttr('onclick');
	}
	
	//message on after update installed
	if (this.getValue('a-last-successful-update') !== app.version) {
		console.log("Anfit GC Mods " + app.version + ": " + app.releaseNotes);
		var self = this;
		this.xhr({
			method: 'GET',
			url: app.modsServer + 'who/post.php?u=' + this.userName + '&v=' + app.version,
			onSuccess: function (response) {
				self.setValue('a-last-successful-update', app.version);
			}
		});
	}
	
	//message on new update available
	if (!this.getValue('a-last-update-check')) {
		this.setValue('a-last-update-check', this.timestamp);
	}
	if (this.timestamp - 86400000 > parseFloat(this.getValue('a-last-update-check'))) {
		this.xhr({
			method: 'GET',
			url: app.modsServer + '?action=version',
			onFailure: function (response) {
				console.error("[Mod control] XHR query to " + app.modsServer + " failed");
			},
			onSuccess: function (response) {
				var version = $.trim(response);
				if (version !== app.version) {
					if (confirm('There is an update available for Anfit\'s GC Mods (' + version + ') available.\nWould you like to go to the install page now?')) {
						GM_openInTab(app.modsServer);
					}
				}
				gc.setValue('a-last-update-check', gc.timestamp);
			}
		});
	}
};
/**
 * Global getter. should be avoided, as globals scope different servers and accounts
 * @param {String} key
 * @return {String|Numeric|Boolean} stored value
 */
ModControl.prototype.getGlobalValue = function (key) {
	return GM_getValue(key);
};
/**
 * Global setter. should be avoided, as globals scope different servers and accounts
 * @param {String} key
 * @param {String|Numeric|Boolean} value to be stored
 */
ModControl.prototype.setGlobalValue = function (key, value) {
	if (typeof (value) === "number" && value > 100000) {
		GM_setValue(key, new String(value).toString());
	} else {
		GM_setValue(key, value);
	}
};
/**
 * Preferences getter. Uses server namecepace.
 * @param {String} key
 * @return {String|Numeric|Boolean} stored value
 */
ModControl.prototype.getValue = function (key) {
	return GM_getValue(this.userName + '.' + key);
};
/**
 * Preferences setter. Uses server namecepace.
 * @param {String} key
 * @param {String|Numeric|Boolean} value to be stored
 */
ModControl.prototype.setValue = function (key, value) {
	if (typeof (value) === "number" && value > 100000) {
		GM_setValue(this.userName + '.' + key, new String(value).toString());
	} else {
		GM_setValue(this.userName + '.' + key, value);
	}
};
/**
 *	Checks if any other tab was more recent
 * @return {Boolean} true if this page is the last page to be opened. 
 */
ModControl.prototype.isNewest = function () {
	if (this.getGlobalValue('a-last-property-check')) {
		return this.initDate - new Date(this.getGlobalValue('a-last-property-check')) > 0;
	}
	return true;
};
/**
 * @return {Date} time the most recent gc page was opened or now
 */
ModControl.prototype.lastPropertyCheck = function () {
	if (this.getValue('a-last-property-check')) {
		return new Date(this.getValue('a-last-property-check'));
	}
	return new Date();
};

/**
 * Go through all mods defined and set default settings if they are missing
 */
ModControl.prototype.forceDefaultSettings = function () {
	
	var gc = this;
	//default settings
	$.each(this.mods, function (index, mod) {
		if (mod.defaultValue !== undefined && gc.getValue(mod.id) === undefined) {
			gc.setValue(mod.id, mod.defaultValue);
		}
		
		if (!mod.items) {
			return;
		}
		
		$.each(mod.items, function (index, item) {
			
			//no id, no value
			if (item.id) {
				//default setting
				if (item.defaultValue !== undefined && gc.getValue(item.id) === undefined) {
					gc.setValue(item.id, item.defaultValue);
				}
				//set value
				item.value = gc.getValue(item.id);
			}
		});		
	});
};

/**
 * Show a message box on top of the gc pages
 * @param {String} title
 * @param {String} message
 * @param {String} id optional, if user may have a change to remove a message permanently
 */
ModControl.prototype.showMessage = function (title, message, id) {
	if (id) {
		id = id.replace(/\W/g, '');
	}
	var gc = this;
	
	if (!id || this.getValue(id) !== false) {
		var messageBox = $("body").prepend(
			'<div class="a-info-wrap">' +
				'<div class="a-info-title" id="' + id + '">' + title + '</div>' +
				'<div class="a-info" >' + message + '</div>' +
			'</div>');
		$(".a-info-title", messageBox).click(function (e) {
			var target = $(e.target), id = target.attr('id'), offset = target.offset(),
	        imgLeft = e.pageX - offset.left,
	        imgTop = e.pageY - offset.top;
			//a very rough approximation
			if (target.hasClass("a-info-title") && 770 < imgLeft && imgLeft < 796 && 0 < imgTop && imgTop < 16) {
				target.parent().fadeOut("slow", function () { 
					$(this).remove(); 
					if (id) {
						gc.setValue(id, false);
					}
				});
			}
		});	
	}
};

/**
 * Launch all mods
 */
ModControl.prototype.runMods = function () {
	var modMarkup = '<li class="a-mod" id="${id}"><div class="a-mod-line" ><ul><li class="a-mod-submit"><input type=checkbox id="${id}-checkbox" /></li><li class="a-mod-name"><a name=${id}></a><b>${title}</b><br /></li></div></ul><div class="a-mod-line" ><i>${description}</i></div><div><ul class="a-mod-item" /></div></li>';
	var listMarkup = '<li class="a-mod-item-list"><ul class="a-mod-item-parts"><li class="a-mod-item-parts-body">${description}<br /><textarea id="${id}" cols="70">${value}</textarea></li></ul></li>';
	var inputMarkup = '<li class="a-mod-item-input"><ul class="a-mod-item-parts"><li class="a-mod-item-parts-body"><span class="a-mod-item-input-desc">${description}</span><span class="a-mod-item-input-submit"><input id="${id}" value="${value}" /></span></li></ul></li>';
	var infoMarkup = '<li class="a-mod-item-info">${text}</li>';
	var checkBoxMarkup = '<li class="a-mod-item-checkbox"><ul class="a-mod-item-parts"><li class="a-mod-item-parts-submit"><input id="${id}" type="checkbox" /></li><li class="a-mod-item-parts-body">${description}</li></ul></li>';
	
	if (gc.location.match(/i.cfm.f.option($|#.*)/)) {
		$("table.bodybox[width='550'] > tbody > tr > td").attr('id', 'a-options-wrap').append('<div id="a-about"><div><b>Welcome, ' + gc.empireName + '!</b></div><div class="a-separator"/><div>Thank you for trying Anfit\'s Mods for Spacefed GC v.' + app.version + '. All mods are listed below with short explanations. Also, some of the mods require additional configuration they can be switched on.<div class="a-separator"/><div>My mods cannot affect gameplay, they are just UI (User Interface) tweaks, to make this game slightly more playable.</div><div class="a-separator"/><div>To enable more advanced tweaks which interact with other players please enter your gc.mmanir.net authentication token.</div><div class="a-separator"/><div><i>What? Authentication token? What is it? Why?</i></div><div class="a-separator"/><div>Some more advanced mods share data between players. You always know when and how. The best example of this are status tags: you set your status text, all other users of Anfit\'s Mods can see it in the ranking lists, you can see theirs.</div><div>This is possible only through another server located at gc.mmanir.net (one I\'m hosting). To authenticate with this server you have to: </div><div><ol><li>Create an account and login at <a href="http://gc.mmanir.net" target="blank">gc.mmanir.net</a>.</li><li>Retrieve an authentication token (it\'s provided just after login page).</li><li>Copy the authentication token here.</li></ol></div><div><b>Enter your authentication token here</b>: <input id="a-authentication-token" type="text" size="32" /></div><div class="a-separator"/><div>If you have problems, questions or ideas while using Anfit\'s GC Mods contact me (<a href="http://gc.mmanir.net/">Anfit</a>) at <a href="mailto:jan.chimiak@gmail.com?subject=[GC Mods]">jan.chimiak@gmail.com</a> or send me a <a href="javascript:cmsgu(\'i.cfm?popup=msguser&uid=213512\');">private message</a> at GC/normal.</div><div>');
		var token = gc.getValue('a-authentication-token');
		if (!token) {
			token = '';
		}
		$("#a-authentication-token").val(token);
		if (!token) {
			$("#a-authentication-token").parent().css("background-color", "ff0000");
			$("#a-authentication-token").parent().children().filter("b").css("color", "00ffff");
		}
		$("#a-authentication-token").change(function () {
			gc.setValue('a-authentication-token', $(this).val());
			//TODO
			//validity check
		});
	}
	$.each(this.mods, function (index, mod) {
		//create an options entry
		if (mod && gc.location.match(/i.cfm.f.option($|#.*)/)) {
			//add
			$.tmpl(modMarkup, mod).appendTo("#a-options-wrap");

			//set value
			$('#' + mod.id + '-checkbox').prop("checked", gc.getValue(mod.id));
			var itemsWrapper = $("#" + mod.id + " ul.a-mod-item");
			//iterate through subitems, if they exist
			mod.items && $.each(mod.items, function (index, item) {
				//no id, no value
				if (item.id) {
					//set value
					item.value = gc.getValue(item.id);
				}
				switch (item.type) {
				case 'list': {
						//add
						$.tmpl(listMarkup, item).appendTo(itemsWrapper);
						//hitch events
						$('#' + item.id).change(function () {
							gc.setValue(item.id, $('#' + item.id).val());
						});
						break;
					}
				case 'info': {
						//add
						$.tmpl(infoMarkup, item).appendTo(itemsWrapper);
						break;
					}
				case 'input': {
						//add
						$.tmpl(inputMarkup, item).appendTo(itemsWrapper);
						//hitch events
						$('#' + item.id).change(function () {
							gc.setValue(item.id, $('#' + item.id).val());
						});
						break;
					}
				case 'checkbox':
					{
						//add
						$.tmpl(checkBoxMarkup, item).appendTo(itemsWrapper);
						//set value
						$('#' + item.id).prop("checked", item.value);
						//hitch events;
						$('#' + item.id).click(function () {
							gc.setValue(item.id, $('#' + item.id).prop('checked'));
						});
						break;
					}
				default:
					{
						console.error('[Options] Unrecognized option type');
					}
				}
			});
			//add event handlers
			//submit
			$('#' + mod.id + '-checkbox').click(function () {
				gc.setValue($(this).attr('id').replace('-checkbox', ''), $(this).prop('checked'));
			});
			if (mod.onAfterRender) {
				mod.onAfterRender.call(this);
			}
		}
		//execute mod
		if (mod.filter.call()) {
			mod.plugin.call();
		}
	});
};

/**
 * A wrapper for GM_xmlhttpRequest, with most options predefined.
 * @param config 
 */
ModControl.prototype.xhr = function (config) {
	if (!config || !config.url) {
		console.error("[Ajax] empty xhr request");
		return;
	}
	var settings = {
		method: 'POST',
		url: config.url,
		headers: {
			'Accept': 'application/atom+xml,application/xml,text/xml',
			'Content-type': 'application/x-www-form-urlencoded'
		},
		onload: function (responseDetails) {
			var antireloadDom = $("td.bodybox a:contains('Private Messages')");
			var antireload;
			if (antireloadDom.length) {
				var href = antireloadDom.first().attr("href");
				if (href) {
					antireload = href.replace(/\D/g, '');
				}
				if (antireload) {
					gc.setValue('antiReload', antireload);
				}
			}
			if (responseDetails.status != 200) {
				if (config.onFailure) {
					config.onSuccess.call(this, responseDetails.responseText);
				}
				return;
			}
			if (config.successCondition && $(config.successCondition, responseDetails.responseText).length) {
				config.onSuccess.call(this, responseDetails.responseText);
			} else if (config.successCondition) {
				config.onFailure.call(this, responseDetails.responseText);
			} else {
				config.onSuccess.call(this, responseDetails.responseText);
			}
		},
		onerror: function (response) {
			console.error('XHR error', config, response);
			config.onFailure.call(this, response);
		}
	};
	if (config.data) {
		settings.data = config.data;
	}
	if (config.method) {
		settings.method = config.method;
	}
	if (config.extra) {
		settings.extra = config.extra;
	}
	GM_xmlhttpRequest(settings);
};