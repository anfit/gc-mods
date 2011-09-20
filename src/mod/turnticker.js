/**
 * Turn Ticker
 */
app.mod.turnticker = {
	id: "a-turnticker",
	defaultValue: true,
	title: "Turn ticker",
	description: "Updates the turn counts while you wait. Relative to last sync with gc servers  (req.: Taiaha).",
	items: [{
		type: 'info',
		text: 'It should also spot that you have logged onto another game speed in another tab and notify you (server gets marked with red).'
	}, {
		type: 'checkbox',
		id: 'a-turnticker-showturns',
		description: 'Show turns in tab titles'
	}, {
		type: 'checkbox',
		id: 'a-turnticker-showmaxedturns',
		description: 'Show maxed-out turns in tab titles'
	}],
	/**
	 * @cfg filter function a function which returns true only when this mod can be launched
	 */
	filter: function () {
		if (!gc.getValue('a-turnticker')) {
			return false;
		}
		if (gc.propertiesAreAvailable) {
			return true;
		}
		return false;
	},
	/**
	 * @cfg plugin function the main functionality of the mod
	 */
	plugin: function () {
		var initDate = new Date().valueOf() * 1;
		var turns = gc.turns;
		var pageTitle = document.title;
		if (gc.getValue('a-turnticker-showturns')) {
			document.title = turns.getValue() + ' ' + pageTitle;
		}
		window.setInterval(function () {
			var delay, value, lastPropertyCheck;
			lastPropertyCheck = parseFloat(gc.lastPropertyCheck().valueOf());
			delay = (lastPropertyCheck - initDate) % gc.server.turnRate;
			value = parseFloat(turns.getValue());
			//user check
			if (gc.userName === gc.getGlobalValue('userName')) {
				$("#a-server-name").removeClass('a-bodybox-red').addClass('bodybox');
			} else {
				$("#a-server-name").removeClass('bodybox').addClass('a-bodybox-red');
			}
			//max check
			if (value >= turns.max) {
				return;
			}
			if (delay < 0) {
				value = value + 1;
				turns.setValue(value);
				if (gc.getValue('a-turnticker-showturns')) {
					document.title = value + ' ' + pageTitle;
				}
				if (value < gc.turns.max) {
					window.setTimeout(function () {
						value = value + 1;
						turns.setValue(value);
						if (gc.getValue('a-turnticker-showturns')) {
							document.title = value + ' ' + pageTitle;
						}
					}, (gc.server.turnRate + (-1 * delay)));
				}
			} else {
				window.setTimeout(function () {
					value = value + 1;
					turns.setValue(value);
					if (gc.getValue('a-turnticker-showturns')) {
						document.title = value + ' ' + pageTitle;
					}
				}, delay);
			}
		}, gc.server.turnRate);
		
		var blink = true;
		//this function will launch itself once per second, to check if there shouldn't be an update, or two...
		window.setInterval(function () {
			if (gc.isNewest() === false && gc.userName === gc.getGlobalValue('userName')) {
				gc.turns.load();
				gc.power.load();
				gc.food.load();
				gc.cash.load();
				$("a").each(function () {
					var value = $(this).attr('href');
					if (value) {
						$(this).attr('href', value.replace(/&\d\d\d\d&/, '&' + gc.getValue('antiReload') + '&'));
					}
				});
				$("form").each(function () {
					var value = $(this).attr('action');
					if (value) {
						$(this).attr('action', value.replace(/&\d\d\d\d&/, '&' + gc.getValue('antiReload') + '&'));
					}
				});
				$("input").each(function () {
					var value = this.getAttribute('onclick');
					if (value) {
						this.setAttribute('onclick', value.replace(/&\d\d\d\d&/, '&' + gc.getValue('antiReload') + '&'));
					}
				});
				
				
			}
			
			if (gc.getValue('a-turnticker-showmaxedturns') && parseFloat(gc.turns.getValue()) === gc.turns.max) {
				if (blink) {
					document.title = gc.turns.getValue() + ' ' + pageTitle;
					blink = false;
				}
				else {
					//String copy
					document.title = (gc.turns.getValue() + '').replace(/./g, '_') + ' ' + pageTitle;
					blink = true;
				}
			}
		}, 1000);
	}
};
