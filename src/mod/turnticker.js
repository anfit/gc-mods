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
	 * Returns true only when this mod can be launched
	 */
	filter: function () {
		if (!gc.getValue('a-turnticker')) {
			return false;
		}
		return true;
	},
	/**
	 * Mod's body function
	 */
	plugin: function () {
		var initTimestamp = new Date().getTime();
		window.setInterval(function () {
			var delay = (gc.getValue('a-propertycheck-timestamp') - initTimestamp) % gc.server.turnRate;
			//user check
			if (gc.userName === gc.getGlobalValue('userName')) {
				$("#a-server-name").removeClass('a-bodybox-red').addClass('bodybox');
			} else {
				$("#a-server-name").removeClass('bodybox').addClass('a-bodybox-red');
			}
			//max check
			if (gc.turns.getValue() >= gc.turns.max) {
				return;
			}
			if (delay < 0) {
				if (gc.isNewest()) {
					gc.turns.addValue(1);
				}
				if (gc.turns.getValue() < gc.turns.max) {
					window.setTimeout(function () {
						if (gc.isNewest()) {
							gc.turns.addValue(1);
						}
					}, (gc.server.turnRate - delay));
				}
			} else {
				window.setTimeout(function () {
					if (gc.isNewest()) {
						gc.turns.addValue(1);
					}
				}, delay);
			}
		}, gc.server.turnRate);
		
		var blink = true;
		var pageTitle = document.title;
		if (gc.getValue('a-turnticker-showturns')) {
			document.title = gc.turns.getValue() + ' ' + pageTitle;
		}
		//this function will launch itself once per second, to check if there shouldn't be an update, or two...
		window.setInterval(function () {

			if (gc.getValue('a-turnticker-showturns')) {
				document.title = gc.turns.getValue() + ' ' + pageTitle;
			}
			
			if (gc.isNewest() === false && gc.userName === gc.getGlobalValue('userName')) {
				gc.turns.updateEl();
				gc.power.updateEl();
				gc.food.updateEl();
				gc.cash.updateEl();
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
			
			if (gc.getValue('a-turnticker-showmaxedturns') && gc.turns.getValue() === gc.turns.max) {
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
