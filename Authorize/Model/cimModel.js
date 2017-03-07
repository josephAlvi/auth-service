/**
 * Created by Yousuf on 5/16/2016.
 */

var Profile = function(){
    this.merchantCustomerId = '';
    this.description = '';
    this.email = '';
    this.customerProfileId = '';
    this.paymentProfiles = null;
};

var Tax = function(){
    this.amount = '';
    this.name = '';
    this.description = '';
};

var Shipping = function(){
    this.amount = '';
    this.name = '';
    this.description = '';
};

var Order = function(){
    this.invoiceNumber = '';
};

var Transaction = function(){
    this.refId = '';
    this.amount = '';
    this.tax = new Tax();
    this.shipping = new Shipping();
    this.customerProfileId = '';
    this.customerPaymentProfileId = '';
    this.order = new Order();
};

var customerProfilePaymentProfileKey = function(){
    this.customerProfileId = '';
    this.customerPaymentProfileId = '';

};


module.exports = {
    Profile: Profile,
    Tax: Tax,
    Shipping: Shipping,
    Order: Order,
    Transaction: Transaction,
    customerProfilePaymentProfileKey: customerProfilePaymentProfileKey
};


