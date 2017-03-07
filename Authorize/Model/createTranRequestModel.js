/**
 * Created by Yousuf on 5/11/2016.
 */

var CreditCard = function(){
    this.cardNumber = '';
    this.expirationDate = '';
    this.cardCode = '';
};

var LineItem = function(){
    this.itemId = '';
    this.name = '';
    this.description = '';
    this.quantity = '';
    this.unitPrice = '';
};

var Setting = function(){
    this.settingName = '';
    this.settingValue = '';
};

var UserField = function(){
    this.name = '';
    this.value = '';
};

var Payment = function(){
    this.creditCard = new CreditCard();
};

var PaymentProfile = function(){
  this.paymentProfileId = '';
};

var Profile = function(){
    this.customerProfileId = '';
    this.paymentProfile = new PaymentProfile();
};

var Order = function(){
    this.invoiceNumber = '';
    this.description = '';
};

var LineItems = function(){
    this.lineItem = new LineItem();
};

var Tax = function(){
    this.amount = '';
    this.name = '';
    this.description = '';
};

var Duty = function(){
    this.amount = '';
    this.name = '';
    this.description = '';
};

var Shipping = function(){
    this.amount = '';
    this.name = '';
    this.description = '';
};

var BillTo = function() {
    this.firstName = '';
    this.lastName = '';
    this.company = '';
    this.address = '';
    this.city = '';
    this.state = '';
    this.zip = '';
    this.country = '';
};

var ShipTo = function() {
    this.firstName = '';
    this.lastName = '';
    this.company = '';
    this.address = '';
    this.city = '';
    this.state = '';
    this.zip = '';
    this.country = '';
};

var TransactionSettings = function(){
    this.setting = new Setting();
};

var UserFields = function(){
    this.userField = new UserField();
};

var TransactionRequest = function() {
    this.transactionType = '';
    this.amount = '';
    this.payment = new Payment();
    this.order = new Order();
    this.lineItems = new LineItems();
    this.tax = new Tax();
    this.duty = new Duty();
    this.shipping = new Shipping();
    this.poNumber = '';
    this.billTo = new BillTo();
    this.shipTo = new ShipTo();
    this.customerIP = '';
    this.transactionSettings = new TransactionSettings();
    this.userFields = new UserFields();
};

var AuthPriorTranRequest = function() {
    this.transactionType = '';
    this.amount = '';
    this.refTransId = '';
    this.order = new Order();
};

var ProfileTransactionRequest = function() {
    this.transactionType = '';
    this.amount = '';
    this.profile = new Profile();
    this.order = new Order();
    this.lineItems = new LineItems();
    this.tax = new Tax();
    this.duty = new Duty();
    this.shipping = new Shipping();
    this.poNumber = '';
    this.shipTo = new ShipTo();
    this.customerIP = '';
    this.transactionSettings = new TransactionSettings();
    this.userFields = new UserFields();
};

var CreateTransactionRequest = function () {
    this.refId = '';
    this.transactionRequest = new TransactionRequest();
};

module.exports = {
    CreateTransactionRequest: CreateTransactionRequest,
    TransactionRequest: TransactionRequest,
    UserFields: UserFields,
    TransactionSettings: TransactionSettings,
    ShipTo: ShipTo,
    BillTo: BillTo,
    Shipping: Shipping,
    Duty: Duty,
    Tax: Tax,
    LineItems: LineItems,
    Order: Order,
    Payment: Payment,
    UserField: UserField,
    Setting: Setting,
    LineItem: LineItem,
    CreditCard: CreditCard,
    AuthPriorTranRequest: AuthPriorTranRequest,
    Profile: Profile,
    PaymentProfile: PaymentProfile,
    ProfileTransactionRequest: ProfileTransactionRequest
};