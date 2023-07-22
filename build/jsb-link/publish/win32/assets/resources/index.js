window.__require = function e(t, n, s) {
function i(o, a) {
if (!n[o]) {
if (!t[o]) {
var r = o.split("/");
r = r[r.length - 1];
if (!t[r]) {
var l = "function" == typeof __require && __require;
if (!a && l) return l(r, !0);
if (c) return c(r, !0);
throw new Error("Cannot find module '" + o + "'");
}
o = r;
}
var u = n[o] = {
exports: {}
};
t[o][0].call(u.exports, function(e) {
return i(t[o][1][e] || e);
}, u, u.exports, e, t, n, s);
}
return n[o].exports;
}
for (var c = "function" == typeof __require && __require, o = 0; o < s.length; o++) i(s[o]);
return i;
}({
AnysdkMgr: [ function(e, t) {
"use strict";
cc._RF.push(t, "dfe3edwzmNFyohgr8CILrto", "AnysdkMgr");
cc.Class({
extends: cc.Component,
properties: {
_isCapturing: !1
},
onLoad: function() {},
init: function() {
this.ANDROID_API = "com/vivigames/scmj/WXAPI";
this.IOS_API = "AppController";
},
login: function() {
cc.sys.os == cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod(this.ANDROID_API, "Login", "()V") : cc.sys.os == cc.sys.OS_IOS ? jsb.reflection.callStaticMethod(this.IOS_API, "login") : console.log("platform:" + cc.sys.os + " dosn't implement share.");
},
share: function(e, t) {
cc.sys.os == cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod(this.ANDROID_API, "Share", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", cc.vv.SI.appweb, e, t) : cc.sys.os == cc.sys.OS_IOS ? jsb.reflection.callStaticMethod(this.IOS_API, "share:shareTitle:shareDesc:", cc.vv.SI.appweb, e, t) : console.log("platform:" + cc.sys.os + " dosn't implement share.");
},
shareResult: function() {
if (!this._isCapturing) {
this._isCapturing = !0;
var e = cc.director.getWinSize(), t = (new Date(), jsb.fileUtils.getWritablePath() + "result_share.jpg");
jsb.fileUtils.isFileExist(t) && jsb.fileUtils.removeFile(t);
var n = new cc.RenderTexture(Math.floor(e.width), Math.floor(e.height));
n.setPosition(cc.p(e.width / 2, e.height / 2));
n.begin();
cc.director.getRunningScene().visit();
n.end();
n.saveToFile("result_share.jpg", cc.IMAGE_FORMAT_JPG);
var s = this, i = 0;
setTimeout(function n() {
if (jsb.fileUtils.isFileExist(t)) {
var c = 100 / e.height, o = Math.floor(e.width * c);
cc.sys.os == cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod(s.ANDROID_API, "ShareIMG", "(Ljava/lang/String;II)V", t, o, 100) : cc.sys.os == cc.sys.OS_IOS ? jsb.reflection.callStaticMethod(s.IOS_API, "shareIMG:width:height:", t, o, 100) : console.log("platform:" + cc.sys.os + " dosn't implement share.");
s._isCapturing = !1;
} else {
if (++i > 10) {
console.log("time out...");
return;
}
setTimeout(n, 50);
}
}, 50);
}
},
onLoginResp: function(e) {
cc.vv.http.sendRequest("/wechat_auth", {
code: e,
os: cc.sys.os
}, function(e) {
if (0 == e.errcode) {
cc.sys.localStorage.setItem("wx_account", e.account);
cc.sys.localStorage.setItem("wx_sign", e.sign);
}
cc.vv.userMgr.onAuth(e);
});
}
});
cc._RF.pop();
}, {} ],
AudioMgr: [ function(e, t) {
"use strict";
cc._RF.push(t, "f7582YPQ3hJ1J1oYxH3MYpi", "AudioMgr");
cc.Class({
extends: cc.Component,
properties: {
bgmVolume: 1,
sfxVolume: 1,
bgmAudioID: -1
},
init: function() {
var e;
null != (e = cc.sys.localStorage.getItem("bgmVolume")) && (this.bgmVolume = parseFloat(e));
null != (e = cc.sys.localStorage.getItem("sfxVolume")) && (this.sfxVolume = parseFloat(e));
cc.game.on(cc.game.EVENT_HIDE, function() {
console.log("cc.audioEngine.pauseAll");
cc.audioEngine.pauseAll();
});
cc.game.on(cc.game.EVENT_SHOW, function() {
console.log("cc.audioEngine.resumeAll");
cc.audioEngine.resumeAll();
});
},
getUrl: function(e) {
return cc.url.raw("resources/sounds/" + e);
},
playBGM: function(e) {
var t = this.getUrl(e);
console.log(t);
this.bgmAudioID >= 0 && cc.audioEngine.stop(this.bgmAudioID);
this.bgmAudioID = cc.audioEngine.play(t, !0, this.bgmVolume);
},
playSFX: function(e) {
var t = this.getUrl(e);
this.sfxVolume > 0 && cc.audioEngine.play(t, !1, this.sfxVolume);
},
setSFXVolume: function(e) {
if (this.sfxVolume != e) {
cc.sys.localStorage.setItem("sfxVolume", e);
this.sfxVolume = e;
}
},
setBGMVolume: function(e, t) {
this.bgmAudioID >= 0 && (e > 0 ? cc.audioEngine.resume(this.bgmAudioID) : cc.audioEngine.pause(this.bgmAudioID));
if (this.bgmVolume != e || t) {
cc.sys.localStorage.setItem("bgmVolume", e);
this.bgmVolume = e;
cc.audioEngine.setVolume(this.bgmAudioID, e);
}
},
pauseAll: function() {
cc.audioEngine.pauseAll();
},
resumeAll: function() {
cc.audioEngine.resumeAll();
}
});
cc._RF.pop();
}, {} ],
GameNetMgr: [ function(e, t) {
"use strict";
cc._RF.push(t, "4c5cfC0K1VGQYg9AqndkIE9", "GameNetMgr");
cc.Class({
extends: cc.Component,
properties: {
dataEventHandler: null,
roomId: null,
maxNumOfGames: 0,
numOfGames: 0,
numOfMJ: 0,
seatIndex: -1,
seats: null,
turn: -1,
button: -1,
dingque: -1,
chupai: -1,
isDingQueing: !1,
isHuanSanZhang: !1,
gamestate: "",
isOver: !1,
dissoveData: null
},
reset: function() {
this.turn = -1;
this.chupai = -1, this.dingque = -1;
this.button = -1;
this.gamestate = "";
this.dingque = -1;
this.isDingQueing = !1;
this.isHuanSanZhang = !1;
this.curaction = null;
for (var e = 0; e < this.seats.length; ++e) {
this.seats[e].holds = [];
this.seats[e].folds = [];
this.seats[e].pengs = [];
this.seats[e].angangs = [];
this.seats[e].diangangs = [];
this.seats[e].wangangs = [];
this.seats[e].dingque = -1;
this.seats[e].ready = !1;
this.seats[e].hued = !1;
this.seats[e].huanpais = null;
this.huanpaimethod = -1;
}
},
clear: function() {
this.dataEventHandler = null;
if (null == this.isOver) {
this.seats = null;
this.roomId = null;
this.maxNumOfGames = 0;
this.numOfGames = 0;
}
},
dispatchEvent: function(e, t) {
this.dataEventHandler && this.dataEventHandler.emit(e, t);
},
getSeatIndexByID: function(e) {
for (var t = 0; t < this.seats.length; ++t) if (this.seats[t].userid == e) return t;
return -1;
},
isOwner: function() {
return 0 == this.seatIndex;
},
getSeatByID: function(e) {
var t = this.getSeatIndexByID(e);
return this.seats[t];
},
getSelfData: function() {
return this.seats[this.seatIndex];
},
getLocalIndex: function(e) {
return (e - this.seatIndex + 4) % 4;
},
prepareReplay: function(e, t) {
this.roomId = e.id;
this.seats = e.seats;
this.turn = t.base_info.button;
for (var n = t.base_info, s = 0; s < this.seats.length; ++s) {
var i = this.seats[s];
i.seatindex = s;
i.score = null;
i.holds = n.game_seats[s];
i.pengs = [];
i.angangs = [];
i.diangangs = [];
i.wangangs = [];
i.folds = [];
console.log(i);
cc.vv.userMgr.userId == i.userid && (this.seatIndex = s);
}
this.conf = {
type: n.type
};
null == this.conf.type && this.conf.type;
},
getWanfa: function() {
var e = this.conf;
if (e && null != e.maxGames && null != e.maxFan) {
var t = [];
t.push(e.maxGames + "局");
t.push(e.maxFan + "番封顶");
e.hsz && t.push("换三张");
1 == e.zimo ? t.push("自摸加番") : t.push("自摸加底");
e.jiangdui && t.push("将对");
1 == e.dianganghua ? t.push("点杠花(自摸)") : t.push("点杠花(放炮)");
e.menqing && t.push("门清、中张");
e.tiandihu && t.push("天地胡");
return t.join(" ");
}
return "";
},
initHandlers: function() {
var e = this;
cc.vv.net.addHandler("login_result", function(t) {
console.log(t);
if (0 === t.errcode) {
t = t.data;
e.roomId = t.roomid;
e.conf = t.conf;
e.maxNumOfGames = t.conf.maxGames;
e.numOfGames = t.numofgames;
e.seats = t.seats;
e.seatIndex = e.getSeatIndexByID(cc.vv.userMgr.userId);
e.isOver = !1;
} else console.log(t.errmsg);
});
cc.vv.net.addHandler("login_finished", function() {
console.log("login_finished");
cc.director.loadScene("mjgame");
});
cc.vv.net.addHandler("exit_result", function() {
e.roomId = null;
e.turn = -1;
e.dingque = -1;
e.isDingQueing = !1;
e.seats = null;
});
cc.vv.net.addHandler("exit_notify_push", function(t) {
var n = t, s = e.getSeatByID(n);
if (null != s) {
s.userid = 0;
s.name = "";
e.dispatchEvent("user_state_changed", s);
}
});
cc.vv.net.addHandler("dispress_push", function() {
e.roomId = null;
e.turn = -1;
e.dingque = -1;
e.isDingQueing = !1;
e.seats = null;
});
cc.vv.net.addHandler("disconnect", function() {
if (null == e.roomId) cc.director.loadScene("hall"); else if (0 == e.isOver) {
cc.vv.userMgr.oldRoomId = e.roomId;
e.dispatchEvent("disconnect");
} else e.roomId = null;
});
cc.vv.net.addHandler("new_user_comes_push", function(t) {
var n = t.seatindex;
if (e.seats[n].userid > 0) e.seats[n].online = !0; else {
t.online = !0;
e.seats[n] = t;
}
e.dispatchEvent("new_user", e.seats[n]);
});
cc.vv.net.addHandler("user_state_push", function(t) {
var n = t.userid, s = e.getSeatByID(n);
s.online = t.online;
e.dispatchEvent("user_state_changed", s);
});
cc.vv.net.addHandler("user_ready_push", function(t) {
var n = t.userid, s = e.getSeatByID(n);
s.ready = t.ready;
e.dispatchEvent("user_state_changed", s);
});
cc.vv.net.addHandler("game_holds_push", function(t) {
var n = e.seats[e.seatIndex];
console.log(t);
n.holds = t;
for (var s = 0; s < e.seats.length; ++s) {
var i = e.seats[s];
null == i.folds && (i.folds = []);
null == i.pengs && (i.pengs = []);
null == i.angangs && (i.angangs = []);
null == i.diangangs && (i.diangangs = []);
null == i.wangangs && (i.wangangs = []);
i.ready = !1;
}
e.dispatchEvent("game_holds");
});
cc.vv.net.addHandler("game_begin_push", function(t) {
console.log("game_action_push");
console.log(t);
e.button = t;
e.turn = e.button;
e.gamestate = "begin";
e.dispatchEvent("game_begin");
});
cc.vv.net.addHandler("game_playing_push", function() {
console.log("game_playing_push");
e.gamestate = "playing";
e.dispatchEvent("game_playing");
});
cc.vv.net.addHandler("game_sync_push", function(t) {
console.log("game_sync_push");
console.log(t);
e.numOfMJ = t.numofmj;
e.gamestate = t.state;
"dingque" == e.gamestate ? e.isDingQueing = !0 : "huanpai" == e.gamestate && (e.isHuanSanZhang = !0);
e.turn = t.turn;
e.button = t.button;
e.chupai = t.chuPai;
e.huanpaimethod = t.huanpaimethod;
for (var n = 0; n < 4; ++n) {
var s = e.seats[n], i = t.seats[n];
s.holds = i.holds;
s.folds = i.folds;
s.angangs = i.angangs;
s.diangangs = i.diangangs;
s.wangangs = i.wangangs;
s.pengs = i.pengs;
s.dingque = i.que;
s.hued = i.hued;
s.iszimo = i.iszimo;
s.huinfo = i.huinfo;
s.huanpais = i.huanpais;
n == e.seatIndex && (e.dingque = i.que);
}
});
cc.vv.net.addHandler("game_dingque_push", function() {
e.isDingQueing = !0;
e.isHuanSanZhang = !1;
e.dispatchEvent("game_dingque");
});
cc.vv.net.addHandler("game_huanpai_push", function() {
e.isHuanSanZhang = !0;
e.dispatchEvent("game_huanpai");
});
cc.vv.net.addHandler("hangang_notify_push", function(t) {
e.dispatchEvent("hangang_notify", t);
});
cc.vv.net.addHandler("game_action_push", function(t) {
e.curaction = t;
console.log(t);
e.dispatchEvent("game_action", t);
});
cc.vv.net.addHandler("game_chupai_push", function(t) {
console.log("game_chupai_push");
var n = t, s = e.getSeatIndexByID(n);
e.doTurnChange(s);
});
cc.vv.net.addHandler("game_num_push", function(t) {
e.numOfGames = t;
e.dispatchEvent("game_num", t);
});
cc.vv.net.addHandler("game_over_push", function(t) {
console.log("game_over_push");
for (var n = t.results, s = 0; s < e.seats.length; ++s) e.seats[s].score = 0 == n.length ? 0 : n[s].totalscore;
e.dispatchEvent("game_over", n);
if (t.endinfo) {
e.isOver = !0;
e.dispatchEvent("game_end", t.endinfo);
}
e.reset();
for (s = 0; s < e.seats.length; ++s) e.dispatchEvent("user_state_changed", e.seats[s]);
});
cc.vv.net.addHandler("mj_count_push", function(t) {
console.log("mj_count_push");
e.numOfMJ = t;
e.dispatchEvent("mj_count", t);
});
cc.vv.net.addHandler("hu_push", function(t) {
console.log("hu_push");
console.log(t);
e.doHu(t);
});
cc.vv.net.addHandler("game_chupai_notify_push", function(t) {
var n = t.userId, s = t.pai, i = e.getSeatIndexByID(n);
e.doChupai(i, s);
});
cc.vv.net.addHandler("game_mopai_push", function(t) {
console.log("game_mopai_push");
e.doMopai(e.seatIndex, t);
});
cc.vv.net.addHandler("guo_notify_push", function(t) {
console.log("guo_notify_push");
var n = t.userId, s = t.pai, i = e.getSeatIndexByID(n);
e.doGuo(i, s);
});
cc.vv.net.addHandler("guo_result", function() {
console.log("guo_result");
e.dispatchEvent("guo_result");
});
cc.vv.net.addHandler("guohu_push", function() {
console.log("guohu_push");
e.dispatchEvent("push_notice", {
info: "过胡",
time: 1.5
});
});
cc.vv.net.addHandler("huanpai_notify", function(t) {
var n = e.getSeatByID(t.si);
n.huanpais = t.huanpais;
e.dispatchEvent("huanpai_notify", n);
});
cc.vv.net.addHandler("game_huanpai_over_push", function(t) {
console.log("game_huanpai_over_push");
var n, s = t.method;
n = 0 == s ? "换对家牌" : 1 == s ? "换下家牌" : "换上家牌";
e.huanpaimethod = s;
cc.vv.gameNetMgr.isHuanSanZhang = !1;
e.dispatchEvent("game_huanpai_over");
e.dispatchEvent("push_notice", {
info: n,
time: 2
});
});
cc.vv.net.addHandler("peng_notify_push", function(t) {
console.log("peng_notify_push");
console.log(t);
var n = t.userid, s = (t.pai, e.getSeatIndexByID(n));
e.doPeng(s, t.pai);
});
cc.vv.net.addHandler("gang_notify_push", function(t) {
console.log("gang_notify_push");
console.log(t);
var n = t.userid, s = t.pai, i = e.getSeatIndexByID(n);
e.doGang(i, s, t.gangtype);
});
cc.vv.net.addHandler("game_dingque_notify_push", function(t) {
e.dispatchEvent("game_dingque_notify", t);
});
cc.vv.net.addHandler("game_dingque_finish_push", function(t) {
for (var n = 0; n < t.length; ++n) e.seats[n].dingque = t[n];
e.dispatchEvent("game_dingque_finish", t);
});
cc.vv.net.addHandler("chat_push", function(t) {
e.dispatchEvent("chat_push", t);
});
cc.vv.net.addHandler("quick_chat_push", function(t) {
e.dispatchEvent("quick_chat_push", t);
});
cc.vv.net.addHandler("emoji_push", function(t) {
e.dispatchEvent("emoji_push", t);
});
cc.vv.net.addHandler("dissolve_notice_push", function(t) {
console.log("dissolve_notice_push");
console.log(t);
e.dissoveData = t;
e.dispatchEvent("dissolve_notice", t);
});
cc.vv.net.addHandler("dissolve_cancel_push", function(t) {
e.dissoveData = null;
e.dispatchEvent("dissolve_cancel", t);
});
cc.vv.net.addHandler("voice_msg_push", function(t) {
e.dispatchEvent("voice_msg", t);
});
},
doGuo: function(e, t) {
var n = this.seats[e];
n.folds.push(t);
this.dispatchEvent("guo_notify", n);
},
doMopai: function(e, t) {
var n = this.seats[e];
if (n.holds) {
n.holds.push(t);
this.dispatchEvent("game_mopai", {
seatIndex: e,
pai: t
});
}
},
doChupai: function(e, t) {
this.chupai = t;
var n = this.seats[e];
if (n.holds) {
var s = n.holds.indexOf(t);
n.holds.splice(s, 1);
}
this.dispatchEvent("game_chupai_notify", {
seatData: n,
pai: t
});
},
doPeng: function(e, t) {
var n = this.seats[e];
if (n.holds) for (var s = 0; s < 2; ++s) {
var i = n.holds.indexOf(t);
n.holds.splice(i, 1);
}
n.pengs.push(t);
this.dispatchEvent("peng_notify", n);
},
getGangType: function(e, t) {
if (-1 != e.pengs.indexOf(t)) return "wangang";
for (var n = 0, s = 0; s < e.holds.length; ++s) e.holds[s] == t && n++;
return 3 == n ? "diangang" : "angang";
},
doGang: function(e, t, n) {
var s = this.seats[e];
n || (n = this.getGangType(s, t));
if ("wangang" == n) {
-1 != s.pengs.indexOf(t) && -1 != (c = s.pengs.indexOf(t)) && s.pengs.splice(c, 1);
s.wangangs.push(t);
}
if (s.holds) for (var i = 0; i <= 4; ++i) {
var c;
if (-1 == (c = s.holds.indexOf(t))) break;
s.holds.splice(c, 1);
}
"angang" == n ? s.angangs.push(t) : "diangang" == n && s.diangangs.push(t);
this.dispatchEvent("gang_notify", {
seatData: s,
gangtype: n
});
},
doHu: function(e) {
this.dispatchEvent("hupai", e);
},
doTurnChange: function(e) {
var t = {
last: this.turn,
turn: e
};
this.turn = e;
this.dispatchEvent("game_chupai", t);
},
connectGameServer: function(e) {
this.dissoveData = null;
cc.vv.net.ip = e.ip + ":" + e.port;
console.log(cc.vv.net.ip);
cc.vv.wc.show("正在进入房间");
cc.vv.net.connect(function() {
console.log("onConnectOK");
var t = {
token: e.token,
roomid: e.roomid,
time: e.time,
sign: e.sign
};
cc.vv.net.send("login", t);
}, function() {
console.log("failed.");
cc.vv.wc.hide();
});
}
});
cc._RF.pop();
}, {} ],
Global: [ function(e, t) {
"use strict";
cc._RF.push(t, "c0244demoVIG4jTu1XDASHs", "Global");
cc.Class({
extends: cc.Component,
statics: {
isstarted: !1,
netinited: !1,
userguid: 0,
nickname: "",
money: 0,
lv: 0,
roomId: 0
}
});
cc._RF.pop();
}, {} ],
HTTP: [ function(e, t) {
"use strict";
cc._RF.push(t, "73df3nV5IZAPoFSW/0IES+m", "HTTP");
var n = "http://127.0.0.1:9000";
cc.VERSION = 20180108;
var s = cc.Class({
extends: cc.Component,
statics: {
sessionId: 0,
userId: 0,
master_url: n,
url: n,
sendRequest: function(e, t, n, i) {
var c = cc.loader.getXMLHttpRequest();
c.timeout = 5e3;
var o = "?";
for (var a in t) {
"?" != o && (o += "&");
o += a + "=" + t[a];
}
null == i && (i = s.url);
var r = i + e + encodeURI(o);
console.log("RequestURL:" + r);
c.open("GET", r, !0);
cc.sys.isNative && c.setRequestHeader("Accept-Encoding", "gzip,deflate", "text/html;charset=UTF-8");
c.onreadystatechange = function() {
if (4 === c.readyState && c.status >= 200 && c.status < 300) {
console.log("http res(" + c.responseText.length + "):" + c.responseText);
try {
var e = JSON.parse(c.responseText);
null !== n && n(e);
} catch (e) {
console.log("err:" + e);
} finally {
cc.vv && cc.vv.wc;
}
}
};
cc.vv && cc.vv.wc;
c.send();
return c;
}
}
});
cc._RF.pop();
}, {} ],
HotUpdate: [ function(e, t) {
"use strict";
cc._RF.push(t, "8b10788j31A0I2e3MKpB3Q0", "HotUpdate");
cc.Class({
extends: cc.Component,
properties: {
updatePanel: {
default: null,
type: cc.Node
},
manifestUrl: {
default: null,
url: cc.RawAsset
},
percent: {
default: null,
type: cc.Label
},
lblErr: {
default: null,
type: cc.Label
}
},
checkCb: function(e) {
cc.log("Code: " + e.getEventCode());
switch (e.getEventCode()) {
case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
cc.log("No local manifest file found, hot update skipped.");
cc.eventManager.removeListener(this._checkListener);
break;

case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
cc.log("Fail to download manifest file, hot update skipped.");
cc.eventManager.removeListener(this._checkListener);
break;

case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
cc.log("Already up to date with the latest remote version.");
cc.eventManager.removeListener(this._checkListener);
this.lblErr.string += "游戏不需要更新\n";
cc.director.loadScene("loading");
break;

case jsb.EventAssetsManager.NEW_VERSION_FOUND:
this._needUpdate = !0;
this.updatePanel.active = !0;
this.percent.string = "00.00%";
cc.eventManager.removeListener(this._checkListener);
}
this.hotUpdate();
},
updateCb: function(e) {
var t = !1, n = !1;
switch (e.getEventCode()) {
case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
cc.log("No local manifest file found, hot update skipped.");
n = !0;
break;

case jsb.EventAssetsManager.UPDATE_PROGRESSION:
var s = e.getPercent(), i = (e.getPercentByFile(), e.getMessage());
i && cc.log(i);
cc.log(s.toFixed(2) + "%");
this.percent.string = s + "%";
break;

case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
cc.log("Fail to download manifest file, hot update skipped.");
n = !0;
break;

case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
cc.log("Already up to date with the latest remote version.");
n = !0;
break;

case jsb.EventAssetsManager.UPDATE_FINISHED:
cc.log("Update finished. " + e.getMessage());
t = !0;
break;

case jsb.EventAssetsManager.UPDATE_FAILED:
cc.log("Update failed. " + e.getMessage());
this._failCount++;
if (this._failCount < 5) this._am.downloadFailedAssets(); else {
cc.log("Reach maximum fail count, exit update process");
this._failCount = 0;
n = !0;
}
break;

case jsb.EventAssetsManager.ERROR_UPDATING:
cc.log("Asset update error: " + e.getAssetId() + ", " + e.getMessage());
break;

case jsb.EventAssetsManager.ERROR_DECOMPRESS:
cc.log(e.getMessage());
}
if (n) {
cc.eventManager.removeListener(this._updateListener);
this.updatePanel.active = !1;
}
if (t) {
cc.eventManager.removeListener(this._updateListener);
var c = jsb.fileUtils.getSearchPaths(), o = this._am.getLocalManifest().getSearchPaths();
Array.prototype.unshift(c, o);
cc.sys.localStorage.setItem("HotUpdateSearchPaths", JSON.stringify(c));
jsb.fileUtils.setSearchPaths(c);
this.lblErr.string += "游戏资源更新完毕\n";
cc.game.restart();
}
},
hotUpdate: function() {
if (this._am && this._needUpdate) {
this.lblErr.string += "开始更新游戏资源...\n";
this._updateListener = new jsb.EventListenerAssetsManager(this._am, this.updateCb.bind(this));
cc.eventManager.addListener(this._updateListener, 1);
this._failCount = 0;
this._am.update();
}
},
onLoad: function() {
if (cc.sys.isNative) {
this.lblErr.string += "检查游戏资源...\n";
var e = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + "tiantianqipai-asset";
cc.log("Storage path for remote asset : " + e);
this.lblErr.string += e + "\n";
cc.log("Local manifest URL : " + this.manifestUrl);
this._am = new jsb.AssetsManager(this.manifestUrl, e);
this._am.retain();
this._needUpdate = !1;
if (this._am.getLocalManifest().isLoaded()) {
this._checkListener = new jsb.EventListenerAssetsManager(this._am, this.checkCb.bind(this));
cc.eventManager.addListener(this._checkListener, 1);
this._am.checkUpdate();
}
}
},
onDestroy: function() {
this._am && this._am.release();
}
});
cc._RF.pop();
}, {} ],
MahjongMgr: [ function(e, t) {
"use strict";
cc._RF.push(t, "e4fb97mwvFL3qT4H0AbOojz", "MahjongMgr");
var n = [];
cc.Class({
extends: cc.Component,
properties: {
leftAtlas: {
default: null,
type: cc.SpriteAtlas
},
rightAtlas: {
default: null,
type: cc.SpriteAtlas
},
bottomAtlas: {
default: null,
type: cc.SpriteAtlas
},
bottomFoldAtlas: {
default: null,
type: cc.SpriteAtlas
},
pengPrefabSelf: {
default: null,
type: cc.Prefab
},
pengPrefabLeft: {
default: null,
type: cc.Prefab
},
emptyAtlas: {
default: null,
type: cc.SpriteAtlas
},
holdsEmpty: {
default: [],
type: [ cc.SpriteFrame ]
},
_sides: null,
_pres: null,
_foldPres: null
},
onLoad: function() {
if (null != cc.vv) {
this._sides = [ "myself", "right", "up", "left" ];
this._pres = [ "M_", "R_", "B_", "L_" ];
this._foldPres = [ "B_", "R_", "B_", "L_" ];
cc.vv.mahjongmgr = this;
for (var e = 1; e < 10; ++e) n.push("dot_" + e);
for (e = 1; e < 10; ++e) n.push("bamboo_" + e);
for (e = 1; e < 10; ++e) n.push("character_" + e);
n.push("red");
n.push("green");
n.push("white");
n.push("wind_east");
n.push("wind_west");
n.push("wind_south");
n.push("wind_north");
}
},
getMahjongSpriteByID: function(e) {
return n[e];
},
getMahjongType: function(e) {
return e >= 0 && e < 9 ? 0 : e >= 9 && e < 18 ? 1 : e >= 18 && e < 27 ? 2 : void 0;
},
getSpriteFrameByMJID: function(e, t) {
var n = this.getMahjongSpriteByID(t);
n = e + n;
return "M_" == e ? this.bottomAtlas.getSpriteFrame(n) : "B_" == e ? this.bottomFoldAtlas.getSpriteFrame(n) : "L_" == e ? this.leftAtlas.getSpriteFrame(n) : "R_" == e ? this.rightAtlas.getSpriteFrame(n) : void 0;
},
getAudioURLByMJID: function(e) {
var t = 0;
e >= 0 && e < 9 ? t = e + 21 : e >= 9 && e < 18 ? t = e - 8 : e >= 18 && e < 27 && (t = e - 7);
return "nv/" + t + ".mp3";
},
getEmptySpriteFrame: function(e) {
return "up" == e ? this.emptyAtlas.getSpriteFrame("e_mj_b_up") : "myself" == e ? this.emptyAtlas.getSpriteFrame("e_mj_b_bottom") : "left" == e ? this.emptyAtlas.getSpriteFrame("e_mj_b_left") : "right" == e ? this.emptyAtlas.getSpriteFrame("e_mj_b_right") : void 0;
},
getHoldsEmptySpriteFrame: function(e) {
return "up" == e ? this.emptyAtlas.getSpriteFrame("e_mj_up") : "myself" == e ? null : "left" == e ? this.emptyAtlas.getSpriteFrame("e_mj_left") : "right" == e ? this.emptyAtlas.getSpriteFrame("e_mj_right") : void 0;
},
sortMJ: function(e, t) {
var n = this;
e.sort(function(e, s) {
if (t >= 0) {
var i = n.getMahjongType(e), c = n.getMahjongType(s);
if (i != c) {
if (t == i) return 1;
if (t == c) return -1;
}
}
return e - s;
});
},
getSide: function(e) {
return this._sides[e];
},
getPre: function(e) {
return this._pres[e];
},
getFoldPre: function(e) {
return this._foldPres[e];
}
});
cc._RF.pop();
}, {} ],
Net: [ function(e, t) {
"use strict";
cc._RF.push(t, "21784k1nCpOz70Z2In10GT7", "Net");
null == window.io && (window.io = e("socket-io"));
cc.Class({
extends: cc.Component,
statics: {
ip: "",
sio: null,
isPinging: !1,
fnDisconnect: null,
handlers: {},
addHandler: function(e, t) {
if (this.handlers[e]) console.log("event:" + e + "' handler has been registered."); else {
var n = function(n) {
"disconnect" != e && "string" == typeof n && (n = JSON.parse(n));
t(n);
};
this.handlers[e] = n;
if (this.sio) {
console.log("register:function " + e);
this.sio.on(e, n);
}
}
},
connect: function(e) {
var t = this;
console.log("ip in connect: ", this.ip);
this.sio = window.io.connect(this.ip, {
reconnection: !1,
"force new connection": !0,
transports: [ "websocket", "polling" ]
});
this.sio.on("reconnect", function() {
console.log("reconnection");
});
this.sio.on("connect", function(n) {
t.sio.connected = !0;
e(n);
});
this.sio.on("disconnect", function() {
console.log("disconnect");
t.sio.connected = !1;
t.close();
});
this.sio.on("connect_failed", function() {
console.log("connect_failed");
});
for (var n in this.handlers) {
var s = this.handlers[n];
if ("function" == typeof s) if ("disconnect" == n) this.fnDisconnect = s; else {
console.log("register:function " + n);
this.sio.on(n, s);
}
}
this.startHearbeat();
},
startHearbeat: function() {
this.sio.on("game_pong", function() {
console.log("game_pong");
e.lastRecieveTime = Date.now();
});
this.lastRecieveTime = Date.now();
var e = this;
console.log(1);
if (!e.isPinging) {
console.log(1);
e.isPinging = !0;
setInterval(function() {
console.log(3);
if (e.sio) {
console.log(4);
Date.now() - e.lastRecieveTime > 1e4 ? e.close() : e.ping();
}
}, 5e3);
}
},
send: function(e, t) {
if (this.sio.connected) {
null != t && "object" == typeof t && (t = JSON.stringify(t));
this.sio.emit(e, t);
}
},
ping: function() {
this.send("game_ping");
},
close: function() {
console.log("close");
if (this.sio && this.sio.connected) {
this.sio.connected = !1;
this.sio.disconnect();
this.sio = null;
}
if (this.fnDisconnect) {
this.fnDisconnect();
this.fnDisconnect = null;
}
},
test: function(e) {
var t = null, n = this.ip.split(":"), s = {
account: cc.vv.userMgr.account,
sign: cc.vv.userMgr.sign,
ip: n[0],
port: n[1]
};
t = cc.vv.http.sendRequest("/is_server_online", s, function(n) {
e(n.isonline);
t = null;
});
setTimeout(function() {
if (t) {
t.abort();
e(!1);
}
}, 1500);
}
}
});
cc._RF.pop();
}, {
"socket-io": "socket-io"
} ],
OnBack: [ function(e, t) {
"use strict";
cc._RF.push(t, "74331fmhv1GrY7cIXQ35kuc", "OnBack");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
var e = this.node.getChildByName("btn_back");
cc.vv.utils.addClickEvent(e, this.node, "OnBack", "onBtnClicked");
},
onBtnClicked: function(e) {
"btn_back" == e.target.name && (this.node.active = !1);
}
});
cc._RF.pop();
}, {} ],
ReplayMgr: [ function(e, t) {
"use strict";
cc._RF.push(t, "445e3qeTe1HrZvjs7b24OFj", "ReplayMgr");
cc.Class({
extends: cc.Component,
properties: {
_lastAction: null,
_actionRecords: null,
_currentIndex: 0
},
onLoad: function() {},
clear: function() {
this._lastAction = null;
this._actionRecords = null;
this._currentIndex = 0;
},
init: function(e) {
this._actionRecords = e.action_records;
null == this._actionRecords && (this._actionRecords = {});
this._currentIndex = 0;
this._lastAction = null;
},
isReplay: function() {
return null != this._actionRecords;
},
getNextAction: function() {
return this._currentIndex >= this._actionRecords.length ? null : {
si: this._actionRecords[this._currentIndex++],
type: this._actionRecords[this._currentIndex++],
pai: this._actionRecords[this._currentIndex++]
};
},
takeAction: function() {
var e = this.getNextAction();
null != this._lastAction && 1 == this._lastAction.type && null != e && 3 != e.type && 4 != e.type && 5 != e.type && cc.vv.gameNetMgr.doGuo(this._lastAction.si, this._lastAction.pai);
this._lastAction = e;
if (null == e) return -1;
if (1 == e.type) {
cc.vv.gameNetMgr.doChupai(e.si, e.pai);
return 1;
}
if (2 == e.type) {
cc.vv.gameNetMgr.doMopai(e.si, e.pai);
cc.vv.gameNetMgr.doTurnChange(e.si);
return .5;
}
if (3 == e.type) {
cc.vv.gameNetMgr.doPeng(e.si, e.pai);
cc.vv.gameNetMgr.doTurnChange(e.si);
return 1;
}
if (4 == e.type) {
cc.vv.gameNetMgr.dispatchEvent("hangang_notify", e.si);
cc.vv.gameNetMgr.doGang(e.si, e.pai);
cc.vv.gameNetMgr.doTurnChange(e.si);
return 1;
}
if (5 == e.type) {
cc.vv.gameNetMgr.doHu({
seatindex: e.si,
hupai: e.pai,
iszimo: !1
});
return 1.5;
}
}
});
cc._RF.pop();
}, {} ],
SelectPlayway: [ function(e, t) {
"use strict";
cc._RF.push(t, "7c36fbnLl9G+ITRQJdKnKcW", "SelectPlayway");
cc.Class({
extends: cc.Component,
properties: {
first: {
default: null,
type: cc.Node
},
playway: {
default: null,
type: cc.Prefab
},
content: {
default: null,
type: cc.Node
}
},
onLoad: function() {}
});
cc._RF.pop();
}, {} ],
UserMgr: [ function(e, t) {
"use strict";
cc._RF.push(t, "49846wj4bdFWoRYOeYfGhJ2", "UserMgr");
cc.Class({
extends: cc.Component,
properties: {
account: null,
userId: null,
userName: null,
lv: 0,
exp: 0,
coins: 0,
gems: 0,
sign: 0,
ip: "",
sex: 0,
roomData: null,
oldRoomId: null
},
guestAuth: function() {
var e = cc.args.account;
null == e && (e = cc.sys.localStorage.getItem("account"));
if (null == e) {
e = Date.now();
cc.sys.localStorage.setItem("account", e);
}
cc.vv.http.sendRequest("/guest", {
account: e
}, this.onAuth);
},
onAuth: function(e) {
var t = cc.vv.userMgr;
if (0 !== e.errcode) console.log(e.errmsg); else {
t.account = e.account;
t.sign = e.sign;
cc.vv.http.url = "http://" + cc.vv.SI.hall;
t.login();
}
},
login: function() {
var e = this;
cc.vv.wc.show("正在登录游戏");
cc.vv.http.sendRequest("/login", {
account: this.account,
sign: this.sign
}, function(t) {
if (0 !== t.errcode) console.log(t.errmsg); else if (t.userid) {
console.log(t);
e.account = t.account;
e.userId = t.userid;
e.userName = t.name;
e.lv = t.lv;
e.exp = t.exp;
e.coins = t.coins;
e.gems = t.gems;
e.roomData = t.roomid;
e.sex = t.sex;
e.ip = t.ip;
cc.director.loadScene("hall");
} else cc.director.loadScene("createrole");
});
},
create: function(e) {
var t = this, n = {
account: this.account,
sign: this.sign,
name: e
};
cc.vv.http.sendRequest("/create_user", n, function(e) {
0 !== e.errcode ? console.log(e.errmsg) : t.login();
});
},
enterRoom: function(e, t) {
var n = this, s = {
account: cc.vv.userMgr.account,
sign: cc.vv.userMgr.sign,
roomid: e
};
cc.vv.wc.show("正在进入房间 " + e);
cc.vv.http.sendRequest("/enter_private_room", s, function(s) {
if (0 !== s.errcode) if (-1 == s.errcode) setTimeout(function() {
n.enterRoom(e, t);
}, 5e3); else {
cc.vv.wc.hide();
null != t && t(s);
} else {
null != t && t(s);
cc.vv.gameNetMgr.connectGameServer(s);
}
});
},
getHistoryList: function(e) {
var t = {
account: cc.vv.userMgr.account,
sign: cc.vv.userMgr.sign
};
cc.vv.http.sendRequest("/get_history_list", t, function(t) {
if (0 !== t.errcode) console.log(t.errmsg); else {
console.log(t.history);
null != e && e(t.history);
}
});
},
getGamesOfRoom: function(e, t) {
var n = {
account: cc.vv.userMgr.account,
sign: cc.vv.userMgr.sign,
uuid: e
};
cc.vv.http.sendRequest("/get_games_of_room", n, function(e) {
if (0 !== e.errcode) console.log(e.errmsg); else {
console.log(e.data);
t(e.data);
}
});
},
getDetailOfGame: function(e, t, n) {
var s = {
account: cc.vv.userMgr.account,
sign: cc.vv.userMgr.sign,
uuid: e,
index: t
};
cc.vv.http.sendRequest("/get_detail_of_game", s, function(e) {
if (0 !== e.errcode) console.log(e.errmsg); else {
console.log(e.data);
n(e.data);
}
});
}
});
cc._RF.pop();
}, {} ],
Utils: [ function(e, t) {
"use strict";
cc._RF.push(t, "bf040eJWYNO6aWuiHWq60SX", "Utils");
cc.Class({
extends: cc.Component,
properties: {},
addClickEvent: function(e, t, n, s) {
console.log(n + ":" + s);
var i = new cc.Component.EventHandler();
i.target = t;
i.component = n;
i.handler = s;
e.getComponent(cc.Button).clickEvents.push(i);
},
addSlideEvent: function(e, t, n, s) {
var i = new cc.Component.EventHandler();
i.target = t;
i.component = n;
i.handler = s;
e.getComponent(cc.Slider).slideEvents.push(i);
}
});
cc._RF.pop();
}, {} ],
VoiceMgr: [ function(e, t) {
"use strict";
cc._RF.push(t, "04f79lfizNB5a8M0o33HmPW", "VoiceMgr");
var n = 12, s = 128 - n;
function i(e) {
e -= s;
var t = Math.floor(e / n) + s, i = e % n + s;
return String.fromCharCode(t) + String.fromCharCode(i);
}
for (var c = {}, o = {}, a = 0; a < 256; ++a) {
var r, l = a + 1;
r = l >= s ? i(l) : String.fromCharCode(l);
c[a] = r;
o[r] = a;
}
function u(e) {
var t = "", n = e.length, s = n >> 16 & 255, i = n >> 8 & 255, o = 255 & n;
t += c[n >> 24 & 255];
t += c[s];
t += c[i];
t += c[o];
for (var a = 0; a < e.length; ++a) t += c[e[a]];
return t;
}
function d(e, t) {
var n = e.charCodeAt(t);
return n >= s ? e.charAt(t) + e.charAt(t + 1) : e.charAt(t);
}
function g(e) {
for (var t = 0, n = 0, s = 0; s < 4; ++s) {
t += (a = d(e, t)).length;
n |= o[a] << 8 * (3 - s);
}
for (var i = new Uint8Array(n), c = 0; t < e.length; ) {
var a;
t += (a = d(e, t)).length;
i[c] = o[a];
c++;
}
return i;
}
cc.Class({
extends: cc.Component,
properties: {
onPlayCallback: null,
_voiceMediaPath: null
},
init: function() {
if (cc.sys.isNative) {
this._voiceMediaPath = jsb.fileUtils.getWritablePath() + "/voicemsgs/";
this.setStorageDir(this._voiceMediaPath);
}
},
prepare: function(e) {
if (cc.sys.isNative) {
cc.vv.audioMgr.pauseAll();
this.clearCache(e);
cc.sys.os == cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod("com/vivigames/voicesdk/VoiceRecorder", "prepare", "(Ljava/lang/String;)V", e) : cc.sys.os == cc.sys.OS_IOS && jsb.reflection.callStaticMethod("VoiceSDK", "prepareRecord:", e);
}
},
release: function() {
if (cc.sys.isNative) {
cc.vv.audioMgr.resumeAll();
cc.sys.os == cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod("com/vivigames/voicesdk/VoiceRecorder", "release", "()V") : cc.sys.os == cc.sys.OS_IOS && jsb.reflection.callStaticMethod("VoiceSDK", "finishRecord");
}
},
cancel: function() {
if (cc.sys.isNative) {
cc.vv.audioMgr.resumeAll();
cc.sys.os == cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod("com/vivigames/voicesdk/VoiceRecorder", "cancel", "()V") : cc.sys.os == cc.sys.OS_IOS && jsb.reflection.callStaticMethod("VoiceSDK", "cancelRecord");
}
},
writeVoice: function(e, t) {
if (cc.sys.isNative && t && t.length > 0) {
var n = g(t), s = this._voiceMediaPath + e;
this.clearCache(e);
jsb.fileUtils.writeDataToFile(n, s);
}
},
clearCache: function(e) {
if (cc.sys.isNative) {
var t = this._voiceMediaPath + e;
jsb.fileUtils.isFileExist(t) && jsb.fileUtils.removeFile(t);
jsb.fileUtils.isFileExist(t + ".wav") && jsb.fileUtils.removeFile(t + ".wav");
}
},
play: function(e) {
if (cc.sys.isNative) {
cc.vv.audioMgr.pauseAll();
cc.sys.os == cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod("com/vivigames/voicesdk/VoicePlayer", "play", "(Ljava/lang/String;)V", e) : cc.sys.os == cc.sys.OS_IOS && jsb.reflection.callStaticMethod("VoiceSDK", "play:", e);
}
},
stop: function() {
if (cc.sys.isNative) {
cc.vv.audioMgr.resumeAll();
cc.sys.os == cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod("com/vivigames/voicesdk/VoicePlayer", "stop", "()V") : cc.sys.os == cc.sys.OS_IOS && jsb.reflection.callStaticMethod("VoiceSDK", "stopPlay");
}
},
getVoiceLevel: function(e) {
return Math.floor(Math.random() * e + 1);
},
getVoiceData: function(e) {
if (cc.sys.isNative) {
var t = this._voiceMediaPath + e;
console.log("getVoiceData:" + t);
var n = jsb.fileUtils.getDataFromFile(t);
if (n) return u(n);
}
return "";
},
download: function() {},
setStorageDir: function(e) {
if (cc.sys.isNative) if (cc.sys.os == cc.sys.OS_ANDROID) jsb.reflection.callStaticMethod("com/vivigames/voicesdk/VoiceRecorder", "setStorageDir", "(Ljava/lang/String;)V", e); else if (cc.sys.os == cc.sys.OS_IOS) {
jsb.reflection.callStaticMethod("VoiceSDK", "setStorageDir:", e);
jsb.fileUtils.isDirectoryExist(e) || jsb.fileUtils.createDirectory(e);
}
}
});
cc._RF.pop();
}, {} ],
WaitingConnection: [ function(e, t) {
"use strict";
cc._RF.push(t, "31f47RcytJJ67ul1CLdirxD", "WaitingConnection");
cc.Class({
extends: cc.Component,
properties: {
target: cc.Node,
_isShow: !1,
lblContent: cc.Label
},
onLoad: function() {
if (null == cc.vv) return null;
cc.vv.wc = this;
this.node.active = this._isShow;
},
update: function(e) {
this.target.rotation = this.target.rotation - 90 * e;
},
show: function(e) {
this._isShow = !0;
this.node && (this.node.active = this._isShow);
if (this.lblContent) {
null == e && (e = "");
this.lblContent.string = e;
}
},
hide: function() {
this._isShow = !1;
this.node && (this.node.active = this._isShow);
}
});
cc._RF.pop();
}, {} ],
playway: [ function(e, t) {
"use strict";
cc._RF.push(t, "af6f4wEbYlIp6soloWanW8g", "playway");
cc.Class({
extends: cc.Component,
properties: {
atlas: {
default: null,
type: cc.SpriteAtlas
}
},
onLoad: function() {}
});
cc._RF.pop();
}, {} ],
"socket-io": [ function(e, t) {
(function() {
"use strict";
cc._RF.push(t, "393290vPc1IIYfh8FrmxcNZ", "socket-io");
cc._RF.pop();
}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
}, {} ]
}, {}, [ "socket-io", "AnysdkMgr", "AudioMgr", "GameNetMgr", "Global", "HTTP", "HotUpdate", "MahjongMgr", "Net", "OnBack", "ReplayMgr", "SelectPlayway", "UserMgr", "Utils", "VoiceMgr", "WaitingConnection", "playway" ]);