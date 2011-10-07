/**
 * fed pms
 */
app.mod.fedpms = {
	id: 'a-fedpms',
	defaultValue: true,
	title: 'Fed private messages',
	description: 'Send a pm to all the members of your federation with a single click.',
	items: [{
		type: 'info',
		text: 'This mods adds a special message box below on the page listing members of the fed you are in.'
	}],
	/**
	 * Returns true only when this mod can be launched
	 */
	filter: function () {
		if (!gc.getValue('a-fedpms')) {
			return false;
		}
		if (gc.location.match(/fed_member/) || gc.location.match(/#post/)) {
			return true;
		}
		return false;
	},
	/**
	 * Mod's body function
	 */
	plugin: function () {
		if (gc.location.match(/#post/)) {
			$("textarea[name='forum2']").val(gc.getValue('a-fedpms-message'));
			$("input[name='remLen2']").val(gc.getValue('a-fedpms-remaining'));
			$("input[value*='Send']")[0].click();
			return;
		}
		$("table.bodybox[width='400'] td:first").prepend('<div><center>PM all of the above, except yourself, via this form:<br /><textarea cols=67 rows=5 id="message"></textarea><br /><br /><input id="a-fedpms-submit" type="button" value="submit" /></center><br /></div>');
		var empires = [];
		$("a[href*='msguser']").each(function () {
			var name = $.trim($(this).text());
			//ignore self
			if (name !== gc.empireName) {
				empires.push(name);
			}
		});
		$("body:first").append('<iframe id="a-fedpms-iframe"></iframe>');
		
		function sendAPrivateMessage() {
			var recipient = empires.shift();
			gc.setValue('a-fedpms-recipient', recipient);
			gc.setValue('a-fedpms-status', 'SENDING');
			console.log('[Fed PMs] Sending message to ' + recipient + ' ...');
			$('#a-fedpms-iframe')[0].src = 'i.cfm?popup=msguser&nic=' + recipient + '&se=' + gc.server.id + '#post';
		}
		
		$("#a-fedpms-iframe").load(function (e) {
			if ($(this)[0].src) {
				var status = gc.getValue('a-fedpms-status');
				if (status === 'SENDING') {
					console.log('[Fed PMs] Message to ' + gc.getValue('a-fedpms-recipient') + ' sent or sending failed silently.');
					gc.setValue('a-fedpms-status', 'IDLE');
					if (empires.length) {
						sendAPrivateMessage();
					} else {
						$('#message').val('');
						gc.setValue('a-fedpms-message', '');
						gc.setValue('a-fedpms-remaining', '');
						gc.setValue('a-fedpms-recipient', '');
						gc.setValue('a-fedpms-status', '');
						console.log('[Fed PMs] Outgoing message queue is empty.');
					}
				}
			}
		});

		$('#a-fedpms-submit').click(function () {
			var message = $('#message').val().substring(0, 2000);
			var remaining = 2000 - message.length;
			gc.setValue('a-fedpms-message', message);
			gc.setValue('a-fedpms-remaining', remaining);
			console.log('[Fed PMs] PMs are being sent to your fedmates. Do not close this window for a while unless you want to stop sending...');
			sendAPrivateMessage();
		});
	}
};
