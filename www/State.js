var run = require('./tool/run');
var Log = require('./tool/Log');
var _ = require('./tool/_');

/**
 * @class State
 * @classdesc class for manage SDK's state (singleton)
 * @hideconstructor
 */
function State() {}

/**
 * set current user<br/>
 * 
 * user.property is null, if input.property is null
 * @param {User} user user infomation
 * @return {Promise<void>}
 */
State.prototype.setUser = function(user) {
    Log.info('set user');

    if (_.isObject(user) === false) {
        Log.unmatchType('user');
        Log.fail('set user');

        return Promise.reject('user is not object');
    }

    if (_.isNullableString(user.ID) === false) {
        user.ID = null;
    }
    if (_.isNullableString(user.email) === false) {
        user.email = null;
    }
    if (_.isNullableString(user.phone) === false) {
        user.phone = null;
    }
    if (_.isNullableObject(user.alias) === false) {
        user.alias = null;
    }
    if (_.isNullableObject(user.attributes) === false) {
        user.attributes = null;
    }

    return run('AirbridgeState', 'setUser', [user]).catch(function () { Log.fail('setUser'); });
};

/**
 * update current user<br/>
 * 
 * user.property not be changed, if input.property is null
 * @param {User} user user infomation
 * @return {Promise<void>}
 */
State.prototype.updateUser = function(user) {
    Log.info('update user');

    if (_.isObject(user) === false) {
        Log.unmatchType('user');
        Log.fail('update user');

        return Promise.reject('user is not object');
    }

    if (_.isNullableString(user.ID) === false) {
        user.ID = null;
    }
    if (_.isNullableString(user.email) === false) {
        user.email = null;
    }
    if (_.isNullableString(user.phone) === false) {
        user.phone = null;
    }
    if (_.isNullableObject(user.alias) === false) {
        user.alias = null;
    }
    if (_.isNullableObject(user.attributes) === false) {
        user.attributes = null;
    }

    return run('AirbridgeState', 'updateUser', [user]).catch(function () { Log.fail('updateUser'); });
};

/**
 * make airbridge start tracking
 *
 * @return {Promise<void>}
 */
State.prototype.startTracking = function() {
    Log.info('start tracking');

    return run('AirbridgeState', 'startTracking', [user]).catch(function () { Log.fail('startTracking'); });
};

module.exports = new State();
