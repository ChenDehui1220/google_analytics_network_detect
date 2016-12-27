/* globals phantom */

'use strict';

var page = require('webpage').create(),
    config = require('./config'),
    scripts = require('./scripts'),
    reports = require('./report'),
    system = require('system'),
    collect, t, env, gaId, report;

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
page.onResourceRequested = function(req, net) {
    if (/(www\.google-analytics\.com\/collect)/i.test(req.url)) {
        collect.pass = true;
        collect.request.push(req.url);

        if (/(t=pageview)/i.test(req.url)) {
            collect.result = 'pageview already sent';
        }
    }

    if (/(affiliate|pmd)/i.test(req.url)) {
    	net.abort();
    }
};

page.onConsoleMessage = function(msg, lineNum, sourceId) {
  // console.log('CONSOLE: ' + msg + ' (from line #' + lineNum + ' in "' + sourceId + '")');
};

page.onResourceError = function(resourceError) {
  // console.log('Unable to load resource (#' + resourceError.id + 'URL:' + resourceError.url + ')');
  // console.log('Error code: ' + resourceError.errorCode + '. Description: ' + resourceError.errorString);
};

page.onResourceReceived = function(res) {
	// console.log('Response (#' + res.id + ', stage "' + res.stage + '"): ' + JSON.stringify(res));
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

    //set api
    var pageUrl = '';

    if (data.isMobile === true) {
        pageUrl = config[env].webSiteUrl.mobile + data.url;
        page.settings.userAgent = config.globals.userAgent.mobile;
        page.viewportSize = config.globals.viewportSize.mobile;
    } else {
        pageUrl = config[env].webSiteUrl.desktop + data.url;
        page.settings.userAgent = config.globals.userAgent.desktop;
        page.viewportSize = config.globals.viewportSize.desktop;
    }

    //report collect    
    collect.page = data.name;
    collect.url = pageUrl;
    collect.result = 'failure';

    console.log('\r');
    console.log(data.name + ' ' + pageUrl + ' ... done');

    page.settings.resourceTimeout = 8000;
    
    page.open(pageUrl, function(status) {
        if (status === "success") {
            collect.load = Date.now() - t;
            report.collect(collect);
        } else {
            console.log('Fail to load the ' + pageUrl);
            report.collect(collect);
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

    //reset some variables
    t = Date.now();
    collect = { page: '', url: '', load: '', request: [], result: '', pass: false };

    //handle page
    handle_page(data);
}

//start scripts process
console.log('=== Google Analytics Monitoring ===');
console.log('=== gaId ' + gaId + ' ===');

//init
next_page();
