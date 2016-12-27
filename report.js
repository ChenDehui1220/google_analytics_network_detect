/**
 * 產生HTML檔
 */

/* jshint node: true */

'use strict';

var fs = require('fs');

var report = function() {
    this.gaid = '';
    this.title = 'Google Analytics Network Test Results';
    this.container = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">';
    this.container += '<title>' + this.title + '</title>';
    this.container += '<style>body{font-size:13px;font-family:Arial;}section{padding:5px;border:1px solid #999;}td{word-break: break-all}';
    this.container += '.label{width:80px;padding:5px;text-align:center;background-color: #DAA2DA;}a:link,a:visited{color:black;text-decoration:none;}';
    this.container += '.good{background-color:#bed905}.bad{background-color:red;}';
    this.container += 'ul{padding:0;margin:0}li{list-style:none;padding:5px 0;}</style>';
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
    fs.write('./report/index.html', this.container + '<h4>Tracking ID : ' + this.gaid + '<br>Updated by ' + n + '</h4>' + this.contents + this.containerEnd, 'w');
    console.log('\r\nreport to a file [./report/index.html]');
};

module.exports = report;
