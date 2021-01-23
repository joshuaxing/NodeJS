/*
 * @Author: your name
 * @Date: 2020-03-03 00:35:39
 * @LastEditTime: 2020-03-12 14:23:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-mobile-qqMusic\.postcssrc.js
 */
module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {},
   
    "postcss-px-to-viewport": {
      "viewportWidth": 750, // (Number) The width of the viewport.
      "viewportHeight": 1334, // (Number) The height of the viewport.
      "unitPrecision": 3, // (Number) The decimal numbers to allow the REM units to grow to.
      "viewportUnit": "vw", // (String) Expected units.
      "selectorBlackList": [".ignore", ".hairlines", ".antd"], // (Array) The selectors to ignore and leave as px.
      "minPixelValue": 1, // (Number) Set the minimum pixel value to replace.
      "mediaQuery": false, // (Boolean) Allow px to be converted in media queries.
      "exclude": /(\/|\\)(node_modules)(\/|\\)/
    },
    "postcss-aspect-ratio-mini": {}, // fix an element's dimensions to an aspect ratio 
    "postcss-write-svg": { 
      utf8: false
    },  // lets you write SVGs directly in CSS
    "cssnano": {}
  }
}