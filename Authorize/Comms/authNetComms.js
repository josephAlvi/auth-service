/**
 * Created by Yousuf on 5/10/2016.
 */

var authorizeRequest = require('auth-net-request');

var authRequest = new authorizeRequest({
    api: 'xxxxxxxxxxx',
    key: 'xxxxxxxxxxxxxxxx',
    // cert: '/path/to/cert.pem',
    rejectUnauthorized: true, // true
    requestCert: false, // false
    agent: false, // http.agent object
    sandbox: true // true
});


var createTransactionRequest = function(requestXML, callback){
    //console.log(requestXML);
    authRequest.send('createTransaction', requestXML, function(err, responseXML) {
        if(!err){
            callback(null, responseXML);
        }else{
            callback(err, null);
        }
    });
};

module.exports = createTransactionRequest;