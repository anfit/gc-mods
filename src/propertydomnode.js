/**
 * Manages interface between Property and its DOM node 
 * @param el {Object} target dom node
 */
var PropertyDomNode = function (el, max, min) {
	this.el = el;
	this.max = max;
	this.min = min;
	this.connected = false;
};
/**
 * Set value
 * @param {numeric} value 
 */
PropertyDomNode.prototype.setValue = function (value) {
	if (this.connected === true) {
		this.el.html(this.prefix + app.util.formatCurrency(value) + this.suffix);
		this.refreshEl();
	}
};
/**
 * Get value
 * @return value from dom storage
 */
PropertyDomNode.prototype.getValue = function () {
	if (this.connected === true) {
		return parseFloat(this.el.text().replace(/[^\d^-]/g, ''));
	}
	return undefined;
};
/**
 * Set ceiling limit
 */
PropertyDomNode.prototype.setMax = function (max) {
	this.max = parseFloat(max);
	this.refreshEl();
};
/**
 * Set floor limit
 */
PropertyDomNode.prototype.setMin = function (min) {
	this.min = parseFloat(min);
	this.refreshEl();
};
/**
 * Set backgrounds and other style thingies, to be changed whenever value or min or max is changed
 */
PropertyDomNode.prototype.refreshEl = function () {
	var value;
	if (this.connected === true) {
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
	}
};
/**
 * Joins dao with its mapped dom element.
 */
PropertyDomNode.prototype.connect = function () {
	if (this.el !== undefined) {
		this.connected = true;
		this.prefix = this.el.html().replace(/-{0,1}\d.*/, '');
		this.suffix = this.el.html().replace(/.*\d/, '');
		this.refreshEl();
	}
};