/**!
 * Global object containing global properties and objects
 */
(function(){
	//create mod control and run on-init logic
	gc = new ModControl();
	//break execution in control failed to load
	if (gc.loaded == false) {
		return;
	};
	//append css
	$("head:first").append("<style type=\"text/css\">%CSS%</style>");
	
	//run mods
	gc.runMods([
		app.mod.automatedcapsulelab,
		app.mod.battlesmarkup,	
		app.mod.chathighlighter,
		app.mod.clicktocontinue,		
		app.mod.clusterbuilder,	
		app.mod.credits,
		app.mod.disbandertweaks,	
		app.mod.extramenu,
		app.mod.fedchat,
		app.mod.fedpms,	
		app.mod.forumkillfile,
		app.mod.infratweak,	
		app.mod.keybindings,
		app.mod.markettweaks,		
		app.mod.pagetitles,	
		app.mod.planetplunderer,
		app.mod.presetbuilder,
		app.mod.rankingtweaks,
		app.mod.shipbuilder,		
		app.mod.tabbedpms,		
		app.mod.turnticker,		
		app.mod.commoncss
	]);
	
})();