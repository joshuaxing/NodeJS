/*
 * @Author: your name
 * @Date: 2020-03-19 14:06:03
 * @LastEditTime: 2020-03-19 14:18:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yuanzhou-salesH5\src\utils\getBase64.js
 */

function getBase64Image(url, callback, outputFormat) {
    //width、height调用时传入具体像素值，控制大小 ,不传则默认图像大小
    var canvas = document.createElement('CANVAS'),
　　ctx = canvas.getContext('2d'),
　　img = new Image;
　　img.crossOrigin = 'Anonymous';
　　img.onload = function(){
    　　canvas.height = img.height;
    　　canvas.width = img.width;
    　　ctx.drawImage(img,0,0);
    　　var dataURL = canvas.toDataURL(outputFormat || 'image/png');
    　　callback.call(this, dataURL);
    　　canvas = null; 
    };
　　img.src = url;
  }

module.exports = {
 getBase64Image
};
