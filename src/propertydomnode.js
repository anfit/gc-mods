/**
 * Write-only accessor for property dom element
 * 
 * @param {number} min lowest value (lower values are allowed, but will be highlighted)
 * @param {number} max highest value (higher values are allowed, but will be highlighted) 
 * @param {Node} el accessor's dom node
 * @constructor
 */
app.PropertyDomNode = function (min, max, el) {
	/**
	 * accessor's dom node
	 * @type {Node}
	 */
	this.el = el;
	/**
	 * lowest value (lower values are allowed, but will be highlighted)
	 * @type {number}
	 */
	this.min = min;
	/**
	 * highest value (higher values are allowed, but will be highlighted) 
	 * @type {number}
	 */
	this.max = max;
	/**
	 * true if there is any dom el connected to this DAO
	 * @type {boolean}
	 */
	this.connected = false;
};

/**
 * Set value
 * @param {number} value 
 */
app.PropertyDomNode.prototype.setValue = function (value) {
	if (this.connected !== true) {
		return;
	}
	this.el.html(this.prefix + app.util.formatCurrency(value) + this.suffix);
	this.refreshEl();
};
/**
 * Set max value
 * @param {number} value 
 */
app.PropertyDomNode.prototype.setMax = function (value) {
	if (this.connected !== true) {
		return;
	}
	this.max = 1 * value;
	this.refreshEl();
};
/**
 * Set min value
 * @param {number} value 
 */
app.PropertyDomNode.prototype.setMin = function (value) {
	if (this.connected !== true) {
		return;
	}
	this.min = 1 * value;
	this.refreshEl();
};
/**
 * Set backgrounds and other style settings, to be changed whenever value or minimum/maximum threshold is changed
 * @private
 */
app.PropertyDomNode.prototype.refreshEl = function () {
	var value;
	value = this.getValue();
	if (value > this.max || value < this.min) {
		this.el.removeClass('bodybox', 'a-bodybox-yellow').addClass('a-bodybox-red');
	} else if (value === this.max) {
		this.el.removeClass('bodybox', 'a-bodybox-red').addClass('a-bodybox-yellow');
	} else {
		this.el.removeClass('a-bodybox-yellow');
		this.el.removeClass('a-bodybox-red');
		this.el.addClass('bodybox');
	}
};
/**
 * Assigns a dom node to this DAO
 * @param {Node} el accessor's dom node
 */
app.PropertyDomNode.prototype.connect = function (el) {
	this.el = el;
	this.connected = true;
	this.prefix = this.el.html().replace(/-{0,1}\d.*/, '');
	this.suffix = this.el.html().replace(/.*\d/, '');
	this.refreshEl();
};