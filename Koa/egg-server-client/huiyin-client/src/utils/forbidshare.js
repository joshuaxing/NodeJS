/*
 * @Author: your name
 * @Date: 2020-04-21 11:55:23
 * @LastEditTime: 2020-04-21 11:55:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \huiyin-client\src\utils\forbidshare.js
 */
/*
 * @Author: your name
 * @Date: 2020-04-21 11:43:39
 * @LastEditTime: 2020-04-21 11:51:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yuanzhou-sales\src\utils\forbidshare.js
 */
function onBridgeReady() {
  WeixinJSBridge.call("hideOptionMenu");
}

export default function forbidShare() {
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
}
