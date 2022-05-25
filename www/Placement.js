var run = require('./tool/run');
var Log = require('./tool/Log');
var _ = require('./tool/_');

/**
 * @class Placement
 * @classdesc class for use SDK's placement function (singleton)
 * @hideconstructor
 */
function Placement() {}

/**
 * 1. send +1 click statistics to server<br/>
 * 2. get deeplink and fallback from server<br/>
 * 3. open deeplink. when fail, open fallback<br/>
 * 4. parameter's deeplink, fallback is spare for network-fail
 *
 * @param {string} trackingLink created on dashboard
 * @param {string} [deeplink=null] to open other app (spare for network-fail)
 * @param {string} [fallback=null] is opened when fail on deeplink (spare for network-fail)
 * @return {Promise<void>}
 */
Placement.prototype.click = function(trackingLink) {
    Log.info('click tracking link');

    if (_.isString(trackingLink) === false) {
        Log.unmatchType('trackingLink');
        Log.fail('click tracking link');

        return Promise.reject('user is not object');
    }

    if (_.isNullableString(deeplink) === false) {
        deeplink = null;
    }

    if (_.isNullableString(fallback) === false) {
        fallback = null;
    }


    return run('AirbridgePlacement', 'click', [trackingLink]).catch(function () { Log.fail('click'); });
};

/**
 * send +1 impression statistics to server<br/>
 *
 * @param {string} trackingLink created on dashboard
 * @return {Promise<void>}
 */
Placement.prototype.impression = function(trackingLink) {
    Log.info('impression tracking link');

    if (_.isString(trackingLink) === false) {
        Log.unmatchType('trackingLink');
        Log.fail('impression tracking link');

        return Promise.reject('user is not object');
    }


    return run('AirbridgePlacement', 'impression', [trackingLink]).catch(function () { Log.fail('impression'); });
};

module.exports = new Placement();
