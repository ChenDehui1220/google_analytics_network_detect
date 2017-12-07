/**
 * 產生HTML檔
 */

/* jshint node: true */

'use strict';

var fs = require('fs');
var config = require('./config');

var report = function() {
    this.gaid = '';
    this.title = config.globals.report.title;

    this.container = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">';
    this.container += '<title>' + this.title + '</title>';
    this.container += '<link rel="stylesheet" type="text/css" href="style.css">';
    this.container += '<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>';
    this.container += '<script src="app.js"></script>';
    this.container += '</head><body><h1>' + this.title + '</h1>';
    this.contents = '';
    this.containerEnd = '</body></html>';
};

/**
 * collect all params
 * @param  {object} obj  [page, url, request, result, pass]
 * @return {voild}
 */
report.prototype.collect = function(obj) {
    var fstyle = (obj.pass) ? 'good' : ' bad';
    var gaDebugUrl;

    this.contents += '<section>';
    this.contents += '<table>';
    this.contents += '<tr><td class="label">Page</td><td>' + obj.page + '</td></tr>';
    this.contents += '<tr><td class="label">Url</td><td>' + obj.url + '</td></tr>';
    this.contents += '<tr><td class="label">Load</td><td>' + ((obj.load !== '') ? obj.load : '') + 'ms</td></tr>';
    this.contents += '<tr><td class="label">Req</td><td><ul>';

    for (var i in obj.request) {
        gaDebugUrl = obj.request[i].replace('www.google-analytics.com/collect', 'www.google-analytics.com/debug/collect');
        this.contents += '<li><a href="' + gaDebugUrl + '" target="_blank">' + obj.request[i] + '</a></li>';
    }

    this.contents += '</ul></td></tr>';
    this.contents += '<tr><td class="label ' + fstyle + '">Res</td><td>' + obj.result + '</td></tr>';
    this.contents += '</table>';
    this.contents += '</section>';
};

report.prototype.create = function() {
    var d = new Date();
    var n = d.toLocaleString();
    fs.write('./report/index.html', this.container + '<h4>Updated by ' + n + '</h4>' + this.contents + this.containerEnd, 'w');
    if (fs.isFile('report/style.css')) { 
        fs.remove('report/style.css'); 
    }
    fs.copy('report_resource/style.css', 'report/style.css');
    
    if (fs.isFile('report/app.js')) { 
        fs.remove('report/app.js'); 
    }
    fs.copy('report_resource/app.js', 'report/app.js');

    console.log('\r\nreport to a file [./report/index.html]');
};

module.exports = report;
