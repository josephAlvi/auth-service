/**
 * Created by Yousuf on 5/13/2016.
 */
var xml2js = require('xml2js');
var fs = require('fs');

var trimRootElement = function (passValue){
    if(passValue.lastIndexOf("\n")>0) {
        var returnValue = passValue.split('\n');
        var returnString = '';
        returnValue.splice(0,1);
        returnValue.splice((returnValue.length-1),1);
        for(var i=0; i<returnValue.length; i++)
            returnValue[i] = returnValue[i].trim();
        return returnValue.join('');
    }
    else
        return passValue;
};

var createXMLfromJSON = function(jsObject){
    var builder = new xml2js.Builder({rootName: 'root', headless: true});
    var xml = builder.buildObject(jsObject);
    return xml;
};

var getTranRef = function(){
    buf = fs.readFileSync('./Utility/feed', 'utf8');
    var prevRef = Number(buf);
    prevRef++;
    var ref = '' + prevRef;
    var pad = '000000';
    var newRef = pad.substring(0, pad.length - ref.length) + ref;
    fs.writeFile('./Utility/feed', newRef, function(err){});
    return newRef;

    //fs.readFile('./Utility/feed.txt', 'utf8', function(err, data){
    //    if(!err){
    //        var prevRef = Number(data);
    //        prevRef++;
    //        console.log('newRef = ' + prevRef);
    //        var ref = '' + prevRef;
    //        console.log('ref = ' + ref);
    //        var pad = '000000';
    //        var newRef = pad.substring(0, pad.length - ref.length) + ref;
    //        console.log('newRef = ' + newRef);
    //        //fs.writeFile('./Utility/feed.txt', newRef, function(err){});
    //        console.log('newRef = ' + newRef);
    //        return pad.substring(0, pad.length - ref.length) + ref;
    //    }else{
    //        return '000000';
    //    }
    //});
};

module.exports = {
    trimRootElement: trimRootElement,
    createXMLfromJSON: createXMLfromJSON,
    getTranRef: getTranRef
};