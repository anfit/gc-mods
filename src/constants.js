/*!
 * Anfit's GC Mods
 * (c) %DATE.YEAR% Jan 'anfit' Chimiak
 * http://gc.mmanir.net/
 * 
 * This document is licensed as free software under the terms of the 
 * Creative Commons Attribution + Noncommercial 3.0 Unported (CC BY-NC 3.0). 
 * If you want to use this in an commercial product, contact the author.
 */
var app = {};
app.version = '%VERSION%';
app.releaseNotes = '(%DATE.DAY%): %RELEASE%';
app.gameServer = 'http://gc.gamestotal.com/';
app.modsServer = 'http://gc.mmanir.net/';
app.servers = [{
	id: 0,
	name: 'Normal',
	turnRate: 900000,
	turnHold: 180
}, {
	id: 1,
	name: 'Fast',
	turnRate: 300000,
	turnHold: 150
}, {
	id: 2,
	name: 'Slow',
	turnRate: 1800000,
	turnHold: 250
}, {
	id: 3,
	name: 'Ultra',
	turnRate: 120000,
	turnHold: 100
}, {
	id: 4,
	name: 'RT',
	turnRate: 7800,
	turnHold: 30
}, {
	id: 5,
	name: 'DM',
	turnRate: 3000,
	turnHold: 120
}];
/**
 * mods namespace
 */
app.mod = {};