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
		window.setInterval(function () {
			var delay, value, lastPropertyCheck;
			lastPropertyCheck = parseFloat(gc.lastPropertyCheck().valueOf());
			delay = (lastPropertyCheck - initDate) % gc.server.turnRate;
			value = parseFloat(turns.getValue());
			//user check
			if (gc.userName == gc.getGlobalValue('userName')) {
				$("#a-server-name").removeClass('a-bodybox-red').addClass('bodybox');
			} else {
				$("#a-server-name").removeClass('bodybox').addClass('a-bodybox-red');
			}
			//max check
			if (value >= turns.max) {
				return;
			}
			if (delay < 0) {
				value++;
				turns.setValue(value);
				if (value < gc.turns.max) {
					window.setTimeout(function () {
						value++;
						turns.setValue(value);
					}, (gc.server.turnRate + (-1 * delay)));
				}
			} else {
				window.setTimeout(function () {
					value++;
					turns.setValue(value);
				}, delay);
			}
		}, gc.server.turnRate);
		//this function will launch itself once per second, to check if there shouldn't be an update, or two...
		window.setInterval(function () {
			if (
			gc.isNewest() == false && gc.userName == gc.getGlobalValue('userName')) {
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
		}, 1000);
	}
};
