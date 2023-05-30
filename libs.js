'use strict';
/**
 * Содержит пути к библиотекам, установленных с помощью NPM и компилирующихся в vendor.min.(css|js)
 */
module.exports = {
    styles: [
      'node_modules/swiper/dist/css/swiper.css',
    ],
    scripts: [
    	'node_modules/jquery/dist/jquery.js',
    	'node_modules/swiper/dist/js/swiper.js',
    	'src/js/vendors/utils.js',
    ]
}