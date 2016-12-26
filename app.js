/* globals phantom */

'use strict';

var page = require('webpage').create(),
    config = require('./config'),
    scripts = require('./scripts'),
    reports = require('./report'),
    system = require('system'),
    // t = Date.now(),
    collect = {page:'', url:'', request:'', result: ''},
    env, gaId, report;

//get environment arguments. ex: beta, production
env = system.args[1];
//get gaId
gaId = config[env].gaId;

//init report
report = new reports();
report.gaid = gaId;

//check env argument exsited!?
if (typeof env !== 'string' && ['beta', 'production'].indexOf(env) === -1) {
    console.log('Please enter correct command. ex: phantomjs app.js beta');
    phantom.exit();
}

// === event listener ===

var reqParse = function(req) {
    if (/(http:\/\/www.google-analytics\.com\/collect)/i.test(req.url)) {
        if (/(t=pageview)/i.test(req.url)) {
            collect.request = req.url;
            collect.result = 'pageview already sent';
        } else {
            collect.request = req.url;
            collect.result = 'failure';
        }
    }
};

var resParse = function(res) {
    if (/(www\.google-analytics\.com\/collect)/i.test(res.url)) {
        // console.log('received: ' + JSON.stringify(res, undefined, 4));
        // console.log(res.url);
    }
};

page.onResourceRequested = function(req) {
    reqParse(req);
};

page.onResourceReceived = function(res) {
    resParse(res);
};

page.onConsoleMessage = function(msg) {
  // console.log('Page title is ' + msg);
};

page.onError = function(msg, trace) {

    // var msgStack = ['ERROR: ' + msg];

    // if (trace && trace.length) {
    //   msgStack.push('TRACE:');
    //   trace.forEach(function(t) {
    //     msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function +'")' : ''));
    //   });
    // }

    // console.error(msgStack.join('\n'));
};

// === event listener end ===

function handle_page(data) {

	console.log('\r');
    console.log(data.name + ' ' + config[env].webSiteUrl + data.url + ' ... done');

    collect.page = data.name;
    collect.url = config[env].webSiteUrl + data.url;

    page.open(config[env].webSiteUrl + data.url, function(status) {
        if (status === "success") {

            // t = Date.now() - t;
            // console.log('Loading time ' + t + ' ms');
            // console.log(config[env].gaId);

            report.collect(collect);
        } else {
            console.log('Fail to load the ' + config[env].webSiteUrl);
        }

        setTimeout(next_page, 100);
    });
}

function next_page() {
    var data = scripts.pageview.page.shift();

    if (typeof data !== 'object') {
    	report.create();
        phantom.exit(0);
    }
    handle_page(data);
}

//start scripts process
console.log('=== Google Analytics Monitoring ===');
console.log('=== gaId ' + gaId + ' ===');

//init
next_page();
