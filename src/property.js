/**
 * A numeric property
 * 
 * @param {string} id name/label of the property 
 * @param {number} min lowest value (lower values are allowed, but will be highlighted)
 * @param {number} max highest value (higher values are allowed, but will be highlighted) 
 * @param {app.ModControl} context property's execution scope
 * @constructor
 */
app.Property = function (id, min, max, context) {
	/**
	 * default highest value (higher values are allowed, but will be highlighted) 
	 * @type {number}
	 */
	this.defaultMax = max;
	/**
	 * default lowest value (lower values are allowed, but will be highlighted)
	 * @type {number}
	 */
	this.defaultMin = min;
	/**
	 * context property's execution scope
	 * @type {app.ModControl}
	 */
	this.parent = context;
	/**
	 * name/label of the property 
	 * @type {string}
	 */
	this.id = id;
	/**
	 * current highest value (higher values are allowed, but will be highlighted) 
	 * @type {number}
	 */
	this.max = this.parent.getValue(this.id + ".max") ? this.parent.getValue(this.id + ".max") : this.defaultMax;
	/**
	 * current lowest value (lower values are allowed, but will be highlighted)
	 * @type {number}
	 */
	this.min = this.parent.getValue(this.id + ".min") ? this.parent.getValue(this.id + ".min") : this.defaultMin;

	/**
	 * Write-only accessor for property dom element
	 * @type {app.PropertyDomNode}
	 */
	this.domDao = new app.PropertyDomNode(this.min, this.max);
};

/**
 * @param {Node} el accessor's dom node
 */
app.Property.prototype.setEl = function (el) {
	
	this.dom = el;
	if (this.parent.isNewest()) {
		this.domDao.connect(el);
	}
	
	var prop = this;
	$(this.dom).click(function (e) {
		var left, top, max, min;
		e.stopPropagation();
		left = $(this).position().left - ($(this).outerWidth()) / 2;
		top = $(this).position().top + $(this).outerHeight();
		var id = prop.id;
		max = prop.max;
		min = prop.min;
		$("body").append('<table id="change-property-' + id + '" class="a-property" style="top: ' + top + '; left: ' + left + ';"><tr><td><b>Limits for ' + id + ':</b></td><td><button id="close-' + id + '" class="a-property-close">x</input></td></tr><tr><td>max:</td><td><input type="text" id="max-' + id + '" value="' + max + '"></td></tr><tr><td>min:</td><td><input type="text" id="min-' + id + '" value="' + min + '"/></td></tr><tr><td colspan="2"><button id="restore-default-' + id + '"  class="a-property-restore">restore default values</button></td></tr></table>');
		$('#max-' + id).change(function () {
			prop.setMax($(this).val());
		});
		$('#min-' + id).change(function () {
			prop.setMin($(this).val());
		});
		$('#restore-default-' + id).click(function () {
			prop.setMin(prop.defaultMin);
			$('#min-' + id).val(prop.defaultMin);
			prop.setMax(prop.defaultMax);
			$('#max-' + id).val(prop.defaultMax);
		});
		$("body").click(function () {
			$('#change-property-' + id).remove();
		});
		$('#close-' + id).click(function () {
			$('#change-property-' + id).remove();
		});
		$('#change-property-' + id).click(function (e) {
			e.stopPropagation();
		});
	});	
};

/**
 * @param {number} value Value for this property
 */
app.Property.prototype.setValue = function (value) {
	this.parent.setValue(this.id, value);
	this.domDao.setValue(value);
};

/**
 * @param {number} value Maximum value for this property
 * @param {boolean=} asDefault True if this value should be assigned as default threshold
 */
app.Property.prototype.setMax = function (value, asDefault) {
	if (asDefault === true) {
		this.defaultMax = value;
	}
	this.domDao.setMax(value);
	this.parent.setValue(this.id + '.max', value);
	this.max = value;
};

/**
 * @param {number} value Minimum value for this property
 * @param {boolean=} asDefault True if this value should be assigned as default threshold
 */
app.Property.prototype.setMin = function (value, asDefault) {
	if (asDefault === true) {
		this.defaultMin = value;
	}
	this.domDao.setMin(value);
	this.parent.setValue(this.id + '.min', value);
	this.min = value;
};

/**
 * @return {number} Value of this property
 */
app.Property.prototype.getValue = function () {
	return this.parent.getValue(this.id);
};

/**
 * @param {number} value Value to be added to this property
 */
app.Property.prototype.addValue = function (value) {
	this.setValue(1 * value + this.getValue());
};

/**
 * @param {number} value Value to be removed from this property
 */
app.Property.prototype.subtractValue = function (value) {
	this.setValue(-1 * value + this.getValue());
};

/**
 * Forces underlying dom node to update its value
 * @param {number=} value optional: value for this property
 */
app.Property.prototype.updateEl = function (value) {
	if (value !== undefined) {
		this.domDao.setValue(value);
	}
	else {
		this.domDao.setValue(this.getValue());
	}
};