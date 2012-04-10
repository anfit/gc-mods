/**
 * fed chat
 */
app.mod.fedchat = {
	id: 'a-fedchat',
	defaultValue: true,
	title: 'Fed chat instead of Chat',
	description: 'Replaces the usual chat on main GC pages (on the right) with fed discussion board.',
	/**
	 * Returns true only when this mod can be launched
	 */
	filter: function () {
		if (!gc.getValue('a-fedchat')) {
			return false;
		}
		if (gc.location.indexOf('fed_forum') !== -1) {
			return false;
		}
		if ($("table.bodybox[width='105'] tbody tr td")[0]) {
			return true;
		}
		return false;
	},
	/**
	 * Mod's body function
	 */
	plugin: function () {
		var chatPanel = $("table.bodybox[width='105'] tbody tr td:first");
		if (!gc.getValue('a-fedchat-lastupdate') || !gc.getValue('a-fedchat-lastupdate')) {
			gc.setValue('a-fedchat-lastupdate', gc.timestamp);
		}
		if (gc.timestamp - 600000 > gc.getValue('a-fedchat-lastupdate') || !gc.getValue('fedchat.html')) {
			gc.xhr({
				method: 'GET',
				url: app.gameServer + 'i.cfm?f=fed_forum',
				onFailure: function (response) {
					console.error("[Fed chat] XHR query to get posts failed");
				},
				onSuccess: function (response) {
					var fedchatDigest = '';
					$("tr.table_row1[valign='top'], tr.table_row2", response).each(function () {
						var name = $(this).children().first().html().replace(/\s+<a.*/, "");
						var post = $(this).children().last().text();
						fedchatDigest += '<u>' + name + '</u>: ' + post + '<br/><img height="5" src="i/w/sp_.gif"/><br/>';
					});
					gc.setValue('a-fedchat-lastupdate', gc.timestamp);
					chatPanel.html(fedchatDigest);
					gc.setValue('fedchat.html', fedchatDigest);
					
				}
			});
		} else {
			chatPanel.html(gc.getValue('fedchat.html'));
		}
		chatPanel.attr("title", "Doubleclick to switch to fedchat");
		chatPanel.dblclick(function () {
			document.location.href = "http://gc.gamestotal.com/i.cfm?f=fed_forum";
		});
		
	}
};
