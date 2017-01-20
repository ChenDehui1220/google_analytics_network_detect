/* globals phantom, window */

'use strict';

var page = require('webpage').create(),
    config = require('./config'),
    scripts = require('./scripts'),
    reports = require('./report'),
    system = require('system'),
    collect, t, env, gaId, report;

var everyAryTime = 3000;
var scriptPageAry = scripts.pageview.page;

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
    if (/(affiliate|pmd)/i.test(req.url)) {
        net.abort();
    }
};

page.onResourceReceived = function(req) {
    if (/(www\.google-analytics\.com\/collect)/i.test(req.url)) {
        

        if (/(t=pageview)/i.test(req.url) && req.stage === 'end') {

            collect.pass = true;
            collect.request.push(req.url);
            collect.load = Date.now() - t;
            collect.result = 'pageview already sent';

            report.collect(collect);
        }
    }
};

page.onLoadStarted = function() {
    system.stderr.writeLine('= onLoadStarted()');
    var currentUrl = page.evaluate(function() {
        return window.location.href;
    });
    system.stderr.writeLine('  leaving url: ' + currentUrl);
};

page.onLoadFinished = function(status) {
    system.stderr.writeLine('= onLoadFinished()');
    system.stderr.writeLine('  status: ' + status);
};

// === event listener end ===

function handle_page(data) {

    //set api
    var pageUrl = '';

    //set desktop or mobile
    if (data.isMobile === true) {
        pageUrl = config[env].webSiteUrl.mobile + data.url;
        page.settings.userAgent = config.globals.userAgent.mobile;
        page.viewportSize = config.globals.viewportSize.mobile;
    } else {
        pageUrl = config[env].webSiteUrl.desktop + data.url;
        page.settings.userAgent = config.globals.userAgent.desktop;
        page.viewportSize = config.globals.viewportSize.desktop;
    }

    //report object    
    collect.page = data.name;
    collect.url = pageUrl;
    collect.result = 'failure';

    console.log('\r');
    console.log(data.name + ' ' + pageUrl);

    //explore website
    page.open(pageUrl, function(status) {
        if (status !== "success") {
            console.log('Fail to load the ' + pageUrl);
            report.collect(collect);
        }
    });
}

function next_page() {
    var data = scriptPageAry.shift();

    //reset some variables
    t = Date.now();
    collect = { page: '', url: '', load: '', request: [], result: '', pass: false };

    //handle page
    handle_page(data);
}

//start scripts process
console.log('=== Google Analytics Monitoring ===');
console.log('=== gaId ' + gaId + ' ===');

var interval = setInterval(function() {

    if (scriptPageAry.length === 0) {
        clearInterval(interval);
        report.create();
        phantom.exit(0);
        return false;
    }

    next_page();

}, everyAryTime);
