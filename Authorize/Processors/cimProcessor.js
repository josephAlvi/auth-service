/**
 * Created by Yousuf on 5/14/2016.
 */

var authComms = require('./../Comms/authCimComms.js');
var cimModel = require('./../Model/cimModel.js');
var authorize = require('auth-net-types');
var utility = require('../../Utility/utility.js');

var getBankAccountObj = function(accountType, routingNumber, accountNumber, nameOnAccount, bankName){
    var bankAccount = new authorize.BankAccount({
        accountType: accountType,
        routingNumber: routingNumber,
        accountNumber: accountNumber,
        nameOnAccount: nameOnAccount,
        bankName: bankName
    });
    return bankAccount;
};

var getPaymentObjByCreditCard = function(creditCardObj){
    var payment =  new Authorize.Payment({
        creditCard: creditCardObj
    });
    return payment;
};

var getPaymentObjByBankAccount = function(bankAccount){
    var payment = new authorize.Payment({
        bankAccount: bankAccount
    });
    return payment;
};

var getPaymentProfilesObj = function(customerType, payment){
    var paymentProfiles = new authorize.PaymentProfiles({
        customerType: customerType,
        payment: payment
    });
    return paymentProfiles;
};


var getCustomerProfileObj = function(merchantCustomerId, description, email, customerProfileId, paymentProfiles){
    var profile = new cimModel.Profile();
    profile.merchantCustomerId = merchantCustomerId;
    profile.description = description;
    profile.email = email;
    profile.customerProfileId = customerProfileId;
    profile.paymentProfiles = paymentProfiles;
    return profile;
};

var getCreditCardObj = function(cardNumber, expirationDate, cardCode) {
    var creditCardObj = new authorize.CreditCard({
        cardNumber: cardNumber,
        expirationDate: expirationDate,
        cardCode: cardCode
    });
    return creditCardObj
};

var getPaymentProfileByCreditCard = function(customerType, creditCard) {
    var options = {
        customerType: customerType,
        payment: {
            creditCard: creditCard
        }
    };
    return options;
};

var getCustomerBasicObj = function(email, merchantCustomerId, description, customerProfileId){
    var customerBasicObj = new authorize.CustomerBasic({
        email: email,
        merchantCustomerId: merchantCustomerId,
        description: description,
        customerProfileId: customerProfileId
    });
    return customerBasicObj;
};

var getProfileTransactionObj = function(ref, amount, customerProfileId, paymentProfileId, taxObj, shippingObj, orderObj){
    var transactionObj = new cimModel.Transaction();
    transactionObj.ref = ref;
    transactionObj.amount = amount;
    transactionObj.customerProfileId = customerProfileId;
    transactionObj.customerPaymentProfileId = paymentProfileId;
    transactionObj.tax = taxObj;
    transactionObj.shipping = shippingObj;
    transactionObj.order = orderObj;
    return transactionObj;
};

var getTaxObj = function(taxAmount, taxName, taxDescription){
    var taxObj = new cimModel.Tax();
    taxObj.amount = taxAmount || '0';
    taxObj.name = taxName || '';
    taxObj.description = taxDescription || '';
    return taxObj;
};

var getShippingObj = function(shippingAmount, shippingName, shippingDescription){
    var shippingObj = new cimModel.Shipping();
    shippingObj.amount = shippingAmount || '0';
    shippingObj.name = shippingName || '';
    shippingObj.description = shippingDescription || '';
    return shippingObj;
};

var getOrderObj = function(ref){
    var orderObj = new cimModel.Order();
    orderObj.invoiceNumber = 'INV-' + ref;
    orderObj.description = 'Remittance to Nigeria';
    return orderObj;
};


//--------------------------------------------------------------------------------------------------------------------//

var createCustomerProfile = function(requestFields, callback){
    var profile = getCustomerBasicObj(requestFields.email, requestFields.merchantCustomerId, requestFields.description,
        requestFields.customerProfileId);

    authComms.createCustomerProfileRequest({customerProfile: profile}, function(err, response) {
        if(!err) {
            console.log(response);
            callback(null, response);
        }
        else{
            console.log(err);
            callback(err, null);
        }
    });
};

var createCustomerPaymentProfile = function(requestFields, callback){
    var creditCardObj = getCreditCardObj(requestFields.cardNumber, requestFields.expirationDate, requestFields.cardCode);
    var paymentProfileObj = getPaymentProfileByCreditCard(requestFields.customerType, creditCardObj);

    var requestObj = {customerProfileId: requestFields.customerProfileId, paymentProfile: paymentProfileObj};
    authComms.createCustomerPaymentProfile(requestObj, function(err, response) {
        if(!err) {
            console.log(response);
            callback(null, response);
        }
        else{
            console.log(err);
            callback(err, null);
        }
    });
};

var createCustomerProfileTransaction = function(requestFields, callback) {
    var ref = utility.getTranRef();
    var taxObj = getTaxObj(requestFields.taxAmount, requestFields.taxName, requestFields.taxDescription);
    var shippingObj = getShippingObj(requestFields.shippingAmount, requestFields.shippingName, requestFields.shippingDescription);
    var orderObj = getOrderObj(ref);
    var transactionObj = getProfileTransactionObj(ref, requestFields.amount, requestFields.customerProfileId, requestFields.paymentProfileId, taxObj, shippingObj, orderObj);

    authComms.createCustomerProfileTransaction('AuthCapture', transactionObj, function(err, response) {
        if(!err) {
            console.log(response);
            callback(null, response);
        }
        else{
            console.log(err);
            callback(err, null);
        }
    });
};

var createCustomerProfileByBankAcc = function(requestFields, callback){
    var bankAccount = getBankAccountObj(requestFields.accountType, requestFields.routingNumber, requestFields.accountNumber,
        requestFields.nameOnAccount, requestFields.bankName);
    var payment = getPaymentObjByBankAccount(bankAccount);
    var paymentProfiles = getPaymentProfilesObj(requestFields.customerType, payment);
    var profile = getCustomerProfileObj(requestFields.merchantCustomerId, requestFields.description, requestFields.email,
        requestFields.customerProfileId, paymentProfiles);

    authComms.createCustomerProfileRequest({customerProfile: profile}, function(err, response) {
        if(!err) {
            console.log(response);
            callback(null, response);
        }
        else{
            console.log(err);
            callback(err, null);
        }
    });
};

var createCustomerProfileFromTransaction  = function(requestFields, callback){
    var requestObj = {customerProfile: {transactionId: requestFields.transactionId}};
    authComms.createCustomerProfileFromTransaction(requestObj, function(err, response) {
        if(!err) {
            console.log(response);
            callback(null, response);
        }
        else{
            console.log(err);
            callback(err, null);
        }
    });

};

var updateCustomerProfile = function(requestFields, callback) {
    var requestObj = getCustomerBasicObj(requestFields.email, requestFields.merchantCustomerId, requestFields.description,
        requestFields.customerProfileId);
    authComms.updateCustomerProfile(requestObj, function(err, response) {
        if(!err) {
            console.log(response);
            callback(null, response);
        }
        else{
            console.log(err);
            callback(err, null);
        }
    });
};

var updateCustomerPaymentProfile = function(requestFields, callback) {
    var creditCardObj = getCreditCardObj(requestFields.cardNumber, requestFields.expirationDate, requestFields.cardCode);
    var paymentObj = getPaymentObjByCreditCard(creditCardObj);
    var paymentProfileObj = getPaymentProfilesObj(requestFields.customerType, paymentObj);
    paymentProfileObj.customerProfileId = requestFields.customerProfileId;
    authComms.updateCustomerPaymentProfile(paymentProfileObj, function(err, response) {
        if(!err) {
            console.log(response);
            callback(null, response);
        }
        else{
            console.log(err);
            callback(err, null);
        }
    });

};

var getCustomerProfile = function(requestFields, callback) {
    authComms.getCustomerProfile(requestFields.customerProfileId, function(err, response) {
        if(!err) {
            console.log(response);
            callback(null, response);
        }
        else{
            console.log(err);
            callback(err, null);
        }
    });
};

var validateCustomerPaymentProfile = function(requestFields, callback) {
    var customerProfileValidationObj = {
        customerProfileId: requestFields.customerProfileId,
        customerPaymentProfileId: requestFields.customerPaymentProfileId,
        validationMode: 'testMode' // liveMode
    };
    authComms.validateCustomerPaymentProfile(customerProfileValidationObj, function(err, response) {
        if(!err) {
            console.log(response);
            callback(null, response);
        }
        else{
            console.log(err);
            callback(err, null);
        }
    });
};

var updateSplitTenderGroup = function(requestFields, callback) {
    var splitOptionsObj = {
        splitTenderId: requestFields.splitTenderId,
        splitTenderStatus: requestFields.splitTenderStatus
    };
    authComms.updateSplitTenderGroup(splitOptionsObj, function(err, response) {
        if(!err) {
            console.log(response);
            callback(null, response);
        }
        else{
            console.log(err);
            callback(err, null);
        }
    });
};

var deleteCustomerPaymentProfile = function(requestFields, callback) {
    var custAndPaymentProfileKey = new cimModel.customerProfilePaymentProfileKey();
    custAndPaymentProfileKey.customerProfileId = requestFields.customerProfileId;
    custAndPaymentProfileKey.customerPaymentProfileId = requestFields.customerPaymentProfileId;
    authComms.deleteCustomerPaymentProfile(custAndPaymentProfileKey, function(err, response) {
        if(!err) {
            console.log(response);
            callback(null, response);
        }
        else{
            console.log(err);
            callback(err, null);
        }
    });
};


var deleteCustomerProfile = function(requestFields, callback) {
    authComms.deleteCustomerProfile(requestFields.customerProfileId, function(err, response) {
        if(!err) {
            console.log(response);
            callback(null, response);
        }
        else{
            console.log(err);
            callback(err, null);
        }
    });
};

module.exports = {
    createCustomerProfile: createCustomerProfile,
    createCustomerPaymentProfile: createCustomerPaymentProfile,
    createCustomerProfileFromTransaction: createCustomerProfileFromTransaction,
    updateCustomerProfile: updateCustomerProfile,
    updateCustomerPaymentProfile: updateCustomerPaymentProfile,
    getCustomerProfile: getCustomerProfile,
    validateCustomerPaymentProfile: validateCustomerPaymentProfile,
    createCustomerProfileTransaction: createCustomerProfileTransaction,
    updateSplitTenderGroup: updateSplitTenderGroup,
    deleteCustomerPaymentProfile: deleteCustomerPaymentProfile,
    deleteCustomerProfile: deleteCustomerProfile,
    createCustomerProfileByBankAcc: createCustomerProfileByBankAcc
};