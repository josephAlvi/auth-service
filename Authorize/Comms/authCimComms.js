/**
 * Created by Yousuf on 5/13/2016.
 */
var authorizeCIM = require('auth-net-cim');

var authCIM = new authorizeCIM({
    api: 'xxxxxxxxxxx',
    key: 'xxxxxxxxxxxxxxxx',
    sandbox: true // false
});

var createCustomerProfileRequest = function(customerProfile, callback){
    console.log(customerProfile);
    authCIM.createCustomerProfile(customerProfile, function(err, response) {
        if(!err){
            console.log('not error');
            console.log(response);
            callback(null, response);
        }else{
            console.log('error: ' + err);
            callback(err, null);
        }
    });
};

var createCustomerPaymentProfile = function(customerPaymentProfile, callback){
    authCIM.createCustomerPaymentProfile(customerPaymentProfile, function(err, response) {
        if(!err){
            console.log('not error');
            console.log(response);
            callback(null, response);
        }else{
            console.log('error: ' + err);
            callback(err, null);
        }
    });
};

var createCustomerProfileFromTransaction = function(customerProfilefromTranObj, callback) {
    authCIM.createCustomerProfileFromTransaction(customerProfilefromTranObj, function(err, response) {
        if(!err){
            console.log('not error');
            console.log(response);
            callback(null, response);
        }else{
            console.log('error: ' + err);
            callback(err, null);
        }
    });
};

var updateCustomerProfile = function(customerBasicObj, callback) {
    authCIM.updateCustomerProfile(customerBasicObj, function(err, response) {
        if(!err){
            console.log('not error');
            console.log(response);
            callback(null, response);
        }else{
            console.log('error: ' + err);
            callback(err, null);
        }
    });
};

var updateCustomerPaymentProfile = function(customerPaymentProfileObj, callback) {
    authCIM.updateCustomerPaymentProfile(customerPaymentProfileObj, function(err, response) {
        if(!err){
            console.log('not error');
            console.log(response);
            callback(null, response);
        }else{
            console.log('error: ' + err);
            callback(err, null);
        }
    });
};

var getCustomerProfile = function(customerProfileId, callback) {
    authCIM.getCustomerProfile(customerProfileId, function(err, response) {
        if(!err){
            console.log('not error');
            console.log(response);
            callback(null, response);
        }else{
            console.log('error: ' + err);
            callback(err, null);
        }
    });
};

var validateCustomerPaymentProfile = function(validationObj, callback) {
    authCIM.validateCustomerPaymentProfile(validationObj, function(err, response) {
        if(!err){
            console.log('not error');
            console.log(response);
            callback(null, response);
        }else{
            console.log('error: ' + err);
            callback(err, null);
        }
    });
};

var createCustomerProfileTransaction = function(transactionType, transactionObj, callback) {
    authCIM.createCustomerProfileTransaction(transactionType, transactionObj, function(err, response) {
        if(!err){
            console.log('not error');
            console.log(response);
            callback(null, response);
        }else{
            console.log('error: ' + err);
            callback(err, null);
        }
    });
};

var updateSplitTenderGroup = function(splitOptionsObj, callback) {
    authCIM.updateSplitTenderGroup(splitOptionsObj, function(err, response) {
        if(!err){
            console.log('not error');
            console.log(response);
            callback(null, response);
        }else{
            console.log('error: ' + err);
            callback(err, null);
        }
    });
};

var deleteCustomerPaymentProfile = function(custAndPaymentProfileKey, callback) {
    authCIM.deleteCustomerPaymentProfile(custAndPaymentProfileKey, function(err, response) {
        if(!err){
            console.log('not error');
            console.log(response);
            callback(null, response);
        }else{
            console.log('error: ' + err);
            callback(err, null);
        }
    });
};

var deleteCustomerProfile = function(customerProfileId, callback) {
    authCIM.deleteCustomerProfile(customerProfileId, function(err, response) {
        if(!err){
            console.log('not error');
            console.log(response);
            callback(null, response);
        }else{
            console.log('error: ' + err);
            callback(err, null);
        }
    });
};

module.exports = {
    createCustomerProfileRequest: createCustomerProfileRequest,
    createCustomerPaymentProfile: createCustomerPaymentProfile,
    createCustomerProfileFromTransaction: createCustomerProfileFromTransaction,
    updateCustomerProfile: updateCustomerProfile,
    updateCustomerPaymentProfile: updateCustomerPaymentProfile,
    getCustomerProfile: getCustomerProfile,
    validateCustomerPaymentProfile: validateCustomerPaymentProfile,
    createCustomerProfileTransaction: createCustomerProfileTransaction,
    updateSplitTenderGroup: updateSplitTenderGroup,
    deleteCustomerPaymentProfile: deleteCustomerPaymentProfile,
    deleteCustomerProfile: deleteCustomerProfile
};