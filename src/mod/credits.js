/**
 * credits
 */
app.mod.credits = {
	id: 'a-credits',
	defaultValue: true,
	title: 'Credits',
	description: 'Adds a short info blob about the mods to status page.',
	/**
	 * @cfg filter function a function which returns true only when this mod can be launched
	 */
	filter: function () {
		if (!gc.getValue('a-credits')) {
			return false;
		}
		if (gc.location.match(/com_empire&cm=2/)) {
			return true;
		}
		if (gc.location.match(/com_empire&cm=4/)) {
			return true;
		}
		return false;
	},
	/**
	 * @cfg plugin function the main functionality of the mod
	 */
	plugin: function () {
		var markup = '<div id="a-credits-text">You\'re using <a href="javascript:cmsgu(\'i.cfm?popup=msguser&uid=213512\');">Anfit</a>\'s GC Mod Pack v.${version} <a href="i.cfm?f=option">Check out the options and enjoy!</a> <a href="http://gc.mmanir.net"><img src="data:image/jpeg;base64,%2F9j%2F4AAQSkZJRgABAQAAAQABAAD%2F2wBDAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys%2FRD84QzQ5Ojf%2F2wBDAQoKCg0MDRoPDxo3JR8lNzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzf%2FwAARCAAKAAoDASIAAhEBAxEB%2F8QAFwAAAwEAAAAAAAAAAAAAAAAAAgQGB%2F%2FEACAQAAEFAAICAwAAAAAAAAAAAAECAwQFERIhAAZRUpH%2FxAAUAQEAAAAAAAAAAAAAAAAAAAAF%2F8QAGREBAAMBAQAAAAAAAAAAAAAAAQACAwQi%2F9oADAMBAAIRAxEAPwAPX6Wt9IZXZzkGfFXCbkKjvw0K5cwCSFYcQnQOX26A77lri%2Fp3LecuK8lDCpDhaQls4lPI4BgzM%2BOvGba1sXaOVDdsJa4ojlIYU8oowDocdzBg%2FPM28NribHphuPLXrF0Wf%2F%2FZ"/></a> (${paid} account${authenticated})</div>';
		$.tmpl(markup, {
			paid: gc.isPaid ? 'paid' : 'normal',
			authenticated: gc.getValue('a-authentication-token') ? '' : ', UNAUTHENTICATED with modserver',
			version: app.version
		}).appendTo("td:contains('Welcome to (SFGC) Galactic Conquest'):last");
	}
};
