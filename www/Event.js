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
 * 1. Send SignIn-Event to server.<br/>
 * 2. Set Tracker's user which is put on all of next events.
 * @param {User} [user=null] user infomation
 *
 * @param {EventOption} [option=null] event custom infomation
 *
 * @return {Promise<void>}
 */
Event.prototype.signIn = function(user, option) {
    Log.info('send signIn event');

    if(user === undefined) user = null;
    if(option === undefined) option = null;

    if (_.isNullableObject(user) === false) { user = null; Log.unmatchType('user'); }
    if (_.isNullableObject(option) === false) { option = null; Log.unmatchType('option'); }

    return run('AirbridgeEvent', 'signIn', [user, option]);
};

/**
 * 1. Send SignUp-Event to server.<br/>
 * 2. Set Tracker's user which is put on all of next events.
 * @param {User} [user=null] user infomation
 *
 * @param {EventOption} [option=null] event custom infomation
 *
 * @return {Promise<void>}
 */
Event.prototype.signUp = function(user, option) {
    Log.info('send signUp event');

    if(user === undefined) user = null;
    if(option === undefined) option = null;

    if (_.isNullableObject(user) === false) { user = null; Log.unmatchType('user'); }
    if (_.isNullableObject(option) === false) { option = null; Log.unmatchType('option'); }

    return run('AirbridgeEvent', 'signUp', [user, option]);
};

/**
 * 1. Send signOut-Event to server.<br/>
 * 2. Set Tracker's user with null which is put on all of next events.
 * @param {EventOption} [option=null] event custom infomation
 *
 * @return {Promise<void>}
 */
Event.prototype.signOut = function(option) {
    Log.info('send signOut event');

    if(option === undefined) option = null;

    if (_.isNullableObject(option) === false) { option = null; Log.unmatchType('option'); }

    return run('AirbridgeEvent', 'signOut', [option]);
};

/**
 * Send ViewHome-Event to server.
 * @param {EventOption} [option={}] event custom infomation
 *
 * @return {Promise<void>}
 */
Event.prototype.viewHome = function(option) {
    Log.info('send viewHome event');

    if(option === undefined) option = {};

    if (_.isObject(option) === false) { option = {}; Log.unmatchType('option'); }

    return run('AirbridgeEvent', 'viewHome', [option]);
};

/**
 * Send ViewProductList-Event to server.
 * @param {Object} [data={}]
 * @param {string} [data.listID] Product-List's unique identifier
 * @param {Product[]} [data.products] Product-List
 *
 * @param {EventOption} [option={}] event custom infomation
 *
 * @return {Promise<void>}
 */
Event.prototype.viewProductList = function(data, option) {
    Log.info('send viewProductList event');

    if(data === undefined) data = {};
    if(option === undefined) option = {};

    if (_.isObject(data) === false) { data = {}; Log.unmatchType('data'); }
    if (_.isObject(option) === false) { option = {}; Log.unmatchType('option'); }

    option.semantics = _.assign(option.semantics || {}, {
        productListID: data.listID,
        products: data.products,
    })

    return run('AirbridgeEvent', 'viewProductList', [option]);
};

/**
 * Send ViewSearchResult-Event to server.
 * @param {Object} [data={}]
 * @param {string} [data.query] Product-List's unique identifier
 * @param {Product[]} [data.products] Product-List
 *
 * @param {EventOption} [option={}] event custom infomation
 *
 * @return {Promise<void>}
 */
Event.prototype.viewSearchResult = function(data, option) {
    Log.info('send viewSearchResult event');

    if(data === undefined) data = {};
    if(option === undefined) option = {};

    if (_.isObject(data) === false) { data = {}; Log.unmatchType('data'); }
    if (_.isObject(option) === false) { option = {}; Log.unmatchType('option'); }

    option.semantics = _.assign(option.semantics || {}, {
        query: data.query,
        products: data.products,
    })

    return run('AirbridgeEvent', 'viewSearchResult', [option]);
};

/**
 * Send ViewProductDetail-Event to server.
 * @param {Object} [data={}]
 * @param {Product[]} [data.products] Product-List
 *
 * @param {EventOption} [option={}] event custom infomation
 *
 * @return {Promise<void>}
 */
Event.prototype.viewProductDetail = function(data, option) {
    Log.info('send viewProductDetail event');

    if(data === undefined) data = {};
    if(option === undefined) option = {};

    if (_.isObject(data) === false) { data = {}; Log.unmatchType('data'); }
    if (_.isObject(option) === false) { option = {}; Log.unmatchType('option'); }

    option.semantics = _.assign(option.semantics || {}, {
        products: data.products,
    })

    return run('AirbridgeEvent', 'viewProductDetail', [option]);
};

/**
 * Send AddToCart-Event to server.
 * @param {Object} [data={}]
 * @param {string} [data.cartID] Cart's unique identifier
 * @param {Product[]} [data.products] Product-List
 * @param {string} [data.currency] currency in <a href='https://en.wikipedia.org/wiki/ISO_4217'>ISO 4217<a/>
 * @param {number} [data.total] Total price of products in cart
 *
 * @param {EventOption} [option={}] event custom infomation
 *
 * @return {Promise<void>}
 */
Event.prototype.addToCart = function(data, option) {
    Log.info('send addToCart event');

    if(data === undefined) data = {};
    if(option === undefined) option = {};

    if (_.isObject(data) === false) { data = {}; Log.unmatchType('data'); }
    if (_.isObject(option) === false) { option = {}; Log.unmatchType('option'); }

    option.semantics = _.assign(option.semantics || {}, {
        cartID: data.cartID,
        products: data.products,
        currency: data.currency,
        totalValue: data.total,
    })

    return run('AirbridgeEvent', 'addToCart', [option]);
};

/**
 * Send Purchase-Event to server.
 * @param {Object} [data={}]
 * @param {string} [data.transactionID] Transaction's unique identifier
 * @param {Product[]} [data.products] Product-List
 * @param {boolean} [data.isInAppPurchase] is in-app purchased
 * @param {string} [data.currency] currency in <a href='https://en.wikipedia.org/wiki/ISO_4217'>ISO 4217<a/>
 * @param {number} [data.total] Total price of products in cart
 *
 * @param {EventOption} [option={}] event custom infomation
 *
 * @return {Promise<void>}
 */
Event.prototype.purchase = function(data, option) {
    Log.info('send purchase event');

    if(data === undefined) data = {};
    if(option === undefined) option = {};

    if (_.isObject(data) === false) { data = {}; Log.unmatchType('data'); }
    if (_.isObject(option) === false) { option = {}; Log.unmatchType('option'); }

    option.semantics = _.assign(option.semantics || {}, {
        transactionID: data.transactionID,
        products: data.products,
        inAppPurchased: data.isInAppPurchase,
        currency: data.currency,
        totalValue: data.total,
    })

    return run('AirbridgeEvent', 'purchase', [option]);
};

/**
 * Send Goal-Event to server.
 * @param {string} category event name
 *
 * @param {EventOption} [option={}] event custom infomation
 *
 * @return {Promise<void>}
 */
Event.prototype.custom = function(category, option) {
    Log.info('send custom event');

    if(option === undefined) option = {};

    if (_.isString(category) === false) {
        Log.unmatchType('category');
        Log.fail('send custom event');

        return Promise.reject('failed to send custom event : category not found');
    }
    if (_.isObject(option) === false) { option = {}; Log.unmatchType('option'); }

    return run('AirbridgeEvent', 'custom', [category, option]);
};

module.exports = new Event();
