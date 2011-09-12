/**
 * page titles
 */
app.mod.pagetitles = {
	id: 'a-pagetitles',
	defaultValue: true,
	title: 'Page titles',
	description: 'Adds sensible page titles to most GC Pages. Makes multi-tab browsing way more user-friendly: different pages get different tab titles.',
	items: [{
		type: 'info',
		text: 'A page title == global prefix + local prefix + page title. Here you can change the first one and toggle the second one on/off.'
	}, {
		type: 'input',
		id: 'a-pagetitles-tag',
		description: 'Set the global prefix here:',
		defaultValue: '(GC) '
	}, {
		type: 'checkbox',
		id: 'a-pagetitles-allowlocal',
		description: 'Allow local prefixes like "Build:" before shipnames and "Market:" before minerals etc?'
	}],
	/**
	 * @cfg filter function a function which returns true only when this mod can be launched
	 */
	filter: function () {
		if (!gc.getValue('a-pagetitles')) {
			return false;
		}
		return true;
	},
	/**
	 * @cfg plugin function the main functionality of the mod
	 */
	plugin: function () {
		//CONFIG
		var global = gc.getValue('a-pagetitles-tag');
		var title = global ? global : '';
		var name = '';
		var pages = [{
			title: "Counters",
			regexp: "rank2.*ty=3"
		}, {
			title: "Rank near me",
			regexp: "rank2"
		}, {
			title: "Top Stats",
			regexp: "rank_s"
		}, {
			title: "Top Planets",
			regexp: "rank.*ty=1"
		}, {
			title: "Top Ranking",
			regexp: "rank$"
		}, {
			title: "Options",
			regexp: "option"
		}, {
			title: "Fed Battles",
			regexp: "fed_prev"
		}, {
			title: "Feds2",
			regexp: "fed_join2"
		}, {
			title: "Feds",
			regexp: "fed_join$"
		}, {
			title: "Fedchat",
			regexp: "fed_forum"
		}, {
			title: "Fed Details",
			regexp: "fed_detail"
		}, {
			title: "Fed...",
			regexp: "fed_"
		}, {
			title: "Research Mining",
			regexp: "com_research2.*rtype=5"
		}, {
			title: "Research Agriculture",
			regexp: "com_research2.*rtype=4"
		}, {
			title: "Research Industry",
			regexp: "com_research2.*rtype=3"
		}, {
			title: "Research Commercial",
			regexp: "com_research2.*rtype=2"
		}, {
			title: "Research Housing",
			regexp: "com_research2.*rtype=1"
		}, {
			title: "Research",
			regexp: "com_research$"
		}, {
			title: "Capsule Lab",
			regexp: "com_project2.*id=3.*new=1"
		}, {
			title: "Loktar",
			regexp: "com_project2.*id=2.*new=1"
		}, {
			title: "Hektar",
			regexp: "com_project2.*id=1.*new=1"
		}, {
			title: "Projects",
			regexp: "com_project"
		}, {
			title: "Missions",
			regexp: "com_mission"
		}, {
			title: "Strafez",
			regexp: "com_market2.*gid=6"
		}, {
			title: "Composite",
			regexp: "com_market2.*gid=5"
		}, {
			title: "Rutile",
			regexp: "com_market2.*gid=4"
		}, {
			title: "White Crystal",
			regexp: "com_market2.*gid=3"
		}, {
			title: "Consumer Goods",
			regexp: "com_market2.*gid=24"
		}, {
			title: "Raws",
			regexp: "com_market2.*gid=23"
		}, {
			title: "Ore",
			regexp: "com_market2.*gid=22"
		}, {
			title: "Food",
			regexp: "com_market2.*gid=21"
		}, {
			title: "Red Crystal",
			regexp: "com_market2.*gid=2"
		}, {
			title: "Terran Metal",
			regexp: "com_market2.*gid=1"
		}, {
			title: "Market",
			regexp: "com_market$"
		}, {
			title: "Intelligence",
			regexp: "com_intel"
		}, {
			title: "Income",
			regexp: "com_income"
		}, {
			title: "Explore",
			regexp: "com_explore"
		}, {
			title: "Events",
			regexp: "com_empire.*cm=4"
		}, {
			title: "Summary",
			regexp: "com_empire.*cm=3"
		}, {
			title: "Events",
			regexp: "com_empire.*cm=2"
		}, {
			title: "Fleet",
			regexp: "com_disband"
		}, {
			title: "Create C3",
			regexp: "com_colupgrade.*tid=22"
		}, {
			title: "Create C2",
			regexp: "com_colupgrade.*tid=21"
		}, {
			title: "Create C1",
			regexp: "com_colupgrade.*tid=20"
		}, {
			title: "Clustering",
			regexp: "com_colupgrade"
		}, {
			title: "Reward",
			regexp: "com_col_r.*colid.\d+"
		}, {
			title: "Plunder",
			regexp: "com_col_plunder.*colid.\d+"
		}, {
			title: "Dig",
			regexp: "com_col_find.*colid.\d+"
		}, {
			title: "Colony",
			regexp: "com_col.*colid.\d+"
		}, {
			title: "Colonies",
			regexp: "com_col"
		}, {
			title: "Battle Result",
			regexp: "com_attack3"
		}, {
			title: "Attack Info",
			regexp: "com_attack2"
		}, {
			title: "Battle Logs",
			regexp: "com_attack_prev"
		}, {
			title: "Attack",
			regexp: "com_attack"
		}, {
			title: "Forum",
			regexp: "hef.cfm"
		}, {
			title: "Chat",
			regexp: "com_msgsector"
		}, {
			title: "Post to Chat",
			regexp: "popup=msgsector"
		}, {
			title: "Build Ships",
			regexp: "com_ship"
		}, {
			title: "Artifacts",
			regexp: "com_market_use"
		}];
		//default value for local tags is ''
		local = '';
		//ships are handled separately
		if (gc.location.match(/com_ship2/)) {
			local = 'Build: ';
			cells = $("td[width='40%']:first");
			if (cells.length) {
				shipname = $.trim(cells.text());;
				name = shipname;
			} else {
				name = 'Build';
			}
		} else {
			if (gc.location.match(/com_market2/)) {
				local = 'Market: ';
			}
			for (var i = 0; i < pages.length; i++) {
				if (gc.location.match(new RegExp(pages[i].regexp))) {
					name = pages[i].title;
					break;
				}
			}
		}
		if (gc.getValue('a-pagetitles-allowlocal')) {
			title += local;
		}
		title += name;
		if (name) {
			document.title = title;
		}
	}
};
