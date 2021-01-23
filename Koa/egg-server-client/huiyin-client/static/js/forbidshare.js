/*
 * @Author: your name
 * @Date: 2020-04-21 11:54:33
 * @LastEditTime: 2020-04-21 12:35:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \huiyin-client\static\js\forbidshare.js
 */
/*
 * @Author: your name
 * @Date: 2020-04-21 11:52:34
 * @LastEditTime: 2020-04-21 11:52:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yuanzhou-sales\static\js\forbidshare.js
 */
function onBridgeReady() {
  WeixinJSBridge.call("hideOptionMenu");
}

if (typeof WeixinJSBridge == "undefined") {
  if (document.addEventListener) {
    document.addEventListener("WeixinJSBridgeReady", onBridgeReady, false);
  } else if (document.attachEvent) {
    document.attachEvent("WeixinJSBridgeReady", onBridgeReady);
    document.attachEvent("onWeixinJSBridgeReady", onBridgeReady);
  }
} else {
  onBridgeReady();
}

/*
if (isWeixin) {
  window.alert = function (name) {
    var iframe = document.createElement("IFRAME");
    iframe.style.display = "none";
    iframe.setAttribute("src", "data:text/plain,");
    document.documentElement.appendChild(iframe);
    window.frames[0].window.alert(name);
    iframe.parentNode.removeChild(iframe);
  };
}
*/