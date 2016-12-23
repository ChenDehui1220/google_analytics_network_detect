/**
 * 腳本檔
 * 設定各頁驗證項目
 */

/* jshint node: true */

'use strict';

var scripts = {

    pageview: {
        description: '驗證各頁Pageview',
        page: [
            { name: '首頁', url: '' },
            { name: '館首', url: 'shopindex/index?shopId=15' },
            { name: '中分頁首', url: 'midindex/index?midId=63' },
            { name: '搜尋頁', url: 'search?keyword=iphone' },
            { name: '策展', url: '/lifestyle/design' }
        ]
    }

};

module.exports = scripts;
