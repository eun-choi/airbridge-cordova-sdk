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

    return run('AirbridgeState', 'startTracking', []).catch(function () { Log.fail('startTracking'); });
};

/**
 * Set device alias
 * @param {string} key - device alias key
 * @param {string} value - device alias value
 * @return {Promise<void>}
 */
State.prototype.setDeviceAlias = function(key, value) {
    Log.info('setDeviceAlias');

    if (_.isString(key) === false) {
        Log.unmatchType('key');
        Log.fail('setDeviceAlias');

        return Promise.reject('failed to setDeviceAlias : key not found');
    }

    if (_.isString(value) === false) {
        Log.unmatchType('value');
        Log.fail('setDeviceAlias');

        return Promise.reject('failed to setDeviceAlias : value not found');
    }

    args = {
        key: key,
        value: value
    };
    return run('AirbridgeState', 'setDeviceAlias', [args]).catch(function () { Log.fail('setDeviceAlias'); });
}

/**
 * Remove device alias
 * @param {string} key - callback of attribution
 * @return {Promise<void>}
 */
State.prototype.removeDeviceAlias = function(key) {
    Log.info('removeDeviceAlias');

    if (_.isString(key) === false) {
        Log.unmatchType('key');
        Log.fail('removeDeviceAlias');

        return Promise.reject('failed to removeDeviceAlias : key not found');
    }

    args = {
        key: key
    };
    return run('AirbridgeState', 'removeDeviceAlias', [args]).catch(function () { Log.fail('removeDeviceAlias'); });
}

/**
 * clear device alias
 * @return {Promise<void>}
 */
State.prototype.clearDeviceAlias = function() {
    Log.info('clearDeviceAlias');
    return run('AirbridgeState', 'clearDeviceAlias', []).catch(function () { Log.fail('clearDeviceAlias'); });
}

/**
 * register push token
 * @param {string} token - push token
 * @return {Promise<void>}
 */
State.prototype.registerPushToken = function(token) {
    Log.info('registerPushToken');

    if (_.isString(token) === false) {
        Log.unmatchType('token');
        Log.fail('registerPushToken');

        return Promise.reject('failed to registerPushToken : token not found');
    }

    args = {
        token: token
    };
    return run('AirbridgeState', 'registerPushToken', [args]).catch(function () { Log.fail('registerPushToken'); });
}

module.exports = new State();
