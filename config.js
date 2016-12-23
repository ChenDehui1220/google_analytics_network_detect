/**
 * 設定檔
 * 設定不同環境gaID及網址
 */

/* jshint node: true */

'use strict';

var config = {
	dev: {
		gaId: 'UA-54005280-3',
		webSiteUrl: 'http://gary_chen.mall.mall.dev.hq.hiiir/'
	},
    beta: {
    	gaId: 'UA-54005280-3',
    	webSiteUrl: 'http://mall.beta.hiiir-inc.com/'
    },
    sta: {
    	gaId: 'UA-54005280-1',
    	webSiteUrl: 'http://mall.sta.hiiir-inc.com/'
    },
    prod: {
    	gaId: 'UA-54005280-1',
    	webSiteUrl: 'http://shopping.friday.tw/'
    }

};

module.exports = config;
