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

Airbridge.prototype = {};

module.exports = new Airbridge();
