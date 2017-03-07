/**
 * Created by Yousuf on 5/10/2016.
 */

//get the packages we need
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var authTranProcessor = require('./Authorize/Processors/tranProcessor.js');
var authCimProcessor = require('./Authorize/Processors/cimProcessor.js');

var port = process.env.PORT || 80;

//configure the bodyParser()
//this middleware let us get the data from HTTP POST
app.use(bodyParser.urlencoded({extended: true}));
//breaking issue in following piece of code
app.use(bodyParser.json());
//
//app.get('/', function(req, res){
//   console.log('req received');
//});

//ROUTES for our API
var router = express.Router();

router.use(function(req, resp, next){
   //do logging
    console.log('Request received');
    next();
});

////test route to make sure everything is working
router.get('/', function(req, res){
    res.json({message: 'Hooray! Welcome to Auth API'});
});
////more routes for our api will happen here
//

router.route('/txn/createTranRequest')
    .post(function(req, res){
        //console.log(req.ip);
        //res.json(req.body);
        //res.send("json recived");
        var tranType = req.body.tranType;
        //console.log('tranType = '+ tranType);
        req.body.customerIP = req.ip;
        switch (tranType){
            case 'chargeCreditCard':
                authTranProcessor.chargeCreditCard(req.body, function(err, responseXML){
                    if(!err){
                        //console.log(responseXML);
                        res.json(responseXML);
                    }else{
                        //console.log(err);
                        res.json(err.response);
                    }
                });
                break;
            case 'authOnlyCreditCard':
                authTranProcessor.authOnlyCreditCard(req.body, function(err, responseXML){
                    if(!err){
                        res.json(responseXML);
                    }else{
                        res.json(err.response);
                    }
                });
                break;
            case 'chargeAuthCreditCard':
                authTranProcessor.chargeAuthCreditCard(req.body, function(err, responseXML){
                    if(!err){
                        res.json(responseXML);
                    }else{
                        res.json(err.response);
                    }
                });
                break;
            case 'chargeCustomerProfile':
                authTranProcessor.chargeCustomerProfile(req.body, function(err, responseXML){
                    if(!err){
                        res.json(responseXML);
                    }else{
                        res.json(err.response);
                    }
                });
                break;
            case 'authOnlyCustomerProfile':
                authTranProcessor.authOnlyCustomerProfile(req.body, function(err, responseXML){
                    if(!err){
                        res.json(responseXML);
                    }else{
                        res.json(err.response);
                    }
                });
                break;
            case 'chargeAuthCustomerProfile':
                console.log('in here');
                authTranProcessor.authOnlyCustomerProfile(req.body, function(err, responseXML){
                    if(!err){
                        res.json(responseXML);
                    }else{
                        res.json(err.response);
                    }
                });
                break;
            default:
                authTranProcessor.chargeCreditCard(req.body, function(err, responseXML){
                    if(!err){
                        //console.log(responseXML);
                        res.json(responseXML);
                    }else{
                        //console.log(err);
                        res.json(err.response);
                    }
                });
                break;
        }
    });

router.route('/cim/createCustomerProfile')
    .post(function(req, res){
        authCimProcessor.createCustomerProfile(req.body, function(err, responseXML){
            if(!err){
                console.log('Response received successfully from AuthNet');
                console.log(responseXML);
                //res.end(responseXML.toSrting());
                res.json(responseXML);
            }else{
                console.log('Error from AuthNet');
                console.log(err);
                //res.end(err.message);
                res.json(err);
            }
        });
    });

router.route('/cim/createCustomerPaymentProfile')
    .post(function(req, res){
        console.log(req.body);
        authCimProcessor.createCustomerPaymentProfile(req.body, function(err, responseXML){
            if(!err){
                console.log('Response received successfully from AuthNet');
                console.log(responseXML);
                //res.end(responseXML.toSrting());
                res.json(responseXML);
            }else{
                console.log('Error from AuthNet');
                console.log(err);
                //res.end(err.message);
                res.json(err);
            }
        });
    });

router.route('/cim/createCustomerProfileTransaction')
    .post(function(req, res){
        console.log(req.body);
        authCimProcessor.createCustomerProfileTransaction(req.body, function(err, responseXML){
            if(!err){
                console.log('Response received successfully from AuthNet');
                console.log(responseXML);
                //res.end(responseXML.toSrting());
                res.json(responseXML);
            }else{
                console.log('Error from AuthNet');
                console.log(err);
                //res.end(err.message);
                res.json(err);
            }
        });
    });



////register our routes. All of our ROUTES will be prefixed with /api
app.use('/api', router);

app.listen(port);
console.log('Magic happening on port ' + 80);

