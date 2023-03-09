/**
 * @class Airbridge
 * @classdesc main class (singleton)
 */
function Airbridge() {
    /** @member {Event} Airbridge#event */
    this.event = require('./Event');
    /** @member {Deeplink} Airbridge#deeplink */
    this.deeplink = require('./Deeplink');
    /** @member {State} Airbridge#state */
    this.state = require('./State');
    /** @member {Placement} Airbridge#placement */
    this.placement = require('./Placement');
}

/**
 * Send Goal-Event to server.
 * @param {string} category event name
 * @param {EventOption} [option={}] event options
 */
Airbridge.prototype.trackEvent = function(category, option) {
    this.event.trackEvent(category, option);
};

/**
 * Set device alias
 * @param {string} key - device alias key
 * @param {string} value - device alias value
 */
Airbridge.prototype.setDeviceAlias = function(key, value) {
    this.state.setDeviceAlias(key, value);
}

/**
 * Remove device alias
 * @param {string} key - callback of attribution
 */
Airbridge.prototype.removeDeviceAlias = function(key) {
    this.state.removeDeviceAlias(key);
}

/**
 * clear device alias
 */
Airbridge.prototype.clearDeviceAlias = function() {
    this.state.clearDeviceAlias();
}

/**
 * register push token
 * @param {string} token - push token
 */
Airbridge.prototype.registerPushToken = function(token) {
    this.state.registerPushToken(token);
}

module.exports = new Airbridge();
