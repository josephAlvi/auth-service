/**
 * Created by Yousuf on 5/10/2016.
 */

var authComms = require('./../Comms/authNetComms.js');
var tranReqModel = require('./../Model/createTranRequestModel.js');
var utility = require('../../Utility/utility.js');

var createTranRequestObject = function(tranType, requestFields){
    var ref = utility.getTranRef();

    var creditCard = new tranReqModel.CreditCard();
    creditCard.cardNumber = requestFields.cardNumber || '';
    creditCard.expirationDate = requestFields.cardExpirationDate || '';
    creditCard.cardCode = requestFields.cardCode || '';

    var lineItem = new tranReqModel.LineItem();
    lineItem.itemId = requestFields.itemId || '1';
    lineItem.name = requestFields.itemName || 'Remittance';
    lineItem.description = requestFields.itemDescription || 'Remittance sent to Nigeria from USA';
    lineItem.quantity = requestFields.itemQuantity || '1';
    lineItem.unitPrice = requestFields.amount || '';

    var setting = new tranReqModel.Setting();
    setting.settingName = requestFields.settingName || 'testRequest';
    setting.settingValue = requestFields.settingValue || 'false';

    var userField = new tranReqModel.UserField();
    userField.name = requestFields.userFieldName || '';
    userField.value = requestFields.userFieldValue || '';

    var payment = new tranReqModel.Payment();
    payment.creditCard = creditCard;

    var order = new tranReqModel.Order();
    order.invoiceNumber = 'INV-' + ref;
    order.description = 'Remittance to Nigeria';

    var lineItems = new tranReqModel.LineItems();
    lineItems.lineItem = lineItem;

    var tax = new tranReqModel.Tax();
    tax.amount = requestFields.taxAmount || '0';
    tax.name = requestFields.taxName || '';
    tax.description = requestFields.taxDescription || '';

    var duty = new tranReqModel.Duty();
    duty.amount = requestFields.dutyAmount || '0';
    duty.name = requestFields.dutyName || '';
    duty.description = requestFields.dutyDescription || '';

    var shipping = new tranReqModel.Shipping();
    shipping.amount = requestFields.shippingAmount || '0';
    shipping.name = requestFields.shippingName || '';
    shipping.description = requestFields.shippingDescription || '';

    var billTo = new tranReqModel.BillTo();
    billTo.firstName = requestFields.billToFirstName || '';
    billTo.lastName = requestFields.billToLastName || '';
    billTo.company = requestFields.billToCompany || '';
    billTo.address = requestFields.billToAddress || '';
    billTo.city = requestFields.billToCity || '';
    billTo.state = requestFields.billToState || '';
    billTo.zip = requestFields.billToZip || '';
    billTo.country = requestFields.billToCountry || '';

    var shipTo = new tranReqModel.ShipTo();
    shipTo.firstName = requestFields.shipToFirstName || '';
    shipTo.lastName = requestFields.shipToLastName || '';
    shipTo.company = requestFields.shipToCompany || '';
    shipTo.address = requestFields.shipToAddress || '';
    shipTo.city = requestFields.shipToCity || '';
    shipTo.state = requestFields.shipToState || '';
    shipTo.zip = requestFields.shipToZip || '';
    shipTo.country = requestFields.shipToCountry || '';

    var transactionSettings = new tranReqModel.TransactionSettings();
    transactionSettings.setting = setting;

    var userFields = new tranReqModel.UserFields();
    userFields.userField = userField;

    var transactionRequest = new tranReqModel.TransactionRequest();
    transactionRequest.transactionType = tranType;
    transactionRequest.amount = requestFields.amount || '0';
    transactionRequest.payment = payment;
    transactionRequest.order = order;
    transactionRequest.lineItems = lineItems;
    transactionRequest.tax = tax;
    transactionRequest.duty = duty;
    transactionRequest.shipping = shipping;
    transactionRequest.poNumber = requestFields.invoiceNumber || '';
    transactionRequest.billTo = billTo;
    transactionRequest.shipTo = shipTo;
    transactionRequest.customerIP = requestFields.customerIP || '';
    transactionRequest.transactionSettings = transactionSettings;
    transactionRequest.userFields = userFields;

    var createTransactionRequest = new tranReqModel.CreateTransactionRequest();
    createTransactionRequest.refId = ref;
    createTransactionRequest.transactionRequest = transactionRequest;

    return createTransactionRequest;
};

var createPriorAuthReqObj = function(tranType, requestFields){
    var ref = utility.getTranRef();

    var order = new tranReqModel.Order();
    order.invoiceNumber = 'INV-' + ref;
    order.description = 'Remittance to Nigeria';

    var transactionRequest = new tranReqModel.AuthPriorTranRequest();
    transactionRequest.transactionType = tranType;
    transactionRequest.amount = requestFields.amount || '0';
    transactionRequest.refTransId = requestFields.refTransId || '';
    transactionRequest.order = order;

    var createTransactionRequest = new tranReqModel.CreateTransactionRequest();
    createTransactionRequest.refId = ref;
    createTransactionRequest.transactionRequest = transactionRequest;

    return createTransactionRequest;
};

var createProfileTranRequestObject = function(tranType, requestFields){
    var ref = utility.getTranRef();

    var creditCard = new tranReqModel.CreditCard();
    creditCard.cardNumber = requestFields.cardNumber || '';
    creditCard.expirationDate = requestFields.cardExpirationDate || '';
    creditCard.cardCode = requestFields.cardCode || '';

    var lineItem = new tranReqModel.LineItem();
    lineItem.itemId = requestFields.itemId || '1';
    lineItem.name = requestFields.itemName || 'Remittance';
    lineItem.description = requestFields.itemDescription || 'Remittance sent to Nigeria from USA';
    lineItem.quantity = requestFields.itemQuantity || '1';
    lineItem.unitPrice = requestFields.amount || '';

    var setting = new tranReqModel.Setting();
    setting.settingName = requestFields.settingName || 'testRequest';
    setting.settingValue = requestFields.settingValue || 'false';

    var userField = new tranReqModel.UserField();
    userField.name = requestFields.userFieldName || '';
    userField.value = requestFields.userFieldValue || '';

    var paymentProfile = new tranReqModel.PaymentProfile();
    paymentProfile.paymentProfileId = requestFields.paymentProfileId || '';

    var profile = new tranReqModel.Profile();
    profile.customerProfileId = requestFields.customerProfileId || '';
    profile.paymentProfile = paymentProfile

    var order = new tranReqModel.Order();
    order.invoiceNumber = 'INV-' + ref;
    order.description = 'Remittance to Nigeria';

    var lineItems = new tranReqModel.LineItems();
    lineItems.lineItem = lineItem;

    var tax = new tranReqModel.Tax();
    tax.amount = requestFields.taxAmount || '0';
    tax.name = requestFields.taxName || '';
    tax.description = requestFields.taxDescription || '';

    var duty = new tranReqModel.Duty();
    duty.amount = requestFields.dutyAmount || '0';
    duty.name = requestFields.dutyName || '';
    duty.description = requestFields.dutyDescription || '';

    var shipping = new tranReqModel.Shipping();
    shipping.amount = requestFields.shippingAmount || '0';
    shipping.name = requestFields.shippingName || '';
    shipping.description = requestFields.shippingDescription || '';

    var shipTo = new tranReqModel.ShipTo();
    shipTo.firstName = requestFields.shipToFirstName || '';
    shipTo.lastName = requestFields.shipToLastName || '';
    shipTo.company = requestFields.shipToCompany || '';
    shipTo.address = requestFields.shipToAddress || '';
    shipTo.city = requestFields.shipToCity || '';
    shipTo.state = requestFields.shipToState || '';
    shipTo.zip = requestFields.shipToZip || '';
    shipTo.country = requestFields.shipToCountry || '';

    var transactionSettings = new tranReqModel.TransactionSettings();
    transactionSettings.setting = setting;

    var userFields = new tranReqModel.UserFields();
    userFields.userField = userField;

    var transactionRequest = new tranReqModel.ProfileTransactionRequest();
    transactionRequest.transactionType = tranType;
    transactionRequest.amount = requestFields.amount || '0';
    transactionRequest.profile = profile;
    transactionRequest.order = order;
    transactionRequest.lineItems = lineItems;
    transactionRequest.tax = tax;
    transactionRequest.duty = duty;
    transactionRequest.shipping = shipping;
    transactionRequest.poNumber = requestFields.invoiceNumber || '';
    transactionRequest.shipTo = shipTo;
    transactionRequest.customerIP = requestFields.customerIP || '';
    transactionRequest.transactionSettings = transactionSettings;
    transactionRequest.userFields = userFields;

    var createTransactionRequest = new tranReqModel.CreateTransactionRequest();
    createTransactionRequest.refId = ref;
    createTransactionRequest.transactionRequest = transactionRequest;

    return createTransactionRequest;
};
//------------------------------------------------------------------------------------------------------//
var chargeCreditCard = function(requestFields, callback){
    //console.log(requestFields);
    var requestObject = createTranRequestObject('authCaptureTransaction', requestFields);
    //console.log(requestObject);
    var requestXML = utility.trimRootElement(utility.createXMLfromJSON(requestObject));
    //console.log(requestXML);
    authComms(requestXML, function(err, responseXML){
        if(!err) {
            responseXML.ref = requestObject.ref;
            //console.log(responseXML);
            callback(null, responseXML);
        }
        else{
            err.ref = requestObject.ref;
            //console.log(err);
            callback(err, null);
        }
    });
};


var authOnlyCreditCard = function(requestFields, callback){
    //console.log(requestFields);
    var requestObject = createTranRequestObject('authOnlyTransaction', requestFields);
    //console.log(requestObject);
    var requestXML = utility.trimRootElement(utility.createXMLfromJSON(requestObject));
    //console.log(requestXML);
    authComms(requestXML, function(err, responseXML){
        if(!err) {
            //console.log("Auth Only !err");
            responseXML.ref = requestObject.ref;
            //console.log(responseXML);
            callback(null, responseXML);
        }
        else{
            //console.log("Auth Only err");
            err.ref = requestObject.ref;
            //console.log(err);
            callback(err, null);
        }
    });
};


var chargeAuthCreditCard = function(requestFields, callback){
    var requestObject = createPriorAuthReqObj('priorAuthCaptureTransaction', requestFields);
    var requestXML = utility.trimRootElement(utility.createXMLfromJSON(requestObject));
    //console.log(requestXML);
    authComms(requestXML, function(err, responseXML){
        if(!err) {
            //console.log("Prior Auth !err");
            responseXML.ref = requestObject.ref;
            //console.log(responseXML);
            callback(null, responseXML);
        }
        else{
            //console.log("Prior Auth Only err");
            err.ref = requestObject.ref;
            //console.log(err);
            callback(err, null);
        }
    });
};

var chargeCustomerProfile = function(requestFields, callback){
    var requestObject = createProfileTranRequestObject('authCaptureTransaction', requestFields);
    var requestXML = utility.trimRootElement(utility.createXMLfromJSON(requestObject));
    //console.log(requestXML);
    authComms(requestXML, function(err, responseXML){
        if(!err) {
            //console.log("Prior Auth !err");
            responseXML.ref = requestObject.ref;
            //console.log(responseXML);
            callback(null, responseXML);
        }
        else{
            //console.log("Prior Auth Only err");
            err.ref = requestObject.ref;
            //console.log(err);
            callback(err, null);
        }
    });
};

var authOnlyCustomerProfile = function(requestFields, callback){
    //console.log(requestFields);
    var requestObject = createProfileTranRequestObject('authOnlyTransaction', requestFields);
    //console.log(requestObject);
    var requestXML = utility.trimRootElement(utility.createXMLfromJSON(requestObject));
    //console.log(requestXML);
    authComms(requestXML, function(err, responseXML){
        if(!err) {
            //console.log("Auth Only !err");
            responseXML.ref = requestObject.ref;
            //console.log(responseXML);
            callback(null, responseXML);
        }
        else{
            //console.log("Auth Only err");
            err.ref = requestObject.ref;
            //console.log(err);
            callback(err, null);
        }
    });
};

var chargeAuthCustomerProfile = function(requestFields, callback){
    var requestObject = createPriorAuthReqObj('priorAuthCaptureTransaction', requestFields);
    var requestXML = utility.trimRootElement(utility.createXMLfromJSON(requestObject));
    //console.log(requestXML);
    authComms(requestXML, function(err, responseXML){
        if(!err) {
            //console.log("Prior Auth !err");
            responseXML.ref = requestObject.ref;
            //console.log(responseXML);
            callback(null, responseXML);
        }
        else{
            //console.log("Prior Auth Only err");
            err.ref = requestObject.ref;
            //console.log(err);
            callback(err, null);
        }
    });
};


var refundTransaction = function(requestXML, callback){
    var requestObject = createTranRequestObject('refundTransaction', requestFields);
    var requestXML = utility.trimRootElement(utility.createXMLfromJSON(requestObject));
    console.log(requestXML);
    authComms(requestXML, function(err, responseXML){
        if(!err) {
            console.log(err);
            callback(err, null);
        }
        else{
            console.log(responseXML);
            callback(null, responseXML);
        }
    });
};


var voidTransaction = function(requestXML, callback){
    var requestObject = createTranRequestObject('voidTransaction', requestFields);
    var requestXML = utility.trimRootElement(utility.createXMLfromJSON(requestObject));
    console.log(requestXML);
    authComms(requestXML, function(err, responseXML){
        if(!err) {
            console.log(err);
            callback(err, null);
        }
        else{
            console.log(responseXML);
            callback(null, responseXML);
        }
    });
};


var debitBankAccount = function(requestXML, callback){
    var requestObject = createTranRequestObject('authCaptureTransaction', requestFields);
    var requestXML = utility.trimRootElement(utility.createXMLfromJSON(requestObject));
    console.log(requestXML);
    authComms(requestXML, function(err, responseXML){
        if(!err) {
            console.log(err);
            callback(err, null);
        }
        else{
            console.log(responseXML);
            callback(null, responseXML);
        }
    });
};


var creditBankAccount = function(requestXML, callback){
    var requestObject = createTranRequestObject('refundTransaction', requestFields);
    var requestXML = utility.trimRootElement(utility.createXMLfromJSON(requestObject));
    console.log(requestXML);
    authComms(requestXML, function(err, responseXML){
        if(!err) {
            console.log(err);
            callback(err, null);
        }
        else{
            console.log(responseXML);
            callback(null, responseXML);
        }
    });
};




var chargeTokenizedCreditCard = function(requestXML, callback){
    var requestObject = createTranRequestObject('authCaptureTransaction', requestFields);
    var requestXML = utility.trimRootElement(utility.createXMLfromJSON(requestObject));
    console.log(requestXML);
    authComms(requestXML, function(err, responseXML){
        if(!err) {
            console.log(err);
            callback(err, null);
        }
        else{
            console.log(responseXML);
            callback(null, responseXML);
        }
    });
};

module.exports = {
    chargeCreditCard: chargeCreditCard,
    authOnlyCreditCard: authOnlyCreditCard,
    chargeAuthCreditCard: chargeAuthCreditCard,
    refundTransaction: refundTransaction,
    voidTransaction: voidTransaction,
    debitBankAccount: debitBankAccount,
    creditBankAccount: creditBankAccount,
    chargeCustomerProfile: chargeCustomerProfile,
    chargeTokenizedCreditCard: chargeTokenizedCreditCard,
    authOnlyCustomerProfile: authOnlyCustomerProfile,
    chargeAuthCustomerProfile: chargeAuthCustomerProfile
};