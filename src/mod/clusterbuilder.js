/**
 * cluster builder
 */
app.mod.clusterbuilder = {
	id: 'a-clusterbuilder',
	defaultValue: true,
	title: 'Cluster builder',
	description: 'Build your C1s and C2s really fast. You must have researched respective colony levels first, of course...',
	/**
	 * Returns true only when this mod can be launched
	 */
	filter: function () {
		if (!gc.getValue('a-clusterbuilder')) {
			return false;
		}
		if (gc.location.match(/f=com_col$/)) {
			return true;
		}
		return false;
	},
	/**
	 * Mod's body function
	 */
	plugin: function () {
		
		var button = $("input[value='Plunder Colony']");
		button.after("%CLUSTERBUILDER%");
		$("#a-clusterbuilder-createc1").click(function (e) {
			
			var planetType = $("#a-clusterbuilder-mineral option:selected").val();
			
			gc.xhr({
				url: app.gameServer + 'i.cfm?&' + gc.getValue('antiReload') + '&f=com_colupgrade&tid=20&con=1',
				data: 'goodid=' + planetType,
				onFailure: function (response) {
					console.error("[Cluster builder] XHR query to create a C1 cluster failed.");
				},
				successCondition: "td:contains('New C1 was formed !')",
				onSuccess: function (response) {
					console.log("[Cluster builder] A new C1 cluster was formed.");
				}
			});
		});
		$("#a-clusterbuilder-createc2").click(function (e) {
			var planetType = $("#a-clusterbuilder-mineral option:selected").val();
			
			gc.xhr({
				url: app.gameServer + 'i.cfm?&' + gc.getValue('antiReload') + '&f=com_colupgrade&tid=21&con=1',
				data: 'goodid=' + planetType,
				onFailure: function (response) {
					console.error("[Cluster builder] XHR query to create a C2 cluster failed.");
				},
				successCondition: "td:contains('New C2 was formed !')",
				onSuccess: function (response) {
					console.log("[Cluster builder] A new C2 cluster was formed.");
				}
			});
		});
	}
};
