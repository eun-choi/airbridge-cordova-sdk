/**
 * @function run
 * @description run native method
 * @param {string} class_ native class name
 * @param {string} method native method name
 * @param {array} argument native method argument
 * @return {Promise}
 * @private
 */
function run(class_, method, argument) {
    if(argument == null) {
        argument = [];
    }

    return new Promise(function(resolve, reject) {
        const success = function(response) {
            resolve(response);
        };

        const fail = function(error) {
            reject(error);
        };

        cordova.exec(success, fail, class_, method, argument);
    });
}

module.exports = run;
