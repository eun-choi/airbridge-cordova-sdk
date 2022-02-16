var Log = require('./tool/Log');
var _ = require('./tool/_');

/**
 * @callback DeeplinkListener
 * @param {string} deeplink URL of deeplink
 * @returns {void}
 */

/**
 * @class Deeplink
 * @classdesc class for set SDK's deeplink behavior (singleton)
 * @hideconstructor
 */
function Deeplink() {
    /**
     * listen deeplink, deferred-deeplink
     * @type {DeeplinkListener}
     * @private
     */
    this._deeplinkListener = null;
    /**
     * deeplink or deferred-deeplink which get before set deeplink-listener
     * @type {string | null}
     * @private
     */
    this._initialDeeplink = null;

    this._deeplinkListener = function (deeplink) {
        this._initialDeeplink = deeplink;
    }.bind(this);

    var nativeDeeplinkListener = function (deeplink) {
        Log.info('[deeplink] ' + deeplink);
        this._deeplinkListener(deeplink);
    }.bind(this);

    cordova.exec(nativeDeeplinkListener, null, 'AirbridgeDeeplink', 'listen', []);
}

/**
 * Set DeeplinkListener (listen deeplink or deferred-deeplink)<br/>
 * @param {DeeplinkListener} listener callback of deeplink & deferred-deeplink
 */
Deeplink.prototype.setDeeplinkListener = function(listener) {
    Log.info('set deeplink listener');

    if (_.isFunction(listener) === false) {
        Log.unmatchType('listener');
        Log.fail('set deeplink listener');

        return;
    }

    if (this._initialDeeplink !== null) {
        listener(this._initialDeeplink);
        this._initialDeeplink = null;
    }

    this._deeplinkListener = listener;
};

module.exports = new Deeplink();
