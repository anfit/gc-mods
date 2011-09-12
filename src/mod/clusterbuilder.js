/**
 * cluster builder
 */
app.mod.clusterbuilder = {
	id: 'a-clusterbuilder',
	defaultValue: true,
	title: 'Cluster builder',
	description: 'Build your C1s and C2s really fast. You must have researched respective colony levels first, of course...',
	/**
	 * @cfg filter function a function which returns true only when this mod can be launched
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
	 * @cfg plugin function the main functionality of the mod
	 */
	plugin: function () {
		var button = $("input[value='Plunder Colony']");
		button.after('<br /><span class="table_row1 a-clusterbuilder-button a-button" id="a-clusterbuilder-createc1">Create a C1 (Strafez)</span>&nbsp;&nbsp;<span class="table_row1 a-clusterbuilder-button a-button" id="a-clusterbuilder-createc2">Create a C2 (Strafez)</span>');
		$("#a-clusterbuilder-createc1").click(function (e) {
			gc.xhr({
				url: app.gameServer + 'i.cfm?&' + gc.getValue('antiReload') + '&f=com_colupgrade&tid=20&con=1',
				data: 'goodid=6',
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
			gc.xhr({
				url: app.gameServer + 'i.cfm?&' + gc.getValue('antiReload') + '&f=com_colupgrade&tid=21&con=1',
				data: 'goodid=6',
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
