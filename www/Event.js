var run = require('./tool/run');
var Log = require('./tool/Log');
var _ = require('./tool/_');

require('./typedef/User');
require('./typedef/EventOption');

/**
 * @class Event
 * @classdesc class for send event (singleton)
 * @hideconstructor
 */
function Event() {}

/**
 * Send Goal-Event to server.
 * @param {string} category event name
 * @param {EventOption} [option={}] event options
 * @return {Promise<void>}
 */
Event.prototype.trackEvent = function(category, option) {
    Log.info('trackEvent');

    if(option === undefined) option = {};

    if (_.isString(category) === false) {
        Log.unmatchType('category');
        Log.fail('trackEvent');

        return Promise.reject('failed to trackEvent : category not found');
    }
    if (_.isObject(option) === false) { option = {}; Log.unmatchType('option'); }
    
    return run('AirbridgeEvent', 'trackEvent', [category, option]).catch(function () { Log.fail('trackEvent'); });
};

module.exports = new Event();
