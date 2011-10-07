/**
 * automated capsule labs
 */
app.mod.automatedcapsulelab = {
	id: 'a-automatedcapsulelab',
	defaultValue: true,
	title: 'Automated capsule lab',
	description: 'Shows a list of fusable artifacts (incl. your stocks). Clicking on the list fills the fusion form...',
	items: [{
		type: 'checkbox',
		id: 'a-automatedcapsulelab-showall',
		description: 'Show all artifacts, not only those you can fuse'
	}],
	/**
	 * Returns true only when this mod can be launched
	 */
	filter: function () {
		if (!gc.getValue('a-automatedcapsulelab')) {
			return false;
		}
		if (gc.location.match(/i.cfm.*f.com_project2.id.3$/) && $("select").length) {
			return true;
		}
		if (gc.location.match(/com_market_use/)) {
			return true;
		}
		return false;
	},
	/**
	 * Mod's body function
	 */
	plugin: function () {
		//artifacts page 
		if (gc.location.match(/com_market_use$/)) { //artifact main page: ARTIFACT COUNTER (a part of Capsule Lab)
			(function () {
				var stocks = [];
				$("table.table_back[width='50%'] tr.table_row1").each(function () {
					stocks.push({
						id: $("td a:first", this).attr("href").replace(/.*id=/, '').replace(/\D/, '', 'g') * 1,
						stock: $.trim($("td:eq(2)", this).text()) * 1
					});
				});
				gc.setValue('a-automatedcapsulelab-stocks', JSON.stringify(stocks));
			})();
			return;
		}
		//an artifact page
		else if (gc.location.match(/com_market_use.*id=/)) { //artifact main page: ARTIFACT COUNTER (a part of Capsule Lab)
			(function () {
				var row = $("table.table_back[width='50%'] tr.table_row1:first");
				var id = $("td a:first", row).attr("href").replace(/.*id=/, '').replace(/\D/, '', 'g') * 1;
				var stock = $("td:eq(2)", row).text().replace(/\D/, '', 'g') * 1;
				//get current
				var stocksJson = gc.getValue('a-automatedcapsulelab-stocks');
				var stocks;
				if (stocksJson) {
					stocks = $.parseJSON(stocksJson);
					if (!stocks) {
						stocks = [];
					}
				}
				//remove old, if it exists
				for (var i = 0; i < stocks.length; i = i + 1) {
					if (stocks[i].id === id) {
						console.log(stocks[i]);
						stocks.splice(i, 1);
						break;
					}
				}
				//add current
				stocks.unshift({
					id: id,
					stock: stock
				});
				gc.setValue('a-automatedcapsulelab-stocks', JSON.stringify(stocks));
			})();
			return;
		}
		
		//FIXME move artifacts definition to a global object defining game variables
		if (!gc.getValue('a-automatedcapsulelab-definitions')) {
			gc.setValue('a-automatedcapsulelab-definitions', '{"items":[{"id":10,"type":"Common","name":"Energy Pod","effect":"Used to fuse other artifacts","ingredients":[]},{"id":13,"type":"Common","name":"White Orb","effect":"Used to fuse other artifacts","ingredients":[]},{"id":14,"type":"Common","name":"Black Orb","effect":"Used to fuse other artifacts","ingredients":[]},{"id":15,"type":"Common","name":"Blue Orb","effect":"Used to fuse other artifacts","ingredients":[]},{"id":16,"type":"Common","name":"Green Orb","effect":"Used to fuse other artifacts","ingredients":[]},{"id":17,"type":"Common","name":"Orange Orb","effect":"Used to fuse other artifacts","ingredients":[]},{"id":18,"type":"Common","name":"Yellow Orb","effect":"Used to fuse other artifacts","ingredients":[]},{"id":19,"type":"Common","name":"Purple Orb","effect":"Used to fuse other artifacts","ingredients":[]},{"id":20,"type":"Common","name":"Gray Orb","effect":"Used to fuse other artifacts","ingredients":[]},{"id":21,"type":"Common","name":"Brown Orb","effect":"Used to fuse other artifacts","ingredients":[]},{"id":22,"type":"Common","name":"Moccasin Orb","effect":"Used to fuse other artifacts","ingredients":[]},{"id":23,"type":"Common","name":"Golden Orb","effect":"Used to fuse other artifacts","ingredients":[]},{"id":24,"type":"Common","name":"Turquoise Orb","effect":"Used to fuse other artifacts","ingredients":[]},{"id":25,"type":"Common","name":"Aqua Orb","effect":"Used to fuse other artifacts","ingredients":[]},{"id":26,"type":"Common","name":"Pink Orb","effect":"Used to fuse other artifacts","ingredients":[]},{"id":27,"type":"Common","name":"Plum Orb","effect":"Used to fuse other artifacts","ingredients":[]},{"id":7,"type":"Special","name":"Organic Base","effect":"Used to fuse other artifacts","ingredients":[]},{"id":8,"type":"Special","name":"Assimillated Base","effect":"Used to fuse other artifacts","ingredients":[]},{"id":28,"type":"Uncommon","name":"Cuarto Mapa","effect":"Gives Artifact Formulas","ingredients":[{"id":13,"amount":1},{"id":14,"amount":1},{"id":15,"amount":1},{"id":16,"amount":1},{"id":17,"amount":1}]},{"id":29,"type":"Uncommon","name":"Bronze Dinero","effect":"Target empire credits increase a small amount","ingredients":[{"id":14,"amount":1},{"id":17,"amount":1},{"id":16,"amount":1},{"id":15,"amount":1},{"id":18,"amount":1}]},{"id":30,"type":"Uncommon","name":"Silver Dinero","effect":"Target empire credits increase a small amount","ingredients":[{"id":18,"amount":1},{"id":13,"amount":1},{"id":20,"amount":1},{"id":19,"amount":1},{"id":26,"amount":1}]},{"id":31,"type":"Uncommon","name":"Gold Dinero","effect":"Target empire credits increase a small amount","ingredients":[{"id":20,"amount":1},{"id":26,"amount":1},{"id":25,"amount":1},{"id":24,"amount":1},{"id":27,"amount":1}]},{"id":32,"type":"Uncommon","name":"Platinum Dinero","effect":"Target empire credits increase a small amount","ingredients":[{"id":25,"amount":2},{"id":27,"amount":1},{"id":26,"amount":2},{"id":26,"amount":2},{"id":25,"amount":2}]},{"id":33,"type":"Uncommon","name":"Amber Dinero","effect":"Target empire credits decrease a small amount","ingredients":[{"id":18,"amount":2},{"id":21,"amount":1},{"id":19,"amount":1},{"id":20,"amount":1},{"id":18,"amount":2}]},{"id":34,"type":"Uncommon","name":"Garnet Dinero","effect":"Target empire credits decrease a small amount","ingredients":[{"id":16,"amount":1},{"id":22,"amount":2},{"id":24,"amount":1},{"id":23,"amount":1},{"id":22,"amount":2}]},{"id":35,"type":"Uncommon","name":"Topaz Dinero","effect":"Target empire credits decrease a small amount","ingredients":[{"id":15,"amount":1},{"id":23,"amount":1},{"id":17,"amount":1},{"id":24,"amount":1},{"id":26,"amount":1}]},{"id":36,"type":"Uncommon","name":"Opal Dinero","effect":"Target empire credits decrease a small amount","ingredients":[{"id":10,"amount":2},{"id":18,"amount":1},{"id":25,"amount":1},{"id":15,"amount":1},{"id":10,"amount":2}]},{"id":37,"type":"Uncommon","name":"Amethyst Dinero","effect":"Target empire credits decrease a small amount","ingredients":[{"id":10,"amount":1},{"id":23,"amount":1},{"id":17,"amount":1},{"id":16,"amount":1},{"id":21,"amount":1}]},{"id":11,"type":"Unique","name":"STC","effect":"Target empire receives 10 turns","ingredients":[{"id":46,"amount":1},{"id":47,"amount":1},{"id":44,"amount":1},{"id":45,"amount":1},{"id":43,"amount":1}]},{"id":38,"type":"Rare","name":"Minor Suerte","effect":"Gives Luck","ingredients":[{"id":28,"amount":1},{"id":7,"amount":1},{"id":30,"amount":1},{"id":29,"amount":1},{"id":31,"amount":1}]},{"id":39,"type":"Rare","name":"Major Suerte","effect":"Gives Luck","ingredients":[{"id":8,"amount":1},{"id":30,"amount":1},{"id":29,"amount":1},{"id":31,"amount":1},{"id":32,"amount":1}]},{"id":40,"type":"Rare","name":"Minor Requerido","effect":"Target empire raw material decreases","ingredients":[{"id":30,"amount":1},{"id":7,"amount":1},{"id":31,"amount":1},{"id":32,"amount":1},{"id":33,"amount":1}]},{"id":41,"type":"Rare","name":"Minor Gente","effect":"Target empire population decreases(Doesnt work)","ingredients":[{"id":34,"amount":1},{"id":32,"amount":2},{"id":32,"amount":2},{"id":31,"amount":1},{"id":8,"amount":1}]},{"id":42,"type":"Rare","name":"Minor Alimento","effect":"Target empire food decreases","ingredients":[{"id":36,"amount":1},{"id":34,"amount":1},{"id":35,"amount":1},{"id":33,"amount":1},{"id":32,"amount":1}]},{"id":43,"type":"Rare","name":"Minor Cosecha","effect":"Target empire population decreases","ingredients":[{"id":33,"amount":1},{"id":34,"amount":1},{"id":35,"amount":1},{"id":36,"amount":1},{"id":37,"amount":1}]},{"id":44,"type":"Rare","name":"Minor Tierra","effect":"Target empire Ore decreases","ingredients":[{"id":31,"amount":1},{"id":30,"amount":3},{"id":28,"amount":1},{"id":30,"amount":3},{"id":30,"amount":3}]},{"id":45,"type":"Rare","name":"Traicione","effect":"Target empire loyalty decreases","ingredients":[{"id":36,"amount":1},{"id":33,"amount":2},{"id":29,"amount":1},{"id":28,"amount":1},{"id":33,"amount":2}]},{"id":12,"type":"Unique","name":"BTC","effect":"Gives 100 Turns(up to max any over are wasted)","ingredients":[{"id":11,"amount":2},{"id":58,"amount":1},{"id":59,"amount":1},{"id":11,"amount":2},{"id":57,"amount":1}]},{"id":46,"type":"Unique","name":"Minor Gordo","effect":"Increases max land on top planet +20-40 land (not homeworld)","ingredients":[{"id":43,"amount":2},{"id":43,"amount":2},{"id":44,"amount":1},{"id":42,"amount":1},{"id":41,"amount":1}]},{"id":47,"type":"Rare","name":"Minor Barrera","effect":"Prevents artifacts of any type to be used on Empire. Breakable with 5 rares","ingredients":[{"id":28,"amount":2},{"id":36,"amount":2},{"id":28,"amount":2},{"id":36,"amount":2},{"id":30,"amount":1}]},{"id":48,"type":"Unique","name":"Historia","effect":"Target empire loses 40 turns","ingredients":[{"id":38,"amount":1},{"id":11,"amount":1},{"id":40,"amount":1},{"id":39,"amount":1},{"id":43,"amount":1}]},{"id":49,"type":"Unique","name":"Minor Afortunado","effect":"Gives Luck","ingredients":[{"id":40,"amount":1},{"id":39,"amount":1},{"id":38,"amount":2},{"id":41,"amount":1},{"id":38,"amount":2}]},{"id":50,"type":"Unique","name":"Major Afortunado","effect":"Gives Luck","ingredients":[{"id":39,"amount":1},{"id":40,"amount":1},{"id":41,"amount":2},{"id":42,"amount":1},{"id":41,"amount":2}]},{"id":51,"type":"Unique","name":"Minor Estructura","effect":"Destroys infrastructure on outermost planet of target empire","ingredients":[{"id":41,"amount":1},{"id":40,"amount":1},{"id":11,"amount":1},{"id":43,"amount":1},{"id":42,"amount":1}]},{"id":52,"type":"Unique","name":"Major Alimento","effect":"You don\'t notice any effect","ingredients":[{"id":47,"amount":2},{"id":46,"amount":3},{"id":47,"amount":2},{"id":46,"amount":3},{"id":46,"amount":3}]},{"id":53,"type":"Unique","name":"Major Cosecha","effect":"You don\'t notice any effect","ingredients":[{"id":46,"amount":2},{"id":45,"amount":3},{"id":45,"amount":3},{"id":46,"amount":2},{"id":45,"amount":3}]},{"id":54,"type":"Unique","name":"Major Tierra","effect":"You don\'t notice any effect","ingredients":[{"id":43,"amount":2},{"id":44,"amount":3},{"id":44,"amount":3},{"id":43,"amount":2},{"id":44,"amount":3}]},{"id":55,"type":"Unique","name":"Persiana","effect":"Attacks against empire are halted for a time. Generally 2-3 attack attempts","ingredients":[{"id":40,"amount":1},{"id":11,"amount":2},{"id":41,"amount":1},{"id":11,"amount":2},{"id":42,"amount":1}]},{"id":56,"type":"Special","name":"Major Gordo","effect":"Adds 60-100 land on outermost planets. Does not work on homeworld","ingredients":[{"id":58,"amount":1},{"id":55,"amount":1},{"id":46,"amount":1},{"id":50,"amount":1},{"id":12,"amount":1}]},{"id":57,"type":"Unique","name":"Major Barrera","effect":"Prevents artifacts of any kind being used on target empire. Breakable with 20 rare artifacts","ingredients":[{"id":40,"amount":1},{"id":41,"amount":1},{"id":42,"amount":1}]},{"id":58,"type":"Unique","name":"Regalo","effect":"Gives Random number of a Random Artifacts, excluding other Regalos. Works best during Rare dig and after luck artifacts","ingredients":[{"id":46,"amount":1},{"id":34,"amount":1},{"id":45,"amount":1},{"id":42,"amount":1},{"id":43,"amount":1}]},{"id":59,"type":"Unique","name":"Major Producto","effect":"Decreases Consumer Goods of Target Empire (Roughly 500k)","ingredients":[{"id":43,"amount":1},{"id":44,"amount":1},{"id":45,"amount":1},{"id":41,"amount":1},{"id":42,"amount":1}]},{"id":60,"type":"Unique","name":"Major Dinero","effect":"Decreases target empire credits 3%","ingredients":[{"id":42,"amount":1},{"id":43,"amount":1},{"id":44,"amount":1},{"id":33,"amount":1},{"id":40,"amount":1}]},{"id":61,"type":"Special","name":"Grand Estructura","effect":"Destroys infrastructure on outermost planet","ingredients":[{"id":46,"amount":1},{"id":51,"amount":1},{"id":48,"amount":1},{"id":49,"amount":1},{"id":52,"amount":1}]},{"id":62,"type":"Special","name":"Grand Alimenter","effect":"Target Empire food Increases","ingredients":[{"id":50,"amount":1},{"id":49,"amount":1},{"id":51,"amount":1},{"id":53,"amount":1},{"id":52,"amount":1}]},{"id":63,"type":"Special","name":"Grand Cosecha","effect":"Target Empire food increases","ingredients":[{"id":50,"amount":1},{"id":52,"amount":1},{"id":51,"amount":1},{"id":54,"amount":1},{"id":53,"amount":1}]},{"id":64,"type":"Special","name":"Grand Gente","effect":"Target Empire population decreases","ingredients":[{"id":53,"amount":1},{"id":12,"amount":1},{"id":54,"amount":1},{"id":11,"amount":1},{"id":50,"amount":1}]},{"id":65,"type":"Special","name":"Grand Tierra","effect":"Target Empire Ore decreases 25%","ingredients":[{"id":52,"amount":1},{"id":54,"amount":1},{"id":53,"amount":1},{"id":55,"amount":1},{"id":56,"amount":1}]},{"id":66,"type":"Special","name":"Grand Requerido","effect":"Target Empire raw material decreases approx 3%","ingredients":[{"id":56,"amount":1},{"id":55,"amount":1},{"id":54,"amount":1},{"id":53,"amount":1},{"id":57,"amount":1}]},{"id":67,"type":"Special","name":"Grand Barrera","effect":"Prevents artifacts of any kind being used on target empire","ingredients":[{"id":55,"amount":1},{"id":54,"amount":1},{"id":57,"amount":1},{"id":56,"amount":1},{"id":58,"amount":1}]},{"id":68,"type":"Special","name":"Grand Producto","effect":"Target Empires consumer goods decrease","ingredients":[{"id":58,"amount":2},{"id":52,"amount":2},{"id":42,"amount":1},{"id":58,"amount":2},{"id":52,"amount":2}]},{"id":69,"type":"Special","name":"Grand Alimento","effect":"Target Empire food decreases","ingredients":[{"id":56,"amount":1},{"id":48,"amount":1},{"id":57,"amount":1},{"id":59,"amount":1},{"id":58,"amount":1}]},{"id":70,"type":"Special","name":"Grand Dinero","effect":"Target empire credits decrease 10%","ingredients":[{"id":53,"amount":1},{"id":52,"amount":1},{"id":51,"amount":1},{"id":40,"amount":1},{"id":55,"amount":1}]},{"id":9,"type":"Special","name":"PCC","effect":"Random planet assigned to border","ingredients":[{"id":29,"amount":1},{"id":62,"amount":1},{"id":64,"amount":1},{"id":63,"amount":1},{"id":65,"amount":1}]}]}');
		}
		
		//warning for new empires about unresearched capsule lab
		gc.showMessage('Unresearched capsule lab warning', 'Please note, that if you entered this page from a link in the extra menu of Anfit\'s GC mods, but had not researched Capsule Lab, then investing turns here will not gain you anything...', 'a-automatedcapsulelab-warning');
		
		/**
		 * Ingredient, used to create artifact
		 * 
		 * @param {Object} config Named arguments map
		 * @param {number} config.id Identifier of an ingredient
		 * @param {number} config.amount Amount in which the ingredient is required
		 * 
		 * @constructor
		 */
		var Ingredient = function (config) {
			/**
			 * Identifier of an ingredient
			 * @type {number} 
			 */
			this.id = config.id;
			
			/**
			 * Amount in which the ingredient is required
			 * @type {number}
			 */
			this.amount = config.amount;
		};
		
		/**
		 * @returns {boolean} Whether all necessary properties are set
		 */
		Ingredient.prototype.validate = function () {
			if (this.id === undefined) {
				return false;
			}
			if (this.amount === undefined) {
				return false;
			}
			return true;
		};
	
		/**
		 * Artifact
		 * 
		 * @param {Object} config Named arguments map
		 * @param {number} config.id Identifier of an artifact
		 * @param {string} config.name Name of an artifact
		 * @param {string} config.type Type of an artifact
		 * @param {string=} config.effect Description of an artifact's effect
		 * @param {number=} config.stock How many of an artifact there are in stock
		 * @param {Array.<Ingredient>=} config.ingredients Artifact ingredients
		 * 
		 * @constructor
		 */
		var Artifact = function (config) {
			/**
			 * Identifier of an artifact
			 * @type {number}
			 */
			this.id = config.id;
			
			/**
			 * Name of an artifact
			 * @type {string}
			 */
			this.name = config.name;
			
			/**
			 * Type of an artifact
			 * @type {string}
			 */
			this.type = config.type;
			
			/**
			 * How many of an artifact there are in stock
			 * @type {number}
			 */
			this.stock = config.stock;
			
			/**
			 * Description of an artifact's effect
			 * @type {string}
			 */
			this.effect = config.effect;
			
			/**
			 * Artifact ingredients
			 * @type {Array.<Ingredient>} 
			 */
			this.ingredients = [];
			
			if (config.ingredients !== undefined) {
				for (var i = 0; i < config.ingredients.length; i = i + 1) {
					var ingredient = new Ingredient(config.ingredients[i]);
					if (ingredient.validate() === true) {
						this.ingredients.push(ingredient);
					}
					else {
						console.error("An erroneous ingredient spotted in artifact " + this.id);
					}
				}
			}
		};
		
		/**
		 * @returns {boolean} Whether all necessary properties are set
		 */
		Artifact.prototype.validate = function () {
			if (this.id === undefined) {
				return false;
			}
			if (this.name === undefined) {
				return false;
			}
			if (this.type === undefined) {
				return false;
			}
			return true;
		};
		
		/**
		 * A list of artifacts
		 * 
		 * @param {string} jsonString Stringified json with artifacts
		 * 
		 * @constructor
		 */
		var ArtifactList = function (jsonString) {
			/**
			 * Artifacts
			 * @type {Array.<Artifact>} 
			 */
			this.items = [];
			
			/**
			 * A artifactId, array key map which maps outside worlds' artifact ids to keys in this list 
			 * @type {Object.<string, number>} 
			 */
			this.keys = {};
			
			/**
			 * A artifactId, array key map which maps outside worlds' outputted' artifact ids to keys in this list 
			 * @type {Object.<string, Array.<number>>} 
			 */
			this.results = {};
			
			var json = $.parseJSON(jsonString);
			
			//FIXME remove the a_ prefixes and see what breaks
			
			//go through the json to create elements of the artifact list object
			var key = 0;
			if (json.items !== undefined) {
				for (var i = 0; i < json.items.length; i = i + 1) {
					var artifact = new Artifact(json.items[i]);
					if (artifact.validate() === true) {
						this.items.push(artifact);
						this.keys['a_' + artifact.id] = key;
						for (var j = 0; j < artifact.ingredients.length; j = j + 1) {
							var resultKeys = this.results['a_' + artifact.ingredients[j].id];
							if (resultKeys === undefined) {
								this.results['a_' + artifact.ingredients[j].id] = [];
							}
							this.results['a_' + artifact.ingredients[j].id].push(key);
						}
						key = key + 1;
					}					
					else {
						console.error("An erroneous artifact spotted in artifactlist argument at " + i);
					}
				}
			}
		};

		/**
		 * Get an artifact from the artifact list by id
		 * 
		 * @param {number} id
		 * @returns {Artifact|undefined}
		 */
		ArtifactList.prototype.get = function (id) {
			var key = this.keys['a_' + id];
			if (key === undefined) {
				return undefined;
			}
			return this.items[key];
		};
		
		/**
		 * Get an array of result artifacts from artifact list
		 * 
		 * @param {number} id
		 * @returns {Array.<Artifact>}
		 */
		ArtifactList.prototype.getResults = function (id) {
			var results = this.results['a_' + id];
			if (results === undefined) {
				return undefined;
			}
			var resultArtifacts = [];
			for (var i = 0; i < results.length; i = i + 1) {
				var key = results[i];
				var artifact = this.items[key];
				if (artifact) {
					resultArtifacts.push(artifact);
				}
			}
			return resultArtifacts;
		};
		
		/**
		 * Change the values of stocks and fusable after an artifact has been fused
		 * 
		 * @param {Artifact} artifact
		 */
		ArtifactList.prototype.onAfterSuccessfulFuse = function (artifact) {
			//check if necessary ingredients are in stock
			for (var i = 0; i < this.items.length; i = i + 1) {
				//FIXME remove null stock handling
				//ignore null stock
				if (this.items[i].id === 0) {
					continue;
				}
				//add new artie
				if (this.items[i].id === artifact.id) {
					this.items[i].stock = this.items[i].stock + 1;
				}
				//remove ingredients
				for (var j = 0; j < artifact.ingredients.length; j = j + 1) {
					if (this.items[i].id === artifact.ingredients[j].id) {
						this.items[i].stock = this.items[i].stock - artifact.ingredients[j].amount;
						break;
					}
				}
			}
			//recalculate stocks and fusables
			this.resetFusable();
		};
		
		/**
		 * Create a json string representation
		 * 
		 * @returns {string} a json string
		 */
		ArtifactList.prototype.stringify = function () {
			var keys = this.keys;
			var results = this.results;
			delete this.keys;
			delete this.results;
			var string = JSON.stringify(this);
			this.keys = keys;
			this.results = results;
			return string;
		};
		
		/**
		 * Forces artifact stock to this value
		 * 
		 * @param {number} id
		 * @param {number} stock
		 */
		ArtifactList.prototype.setStock = function (id, stock) {
			if (id === 0) {
				console.debug("ArtifactList.setStock: Zero artifact is not allowed");
				return;
			}
			var artifact = this.get(id);
			if (artifact) {
				artifact.stock = stock;
			} else {
				console.debug("ArtifactList.setStock: No such artifact: " + id, this.items);
				return;
			}
		};
		
		/**
		 * Recalculate stocks and fusables
		 */
		ArtifactList.prototype.resetFusable = function () {
			var i;
			//delete old values
			for (i = 0; i < this.items.length; i = i + 1) {
				delete this.items[i].fusable;
			}
			//for each artifact
			for (i = 0; i < this.items.length; i = i + 1) {
				var artifact = this.items[i];
				//ignore if it has no id
				if (artifact.id === 0) {
					continue;
				}
				var results = this.getResults(artifact.id);
				if (results !== undefined) {
					for (var j = 0; j < results.length; j = j + 1) {
						var fusable = Math.floor(artifact.stock / app.util.countInArray(results[j], results));
						if (!fusable) {
							fusable = 0;
						}
						var existingFusable = results[j].fusable;
						if (existingFusable === undefined) {
							results[j].fusable = fusable;
						} else {
							results[j].fusable = Math.min(fusable, existingFusable);
						}
					}
				}
			}
		};
		
		
		var artifactList;
		var leftPanelWrap;
		var leftPanelBody;
		var rightPanelBody;
		var i;
		/**
		 *
		 */
		var fillForm = function (artifactId) {
			var artifact = artifactList.get(artifactId),
				ingredients = [];
			//zero form
			$('select[name^="g"]').val(0);
			//prepare ingredients table
			$("#a-automatedcapsulelab-ingredients-body").show();
			$("#a-automatedcapsulelab-ingredients-body tr:gt(0)").remove();
			//stateful
			gc.setValue('a-automatedcapsulelab-last', artifactId);
			//add submit info
			$("input[type='submit']:first").val('Fuse ' + artifact.name);
			//fill form, prepare ingredients
			for (var i = 0; i < artifact.ingredients.length; i = i + 1) {
				var ingredient = artifactList.get(artifact.ingredients[i].id);
				ingredients.push(ingredient);
				$('select[name="g' + (i + 1) + '"]').val(ingredient.id);
			}
			//add ingredients
			var markup = '<tr class="table_row1"><td>${name}</td><td width="1%" align="center"><small>${type}</small></td><td align="right">${stock}</td><td align="right">${fusable}</td></tr>';
			$.tmpl(markup, ingredients).appendTo("#a-automatedcapsulelab-ingredients-body");
			//show effect
			$("#a-artifact-effect").html(artifact.effect);
		};
		//var artifactData = gc.getValue('artifacts.xml');
		var stocksJson = gc.getValue('a-automatedcapsulelab-stocks');
		if (!stocksJson) { //brand new world, let's get some data first...
			console.log("[Automated capsule lab] Artifacts stock is not cached. Re-caching. Please wait until the page reloads.");
			//get stocks with an xhr call from the artifacts page
			gc.xhr({
				url: 'i.cfm?f=com_market_use',
				method: 'GET',
				successCondition: "b:contains('ARTIFACTS')",
				onSuccess: function (response) {
					var stocks = [];
					$("table.table_back[width='50%'] tr.table_row1", response).each(function () {
						stocks.push({
							id: $("td a:first", this).attr("href").replace(/.*id=/, '').replace(/\D/, '', 'g') * 1,
							stock: $("td:eq(2)", this).text().replace(/\D/, '', 'g') * 1
						});
					});
					gc.setValue('a-automatedcapsulelab-stocks', JSON.stringify(stocks));
					document.location.href = app.gameServer + 'i.cfm?f=com_project2&id=3';
				},
				onFailure: function (response) {
					console.error("[Automated capsule lab] Failed to re-cache artifacts stocks with a background xhr.");
				}
			});
			return;
		}
		var stocks;
		if (stocksJson) {
			stocks = $.parseJSON(stocksJson);
			if (!stocks) {
				stocks = [];
			}
		}
		
		artifactList = new ArtifactList(gc.getValue('a-automatedcapsulelab-definitions'));
		for (i = 0; i < stocks.length; i = i + 1) {
			artifactList.setStock(stocks[i].id, stocks[i].stock);
		}
		artifactList.resetFusable();
		//on fusing history exists
		var previousArtifactId = gc.getValue('a-automatedcapsulelab-last');
		//adapt stocks based on fusing results
		if (previousArtifactId && $("b:contains('was successfully created')").length) {
			var fusedArtifact = artifactList.get(previousArtifactId);
			artifactList.onAfterSuccessfulFuse(fusedArtifact);
			var stock = [];
			for (i = 0; i < artifactList.items.length; i = i + 1) {
				stock.push({
					id: artifactList.items[i].id,
					stock: artifactList.items[i].stock
				});
			}
			gc.setValue('a-automatedcapsulelab-stocks', JSON.stringify(stock));
		}
		//define panels: right
		$("table.bodybox[width='310']").attr("id", "a-automatedcapsulelab-rightpanel-wrap");
		rightPanelBody = $("#a-automatedcapsulelab-rightpanel-wrap div:first");
		rightPanelBody.attr("id", "a-automatedcapsulelab-rightpanel-body");
		$("a:last", rightPanelBody).remove();
		rightPanelBody.append('<table width="230" class="a-table" id="a-automatedcapsulelab-ingredients-wrap"><tbody id="a-automatedcapsulelab-ingredients-body"><tr class="table_row0"><th>Ingredient</th><th width="1%" align="center">Type</th><th align="right">Stock</th><th align="right">Fusable</th></tr></tbody></table><div id="a-artifact-effect" />');
		//define panels: left
		leftPanelWrap = $("table.bodybox[width='250']");
		leftPanelWrap.attr("id", "a-automatedcapsulelab-leftpanel-wrap");
		leftPanelBody = $("#a-automatedcapsulelab-leftpanel-wrap tbody");
		leftPanelBody.attr("id", "a-automatedcapsulelab-leftpanel-body");
		leftPanelBody.html('<div class="a-bold">Anfit\'s Upgraded Capsule Lab</div>');
		leftPanelBody.append('<div>Allows fusing artifacts</div><table id="a-automatedcapsulelab-artifacts-wrap" class="a-table"><tbody id="a-automatedcapsulelab-artifacts-body"><tr class="table_row0"><th>Artifact</th><th width="1%" align="center">Type</th><th align="right">Stock</th><th align="right">Fusable</th></tr></tbody></table><div><a href="i.cfm?&f=com_project">Back to project list</a></div>');
		//add artifacts
		var markup = '<tr id="a-automatedcapsulelab-artifact-${id}" class="table_row1 fusable-${fusable}"><td><a href="i.cfm?&amp;f=com_market_use&amp;id=${id}">${name}</a></td><td align="center"><small>${type}</small></td><td align="right">${stock}</td><td align="right">${fusable}</td></tr>';
		$.tmpl(markup, artifactList.items).appendTo("#a-automatedcapsulelab-artifacts-body");
		//hide unfusable
		if (!gc.getValue('a-automatedcapsulelab-showall')) {
			$("#a-automatedcapsulelab-artifacts-body .fusable-0, #a-automatedcapsulelab-artifacts-body .fusable-").hide();
		}
		//on select
		$('#a-automatedcapsulelab-artifacts-body tr').click(function (e) {
			var row = $(this);
			var id = row.attr('id').replace("a-automatedcapsulelab-artifact-", "");
			if (row.hasClass('table_row1')) {
				row.addClass('table_row0').removeClass('table_row1');
				row.siblings('tr:gt(0).table_row0').addClass('table_row1').removeClass('table_row0');
				fillForm(id);
			}
		});
		//on global keypress
		window.addEventListener("keypress", function (event) {
			for (var i = event.target; i; i = i.parentNode) {
				if (i.nodeName === "TEXTAREA" || i.nodeName === "INPUT" || i.nodeName === "BUTTON") {
					return;
				}
			}
			if (String.fromCharCode(event.which) === "q") {
				if (!gc.getValue('AGC_chainReactor')) {
					gc.setValue('AGC_chainReactor', 1);
					$("#a-automatedcapsulelab-leftpanel-wrap").addClass("automated");
				} else {
					gc.setValue('AGC_chainReactor', 0);
					$("#a-automatedcapsulelab-leftpanel-wrap").removeClass("automated");
				}
			}
		}, true);
		//mark selection
		$("#a-automatedcapsulelab-artifacts-body #a-automatedcapsulelab-artifact-" + previousArtifactId).addClass("table_row0").removeClass("table_row1");
		if (previousArtifactId) {
			fillForm(previousArtifactId);
		}
		//on automation is turned on
		if (gc.getValue('AGC_chainReactor')) {
			$("#a-automatedcapsulelab-leftpanel-wrap").addClass("automated");
			if ($("#a-automatedcapsulelab-rightpanel-body").text().match("Not enought")) {
				console.error("Cannot fuse any more of the selected artifact, run out of ingredients");
			} else {
				window.setTimeout(function () {
					$("input[type='submit']:first")[0].click();
				}, app.util.getRandomNumber(232, 3201));
			}
		}
	}
};
