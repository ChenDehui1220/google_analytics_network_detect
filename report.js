/**
 * 產生HTML檔
 */

/* jshint node: true */

'use strict';

var fs = require('fs');
var report = function() {
    this.gaid = '';
    this.container = '<!DOCTYPE html><html lang="zh"><head><meta charset="UTF-8">';
    this.container += '<title>Google Analytics Network Test Results</title>';
    this.container += '<style>body{font-size:13px;font-family:Arial;}section{padding:5px;border:1px solid #999;}td{word-break: break-all}';
    this.container += '.label{width:80px;padding:5px;text-align:center;background-color: #DAA2DA;}';
    this.container += '.res{background-color:#bed905}</style>';
    this.container += '</head><body><h1>Google Analytics Network Test Results</h1>';
    this.contents = '';
    this.containerEnd = '</body></html>';
};

/**
 * collect all params
 * @param  {object} obj  [page, url, request, result]
 * @return {voild}
 */
report.prototype.collect = function(obj) {
    this.contents += '<section>';
    this.contents += '<table>';
    this.contents += '<tr><td class="label">Page</td><td>' + obj.page + '</td></tr>';
    this.contents += '<tr><td class="label">Url</td><td>' + obj.url + '</td></tr>';
    this.contents += '<tr><td class="label">Load</td><td>' + ((obj.load !== '') ? obj.load : '') + 'ms</td></tr>';
    this.contents += '<tr><td class="label">Req</td><td>' + obj.request + '</td></tr>';
    this.contents += '<tr><td class="label res">Res</td><td>' + obj.result + '</td></tr>';
    this.contents += '</table>';
    this.contents += '</section>';
};

report.prototype.create = function() {
    var d = new Date();
    var n = d.toLocaleString();
    fs.write('./report/index.html', this.container + '<h4>GaId : ' + this.gaid + '<br>Updated by ' + n + '</h4>' + this.contents + this.containerEnd, 'w');
    console.log('\r\nreport to a file [./report/index.html]');
};

module.exports = report;
