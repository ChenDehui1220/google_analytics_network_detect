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
            { name: '(Desktop)首頁', url: '', isMobile: false },
            { name: '(Desktop)搜尋頁', url: 'search?keyword=iphone', isMobile: false },
            // { name: '(Desktop)商品頁', url: 'item/RUBON_%E8%80%80%E7%9C%BC%E8%87%AA%E4%BF%A1%E9%8B%AA%E6%A3%89%E9%80%A3%E5%B8%BD%E5%A4%96%E5%A5%97-S00006570', isMobile: false },
            // { name: '(Desktop)館首', url: 'shopindex/index?shopId=15', isMobile: false },
            // { name: '(Desktop)中分頁首', url: 'midindex/index?midId=63', isMobile: false },
            // { name: '(Desktop)策展', url: 'lifestyle/design', isMobile: false },
            // { name: '(Mobile)首頁', url: '', isMobile: true },
            // { name: '(Mobile)搜尋頁', url: 'index/search?keyword=iphone', isMobile: true },
            // { name: '(Mobile)商品頁', url: '/index/salecenter?saleNo=S00006570', isMobile: true },
            // { name: '(Mobile)館首', url: 'index/shopindex?shopid=15', isMobile: true },
            // { name: '(Mobile)中分頁首', url: 'index/midindex?shopid=15&midid=63&t=2', isMobile: true },
        ]
    }

};

module.exports = scripts;
