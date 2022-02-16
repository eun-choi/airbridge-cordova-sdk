var isFunction = require('./../lib/lodash.isfunction/index');
var isPlainObject = require('./../lib/lodash.isplainobject/index');
var isString = require('./../lib/lodash.isstring/index');

/**
 * @class _
 * @classdesc class for util method
 * @hideconstructor
 * @private
 */
function _() {}

/**
 * return true if value is null or plain object
 * @param {any} value
 * @return {boolean}
 */
_.isNullableObject = function(value) {
    return value === null || isPlainObject(value);
};

/**
 * return true if value is plain object
 * @param {any} value
 * @return {boolean}
 */
_.isObject = function(value) {
    return isPlainObject(value);
};

/**
 * return true if value is null or string
 * @param {any} value
 * @return {boolean}
 */
_.isNullableString = function(value) {
    return value === null || isString(value);
};

/**
 * return true if value is string
 * @param {any} value
 * @return {boolean}
 */
_.isString = function(value) {
    return isString(value);
};

/**
 * return true if value is function
 * @param {any} value
 * @return {boolean}
 */
_.isFunction = function(value) {
    return isFunction(value);
};

_.assign = function(target) {
    if (target === null || target === undefined) {
        throw TypeError('target can not be null or undefined');
    }

    var result = Object(target);

    for (var i=1; i<arguments.length; i++) {
        var source = arguments[i];
        if (source === null || source === undefined) {
            continue;
        }

        for (var key in source) {
            if (!Object.prototype.hasOwnProperty.call(source, key)) {
                continue;
            }

            result[key] = source[key];
        }
    }

    return result;
}

module.exports = _;
