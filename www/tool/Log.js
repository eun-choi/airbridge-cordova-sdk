/**
 * @class Log
 * @classdesc class for log
 * @hideconstructor
 * @private
 */
function Log() {}

/**
 * @member {string} Log.HEADER
 */
Log.HEADER = '[Airbridge CO]';

/**
 * warning unmatch type exist
 * @param {string} name
 */
Log.unmatchType = function(name) {
    console.warn(this.HEADER + ' ' + name + ' has unmatched type');
};

/**
 * log infomaton message
 * @param {string} message
 */
Log.info = function(message) {
    console.info(this.HEADER + ' ' + message);
};

/**
 * warning fail to do task in method
 * @param {string} name
 */
Log.fail = function(name) {
    console.warn(this.HEADER + ' fail to ' + name);
};

module.exports = Log;
