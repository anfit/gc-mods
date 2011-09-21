/**
 * ship builder
 */
app.mod.shipbuilder = {
	id: 'a-shipbuilder',
	defaultValue: true,
	title: 'Ship builder',
	description: 'Build many stacks at once, clean and fast.',
	items: [{
		type: 'info',
		text: 'This mod replaces the old fleet builder mod. Old functionalities are still there: a doubleclick removes a saved preset. The main new thing is that this mods acquires ship data dynamically, whenever you visit a build page of a particular ship. If some of the data (e.g. build rates) are wrong, just visit the apropriate ship page. Also: you can use this to manage existing fleets...'
	}],
	/**
	 * @cfg filter function a function which returns true only when this mod can be launched
	 */
	filter: function () {
		if (!gc.getValue('a-shipbuilder')) {
			return false;
		}
		if (gc.location.match(/com_ship/)) {
			return true;
		}
		return false;
	},
	/**
	 * @cfg plugin function the main functionality of the mod
	 */
	plugin: function () {
		
		if (!gc.getValue("a-allships")) {
			gc.setValue("a-allships", '[null,{"id":1,"name":"T.Ryu-jin","power":8,"build":2250,"cost":88,"upkeep":3,"weapon":5,"hull":10,"range":1,"race":"Terran","type":"Fighter","damage":{"energy":5,"kinetic":0,"missile":0,"chemical":0},"scanner":1,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":2,"name":"Viator","power":1,"build":80,"cost":27,"upkeep":30,"weapon":0,"hull":3,"range":1,"race":"Terran","type":"Scout","damage":{"energy":0,"kinetic":0,"missile":0,"chemical":0},"scanner":9,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":3,"name":"T.Maru","power":51,"build":325,"cost":590,"upkeep":22,"weapon":35,"hull":100,"range":3,"race":"Terran","type":"Corvette","damage":{"energy":35,"kinetic":0,"missile":0,"chemical":0},"scanner":5,"minerals":{"terranMetal":1,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":4,"name":"T.Sentouki","power":174,"build":50,"cost":1855,"upkeep":125,"weapon":56,"hull":500,"range":7,"race":"Terran","type":"Frigate","damage":{"energy":28,"kinetic":28,"missile":0,"chemical":0},"scanner":10,"minerals":{"terranMetal":2,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":5,"name":"T.Garuda","power":956,"build":10,"cost":9420,"upkeep":750,"weapon":400,"hull":2000,"range":9,"race":"Terran","type":"Destroyer","damage":{"energy":400,"kinetic":0,"missile":0,"chemical":0},"scanner":50,"minerals":{"terranMetal":10,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":6,"name":"T.Kalieum","power":1701,"build":10,"cost":15435,"upkeep":1800,"weapon":350,"hull":4000,"range":8,"race":"Terran","type":"Cruiser","damage":{"energy":350,"kinetic":0,"missile":0,"chemical":0},"scanner":100,"minerals":{"terranMetal":10,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":7,"name":"Light fighter-drone","power":5,"build":3500,"cost":66,"upkeep":1,"weapon":5,"hull":5,"range":1,"race":"","type":"Fighter","damage":{"energy":5,"kinetic":0,"missile":0,"chemical":0},"scanner":0,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":1,"strafezOrganism":0}},{"id":8,"name":"Light Corvette","power":34,"build":400,"cost":364,"upkeep":6,"weapon":20,"hull":50,"range":3,"race":"","type":"Corvette","damage":{"energy":20,"kinetic":0,"missile":0,"chemical":0},"scanner":2,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":5,"strafezOrganism":0}},{"id":9,"name":"Light Frigate","power":126,"build":60,"cost":1265,"upkeep":25,"weapon":53,"hull":250,"range":5,"race":"","type":"Frigate","damage":{"energy":53,"kinetic":0,"missile":0,"chemical":0},"scanner":8,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":4,"strafezOrganism":0}},{"id":10,"name":"Small Strafez Fodder","power":55,"build":342,"cost":535,"upkeep":1,"weapon":0,"hull":200,"range":1,"race":"","type":"Special","damage":{"energy":0,"kinetic":0,"missile":0,"chemical":0},"scanner":0},{"id":11,"name":"Large Strafez Fodder","power":205,"build":90,"cost":2035,"upkeep":5,"weapon":0,"hull":800,"range":1,"race":"","type":"Special","damage":{"energy":0,"kinetic":0,"missile":0,"chemical":0},"scanner":0},{"id":12,"name":"Small Strafez Runner","power":115,"build":240,"cost":1046,"upkeep":2,"weapon":80,"hull":1,"range":7,"race":"","type":"Special","damage":{"energy":0,"kinetic":0,"missile":0,"chemical":80},"scanner":0,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":2}},{"id":13,"name":"Large Strafez Runner","power":435,"build":50,"cost":4247,"upkeep":12,"weapon":400,"hull":2,"range":7,"race":"","type":"Special","damage":{"energy":0,"kinetic":0,"missile":0,"chemical":400},"scanner":0,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":10}},{"id":14,"name":"T.Empereur","power":5881,"build":4,"cost":52475,"upkeep":5400,"weapon":2500,"hull":8000,"range":7,"race":"Terran","type":"Battleship","damage":{"energy":1500,"kinetic":1000,"missile":0,"chemical":0},"scanner":500,"minerals":{"terranMetal":80,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":15,"name":"C.Aries","power":51,"build":50,"cost":617,"upkeep":37,"weapon":20,"hull":200,"range":1,"race":"","type":"Corvette","damage":{"energy":20,"kinetic":0,"missile":0,"chemical":0},"scanner":2,"minerals":{"terranMetal":0,"redCrystal":1,"whiteCrystal":1,"rutile":0,"composite":1,"strafezOrganism":0}},{"id":16,"name":"C.Gemini","power":243,"build":20,"cost":2784,"upkeep":230,"weapon":53,"hull":1000,"range":5,"race":"","type":"Frigate","damage":{"energy":53,"kinetic":0,"missile":0,"chemical":0},"scanner":4,"minerals":{"terranMetal":0,"redCrystal":3,"whiteCrystal":3,"rutile":0,"composite":3,"strafezOrganism":0}},{"id":17,"name":"C.Taurus","power":1488,"build":10,"cost":14595,"upkeep":1300,"weapon":400,"hull":4000,"range":7,"race":"","type":"Destroyer","damage":{"energy":200,"kinetic":200,"missile":0,"chemical":0},"scanner":85,"minerals":{"terranMetal":0,"redCrystal":4,"whiteCrystal":4,"rutile":0,"composite":4,"strafezOrganism":0}},{"id":18,"name":"C.Cancer","power":1804,"build":8,"cost":18355,"upkeep":1800,"weapon":350,"hull":6000,"range":6,"race":"","type":"Cruiser","damage":{"energy":350,"kinetic":0,"missile":0,"chemical":0},"scanner":25,"minerals":{"terranMetal":0,"redCrystal":5,"whiteCrystal":5,"rutile":0,"composite":5,"strafezOrganism":0}},{"id":19,"name":"Viator II","power":25,"build":160,"cost":636,"upkeep":400,"weapon":0,"hull":1,"range":1,"race":"Terran","type":"Scout","damage":{"energy":0,"kinetic":0,"missile":0,"chemical":0},"scanner":500,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":20,"name":"P.Apollo","power":66,"build":55,"cost":811,"upkeep":55,"weapon":80,"hull":25,"range":5,"race":"Terran","type":"Corvette","damage":{"energy":0,"kinetic":0,"missile":80,"chemical":0},"scanner":0,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":1,"rutile":1,"composite":0,"strafezOrganism":0}},{"id":21,"name":"P.Odin","power":201,"build":30,"cost":2311,"upkeep":255,"weapon":212,"hull":125,"range":9,"race":"Terran","type":"Frigate","damage":{"energy":0,"kinetic":0,"missile":212,"chemical":0},"scanner":0,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":2,"rutile":2,"composite":0,"strafezOrganism":0}},{"id":22,"name":"P.Thor","power":1624,"build":8,"cost":16905,"upkeep":1600,"weapon":1600,"hull":500,"range":11,"race":"Terran","type":"Destroyer","damage":{"energy":0,"kinetic":0,"missile":1600,"chemical":0},"scanner":50,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":10,"rutile":10,"composite":0,"strafezOrganism":0}},{"id":23,"name":"P.Zeus","power":1755,"build":8,"cost":17175,"upkeep":3000,"weapon":1400,"hull":1000,"range":10,"race":"Terran","type":"Cruiser","damage":{"energy":0,"kinetic":0,"missile":1400,"chemical":0},"scanner":50,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":10,"rutile":10,"composite":0,"strafezOrganism":0}},{"id":24,"name":"Nirvana","power":18030,"build":2,"cost":175410,"upkeep":22000,"weapon":12000,"hull":20000,"range":6,"race":"Terran","type":"Dreadnought","damage":{"energy":5000,"kinetic":5000,"missile":2000,"chemical":0},"scanner":200,"minerals":{"terranMetal":450,"redCrystal":200,"whiteCrystal":200,"rutile":200,"composite":200,"strafezOrganism":0}},{"id":25,"name":"Chimaera","power":21393,"build":1,"cost":213765,"upkeep":10054,"weapon":10000,"hull":45000,"range":5,"race":"Terran","type":"Starbase","damage":{"energy":4000,"kinetic":6000,"missile":0,"chemical":0},"scanner":500,"minerals":{"terranMetal":225,"redCrystal":100,"whiteCrystal":100,"rutile":100,"composite":100,"strafezOrganism":0}},{"id":26,"name":"Eel","power":60,"build":100,"type":"Fighter","weapon":50,"damage":{"energy":0,"kinetic":25,"missile":25,"chemical":0},"hull":505,"range":3,"scanner":13,"cost":655,"upkeep":10,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":27,"name":"Ray","power":82,"build":70,"type":"Corvette","weapon":50,"damage":{"energy":25,"kinetic":25,"missile":0,"chemical":0},"hull":150,"range":6,"scanner":10,"cost":917,"upkeep":12,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":28,"name":"Piranha","power":379,"build":10,"type":"Frigate","weapon":80,"damage":{"energy":40,"kinetic":40,"missile":0,"chemical":0},"hull":750,"range":5,"scanner":50,"cost":3332,"upkeep":56,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":29,"name":"Barracuda","power":2272,"build":6,"type":"Destroyer","weapon":800,"damage":{"energy":600,"kinetic":200,"missile":0,"chemical":0},"hull":300080,"range":8,"scanner":250,"cost":19440,"upkeep":522,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":30,"name":"Shark","power":2052,"build":9,"type":"Cruiser","weapon":500,"damage":{"energy":250,"kinetic":250,"missile":0,"chemical":0},"hull":500030,"range":7,"scanner":100,"cost":19180,"upkeep":307,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":31,"name":"Pyth","power":22527,"build":2,"type":"Battleship","weapon":20000,"damage":{"energy":7500,"kinetic":7500,"missile":5000,"chemical":0},"hull":2000015,"range":6,"scanner":6500,"cost":244195,"upkeep":4280,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":32,"name":"M.Lyth","power":30040,"build":2,"type":"Dreadnought","weapon":15000,"damage":{"energy":3000,"kinetic":0,"missile":12000,"chemical":0},"hull":3500035,"range":7,"scanner":1250,"cost":270270,"upkeep":52052,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":33,"name":"M.Hal","power":23,"build":1000,"type":"Fighter","weapon":20,"damage":{"energy":20,"kinetic":0,"missile":0,"chemical":0},"hull":2520,"range":4,"scanner":1,"cost":287,"upkeep":5,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":34,"name":"M.Alium","power":46,"build":250,"type":"Corvette","weapon":30,"damage":{"energy":30,"kinetic":0,"missile":0,"chemical":0},"hull":50,"range":4,"scanner":5,"cost":487,"upkeep":28,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":35,"name":"M.Illite","power":182,"build":50,"type":"Frigate","weapon":80,"damage":{"energy":80,"kinetic":0,"missile":0,"chemical":0},"hull":40010,"range":6,"scanner":10,"cost":1880,"upkeep":130,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":36,"name":"M.Epidote","power":936,"build":12,"type":"Destroyer","weapon":500,"damage":{"energy":500,"kinetic":0,"missile":0,"chemical":0},"hull":150010,"range":9,"scanner":50,"cost":9195,"upkeep":740,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":37,"name":"M.Chlor","power":1656,"build":8,"type":"Cruiser","weapon":500,"damage":{"energy":500,"kinetic":0,"missile":0,"chemical":0},"hull":500010,"range":8,"scanner":50,"cost":17160,"upkeep":1900,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":38,"name":"M.Flysch","power":7231,"build":4,"type":"Battleship","weapon":3000,"damage":{"energy":1500,"kinetic":500,"missile":1000,"chemical":0},"hull":1000015,"range":7,"scanner":500,"cost":64225,"upkeep":5254,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":39,"name":"A.Aragonite","power":5035,"build":8,"type":"Dreadnought","weapon":2500,"damage":{"energy":1000,"kinetic":1500,"missile":0,"chemical":0},"hull":600025,"range":7,"scanner":200,"cost":45445,"upkeep":5982,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":40,"name":"M.Lakko","power":24444,"build":2,"type":"Starbase","weapon":23700,"damage":{"energy":7700,"kinetic":0,"missile":16000,"chemical":0},"hull":3650095,"range":3,"scanner":416,"cost":286791,"upkeep":20666,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":41,"name":"A.Kryo","power":75182,"build":1,"type":"Starbase","weapon":6000,"damage":{"energy":1500,"kinetic":1500,"missile":3000,"chemical":0},"hull":15000020,"range":7,"scanner":8000,"cost":601480,"upkeep":32328,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":42,"name":"Seeker","power":2,"build":60,"type":"Scout","weapon":0,"damage":{"energy":0,"kinetic":0,"missile":0,"chemical":0},"hull":195,"range":1,"scanner":40,"cost":61,"upkeep":60,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":43,"name":"Ranger","power":50,"build":160,"type":"Scout","weapon":0,"damage":{"energy":0,"kinetic":0,"missile":0,"chemical":0},"hull":195,"range":1,"scanner":1000,"cost":1261,"upkeep":800,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":44,"name":"G.Livid","power":13013,"build":1,"type":"Fighter","weapon":8000,"damage":{"energy":0,"kinetic":8000,"missile":0,"chemical":0},"hull":2500085,"range":5,"scanner":4000,"cost":140365,"upkeep":0,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},null,null,null,null,null,null,null,null,{"id":53,"name":"G.Livid (r)","power":12513,"build":2,"type":"Fighter","weapon":5000,"damage":{"energy":0,"kinetic":5000,"missile":0,"chemical":0},"hull":2500075,"range":5,"scanner":2750,"cost":121615,"upkeep":15641,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":54,"name":"G.Agate","power":13135,"build":4,"type":"Fighter","weapon":5000,"damage":{"energy":0,"kinetic":5000,"missile":0,"chemical":0},"hull":2500020,"range":4,"scanner":2700,"cost":208814,"upkeep":1712,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":55,"name":"G.Amethyst","power":18018,"build":2,"type":"Corvette","weapon":15000,"damage":{"energy":15000,"kinetic":0,"missile":0,"chemical":0},"hull":24000,"range":6,"scanner":1800,"cost":329892,"upkeep":2030,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":56,"name":"G.Quartz","power":36068,"build":2,"type":"Frigate","weapon":14000,"damage":{"energy":0,"kinetic":14000,"missile":0,"chemical":0},"hull":8000020,"range":5,"scanner":3500,"cost":592766,"upkeep":4596,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":57,"name":"L.Garnet","power":16303,"build":3,"type":"Frigate","weapon":8000,"damage":{"energy":0,"kinetic":0,"missile":8000,"chemical":0},"hull":2000010,"range":8,"scanner":2050,"cost":248981,"upkeep":1834,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":58,"name":"G.Corundum","power":55028,"build":1,"type":"Destroyer","weapon":30000,"damage":{"energy":18750,"kinetic":11250,"missile":0,"chemical":0},"hull":6500070,"range":7,"scanner":4500,"cost":855858,"upkeep":5357,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":59,"name":"L.Topaz","power":49081,"build":1,"type":"Cruiser","weapon":16000,"damage":{"energy":0,"kinetic":0,"missile":16000,"chemical":0},"hull":10000045,"range":7,"scanner":2700,"cost":759069,"upkeep":5091,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":60,"name":"G.Fluorite","power":69768,"build":1,"type":"Cruiser","weapon":30000,"damage":{"energy":30000,"kinetic":0,"missile":0,"chemical":0},"hull":16000010,"range":3,"scanner":1500,"cost":1173120,"upkeep":7500,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":61,"name":"L.Emerald","power":41636,"build":1,"type":"Destroyer","weapon":30000,"damage":{"energy":0,"kinetic":0,"missile":30000,"chemical":0},"hull":2000060,"range":9,"scanner":3400,"cost":647673,"upkeep":4536,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":62,"name":"G.Diamond","power":139532,"build":1,"type":"Starbase","weapon":20000,"damage":{"energy":10000,"kinetic":10000,"missile":0,"chemical":0},"hull":24000015,"range":7,"scanner":15000,"cost":1863823,"upkeep":17946,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":63,"name":"S.Lapiz","power":25,"build":30,"type":"Scout","weapon":0,"damage":{"energy":0,"kinetic":0,"missile":0,"chemical":0},"hull":520,"range":1,"scanner":500,"cost":1074,"upkeep":50,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":64,"name":"S.Opal","power":75,"build":20,"type":"Scout","weapon":0,"damage":{"energy":0,"kinetic":0,"missile":0,"chemical":0},"hull":520,"range":1,"scanner":1500,"cost":3168,"upkeep":150,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":65,"name":"D.Hammerhead","power":3612,"build":4,"type":"Frigate","weapon":4000,"damage":{"energy":0,"kinetic":1500,"missile":2500,"chemical":0},"hull":300015,"range":7,"scanner":75,"cost":41955,"upkeep":632,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":66,"name":"D.Bullhead","power":6336,"build":3,"type":"Cruiser","weapon":3250,"damage":{"energy":1250,"kinetic":0,"missile":2000,"chemical":0},"hull":700025,"range":8,"scanner":400,"cost":57160,"upkeep":1140,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":67,"name":"D.Angel","power":23206,"build":2,"type":"Battleship","weapon":22000,"damage":{"energy":0,"kinetic":7000,"missile":15000,"chemical":0},"hull":1500010,"range":7,"scanner":0,"cost":244850,"upkeep":4614,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":68,"name":"M.Chlorite","power":1236,"build":10,"type":"Destroyer","weapon":1000,"damage":{"energy":0,"kinetic":0,"missile":1000,"chemical":0},"hull":800,"range":9,"scanner":60,"cost":12330,"upkeep":962,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":69,"name":"Manta","power":74,"build":80,"type":"Fighter","weapon":75,"damage":{"energy":0,"kinetic":0,"missile":75,"chemical":0},"hull":50,"range":6,"scanner":15,"cost":882,"upkeep":13,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":70,"name":"G.Lictor","power":51178,"build":1,"type":"Juggernaught","weapon":14000,"damage":{"energy":10000,"kinetic":4000,"missile":0,"chemical":0},"hull":8000040,"range":5,"scanner":2500,"cost":428440,"upkeep":40000,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":71,"name":"Hercules","power":45402,"build":1,"cost":385310,"upkeep":35000,"weapon":20000,"hull":45000,"range":5,"race":"Terran","type":"Juggernaught","damage":{"energy":0,"kinetic":12000,"missile":8000,"chemical":0},"scanner":2000,"minerals":{"terranMetal":400,"redCrystal":250,"whiteCrystal":250,"rutile":300,"composite":600,"strafezOrganism":0}},{"id":72,"name":"Strafez Queen","power":896,"build":20,"cost":8121,"upkeep":20,"weapon":700,"hull":25,"range":8,"race":"","type":"Special","damage":{"energy":0,"kinetic":0,"missile":0,"chemical":700},"scanner":30,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":20}},{"id":73,"name":"F.Axe","power":178,"build":50,"cost":1898,"upkeep":152,"weapon":65,"hull":500,"range":5,"race":"","type":"Frigate","damage":{"energy":0,"kinetic":65,"missile":0,"chemical":0},"scanner":8,"minerals":{"terranMetal":2,"redCrystal":1,"whiteCrystal":1,"rutile":1,"composite":0,"strafezOrganism":0}},{"id":74,"name":"F.Sword","power":1152,"build":10,"cost":11400,"upkeep":955,"weapon":600,"hull":2000,"range":8,"race":"","type":"Destroyer","damage":{"energy":0,"kinetic":600,"missile":0,"chemical":0},"scanner":60,"minerals":{"terranMetal":10,"redCrystal":2,"whiteCrystal":2,"rutile":2,"composite":0,"strafezOrganism":0}},{"id":75,"name":"F.Spear","power":1512,"build":10,"cost":14670,"upkeep":2100,"weapon":400,"hull":4000,"range":6,"race":"","type":"Cruiser","damage":{"energy":0,"kinetic":400,"missile":0,"chemical":0},"scanner":50,"minerals":{"terranMetal":14,"redCrystal":2,"whiteCrystal":2,"rutile":2,"composite":0,"strafezOrganism":0}},{"id":76,"name":"Pike","power":1276,"build":8,"type":"Destroyer","weapon":1000,"damage":{"energy":500,"kinetic":500,"missile":0,"chemical":0},"hull":100010,"range":9,"scanner":60,"cost":12780,"upkeep":382,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},null,null,{"id":79,"name":"K.Hun-Li","power":51224,"build":1,"type":"Destroyer","weapon":14000,"damage":{"energy":0,"kinetic":4000,"missile":0,"chemical":10000},"hull":5000050,"range":6,"scanner":7500,"cost":663602,"upkeep":5343,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":80,"name":"K.Hun-Xe","power":71322,"build":1,"type":"Cruiser","weapon":12000,"damage":{"energy":0,"kinetic":0,"missile":4000,"chemical":8000},"hull":8000050,"range":5,"scanner":11000,"cost":883831,"upkeep":7596,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":81,"name":"Sting","power":1611,"build":8,"type":"Cruiser","weapon":1000,"damage":{"energy":0,"kinetic":0,"missile":1000,"chemical":0},"hull":2000,"range":8,"scanner":50,"cost":15685,"upkeep":272,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":82,"name":"Tourmaline","power":6510,"build":4,"type":"Fighter","weapon":8000,"damage":{"energy":0,"kinetic":8000,"missile":0,"chemical":0},"hull":1500040,"range":4,"scanner":250,"cost":153414,"upkeep":720,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":83,"name":"Ruby","power":11268,"build":3,"type":"Corvette","weapon":13000,"damage":{"energy":0,"kinetic":13000,"missile":0,"chemical":0},"hull":1600050,"range":6,"scanner":350,"cost":237432,"upkeep":1220,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":84,"name":"V.Borrelly","power":452,"build":25,"type":"Destroyer","weapon":400,"damage":{"energy":0,"kinetic":100,"missile":0,"chemical":300},"hull":50050,"range":8,"scanner":0,"cost":4965,"upkeep":271,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":85,"name":"V.Chiron","power":18482,"build":2,"type":"Starbase","weapon":8000,"damage":{"energy":0,"kinetic":3000,"missile":0,"chemical":5000},"hull":3000050,"range":7,"scanner":1000,"cost":170980,"upkeep":9241,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":86,"name":"Kohoutek","power":20,"build":180,"type":"Scout","weapon":0,"damage":{"energy":0,"kinetic":0,"missile":0,"chemical":0},"hull":120,"range":1,"scanner":400,"cost":511,"upkeep":200,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":87,"name":"R.Pinnace","power":162,"build":100,"type":"Corvette","weapon":200,"damage":{"energy":0,"kinetic":200,"missile":0,"chemical":0},"hull":200,"range":4,"scanner":0,"cost":2100,"upkeep":74,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":88,"name":"R.Sloop","power":558,"build":20,"type":"Frigate","weapon":550,"damage":{"energy":550,"kinetic":0,"missile":0,"chemical":0},"hull":75010,"range":7,"scanner":0,"cost":6547,"upkeep":177,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":89,"name":"H.Galleon","power":2056,"build":12,"type":"Destroyer","weapon":900,"damage":{"energy":0,"kinetic":800,"missile":100,"chemical":0},"hull":450010,"range":9,"scanner":100,"cost":20595,"upkeep":417,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":90,"name":"R.Schooner","power":2136,"build":8,"type":"Destroyer","weapon":1150,"damage":{"energy":900,"kinetic":0,"missile":250,"chemical":0},"hull":2500,"range":9,"scanner":170,"cost":19815,"upkeep":476,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":91,"name":"H.Barkentine","power":3246,"build":8,"type":"Cruiser","weapon":1300,"damage":{"energy":0,"kinetic":0,"missile":1300,"chemical":0},"hull":500030,"range":8,"scanner":300,"cost":29360,"upkeep":949,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":92,"name":"K.Yang-Fo","power":747092,"build":200,"type":"Juggernaught","weapon":45000,"damage":{"energy":0,"kinetic":15000,"missile":15000,"chemical":15000},"hull":45000060,"range":2,"scanner":106333,"cost":4629313,"upkeep":0,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":93,"name":"K.Yang-Xe","power":747092,"build":200,"type":"Juggernaught","weapon":42000,"damage":{"energy":15000,"kinetic":0,"missile":15000,"chemical":12000},"hull":45000099,"range":2,"scanner":106333,"cost":4614313,"upkeep":0,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":94,"name":"K.Wai-Li","power":373555,"build":200,"type":"Dreadnought","weapon":32000,"damage":{"energy":9000,"kinetic":0,"missile":0,"chemical":23000},"hull":30000099,"range":3,"scanner":54708,"cost":2457513,"upkeep":0,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":95,"name":"K.Wai-Xe","power":373555,"build":200,"type":"Dreadnought","weapon":32000,"damage":{"energy":0,"kinetic":9000,"missile":0,"chemical":23000},"hull":30000099,"range":3,"scanner":54708,"cost":2457513,"upkeep":0,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":96,"name":"K.Wei-Li","power":186772,"build":400,"type":"Battleship","weapon":22000,"damage":{"energy":0,"kinetic":0,"missile":10000,"chemical":12000},"hull":15000060,"range":5,"scanner":31000,"cost":1262410,"upkeep":0,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":97,"name":"K.Wei-Xe","power":168094,"build":1,"type":"Battleship","weapon":22000,"damage":{"energy":0,"kinetic":10000,"missile":0,"chemical":12000},"hull":15000099,"range":5,"scanner":31000,"cost":1169020,"upkeep":0,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":98,"name":"F.Broadsword","power":1116,"build":10,"type":"Destroyer","weapon":700,"damage":{"energy":0,"kinetic":700,"missile":0,"chemical":0},"hull":100010,"range":9,"scanner":80,"cost":10500,"upkeep":635,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":99,"name":"Tyr","power":13035,"build":3,"cost":130245,"upkeep":14500,"weapon":10000,"hull":12000,"range":7,"race":"Terran","type":"Dreadnought","damage":{"energy":500,"kinetic":500,"missile":9000,"chemical":0},"scanner":0,"minerals":{"terranMetal":180,"redCrystal":220,"whiteCrystal":220,"rutile":110,"composite":120,"strafezOrganism":0}},{"id":100,"name":"Scorpion","power":73606,"build":1,"cost":548850,"upkeep":27500,"weapon":8000,"hull":105000,"range":7,"race":"Terran","type":"Starbase","damage":{"energy":1000,"kinetic":1000,"missile":6000,"chemical":0},"scanner":9500,"minerals":{"terranMetal":550,"redCrystal":260,"whiteCrystal":260,"rutile":260,"composite":280,"strafezOrganism":0}},{"id":101,"name":"M.Calcite","power":1701,"build":10,"type":"Cruiser","weapon":850,"damage":{"energy":0,"kinetic":0,"missile":850,"chemical":0},"hull":2000,"range":8,"scanner":100,"cost":15435,"upkeep":962,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":102,"name":"A.Hoko","power":9945,"build":5,"type":"Starbase","weapon":4000,"damage":{"energy":1000,"kinetic":1000,"missile":2000,"chemical":0},"hull":1000015,"range":10,"scanner":400,"cost":82725,"upkeep":4475,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":103,"name":"Tiger","power":1496,"build":8,"type":"Destroyer","weapon":1200,"damage":{"energy":0,"kinetic":0,"missile":1200,"chemical":0},"hull":1500,"range":9,"scanner":50,"cost":15495,"upkeep":448,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":104,"name":"H.Brigantine","power":286,"build":80,"type":"Frigate","weapon":300,"damage":{"energy":0,"kinetic":0,"missile":100,"chemical":200},"hull":30035,"range":6,"scanner":0,"cost":3365,"upkeep":90,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":105,"name":"R.Snow","power":6804,"build":5,"type":"Battleship","weapon":4000,"damage":{"energy":1800,"kinetic":0,"missile":2200,"chemical":0},"hull":750010,"range":7,"scanner":330,"cost":63795,"upkeep":1908,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":106,"name":"H.Man-O-War","power":450,"build":40,"type":"Starbase","weapon":250,"damage":{"energy":100,"kinetic":150,"missile":0,"chemical":0},"hull":60020,"range":7,"scanner":13,"cost":4333,"upkeep":200,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":107,"name":"D. Mako","power":12645,"build":100,"type":"Starbase","weapon":3000,"damage":{"energy":0,"kinetic":0,"missile":0,"chemical":3000},"hull":15000,"range":7,"scanner":1453,"cost":98498,"upkeep":2000,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":108,"name":"D. Luminous","power":12645,"build":100,"type":"Starbase","weapon":7000,"damage":{"energy":0,"kinetic":7000,"missile":0,"chemical":0},"hull":10000100,"range":7,"scanner":903,"cost":111698,"upkeep":2000,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":109,"name":"D. Megalodon","power":72902,"build":100,"type":"Juggernaught","weapon":50000,"damage":{"energy":10000,"kinetic":0,"missile":20000,"chemical":20000},"hull":6500030,"range":6,"scanner":0,"cost":695820,"upkeep":4000,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":110,"name":"D. Icithio","power":12645,"build":100,"type":"Starbase","weapon":11000,"damage":{"energy":11000,"kinetic":0,"missile":0,"chemical":0},"hull":900050,"range":8,"scanner":152,"cost":129707,"upkeep":2000,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":111,"name":"D. White","power":12645,"build":100,"type":"Starbase","weapon":12000,"damage":{"energy":0,"kinetic":0,"missile":12000,"chemical":0},"hull":7000,"range":10,"scanner":50,"cost":132125,"upkeep":2000,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":112,"name":"Strafez King","power":890,"build":20,"type":"Special","weapon":550,"damage":{"energy":0,"kinetic":0,"missile":0,"chemical":550},"hull":20090,"range":8,"scanner":50,"cost":7580,"upkeep":60,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":113,"name":"T.Fenrir","power":1512,"build":10,"type":"Cruiser","weapon":600,"damage":{"energy":350,"kinetic":250,"missile":0,"chemical":0},"hull":2800,"range":8,"scanner":68,"cost":14208,"upkeep":1400,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":114,"name":"D.Thresher","power":11956,"build":2,"type":"Battleship","weapon":9000,"damage":{"energy":7000,"kinetic":1000,"missile":1000,"chemical":0},"hull":800030,"range":7,"scanner":450,"cost":115300,"upkeep":2032,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":115,"name":"C.Leo","power":2848,"build":5,"type":"Cruiser","weapon":1000,"damage":{"energy":500,"kinetic":500,"missile":0,"chemical":0},"hull":5000,"range":7,"scanner":175,"cost":25735,"upkeep":2100,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":116,"name":"H.Corsair","power":110,"build":150,"type":"Fighter","weapon":75,"damage":{"energy":25,"kinetic":0,"missile":0,"chemical":50},"hull":10030,"range":4,"scanner":20,"cost":1110,"upkeep":22,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":117,"name":"K.Hun-Zen","power":61780,"build":1,"type":"Cruiser","weapon":18000,"damage":{"energy":8000,"kinetic":0,"missile":0,"chemical":10000},"hull":6000025,"range":6,"scanner":5750,"cost":803515,"upkeep":6000,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":118,"name":"V.Cronus","power":2016,"build":8,"type":"Cruiser","weapon":1000,"damage":{"energy":300,"kinetic":0,"missile":0,"chemical":700},"hull":200020,"range":8,"scanner":140,"cost":17800,"upkeep":950,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":119,"name":"K.Hun-Zen","power":1500003,"build":100,"type":"Starbase","weapon":345000,"damage":{"energy":80000,"kinetic":75000,"missile":100000,"chemical":90000},"hull":100000099,"range":4,"scanner":214530,"cost":10689585,"upkeep":0,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}},{"id":120,"name":"G.Sapphire","power":17624,"build":2,"type":"Destroyer","weapon":12000,"damage":{"energy":2000,"kinetic":10000,"missile":0,"chemical":0},"hull":2000045,"range":6,"scanner":1000,"cost":174180,"upkeep":16300,"minerals":{"terranMetal":0,"redCrystal":0,"whiteCrystal":0,"rutile":0,"composite":0,"strafezOrganism":0}}]');
		}
		//get all ships. note: the ships array is indexed by shipid, which means that entries are nullable;
		var allShipsJson = gc.getValue('a-allships');
		var allShips = [];
		if (allShipsJson) {
			allShips = $.secureEvalJSON(allShipsJson);
			if (!allShips) {
				allShips = [];
			}
		}
		/**
		 * ship items are @nullable
		 */
		var shipsAvailable = [];
		//refresh ship data and get the list of ships available to a user;
		$("table.table_back[width='95%'] table tr.table_row1").each(function () {
			var row = $(this);
			var race = $.trim($("td:eq(0)", this).text());
			var name = $.trim($("td:eq(1)", this).text());
			var id = $("td:eq(1) a", this).attr("href").replace(/.*shiptype=/, '') * 1;
			var type = $.trim($("td:eq(2)", this).text());
			var cost = $.trim($("td:eq(3)", this).text()).replace(/[^\.\d]/g, '') * 1;
			var upkeep = $.trim($("td:eq(4)", this).text()).replace(/[^\.\d]/g, '') * 1;
			var weapon = $.trim($("td:eq(5)", this).text()).replace(/[^\.\d]/g, '') * 1;
			var hull = $.trim($("td:eq(6)", this).text()).replace(/[^\.\d]/g, '') * 1;
			var range = $.trim($("td:eq(7)", this).text()).replace(/[^\.\d]/g, '') * 1;
			var power = $.trim($("td:eq(8)", this).text()).replace(/[^\.\d]/g, '') * 1;
			//console.debug(name, id, cost, upkeep, weapon, hull, range, power);
			//console.log(id);
			var ship = allShips[id];
			//console.log(ship);
			if (!ship) {
				ship = {};
			}
			ship.race = race;
			ship.name = name;
			ship.id = id;
			ship.type = type;
			ship.cost = cost;
			ship.upkeep = upkeep;
			ship.weapon = weapon;
			ship.hull = hull;
			ship.range = range;
			ship.power = power;
			allShips[id] = ship;
			
			shipsAvailable.push(ship);
			//console.log(ship);
		});
		if (gc.location.match(/com_ship$/)) {
			gc.setValue("a-shipbuilder-shipsAvailable", $.toJSON(shipsAvailable));
		}
		if (gc.location.match(/com_ship.*shiptype/)) {
			//working on a gc.location's copy, not a reference
			var id = (gc.location + '').replace(/.*shiptype=/, '') * 1;
			var ship = allShips[id];
			//console.log(ship);
			if (!ship) {
				ship = {};
			}
			var tables = $("table.table_back table");
			ship.type = $.trim($("td:contains('Class')", tables).next().text());
			ship.build = $.trim($("td:contains('1 turn produces')", tables).next().text().replace(/[^\.\d]/g, '')) * 1;
			ship.weapon = $.trim($("td:contains('Weapon')", tables).next().text().replace(/[^\.\d]/g, '')) * 1;
			ship.damage = {};
			ship.damage.energy = $.trim($("td:contains('Energy Damage')", tables).next().text().replace(/[^\.\d]/g, '')) * 1;
			ship.damage.kinetic = $.trim($("td:contains('Kinetic Damage')", tables).next().text().replace(/[^\.\d]/g, '')) * 1;
			ship.damage.missile = $.trim($("td:contains('Missile Damage')", tables).next().text().replace(/[^\.\d]/g, '')) * 1;
			ship.damage.chemical = $.trim($("td:contains('Chemical Damage')", tables).next().text().replace(/[^\.\d]/g, '')) * 1;
			ship.hull = $.trim($("td:contains('Hull')", tables).next().text().replace(/[^\.\d]/g, '')) * 1;
			ship.range = $.trim($("td:contains('Range')", tables).next().text().replace(/[^\.\d]/g, '')) * 1;
			ship.scanner = $.trim($("td:contains('Scanner rating')", tables).next().text().replace(/[^\.\d]/g, '')) * 1;
			ship.power = $.trim($("td:contains('Power rating')", tables).next().text().replace(/[^\.\d]/g, '')) * 1;
			ship.cost = $.trim($("td:contains('Cost per unit')", tables).next().text().replace(/[^\.\d]/g, '')) * 1;
			ship.upkeep = $.trim($("td:contains('Upkeep')", tables).next().text().replace(/[^\.\d]/g, '')) * 1;
			ship.minerals = {};
			ship.minerals.terranMetal = $.trim($("td:contains('Terran Metal')", tables).next().next().text().replace(/[^\.\d]/g, '')) * 1;
			ship.minerals.redCrystal = $.trim($("td:contains('Red Crystal')", tables).next().next().text().replace(/[^\.\d]/g, '')) * 1;
			ship.minerals.whiteCrystal = $.trim($("td:contains('White Crystal')", tables).next().next().text().replace(/[^\.\d]/g, '')) * 1;
			ship.minerals.rutile = $.trim($("td:contains('Rutile')", tables).next().next().text().replace(/[^\.\d]/g, '')) * 1;
			ship.minerals.composite = $.trim($("td:contains('Composite')", tables).next().next().text().replace(/[^\.\d]/g, '')) * 1;
			ship.minerals.strafezOrganism = $.trim($("td:contains('Strafez Organism')", tables).next().next().text().replace(/[^\.\d]/g, '')) * 1;
			
			allShips[id] = ship;
		}

		gc.setValue("a-allships", $.toJSON(allShips));
		var pageTitle = $("b:contains('BUILDING SHIPS')");
		
		//help on harvesting
		gc.showMessage('Ship data caching', 'For the ship builder to work it requires valid ship data (power rating, build rate, etc.). Some of that can and will be harvested from the <a href="i.cfm?f=com_ship">ship list page</a>. However, if any build rate on this page is incorrect or missing, go to that ship\'s respective build page (e.g. <a href="i.cfm?f=com_ship2&shiptype=10">this page for Small Strafez Fodder</a>). There, that ship\'s data will be harvested and cached, to be used in the ship builder and other mods which require detailed ship data. The ship builder page will have to be refreshed afterward to use the newly cached data. In a later release this process may become automated.', 'a-shipbuilder-help');
		
		//help on usage
		var usageHelpTitle = 'How to use the ship builder';
		var usageHelpMessage = 'Ship builder allows to build many different ships at once, fast. The ship types you can build are listed below. The input fields are where you place amounts, which is reflected by the stack building queue below the ship list. If you have enough turns to build what you selected, you will see a submit button there, too.<br />Please note, that some cells in the ship list change background when you move your mouse over them. Those are shortcuts to add/remove from given stack.<br />Furthermore, that above the ship list there are 10 slots for saving fleet presets - just click to save what is currently in the form, to be pasted later. These presets can be used by other mods to quickly build what you want e.g. from the ranking list.<br/ >Lastly, the stack list below the ship list shows not only the stacks you want to build but also the stacks you have already got (queried remotely from the disband page). If you wish to refresh it, either build something or click the "R" header. It may become inaccurate after a while.';
		gc.showMessage(usageHelpTitle, usageHelpMessage, 'a-shipbuilder-usagehelp');
		pageTitle.text('SHIP BUILDER');
		pageTitle.append('<img src="i/help.gif" title="' + usageHelpTitle + '" />').click(function () {
			if (!$("#a-shipbuilder-usagehelp").length) {
				gc.showMessage(usageHelpTitle, usageHelpMessage);
			}
		});
		
		pageTitle.siblings("b ~ a, b ~ table").remove();
		pageTitle.next().next().after('<table class="a-table" width="95%" id="a-shipbuilder-saves"><tbody><tr class="table_row2"><td id="a-ship-save-a" class="a-shipbuilder-save a-button">&nbsp;</td><td id="a-ship-save-b" class="a-shipbuilder-save a-button">&nbsp;</td><td id="a-ship-save-c" class="a-shipbuilder-save a-button">&nbsp;</td><td id="a-ship-save-d" class="a-shipbuilder-save a-button">&nbsp;</td><td id="a-ship-save-e" class="a-shipbuilder-save a-button">&nbsp;</td><td id="a-ship-save-f" class="a-shipbuilder-save a-button">&nbsp;</td><td id="a-ship-save-g" class="a-shipbuilder-save a-button">&nbsp;</td><td id="a-ship-save-h" class="a-shipbuilder-save a-button">&nbsp;</td><td id="a-ship-save-i" class="a-shipbuilder-save a-button">&nbsp;</td><td id="a-ship-save-j" class="a-shipbuilder-save a-button">&nbsp;</td></tr></tbody></table><br /><br /><table class="a-table" width="95%" id="a-shipbuilder-ships-wrap"><tbody><tr align="center" class="table_row0"><td>Race</td><td width="30%">Name</td><td width="10%">Amount</td><td>Build Rate</td><td>Cost</td><td>Upkeep</td><td>Weapon</td><td>Hull</td><td>Power<br />Rating</td></tr><tr align="center" class="table_row0 a-shipbuilder-actionsrow"><td class="a-revbutton a-shipbuilder-addoneall" title="Click to add one to all build requests">add one</td><td width="30%"></td><td width="10%"></td><td class="a-revbutton a-shipbuilder-addturnall" title="Click to add one turnful to all build requests">add turnful</td><td class="a-revbutton a-shipbuilder-removeturnall" title="Click to remove one to all build requests">remove turnful</td><td></td><td></td><td class="a-revbutton a-shipbuilder-doubleall" title="Click to double all build requests">double</td><td class="a-revbutton a-shipbuilder-clearall" title="Click to clear all build requests">clear</td></tr></tbody></table><br /><br /><table width="95%" class="a-table" id="a-shipbuilder-stacks-wrap"><tbody><tr align="center" class="table_row0"><td width="20%">Name</td><td width="10%">To build</td><td width="10%">In fleet</td><td>Turns</td><td>Cost</td><td>Upkeep</td><td>Weapon</td><td>Hull</td><td>Scanner</td><td>Power<br>Rating</td><td id="a-shipbuilder-refresh-stacks" title="Refresh" class="a-revbutton">R</td></tr></tbody></table><br /><br /><table width="70px" class="a-table" id="a-shipbuilder-submit-wrap" style="display:none;"><tbody><tr align="center" class="table_row1"><td class="a-button"  id="a-shipbuilder-submit" title="Build the stacks above">Submit</td></tr></tbody></table><div id="a-shipbuilder-save-infobox" style="display: none;"><table width="100%"><tbody><tr></tr></tbody></table></div>');
		var shipMarkup = '<tr class="table_row1" id="a-shipbuilder-ship-${id}" sid="${id}"><td class="a-button a-shipbuilder-addone" title="Click to add just one to build request">${race}</td><td align="left"><a href="i.cfm?f=com_ship2&shiptype=${id}" class="">${name}</a></td><td align="center" class="a-shipbuilder-input"><input type="text" style="width: 50px;"/></td><td align="right" class="a-button a-shipbuilder-addturn" title="Click to add a turnful to build request">${build}</td><td align="right" class="a-button a-shipbuilder-removeturn" title="Click to remove a turnful to build request">${cost}</td><td align="right">${upkeep}</td><td align="right">${weapon}</td><td align="right" class="a-button a-shipbuilder-double" title="Click to double build request">${hull}</td><td align="right" class="a-button a-shipbuilder-clear" title="Click to clear build request">${power}</td></tr>';
		$.tmpl(shipMarkup, shipsAvailable).appendTo("#a-shipbuilder-ships-wrap tbody");
		var stacks = [];
		var stackMarkup = '<tr class="table_row1 a-shipbuilder-stack" id="a-shipbuilder-ship-${id}" sid="${id}"><td align="left"><a href="i.cfm?f=com_ship2&shiptype=${id}" class="">${name}</a></td><td align="right">${amount}</td><td align="right">${existing}</td><td align="right">${turns}</td><td align="right">${cost}</td><td align="right">${upkeep}</td><td align="right">${weapon}</td><td align="right">${hull}</td><td align="right">${scanner}</td><td align="right">${power}</td><td align="right" class="a-button a-shipbuilder-disbandall" disbandId="${disband}" disbandAmount="${existing}" title="Click to disband this stack">x</td></tr>';
		var stackTotalsMarkup = '<tr class="table_row0" id="a-shipbuilder-ship-totals"><td align="left">Totals</td><td align="right">${amount}</td><td align="right">&nbsp;</td><td align="right">${turns}</td><td align="right">${cost}</td><td align="right">${upkeep}</td><td align="right">${weapon}</td><td align="right">${hull}</td><td align="right">${scanner}</td><td align="right">${power}</td><td align="right">&nbsp;</td></tr>';
		var totals = {};
		var renderStacks = function () {
				var sortedStacks = jQuery.extend(true, [], stacks);
				sortedStacks.sort(app.util.sortByPowerDesc);
				$("#a-shipbuilder-stacks-wrap tbody tr.table_row1, #a-shipbuilder-ship-totals").remove();
				$.tmpl(stackMarkup, sortedStacks).appendTo("#a-shipbuilder-stacks-wrap tbody");
				//hitch again button on-off - these dom nodes are new to this
				$("#a-shipbuilder-stacks-wrap td.a-button").hover(

				function () {
					$(this).addClass("table_row0").removeClass("table_row1");
				}, function () {
					$(this).removeClass("table_row0").addClass("table_row1");
				});
				//add a disbander event
				$(".a-shipbuilder-disbandall").click(function () {
					gc.xhr({
						url: 'i.cfm?f=com_disband',
						data: 'submitflag=1&' + $(this).attr("disbandId") + '=' + $(this).attr("disbandAmount"),
						onSuccess: refreshExistingFleet
					});
				});
				totals = {};
				for (var i = 0; i < stacks.length; i = i + 1) {
					if (!stacks[i]) {
						continue;
					}
					for (var j in stacks[i]) {
						if (!totals[j]) {
							totals[j] = 0;
						}
						totals[j] += stacks[i][j];
					}
				}
				$.tmpl(stackTotalsMarkup, totals).appendTo("#a-shipbuilder-stacks-wrap tbody");
				if (totals.turns > 0 && totals.turns <= gc.turns.getValue() && totals.cost <= gc.cash.getValue()) {
					$("#a-shipbuilder-submit-wrap").fadeIn('slow');
				} else {
					$("#a-shipbuilder-submit-wrap").fadeOut('fast');
				}
			};
		var changeAmount = function (el, changer) {
				var input = el.siblings(".a-shipbuilder-input").children().first();
				var currentAmount = input.val().replace(/\D/, '', 'g') * 1;
				var amount = changer(currentAmount);
				input.val(amount ? amount : '');
				var sid = el.parent().attr("sid");
				var existing = 0;
				var ship = jQuery.extend(true, {}, allShips[sid]);
				if (stacks[sid] && stacks[sid].existing) {
					ship.existing = stacks[sid].existing;
					ship.disband = stacks[sid].disband;
					existing = stacks[sid].existing * 1;
				}
				if (!(amount + existing)) {
					delete stacks[sid];
				} else {
					stacks[sid] = ship;
					stacks[sid].amount = amount;
					stacks[sid].turns = Math.ceil(amount / ship.build);
					stacks[sid].cost = ship.cost * amount;
					stacks[sid].upkeep = ship.upkeep * (amount + existing);
					stacks[sid].weapon = ship.weapon * (amount + existing);
					stacks[sid].hull = ship.hull * (amount + existing);
					stacks[sid].power = ship.power * (amount + existing);
					stacks[sid].scanner = ship.scanner * (amount + existing);
				}
				renderStacks();
			};
		$(".a-shipbuilder-addone").click(function () {
			changeAmount($(this), function (v) {
				return v + 1;
			});
		});
		$(".a-shipbuilder-addturn").click(function () {
			var el = $(this);
			var sid = el.parent().attr("sid");
			var buildRate = allShips[sid].build;
			changeAmount(el, function (v) {
				return v + buildRate;
			});
		});
		$(".a-shipbuilder-removeturn").click(function () {
			var el = $(this);
			var sid = el.parent().attr("sid");
			var buildRate = allShips[sid].build;
			changeAmount(el, function (v) {
				return Math.max(v - buildRate, 0);
			});
		});
		$(".a-shipbuilder-double").click(function () {
			changeAmount($(this), function (v) {
				return v * 2;
			});
		});
		$(".a-shipbuilder-clear").click(function () {
			changeAmount($(this), function (v) {
				return 0;
			});
		});
		$(".a-shipbuilder-addoneall").click(function () {
			$("td.a-shipbuilder-input input").each(function () {
				var el = $(this).parent().next();
				changeAmount(el, function (v) {
					return v + 1;
				});
			});
		});
		$(".a-shipbuilder-addturnall").click(function () {
			$("td.a-shipbuilder-input input").each(function () {
				var el = $(this).parent().next();
				var sid = el.parent().attr("sid");
				var buildRate = allShips[sid].build;
				changeAmount(el, function (v) {
					return v + buildRate;
				});
			});
		});
		$(".a-shipbuilder-removeturnall").click(function () {
			$("td.a-shipbuilder-input input").each(function () {
				var el = $(this).parent().next();
				var sid = el.parent().attr("sid");
				var buildRate = allShips[sid].build;
				changeAmount(el, function (v) {
					return Math.max(v - buildRate, 0);
				});
			});
		});
		$(".a-shipbuilder-doubleall").click(function () {
			$("td.a-shipbuilder-input input").each(function () {
				var el = $(this).parent().next();
				changeAmount(el, function (v) {
					return v * 2;
				});
			});
		});
		$(".a-shipbuilder-clearall").click(function () {
			$("td.a-shipbuilder-input input").each(function () {
				var el = $(this).parent().next();
				changeAmount(el, function (v) {
					return 0;
				});
			});
		});
		$("td.a-shipbuilder-input input").change(function () {
			var el = $(this).parent().next();
			changeAmount(el, function (v) {
				return v;
			});
		});
		$(".a-shipbuilder-save").each(function () {
			var id = $(this).attr('id');
			var label = gc.getValue(id + "-name");
			if (label) {
				$(this).text(label);
			}
		});
		$(".a-shipbuilder-save").dblclick(function () {
			var id = $(this).attr('id');
			var value = gc.getValue(id + "-value");
			if (value && value !== '[]') {
				gc.setValue(id + "-value", '');
				gc.setValue(id + "-name", '');
				$(this).html('&nbsp;');
			}
		});
		$(".a-shipbuilder-save").click(function () {
			var i;
			var id = $(this).attr('id');
			var save = [];
			var saveJson = gc.getValue(id + "-value");
			if (saveJson && saveJson !== '[]') {
				save = $.secureEvalJSON(saveJson);
				if (!save) {
					save = [];
				}
				for (i = 0; i < save.length; i = i + 1) {
					var el = $("#a-shipbuilder-ship-" + save[i].id + " td.a-shipbuilder-input").next();
					changeAmount(el, function (v) {
						return save[i].amount;
					});
				}
			} else {
				for (i = 0; i < stacks.length; i = i + 1) {
					if (stacks[i] && stacks[i].amount) {
						save.push({
							id: i,
							amount: stacks[i].amount
						});
					}
				}
				if (!save.length) {
					return;
				}
				var label = prompt("Enter a label for this stack preset, 10 characters at most, preferably 7");
				if (label) {
					gc.setValue(id + "-value", $.toJSON(save));
					label = label.substring(0, 10);
					gc.setValue(id + "-name", label);
					$(this).text(label);
					console.log('[Ship builder] A preset ' + label + ' was created.');
				}
			}
		});
		$(".a-shipbuilder-save").hover(

		function (e) {
			var id = $(this).attr('id');
			var value = gc.getValue(id + "-value");
			if (value && value !== '[]') {
				$(this).text('paste');
				var saveJson = gc.getValue(id + "-value");
				var save = $.secureEvalJSON(saveJson);
				if (!save) {
					save = [];
				}
				var savedStacks = [];
				for (var i = 0; i < save.length; i = i + 1) {
					var stack = jQuery.extend(true, {}, allShips[save[i].id]);
					stack.amount = save[i].amount;
					stack.turns = Math.ceil(save[i].amount / stack.build);
					savedStacks.push(stack);
				}
				savedStacks.sort(app.util.sortByPowerDesc);
				var saveMarkup = '<tr class="a-shipbuilder-save-body""><td align="left"  width="70%">${name}</td><td align="right" width="10%">${amount}</td><td align="right" width="10%">${turns}</td><td align="right" width="10%">${power}</td></tr>';
				$("#a-shipbuilder-save-infobox").attr("style", 'display: block; top: ' + (e.clientY + 15) + 'px; left: ' + $(this).position().left + 5 + 'px;');
				$.tmpl(saveMarkup, savedStacks).appendTo("#a-shipbuilder-save-infobox tbody");
			} else if (totals.power > 0) {
				$(this).text('save');
			}
		}, function () {
			var id = $(this).attr('id');
			var value = gc.getValue(id + "-value");
			if (value && value !== '[]') {
				var label = gc.getValue(id + "-name");
				$(this).text(label);
				$("#a-shipbuilder-save-infobox tr").remove();
				$("#a-shipbuilder-save-infobox").hide();
			} else {
				$(this).html('&nbsp;');
			}
		});
/**
			//unlock
		
			gc.xhr({
				method: 'GET',
				url: 'i.cfm?&popup=attackmsg&c=1',
				onSuccess: function (response) {
					unsafeWindow.console.log(response);
				},
				onFailure: function (response) {
					unsafeWindow.console.error(response);
				}
			});

		*/
		$("#a-shipbuilder-submit-wrap").click(function () {
			var el = $(this);
			for (var i = 0; i < stacks.length; i = i + 1) {
				if (stacks[i] && stacks[i].amount && stacks[i].id) {
					gc.xhr({
						extra: stacks[i],
						url: 'i.cfm?&f=com_ship2&shiptype=' + stacks[i].id,
						data: 'amount=' + stacks[i].amount,
						successCondition: "td:contains('You bought ')",
						onSuccess: function (response) {
							//unsafeWindow.console.log(response);
							var msg = $("td:contains('You bought ')", response).contents().filter(function () {
								return this.nodeType === 3 && this.textContent.match('You bought');
							});
							console.log('[Ship builder] ' + msg.text());
							gc.turns.subtract(this.extra.turns);
							gc.cash.subtract(this.extra.cost);
						},
						onFailure: function (response) {
							//unsafeWindow.console.error(response);
							var name = $("b:contains('SHIPS')", response).text();
							var msg = $("font[color='red'] > b", response).text();
							//unsafeWindow.console.log($("font > b",response));
							console.error('[Ship builder] ' + name + ': ' + msg);
						}
					});
				}
			}
			//clear all values
			$("td.a-shipbuilder-input input").each(function () {
				var el = $(this).parent().next();
				changeAmount(el, function (v) {
					return 0;
				});
			});
			el.fadeOut('fast');
			setTimeout(function () {
				el.fadeIn('slow');
				refreshExistingFleet();
			}, 2000);
		});
		
		var refreshExistingFleet = function () {
			gc.xhr({
				//extra: stacks,
				url: 'i.cfm?f=com_disband',
				method: 'GET',
				onSuccess: function (response) {
					var i;
					//clear archaiv data
					for (i = 0; i < stacks.length; i = i + 1) {
						if (stacks[i]) {
							stacks[i].existing = 0;
						}
					}
					//var stacks = this.extra;
					//unsafeWindow.console.log($("input[name^='dis']",response));
					$("input[name^='dis']", response).each(function () {
						var el = $(this);
						var disband = el.attr("name");
						var name = $.trim(el.parent().prev().prev().text());
						var existing = el.parent().next().text().replace(/[^\.\d]/g, '');
						var id = 0;
						for (i = 0; i < allShips.length; i = i + 1) {
							if (allShips[i] && allShips[i].name === name) {
								id = i;
								break;
							}
						}
						//a ship as its taken from cache
						var ship = jQuery.extend(true, {}, allShips[id]);
						var amount = 0;
						//if stack exists in builds and isn't a historical entry, add existing and recalculate values
						if (stacks[id] && stacks[id].amount) {
							amount = stacks[id].amount;
						}
						//otherwise stack is new and we have to create it
						else {
							stacks[id] = jQuery.extend(true, {}, allShips[id]);
						}
						//either way we paint stack with new data
						stacks[id].existing = existing;
						stacks[id].disband = disband;
						//and multiply relevant values by amount
						stacks[id].turns = Math.ceil(amount / ship.build);
						stacks[id].cost = ship.cost * amount;
						stacks[id].upkeep = ship.upkeep * (amount + existing);
						stacks[id].weapon = ship.weapon * (amount + existing);
						stacks[id].hull = ship.hull * (amount + existing);
						stacks[id].power = ship.power * (amount + existing);
						stacks[id].scanner = ship.scanner * (amount + existing);
					});
					//delete disbanded stacks
					for (i = 0; i < stacks.length; i = i + 1) {
						if (stacks[i] && (!stacks[i].amount && !stacks[i].existing)) {
							delete stacks[i];
						}
					}
					renderStacks();
				}
			});
		};
		//after init get data from the disband page
		refreshExistingFleet();
		$("#a-shipbuilder-refresh-stacks").click(refreshExistingFleet);
	}
};
