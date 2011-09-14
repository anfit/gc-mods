/**
 * A numeric property
 * 
 * TODO this class is pointlessly roundabout, should be cleaned
 */
Property = function (config) {
	var value, prop, defaultMax = config.max,
		defaultMin = config.min;
	this.parent = config.parent;
	this.id = config.id;
	this.max = this.parent.getValue(this.id + ".max") ? this.parent.getValue(this.id + ".max") : defaultMax;
	this.min = this.parent.getValue(this.id + ".min") ? this.parent.getValue(this.id + ".min") : defaultMin;
	this.domDao = new PropertyDomNode(config.dom, this.max, this.min);
	if (config.dom) {
		this.dom = config.dom;
	}
	if (this.parent.isNewest()) {
		this.domDao.connect();
	}
	if (this.domDao.connected === true) {
		value = this.domDao.getValue();
	} else {
		value = parseFloat(this.parent.getValue(this.id));
	}
	if (this.parent.isNewest()) {
		this.parent.setValue(this.id, value);
	}
	if (this.domDao.connected === true) {
		prop = this;
		$(this.dom).click(function (e) {
			var left, top, max, min;
			e.stopPropagation();
			left = $(this).position().left - ($(this).outerWidth()) / 2;
			top = $(this).position().top + $(this).outerHeight();
			var id = config.id;
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
				prop.setMin(defaultMin);
				$('#min-' + id).val(defaultMin);
				prop.setMax(defaultMax);
				$('#max-' + id).val(defaultMax);
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
	}
};
/**
 * @param value
 */
Property.prototype.setValue = function (value) {
	if (this.domDao.connected === true) {
		this.domDao.setValue(value);
	}
	if (this.parent.isNewest() === true) {
		this.parent.setValue(this.id, value);
	}
};
/**
 * @param value
 */
Property.prototype.setMax = function (value) {
	if (this.domDao.connected === true) {
		this.domDao.setMax(value);
	}
	this.parent.setValue(this.id + '.max', value);
	this.max = value;
};
/**
 * @param value
 */
Property.prototype.setMin = function (value) {
	if (this.domDao.connected === true) {
		this.domDao.setMin(value);
	}
	this.parent.setValue(this.id + '.min', value);
	this.min = value;
};
/**
 * @return {Numeric} value
 */
Property.prototype.getValue = function () {
	var value;
	if (
	this.domDao.connected === true && this.parent.isNewest() === true) {
		value = this.domDao.getValue();
	} else {
		value = parseFloat(this.parent.getValue(this.id));
	}
	return parseFloat(value);
};
/**
 * @return value
 * @deprecated
 */
Property.prototype.get = function () {
	return this.getValue();
};
/**
 * @param value
 * @deprecated
 */
Property.prototype.set = function (value) {
	this.setValue(value);
};
/**
 * @param value
 * @return
 */
Property.prototype.add = function (value) {
	var newValue = this.getValue() + parseFloat(value);
	this.setValue(newValue);
	return newValue;
};
/**
 * 
 * @param value
 * @return
 */
Property.prototype.subtract = function (value) {
	return this.add(parseFloat(value) * -1);
};
/**
 * 
 */
Property.prototype.load = function () {
	if (!this.parent.isNewest()) {
		this.domDao.setValue(this.getValue());
	}
};