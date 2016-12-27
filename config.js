/**
 * 設定檔
 * 設定不同環境gaID及網址
 */

/* jshint node: true */

'use strict';

var config = {
	dev: {
		gaId: 'UA-54005280-3',
		webSiteUrl: {
            desktop: 'http://gary_chen.mall.mall.dev.hq.hiiir/',
            mobile: 'http://gary_chen.mobile.mall.dev.hq.hiiir/'
        }
	},
    beta: {
    	gaId: 'UA-54005280-3',
    	webSiteUrl: {
            desktop: 'https://mall.beta.hiiir-inc.com/',
            mobile: 'http://mall-m.beta.hiiir-inc.com/'
        }
    },
    sta: {
    	gaId: 'UA-54005280-1',
    	webSiteUrl: {
            desktop: 'http://mall.sta.hiiir-inc.com/',
            mobile: 'http://mall-m.sta.hiiir-inc.com/'
        }
    },
    prod: {
    	gaId: 'UA-54005280-1',
    	webSiteUrl: {
            desktop: 'http://shopping.friday.tw/',
            mobile: 'http://m.shopping.friday.tw/'
        }
    },
    globals: {
        userAgent: {
            desktop: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36',
            mobile: 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
        },
        viewportSize: {
            desktop: {width: 1366, height: 694},
            mobile: {width: 320, height: 568}
        }
    }

};

module.exports = config;
