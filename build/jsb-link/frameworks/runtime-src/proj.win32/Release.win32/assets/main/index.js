window.__require = function e(t, n, i) {
function a(s, c) {
if (!n[s]) {
if (!t[s]) {
var r = s.split("/");
r = r[r.length - 1];
if (!t[r]) {
var h = "function" == typeof __require && __require;
if (!c && h) return h(r, !0);
if (o) return o(r, !0);
throw new Error("Cannot find module '" + s + "'");
}
s = r;
}
var l = n[s] = {
exports: {}
};
t[s][0].call(l.exports, function(e) {
return a(t[s][1][e] || e);
}, l, l.exports, e, t, n, i);
}
return n[s].exports;
}
for (var o = "function" == typeof __require && __require, s = 0; s < i.length; s++) a(i[s]);
return a;
}({
Alert: [ function(e, t) {
"use strict";
cc._RF.push(t, "f94d6YENh9BzbX+OMiJMLIg", "Alert");
cc.Class({
extends: cc.Component,
properties: {
_alert: null,
_btnOK: null,
_btnCancel: null,
_title: null,
_content: null,
_onok: null
},
onLoad: function() {
if (null != cc.vv) {
this._alert = cc.find("Canvas/alert");
this._title = cc.find("Canvas/alert/title").getComponent(cc.Label);
this._content = cc.find("Canvas/alert/content").getComponent(cc.Label);
this._btnOK = cc.find("Canvas/alert/btn_ok");
this._btnCancel = cc.find("Canvas/alert/btn_cancel");
cc.vv.utils.addClickEvent(this._btnOK, this.node, "Alert", "onBtnClicked");
cc.vv.utils.addClickEvent(this._btnCancel, this.node, "Alert", "onBtnClicked");
this._alert.active = !1;
cc.vv.alert = this;
}
},
onBtnClicked: function(e) {
"btn_ok" == e.target.name && this._onok && this._onok();
this._alert.active = !1;
this._onok = null;
},
show: function(e, t, n, i) {
this._alert.active = !0;
this._onok = n;
this._title.string = e;
this._content.string = t;
if (i) {
this._btnCancel.active = !0;
this._btnOK.x = -150;
this._btnCancel.x = 150;
} else {
this._btnCancel.active = !1;
this._btnOK.x = 0;
}
},
onDestory: function() {
cc.vv && (cc.vv.alert = null);
}
});
cc._RF.pop();
}, {} ],
Chat: [ function(e, t) {
"use strict";
cc._RF.push(t, "76549noA9RG1IWEXK1ranbY", "Chat");
cc.Class({
extends: cc.Component,
properties: {
_chatRoot: null,
_tabQuick: null,
_tabEmoji: null,
_iptChat: null,
_quickChatInfo: null,
_btnChat: null
},
onLoad: function() {
if (null != cc.vv) {
cc.vv.chat = this;
this._btnChat = this.node.getChildByName("btn_chat");
this._btnChat.active = 0 == cc.vv.replayMgr.isReplay();
this._chatRoot = this.node.getChildByName("chat");
this._chatRoot.active = !1;
this._tabQuick = this._chatRoot.getChildByName("quickchatlist");
this._tabEmoji = this._chatRoot.getChildByName("emojis");
this._iptChat = this._chatRoot.getChildByName("iptChat").getComponent(cc.EditBox);
this._quickChatInfo = {};
this._quickChatInfo.item0 = {
index: 0,
content: "快点啊，都等到我花儿都谢谢了！",
sound: "fix_msg_1.mp3"
};
this._quickChatInfo.item1 = {
index: 1,
content: "怎么又断线了，网络怎么这么差啊！",
sound: "fix_msg_2.mp3"
};
this._quickChatInfo.item2 = {
index: 2,
content: "不要走，决战到天亮！",
sound: "fix_msg_3.mp3"
};
this._quickChatInfo.item3 = {
index: 3,
content: "你的牌打得也太好了！",
sound: "fix_msg_4.mp3"
};
this._quickChatInfo.item4 = {
index: 4,
content: "你是妹妹还是哥哥啊？",
sound: "fix_msg_5.mp3"
};
this._quickChatInfo.item5 = {
index: 5,
content: "和你合作真是太愉快了！",
sound: "fix_msg_6.mp3"
};
this._quickChatInfo.item6 = {
index: 6,
content: "大家好，很高兴见到各位！",
sound: "fix_msg_7.mp3"
};
this._quickChatInfo.item7 = {
index: 7,
content: "各位，真是不好意思，我得离开一会儿。",
sound: "fix_msg_8.mp3"
};
this._quickChatInfo.item8 = {
index: 8,
content: "不要吵了，专心玩游戏吧！",
sound: "fix_msg_9.mp3"
};
}
},
getQuickChatInfo: function(e) {
var t = "item" + e;
return this._quickChatInfo[t];
},
onBtnChatClicked: function() {
this._chatRoot.active = !0;
},
onBgClicked: function() {
this._chatRoot.active = !1;
},
onTabClicked: function(e) {
if ("tabQuick" == e.target.name) {
this._tabQuick.active = !0;
this._tabEmoji.active = !1;
} else if ("tabEmoji" == e.target.name) {
this._tabQuick.active = !1;
this._tabEmoji.active = !0;
}
},
onQuickChatItemClicked: function(e) {
this._chatRoot.active = !1;
var t = this._quickChatInfo[e.target.name];
cc.vv.net.send("quick_chat", t.index);
},
onEmojiItemClicked: function(e) {
console.log(e.target.name);
this._chatRoot.active = !1;
cc.vv.net.send("emoji", e.target.name);
},
onBtnSendChatClicked: function() {
this._chatRoot.active = !1;
if ("" != this._iptChat.string) {
cc.vv.net.send("chat", this._iptChat.string);
this._iptChat.string = "";
}
}
});
cc._RF.pop();
}, {} ],
CheckBox: [ function(e, t) {
"use strict";
cc._RF.push(t, "c28b9sPc5hKn7UEQdim51Ja", "CheckBox");
cc.Class({
extends: cc.Component,
properties: {
target: cc.Node,
sprite: cc.SpriteFrame,
checkedSprite: cc.SpriteFrame,
checked: !1
},
onLoad: function() {
this.refresh();
},
onClicked: function() {
this.checked = !this.checked;
this.refresh();
},
refresh: function() {
var e = this.target.getComponent(cc.Sprite);
this.checked ? e.spriteFrame = this.checkedSprite : e.spriteFrame = this.sprite;
}
});
cc._RF.pop();
}, {} ],
CreateRoom: [ function(e, t) {
"use strict";
cc._RF.push(t, "4f8710GtexB7r0Q7wvjVNEv", "CreateRoom");
cc.Class({
extends: cc.Component,
properties: {
_difenxuanze: null,
_zimo: null,
_wanfaxuanze: null,
_zuidafanshu: null,
_jushuxuanze: null,
_dianganghua: null,
_leixingxuanze: null
},
onLoad: function() {
this._leixingxuanze = [];
for (var e = this.node.getChildByName("leixingxuanze"), t = 0; t < e.childrenCount; ++t) null != (n = e.children[t].getComponent("RadioButton")) && this._leixingxuanze.push(n);
this._difenxuanze = [];
for (e = this.node.getChildByName("difenxuanze"), t = 0; t < e.childrenCount; ++t) null != (n = e.children[t].getComponent("RadioButton")) && this._difenxuanze.push(n);
this._zimo = [];
for (e = this.node.getChildByName("zimojiacheng"), t = 0; t < e.childrenCount; ++t) null != (n = e.children[t].getComponent("RadioButton")) && this._zimo.push(n);
this._wanfaxuanze = [];
for (e = this.node.getChildByName("wanfaxuanze"), t = 0; t < e.childrenCount; ++t) null != (n = e.children[t].getComponent("CheckBox")) && this._wanfaxuanze.push(n);
this._zuidafanshu = [];
for (e = this.node.getChildByName("zuidafanshu"), t = 0; t < e.childrenCount; ++t) null != (n = e.children[t].getComponent("RadioButton")) && this._zuidafanshu.push(n);
this._jushuxuanze = [];
for (e = this.node.getChildByName("xuanzejushu"), t = 0; t < e.childrenCount; ++t) null != (n = e.children[t].getComponent("RadioButton")) && this._jushuxuanze.push(n);
this._dianganghua = [];
for (e = this.node.getChildByName("dianganghua"), t = 0; t < e.childrenCount; ++t) {
var n;
null != (n = e.children[t].getComponent("RadioButton")) && this._dianganghua.push(n);
}
},
onBtnBack: function() {
this.node.active = !1;
},
onBtnOK: function() {
this.node.active = !1;
this.createRoom();
},
createRoom: function() {
for (var e = 0, t = 0; t < this._difenxuanze.length; ++t) if (this._difenxuanze[t].checked) {
e = t;
break;
}
var n = 0;
for (t = 0; t < this._zimo.length; ++t) if (this._zimo[t].checked) {
n = t;
break;
}
var i = this._wanfaxuanze[0].checked, a = this._wanfaxuanze[1].checked, o = this._wanfaxuanze[2].checked, s = this._wanfaxuanze[3].checked, c = 0;
for (t = 0; t < this._leixingxuanze.length; ++t) if (this._leixingxuanze[t].checked) {
c = t;
break;
}
c = 0 == c ? "xzdd" : "xlch";
var r = 0;
for (t = 0; t < this._zuidafanshu.length; ++t) if (this._zuidafanshu[t].checked) {
r = t;
break;
}
var h = 0;
for (t = 0; t < this._jushuxuanze.length; ++t) if (this._jushuxuanze[t].checked) {
h = t;
break;
}
var l = 0;
for (t = 0; t < this._dianganghua.length; ++t) if (this._dianganghua[t].checked) {
l = t;
break;
}
var u = {
type: c,
difen: e,
zimo: n,
jiangdui: a,
huansanzhang: i,
zuidafanshu: r,
jushuxuanze: h,
dianganghua: l,
menqing: o,
tiandihu: s
}, g = {
account: cc.vv.userMgr.account,
sign: cc.vv.userMgr.sign,
conf: JSON.stringify(u)
};
console.log(g);
cc.vv.wc.show("正在创建房间");
cc.vv.http.sendRequest("/create_private_room", g, function(e) {
0 !== e.errcode ? 2222 == e.errcode ? cc.vv.alert.show("提示", "房卡不足，创建房间失败!") : cc.vv.alert.show("提示", "创建房间失败,错误码:" + e.errcode) : cc.vv.gameNetMgr.connectGameServer(e);
});
}
});
cc._RF.pop();
}, {} ],
DingQue: [ function(e, t) {
"use strict";
cc._RF.push(t, "02fc7NMBp9JxajVjy/4rO2p", "DingQue");
cc.Class({
extends: cc.Component,
properties: {
queYiMen: null,
tips: [],
selected: [],
dingques: []
},
onLoad: function() {
if (null != cc.vv) {
this.initView();
this.initDingQue();
this.initEventHandlers();
}
},
initView: function() {
var e = this.node.getChildByName("game");
this.queYiMen = e.getChildByName("dingque");
this.queYiMen.active = cc.vv.gameNetMgr.isDingQueing;
for (var t = [ "myself", "right", "up", "left" ], n = 0; n < t.length; ++n) {
var i = e.getChildByName(t[n]).getChildByName("seat").getChildByName("que");
this.dingques.push(i);
}
this.reset();
var a = this.queYiMen.getChildByName("tips");
for (n = 0; n < a.childrenCount; ++n) {
var o = a.children[n];
this.tips.push(o.getComponent(cc.Label));
}
"dingque" == cc.vv.gameNetMgr.gamestate && this.showDingQueChoice();
},
initEventHandlers: function() {
var e = this;
this.node.on("game_dingque", function() {
e.showDingQueChoice();
});
this.node.on("game_dingque_notify", function(t) {
var n = cc.vv.gameNetMgr.getSeatIndexByID(t.detail), i = cc.vv.gameNetMgr.getLocalIndex(n);
console.log("game_dingque_notify:" + i);
e.tips[i].node.active = !0;
});
this.node.on("game_dingque_finish", function() {
e.queYiMen.active = !1;
cc.vv.gameNetMgr.isDingQueing = !1;
e.initDingQue();
});
},
showDingQueChoice: function() {
this.queYiMen.active = !0;
for (var e = cc.vv.gameNetMgr.getSelfData(), t = [ 0, 0, 0 ], n = 0; n < e.holds.length; ++n) {
var i = e.holds[n];
t[cc.vv.mahjongmgr.getMahjongType(i)]++;
}
var a = 65535, o = 0;
for (n = 0; n < t.length; ++n) if (t[n] < a) {
a = t[n];
o = n;
}
var s = [ "tong", "tiao", "wan" ];
for (n = 0; n < s.length; ++n) {
var c = this.queYiMen.getChildByName(s[n]);
o == n ? c.getComponent(cc.Animation).play("dingque_tuijian") : c.getComponent(cc.Animation).stop();
}
this.reset();
for (n = 0; n < this.tips.length; ++n) {
this.tips[n].node.active = !(n > 0);
}
},
initDingQue: function() {
for (var e = [ "tong", "tiao", "wan" ], t = cc.vv.gameNetMgr.seats, n = 0; n < t.length; ++n) {
var i = t[n].dingque;
i = null == i || i < 0 || i >= e.length ? null : e[i];
var a = cc.vv.gameNetMgr.getLocalIndex(n);
i && (this.dingques[a].getChildByName(i).active = !0);
}
},
reset: function() {
this.setInteractable(!0);
this.selected.push(this.queYiMen.getChildByName("tong_selected"));
this.selected.push(this.queYiMen.getChildByName("tiao_selected"));
this.selected.push(this.queYiMen.getChildByName("wan_selected"));
for (var e = 0; e < this.selected.length; ++e) this.selected[e].active = !1;
for (e = 0; e < this.dingques.length; ++e) for (var t = 0; t < this.dingques[e].children.length; ++t) this.dingques[e].children[t].active = !1;
},
onQueYiMenClicked: function(e) {
var t = 0;
"tong" == e.target.name ? t = 0 : "tiao" == e.target.name ? t = 1 : "wan" == e.target.name && (t = 2);
for (var n = 0; n < this.selected.length; ++n) this.selected[n].active = !1;
this.selected[t].active = !0;
cc.vv.gameNetMgr.dingque = t;
cc.vv.net.send("dingque", t);
},
setInteractable: function(e) {
this.queYiMen.getChildByName("tong").getComponent(cc.Button).interactable = e;
this.queYiMen.getChildByName("tiao").getComponent(cc.Button).interactable = e;
this.queYiMen.getChildByName("wan").getComponent(cc.Button).interactable = e;
}
});
cc._RF.pop();
}, {} ],
1: [ function(e, t, n) {
"use strict";
n.byteLength = function(e) {
var t = h(e), n = t[0], i = t[1];
return 3 * (n + i) / 4 - i;
};
n.toByteArray = function(e) {
var t, n, i = h(e), s = i[0], c = i[1], r = new o(l(0, s, c)), u = 0, g = c > 0 ? s - 4 : s;
for (n = 0; n < g; n += 4) {
t = a[e.charCodeAt(n)] << 18 | a[e.charCodeAt(n + 1)] << 12 | a[e.charCodeAt(n + 2)] << 6 | a[e.charCodeAt(n + 3)];
r[u++] = t >> 16 & 255;
r[u++] = t >> 8 & 255;
r[u++] = 255 & t;
}
if (2 === c) {
t = a[e.charCodeAt(n)] << 2 | a[e.charCodeAt(n + 1)] >> 4;
r[u++] = 255 & t;
}
if (1 === c) {
t = a[e.charCodeAt(n)] << 10 | a[e.charCodeAt(n + 1)] << 4 | a[e.charCodeAt(n + 2)] >> 2;
r[u++] = t >> 8 & 255;
r[u++] = 255 & t;
}
return r;
};
n.fromByteArray = function(e) {
for (var t, n = e.length, a = n % 3, o = [], s = 0, c = n - a; s < c; s += 16383) o.push(u(e, s, s + 16383 > c ? c : s + 16383));
if (1 === a) {
t = e[n - 1];
o.push(i[t >> 2] + i[t << 4 & 63] + "==");
} else if (2 === a) {
t = (e[n - 2] << 8) + e[n - 1];
o.push(i[t >> 10] + i[t >> 4 & 63] + i[t << 2 & 63] + "=");
}
return o.join("");
};
for (var i = [], a = [], o = "undefined" != typeof Uint8Array ? Uint8Array : Array, s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", c = 0, r = s.length; c < r; ++c) {
i[c] = s[c];
a[s.charCodeAt(c)] = c;
}
a["-".charCodeAt(0)] = 62;
a["_".charCodeAt(0)] = 63;
function h(e) {
var t = e.length;
if (t % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
var n = e.indexOf("=");
-1 === n && (n = t);
return [ n, n === t ? 0 : 4 - n % 4 ];
}
function l(e, t, n) {
return 3 * (t + n) / 4 - n;
}
function u(e, t, n) {
for (var a, o, s = [], c = t; c < n; c += 3) {
a = (e[c] << 16 & 16711680) + (e[c + 1] << 8 & 65280) + (255 & e[c + 2]);
s.push(i[(o = a) >> 18 & 63] + i[o >> 12 & 63] + i[o >> 6 & 63] + i[63 & o]);
}
return s.join("");
}
}, {} ],
2: [ function(e, t, n) {
(function(t) {
"use strict";
var i = e("base64-js"), a = e("ieee754"), o = e("isarray");
n.Buffer = r;
n.SlowBuffer = function(e) {
+e != e && (e = 0);
return r.alloc(+e);
};
n.INSPECT_MAX_BYTES = 50;
r.TYPED_ARRAY_SUPPORT = void 0 !== t.TYPED_ARRAY_SUPPORT ? t.TYPED_ARRAY_SUPPORT : function() {
try {
var e = new Uint8Array(1);
e.__proto__ = {
__proto__: Uint8Array.prototype,
foo: function() {
return 42;
}
};
return 42 === e.foo() && "function" == typeof e.subarray && 0 === e.subarray(1, 1).byteLength;
} catch (e) {
return !1;
}
}();
n.kMaxLength = s();
function s() {
return r.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
}
function c(e, t) {
if (s() < t) throw new RangeError("Invalid typed array length");
if (r.TYPED_ARRAY_SUPPORT) (e = new Uint8Array(t)).__proto__ = r.prototype; else {
null === e && (e = new r(t));
e.length = t;
}
return e;
}
function r(e, t, n) {
if (!(r.TYPED_ARRAY_SUPPORT || this instanceof r)) return new r(e, t, n);
if ("number" == typeof e) {
if ("string" == typeof t) throw new Error("If encoding is specified then the first argument must be a string");
return g(this, e);
}
return h(this, e, t, n);
}
r.poolSize = 8192;
r._augment = function(e) {
e.__proto__ = r.prototype;
return e;
};
function h(e, t, n, i) {
if ("number" == typeof t) throw new TypeError('"value" argument must not be a number');
return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer ? f(e, t, n, i) : "string" == typeof t ? d(e, t, n) : p(e, t);
}
r.from = function(e, t, n) {
return h(null, e, t, n);
};
if (r.TYPED_ARRAY_SUPPORT) {
r.prototype.__proto__ = Uint8Array.prototype;
r.__proto__ = Uint8Array;
"undefined" != typeof Symbol && Symbol.species && r[Symbol.species] === r && Object.defineProperty(r, Symbol.species, {
value: null,
configurable: !0
});
}
function l(e) {
if ("number" != typeof e) throw new TypeError('"size" argument must be a number');
if (e < 0) throw new RangeError('"size" argument must not be negative');
}
function u(e, t, n, i) {
l(t);
return t <= 0 ? c(e, t) : void 0 !== n ? "string" == typeof i ? c(e, t).fill(n, i) : c(e, t).fill(n) : c(e, t);
}
r.alloc = function(e, t, n) {
return u(null, e, t, n);
};
function g(e, t) {
l(t);
e = c(e, t < 0 ? 0 : 0 | m(t));
if (!r.TYPED_ARRAY_SUPPORT) for (var n = 0; n < t; ++n) e[n] = 0;
return e;
}
r.allocUnsafe = function(e) {
return g(null, e);
};
r.allocUnsafeSlow = function(e) {
return g(null, e);
};
function d(e, t, n) {
"string" == typeof n && "" !== n || (n = "utf8");
if (!r.isEncoding(n)) throw new TypeError('"encoding" must be a valid string encoding');
var i = 0 | _(t, n), a = (e = c(e, i)).write(t, n);
a !== i && (e = e.slice(0, a));
return e;
}
function v(e, t) {
var n = t.length < 0 ? 0 : 0 | m(t.length);
e = c(e, n);
for (var i = 0; i < n; i += 1) e[i] = 255 & t[i];
return e;
}
function f(e, t, n, i) {
t.byteLength;
if (n < 0 || t.byteLength < n) throw new RangeError("'offset' is out of bounds");
if (t.byteLength < n + (i || 0)) throw new RangeError("'length' is out of bounds");
t = void 0 === n && void 0 === i ? new Uint8Array(t) : void 0 === i ? new Uint8Array(t, n) : new Uint8Array(t, n, i);
r.TYPED_ARRAY_SUPPORT ? (e = t).__proto__ = r.prototype : e = v(e, t);
return e;
}
function p(e, t) {
if (r.isBuffer(t)) {
var n = 0 | m(t.length);
if (0 === (e = c(e, n)).length) return e;
t.copy(e, 0, 0, n);
return e;
}
if (t) {
if ("undefined" != typeof ArrayBuffer && t.buffer instanceof ArrayBuffer || "length" in t) return "number" != typeof t.length || (i = t.length) != i ? c(e, 0) : v(e, t);
if ("Buffer" === t.type && o(t.data)) return v(e, t.data);
}
var i;
throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
}
function m(e) {
if (e >= s()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + s().toString(16) + " bytes");
return 0 | e;
}
r.isBuffer = function(e) {
return !(null == e || !e._isBuffer);
};
r.compare = function(e, t) {
if (!r.isBuffer(e) || !r.isBuffer(t)) throw new TypeError("Arguments must be Buffers");
if (e === t) return 0;
for (var n = e.length, i = t.length, a = 0, o = Math.min(n, i); a < o; ++a) if (e[a] !== t[a]) {
n = e[a];
i = t[a];
break;
}
return n < i ? -1 : i < n ? 1 : 0;
};
r.isEncoding = function(e) {
switch (String(e).toLowerCase()) {
case "hex":
case "utf8":
case "utf-8":
case "ascii":
case "latin1":
case "binary":
case "base64":
case "ucs2":
case "ucs-2":
case "utf16le":
case "utf-16le":
return !0;

default:
return !1;
}
};
r.concat = function(e, t) {
if (!o(e)) throw new TypeError('"list" argument must be an Array of Buffers');
if (0 === e.length) return r.alloc(0);
var n;
if (void 0 === t) {
t = 0;
for (n = 0; n < e.length; ++n) t += e[n].length;
}
var i = r.allocUnsafe(t), a = 0;
for (n = 0; n < e.length; ++n) {
var s = e[n];
if (!r.isBuffer(s)) throw new TypeError('"list" argument must be an Array of Buffers');
s.copy(i, a);
a += s.length;
}
return i;
};
function _(e, t) {
if (r.isBuffer(e)) return e.length;
if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(e) || e instanceof ArrayBuffer)) return e.byteLength;
"string" != typeof e && (e = "" + e);
var n = e.length;
if (0 === n) return 0;
for (var i = !1; ;) switch (t) {
case "ascii":
case "latin1":
case "binary":
return n;

case "utf8":
case "utf-8":
case void 0:
return V(e).length;

case "ucs2":
case "ucs-2":
case "utf16le":
case "utf-16le":
return 2 * n;

case "hex":
return n >>> 1;

case "base64":
return W(e).length;

default:
if (i) return V(e).length;
t = ("" + t).toLowerCase();
i = !0;
}
}
r.byteLength = _;
function y(e, t, n) {
var i = !1;
(void 0 === t || t < 0) && (t = 0);
if (t > this.length) return "";
(void 0 === n || n > this.length) && (n = this.length);
if (n <= 0) return "";
if ((n >>>= 0) <= (t >>>= 0)) return "";
e || (e = "utf8");
for (;;) switch (e) {
case "hex":
return T(this, t, n);

case "utf8":
case "utf-8":
return k(this, t, n);

case "ascii":
return j(this, t, n);

case "latin1":
case "binary":
return E(this, t, n);

case "base64":
return S(this, t, n);

case "ucs2":
case "ucs-2":
case "utf16le":
case "utf-16le":
return F(this, t, n);

default:
if (i) throw new TypeError("Unknown encoding: " + e);
e = (e + "").toLowerCase();
i = !0;
}
}
r.prototype._isBuffer = !0;
function C(e, t, n) {
var i = e[t];
e[t] = e[n];
e[n] = i;
}
r.prototype.swap16 = function() {
var e = this.length;
if (e % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
for (var t = 0; t < e; t += 2) C(this, t, t + 1);
return this;
};
r.prototype.swap32 = function() {
var e = this.length;
if (e % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
for (var t = 0; t < e; t += 4) {
C(this, t, t + 3);
C(this, t + 1, t + 2);
}
return this;
};
r.prototype.swap64 = function() {
var e = this.length;
if (e % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
for (var t = 0; t < e; t += 8) {
C(this, t, t + 7);
C(this, t + 1, t + 6);
C(this, t + 2, t + 5);
C(this, t + 3, t + 4);
}
return this;
};
r.prototype.toString = function() {
var e = 0 | this.length;
return 0 === e ? "" : 0 === arguments.length ? k(this, 0, e) : y.apply(this, arguments);
};
r.prototype.equals = function(e) {
if (!r.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
return this === e || 0 === r.compare(this, e);
};
r.prototype.inspect = function() {
var e = "", t = n.INSPECT_MAX_BYTES;
if (this.length > 0) {
e = this.toString("hex", 0, t).match(/.{2}/g).join(" ");
this.length > t && (e += " ... ");
}
return "<Buffer " + e + ">";
};
r.prototype.compare = function(e, t, n, i, a) {
if (!r.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
void 0 === t && (t = 0);
void 0 === n && (n = e ? e.length : 0);
void 0 === i && (i = 0);
void 0 === a && (a = this.length);
if (t < 0 || n > e.length || i < 0 || a > this.length) throw new RangeError("out of range index");
if (i >= a && t >= n) return 0;
if (i >= a) return -1;
if (t >= n) return 1;
if (this === e) return 0;
for (var o = (a >>>= 0) - (i >>>= 0), s = (n >>>= 0) - (t >>>= 0), c = Math.min(o, s), h = this.slice(i, a), l = e.slice(t, n), u = 0; u < c; ++u) if (h[u] !== l[u]) {
o = h[u];
s = l[u];
break;
}
return o < s ? -1 : s < o ? 1 : 0;
};
function M(e, t, n, i, a) {
if (0 === e.length) return -1;
if ("string" == typeof n) {
i = n;
n = 0;
} else n > 2147483647 ? n = 2147483647 : n < -2147483648 && (n = -2147483648);
n = +n;
isNaN(n) && (n = a ? 0 : e.length - 1);
n < 0 && (n = e.length + n);
if (n >= e.length) {
if (a) return -1;
n = e.length - 1;
} else if (n < 0) {
if (!a) return -1;
n = 0;
}
"string" == typeof t && (t = r.from(t, i));
if (r.isBuffer(t)) return 0 === t.length ? -1 : B(e, t, n, i, a);
if ("number" == typeof t) {
t &= 255;
return r.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? a ? Uint8Array.prototype.indexOf.call(e, t, n) : Uint8Array.prototype.lastIndexOf.call(e, t, n) : B(e, [ t ], n, i, a);
}
throw new TypeError("val must be string, number or Buffer");
}
function B(e, t, n, i, a) {
var o, s = 1, c = e.length, r = t.length;
if (void 0 !== i && ("ucs2" === (i = String(i).toLowerCase()) || "ucs-2" === i || "utf16le" === i || "utf-16le" === i)) {
if (e.length < 2 || t.length < 2) return -1;
s = 2;
c /= 2;
r /= 2;
n /= 2;
}
function h(e, t) {
return 1 === s ? e[t] : e.readUInt16BE(t * s);
}
if (a) {
var l = -1;
for (o = n; o < c; o++) if (h(e, o) === h(t, -1 === l ? 0 : o - l)) {
-1 === l && (l = o);
if (o - l + 1 === r) return l * s;
} else {
-1 !== l && (o -= o - l);
l = -1;
}
} else {
n + r > c && (n = c - r);
for (o = n; o >= 0; o--) {
for (var u = !0, g = 0; g < r; g++) if (h(e, o + g) !== h(t, g)) {
u = !1;
break;
}
if (u) return o;
}
}
return -1;
}
r.prototype.includes = function(e, t, n) {
return -1 !== this.indexOf(e, t, n);
};
r.prototype.indexOf = function(e, t, n) {
return M(this, e, t, n, !0);
};
r.prototype.lastIndexOf = function(e, t, n) {
return M(this, e, t, n, !1);
};
function b(e, t, n, i) {
n = Number(n) || 0;
var a = e.length - n;
i ? (i = Number(i)) > a && (i = a) : i = a;
var o = t.length;
if (o % 2 != 0) throw new TypeError("Invalid hex string");
i > o / 2 && (i = o / 2);
for (var s = 0; s < i; ++s) {
var c = parseInt(t.substr(2 * s, 2), 16);
if (isNaN(c)) return s;
e[n + s] = c;
}
return s;
}
function N(e, t, n, i) {
return Z(V(t, e.length - n), e, n, i);
}
function x(e, t, n, i) {
return Z(X(t), e, n, i);
}
function w(e, t, n, i) {
return x(e, t, n, i);
}
function I(e, t, n, i) {
return Z(W(t), e, n, i);
}
function R(e, t, n, i) {
return Z(Q(t, e.length - n), e, n, i);
}
r.prototype.write = function(e, t, n, i) {
if (void 0 === t) {
i = "utf8";
n = this.length;
t = 0;
} else if (void 0 === n && "string" == typeof t) {
i = t;
n = this.length;
t = 0;
} else {
if (!isFinite(t)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
t |= 0;
if (isFinite(n)) {
n |= 0;
void 0 === i && (i = "utf8");
} else {
i = n;
n = void 0;
}
}
var a = this.length - t;
(void 0 === n || n > a) && (n = a);
if (e.length > 0 && (n < 0 || t < 0) || t > this.length) throw new RangeError("Attempt to write outside buffer bounds");
i || (i = "utf8");
for (var o = !1; ;) switch (i) {
case "hex":
return b(this, e, t, n);

case "utf8":
case "utf-8":
return N(this, e, t, n);

case "ascii":
return x(this, e, t, n);

case "latin1":
case "binary":
return w(this, e, t, n);

case "base64":
return I(this, e, t, n);

case "ucs2":
case "ucs-2":
case "utf16le":
case "utf-16le":
return R(this, e, t, n);

default:
if (o) throw new TypeError("Unknown encoding: " + i);
i = ("" + i).toLowerCase();
o = !0;
}
};
r.prototype.toJSON = function() {
return {
type: "Buffer",
data: Array.prototype.slice.call(this._arr || this, 0)
};
};
function S(e, t, n) {
return 0 === t && n === e.length ? i.fromByteArray(e) : i.fromByteArray(e.slice(t, n));
}
function k(e, t, n) {
n = Math.min(e.length, n);
for (var i = [], a = t; a < n; ) {
var o = e[a], s = null, c = o > 239 ? 4 : o > 223 ? 3 : o > 191 ? 2 : 1;
if (a + c <= n) {
var r, h, l, u;
switch (c) {
case 1:
o < 128 && (s = o);
break;

case 2:
128 == (192 & (r = e[a + 1])) && (u = (31 & o) << 6 | 63 & r) > 127 && (s = u);
break;

case 3:
r = e[a + 1];
h = e[a + 2];
128 == (192 & r) && 128 == (192 & h) && (u = (15 & o) << 12 | (63 & r) << 6 | 63 & h) > 2047 && (u < 55296 || u > 57343) && (s = u);
break;

case 4:
r = e[a + 1];
h = e[a + 2];
l = e[a + 3];
128 == (192 & r) && 128 == (192 & h) && 128 == (192 & l) && (u = (15 & o) << 18 | (63 & r) << 12 | (63 & h) << 6 | 63 & l) > 65535 && u < 1114112 && (s = u);
}
}
if (null === s) {
s = 65533;
c = 1;
} else if (s > 65535) {
s -= 65536;
i.push(s >>> 10 & 1023 | 55296);
s = 56320 | 1023 & s;
}
i.push(s);
a += c;
}
return L(i);
}
var A = 4096;
function L(e) {
var t = e.length;
if (t <= A) return String.fromCharCode.apply(String, e);
for (var n = "", i = 0; i < t; ) n += String.fromCharCode.apply(String, e.slice(i, i += A));
return n;
}
function j(e, t, n) {
var i = "";
n = Math.min(e.length, n);
for (var a = t; a < n; ++a) i += String.fromCharCode(127 & e[a]);
return i;
}
function E(e, t, n) {
var i = "";
n = Math.min(e.length, n);
for (var a = t; a < n; ++a) i += String.fromCharCode(e[a]);
return i;
}
function T(e, t, n) {
var i, a = e.length;
(!t || t < 0) && (t = 0);
(!n || n < 0 || n > a) && (n = a);
for (var o = "", s = t; s < n; ++s) o += (i = e[s]) < 16 ? "0" + i.toString(16) : i.toString(16);
return o;
}
function F(e, t, n) {
for (var i = e.slice(t, n), a = "", o = 0; o < i.length; o += 2) a += String.fromCharCode(i[o] + 256 * i[o + 1]);
return a;
}
r.prototype.slice = function(e, t) {
var n, i = this.length;
(e = ~~e) < 0 ? (e += i) < 0 && (e = 0) : e > i && (e = i);
(t = void 0 === t ? i : ~~t) < 0 ? (t += i) < 0 && (t = 0) : t > i && (t = i);
t < e && (t = e);
if (r.TYPED_ARRAY_SUPPORT) (n = this.subarray(e, t)).__proto__ = r.prototype; else {
var a = t - e;
n = new r(a, void 0);
for (var o = 0; o < a; ++o) n[o] = this[o + e];
}
return n;
};
function P(e, t, n) {
if (e % 1 != 0 || e < 0) throw new RangeError("offset is not uint");
if (e + t > n) throw new RangeError("Trying to access beyond buffer length");
}
r.prototype.readUIntLE = function(e, t, n) {
e |= 0;
t |= 0;
n || P(e, t, this.length);
for (var i = this[e], a = 1, o = 0; ++o < t && (a *= 256); ) i += this[e + o] * a;
return i;
};
r.prototype.readUIntBE = function(e, t, n) {
e |= 0;
t |= 0;
n || P(e, t, this.length);
for (var i = this[e + --t], a = 1; t > 0 && (a *= 256); ) i += this[e + --t] * a;
return i;
};
r.prototype.readUInt8 = function(e, t) {
t || P(e, 1, this.length);
return this[e];
};
r.prototype.readUInt16LE = function(e, t) {
t || P(e, 2, this.length);
return this[e] | this[e + 1] << 8;
};
r.prototype.readUInt16BE = function(e, t) {
t || P(e, 2, this.length);
return this[e] << 8 | this[e + 1];
};
r.prototype.readUInt32LE = function(e, t) {
t || P(e, 4, this.length);
return (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3];
};
r.prototype.readUInt32BE = function(e, t) {
t || P(e, 4, this.length);
return 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]);
};
r.prototype.readIntLE = function(e, t, n) {
e |= 0;
t |= 0;
n || P(e, t, this.length);
for (var i = this[e], a = 1, o = 0; ++o < t && (a *= 256); ) i += this[e + o] * a;
i >= (a *= 128) && (i -= Math.pow(2, 8 * t));
return i;
};
r.prototype.readIntBE = function(e, t, n) {
e |= 0;
t |= 0;
n || P(e, t, this.length);
for (var i = t, a = 1, o = this[e + --i]; i > 0 && (a *= 256); ) o += this[e + --i] * a;
o >= (a *= 128) && (o -= Math.pow(2, 8 * t));
return o;
};
r.prototype.readInt8 = function(e, t) {
t || P(e, 1, this.length);
return 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e];
};
r.prototype.readInt16LE = function(e, t) {
t || P(e, 2, this.length);
var n = this[e] | this[e + 1] << 8;
return 32768 & n ? 4294901760 | n : n;
};
r.prototype.readInt16BE = function(e, t) {
t || P(e, 2, this.length);
var n = this[e + 1] | this[e] << 8;
return 32768 & n ? 4294901760 | n : n;
};
r.prototype.readInt32LE = function(e, t) {
t || P(e, 4, this.length);
return this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24;
};
r.prototype.readInt32BE = function(e, t) {
t || P(e, 4, this.length);
return this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3];
};
r.prototype.readFloatLE = function(e, t) {
t || P(e, 4, this.length);
return a.read(this, e, !0, 23, 4);
};
r.prototype.readFloatBE = function(e, t) {
t || P(e, 4, this.length);
return a.read(this, e, !1, 23, 4);
};
r.prototype.readDoubleLE = function(e, t) {
t || P(e, 8, this.length);
return a.read(this, e, !0, 52, 8);
};
r.prototype.readDoubleBE = function(e, t) {
t || P(e, 8, this.length);
return a.read(this, e, !1, 52, 8);
};
function D(e, t, n, i, a, o) {
if (!r.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance');
if (t > a || t < o) throw new RangeError('"value" argument is out of bounds');
if (n + i > e.length) throw new RangeError("Index out of range");
}
r.prototype.writeUIntLE = function(e, t, n, i) {
e = +e;
t |= 0;
n |= 0;
i || D(this, e, t, n, Math.pow(2, 8 * n) - 1, 0);
var a = 1, o = 0;
this[t] = 255 & e;
for (;++o < n && (a *= 256); ) this[t + o] = e / a & 255;
return t + n;
};
r.prototype.writeUIntBE = function(e, t, n, i) {
e = +e;
t |= 0;
n |= 0;
i || D(this, e, t, n, Math.pow(2, 8 * n) - 1, 0);
var a = n - 1, o = 1;
this[t + a] = 255 & e;
for (;--a >= 0 && (o *= 256); ) this[t + a] = e / o & 255;
return t + n;
};
r.prototype.writeUInt8 = function(e, t, n) {
e = +e;
t |= 0;
n || D(this, e, t, 1, 255, 0);
r.TYPED_ARRAY_SUPPORT || (e = Math.floor(e));
this[t] = 255 & e;
return t + 1;
};
function O(e, t, n, i) {
t < 0 && (t = 65535 + t + 1);
for (var a = 0, o = Math.min(e.length - n, 2); a < o; ++a) e[n + a] = (t & 255 << 8 * (i ? a : 1 - a)) >>> 8 * (i ? a : 1 - a);
}
r.prototype.writeUInt16LE = function(e, t, n) {
e = +e;
t |= 0;
n || D(this, e, t, 2, 65535, 0);
if (r.TYPED_ARRAY_SUPPORT) {
this[t] = 255 & e;
this[t + 1] = e >>> 8;
} else O(this, e, t, !0);
return t + 2;
};
r.prototype.writeUInt16BE = function(e, t, n) {
e = +e;
t |= 0;
n || D(this, e, t, 2, 65535, 0);
if (r.TYPED_ARRAY_SUPPORT) {
this[t] = e >>> 8;
this[t + 1] = 255 & e;
} else O(this, e, t, !1);
return t + 2;
};
function z(e, t, n, i) {
t < 0 && (t = 4294967295 + t + 1);
for (var a = 0, o = Math.min(e.length - n, 4); a < o; ++a) e[n + a] = t >>> 8 * (i ? a : 3 - a) & 255;
}
r.prototype.writeUInt32LE = function(e, t, n) {
e = +e;
t |= 0;
n || D(this, e, t, 4, 4294967295, 0);
if (r.TYPED_ARRAY_SUPPORT) {
this[t + 3] = e >>> 24;
this[t + 2] = e >>> 16;
this[t + 1] = e >>> 8;
this[t] = 255 & e;
} else z(this, e, t, !0);
return t + 4;
};
r.prototype.writeUInt32BE = function(e, t, n) {
e = +e;
t |= 0;
n || D(this, e, t, 4, 4294967295, 0);
if (r.TYPED_ARRAY_SUPPORT) {
this[t] = e >>> 24;
this[t + 1] = e >>> 16;
this[t + 2] = e >>> 8;
this[t + 3] = 255 & e;
} else z(this, e, t, !1);
return t + 4;
};
r.prototype.writeIntLE = function(e, t, n, i) {
e = +e;
t |= 0;
if (!i) {
var a = Math.pow(2, 8 * n - 1);
D(this, e, t, n, a - 1, -a);
}
var o = 0, s = 1, c = 0;
this[t] = 255 & e;
for (;++o < n && (s *= 256); ) {
e < 0 && 0 === c && 0 !== this[t + o - 1] && (c = 1);
this[t + o] = (e / s >> 0) - c & 255;
}
return t + n;
};
r.prototype.writeIntBE = function(e, t, n, i) {
e = +e;
t |= 0;
if (!i) {
var a = Math.pow(2, 8 * n - 1);
D(this, e, t, n, a - 1, -a);
}
var o = n - 1, s = 1, c = 0;
this[t + o] = 255 & e;
for (;--o >= 0 && (s *= 256); ) {
e < 0 && 0 === c && 0 !== this[t + o + 1] && (c = 1);
this[t + o] = (e / s >> 0) - c & 255;
}
return t + n;
};
r.prototype.writeInt8 = function(e, t, n) {
e = +e;
t |= 0;
n || D(this, e, t, 1, 127, -128);
r.TYPED_ARRAY_SUPPORT || (e = Math.floor(e));
e < 0 && (e = 255 + e + 1);
this[t] = 255 & e;
return t + 1;
};
r.prototype.writeInt16LE = function(e, t, n) {
e = +e;
t |= 0;
n || D(this, e, t, 2, 32767, -32768);
if (r.TYPED_ARRAY_SUPPORT) {
this[t] = 255 & e;
this[t + 1] = e >>> 8;
} else O(this, e, t, !0);
return t + 2;
};
r.prototype.writeInt16BE = function(e, t, n) {
e = +e;
t |= 0;
n || D(this, e, t, 2, 32767, -32768);
if (r.TYPED_ARRAY_SUPPORT) {
this[t] = e >>> 8;
this[t + 1] = 255 & e;
} else O(this, e, t, !1);
return t + 2;
};
r.prototype.writeInt32LE = function(e, t, n) {
e = +e;
t |= 0;
n || D(this, e, t, 4, 2147483647, -2147483648);
if (r.TYPED_ARRAY_SUPPORT) {
this[t] = 255 & e;
this[t + 1] = e >>> 8;
this[t + 2] = e >>> 16;
this[t + 3] = e >>> 24;
} else z(this, e, t, !0);
return t + 4;
};
r.prototype.writeInt32BE = function(e, t, n) {
e = +e;
t |= 0;
n || D(this, e, t, 4, 2147483647, -2147483648);
e < 0 && (e = 4294967295 + e + 1);
if (r.TYPED_ARRAY_SUPPORT) {
this[t] = e >>> 24;
this[t + 1] = e >>> 16;
this[t + 2] = e >>> 8;
this[t + 3] = 255 & e;
} else z(this, e, t, !1);
return t + 4;
};
function Y(e, t, n, i) {
if (n + i > e.length) throw new RangeError("Index out of range");
if (n < 0) throw new RangeError("Index out of range");
}
function G(e, t, n, i, o) {
o || Y(e, 0, n, 4);
a.write(e, t, n, i, 23, 4);
return n + 4;
}
r.prototype.writeFloatLE = function(e, t, n) {
return G(this, e, t, !0, n);
};
r.prototype.writeFloatBE = function(e, t, n) {
return G(this, e, t, !1, n);
};
function H(e, t, n, i, o) {
o || Y(e, 0, n, 8);
a.write(e, t, n, i, 52, 8);
return n + 8;
}
r.prototype.writeDoubleLE = function(e, t, n) {
return H(this, e, t, !0, n);
};
r.prototype.writeDoubleBE = function(e, t, n) {
return H(this, e, t, !1, n);
};
r.prototype.copy = function(e, t, n, i) {
n || (n = 0);
i || 0 === i || (i = this.length);
t >= e.length && (t = e.length);
t || (t = 0);
i > 0 && i < n && (i = n);
if (i === n) return 0;
if (0 === e.length || 0 === this.length) return 0;
if (t < 0) throw new RangeError("targetStart out of bounds");
if (n < 0 || n >= this.length) throw new RangeError("sourceStart out of bounds");
if (i < 0) throw new RangeError("sourceEnd out of bounds");
i > this.length && (i = this.length);
e.length - t < i - n && (i = e.length - t + n);
var a, o = i - n;
if (this === e && n < t && t < i) for (a = o - 1; a >= 0; --a) e[a + t] = this[a + n]; else if (o < 1e3 || !r.TYPED_ARRAY_SUPPORT) for (a = 0; a < o; ++a) e[a + t] = this[a + n]; else Uint8Array.prototype.set.call(e, this.subarray(n, n + o), t);
return o;
};
r.prototype.fill = function(e, t, n, i) {
if ("string" == typeof e) {
if ("string" == typeof t) {
i = t;
t = 0;
n = this.length;
} else if ("string" == typeof n) {
i = n;
n = this.length;
}
if (1 === e.length) {
var a = e.charCodeAt(0);
a < 256 && (e = a);
}
if (void 0 !== i && "string" != typeof i) throw new TypeError("encoding must be a string");
if ("string" == typeof i && !r.isEncoding(i)) throw new TypeError("Unknown encoding: " + i);
} else "number" == typeof e && (e &= 255);
if (t < 0 || this.length < t || this.length < n) throw new RangeError("Out of range index");
if (n <= t) return this;
t >>>= 0;
n = void 0 === n ? this.length : n >>> 0;
e || (e = 0);
var o;
if ("number" == typeof e) for (o = t; o < n; ++o) this[o] = e; else {
var s = r.isBuffer(e) ? e : V(new r(e, i).toString()), c = s.length;
for (o = 0; o < n - t; ++o) this[o + t] = s[o % c];
}
return this;
};
var J = /[^+\/0-9A-Za-z-_]/g;
function q(e) {
if ((e = U(e).replace(J, "")).length < 2) return "";
for (;e.length % 4 != 0; ) e += "=";
return e;
}
function U(e) {
return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "");
}
function V(e, t) {
t = t || Infinity;
for (var n, i = e.length, a = null, o = [], s = 0; s < i; ++s) {
if ((n = e.charCodeAt(s)) > 55295 && n < 57344) {
if (!a) {
if (n > 56319) {
(t -= 3) > -1 && o.push(239, 191, 189);
continue;
}
if (s + 1 === i) {
(t -= 3) > -1 && o.push(239, 191, 189);
continue;
}
a = n;
continue;
}
if (n < 56320) {
(t -= 3) > -1 && o.push(239, 191, 189);
a = n;
continue;
}
n = 65536 + (a - 55296 << 10 | n - 56320);
} else a && (t -= 3) > -1 && o.push(239, 191, 189);
a = null;
if (n < 128) {
if ((t -= 1) < 0) break;
o.push(n);
} else if (n < 2048) {
if ((t -= 2) < 0) break;
o.push(n >> 6 | 192, 63 & n | 128);
} else if (n < 65536) {
if ((t -= 3) < 0) break;
o.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128);
} else {
if (!(n < 1114112)) throw new Error("Invalid code point");
if ((t -= 4) < 0) break;
o.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128);
}
}
return o;
}
function X(e) {
for (var t = [], n = 0; n < e.length; ++n) t.push(255 & e.charCodeAt(n));
return t;
}
function Q(e, t) {
for (var n, i, a, o = [], s = 0; s < e.length && !((t -= 2) < 0); ++s) {
i = (n = e.charCodeAt(s)) >> 8;
a = n % 256;
o.push(a);
o.push(i);
}
return o;
}
function W(e) {
return i.toByteArray(q(e));
}
function Z(e, t, n, i) {
for (var a = 0; a < i && !(a + n >= t.length || a >= e.length); ++a) t[a + n] = e[a];
return a;
}
}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
}, {
"base64-js": 1,
ieee754: 4,
isarray: 3
} ],
3: [ function(e, t) {
var n = {}.toString;
t.exports = Array.isArray || function(e) {
return "[object Array]" == n.call(e);
};
}, {} ],
4: [ function(e, t, n) {
n.read = function(e, t, n, i, a) {
var o, s, c = 8 * a - i - 1, r = (1 << c) - 1, h = r >> 1, l = -7, u = n ? a - 1 : 0, g = n ? -1 : 1, d = e[t + u];
u += g;
o = d & (1 << -l) - 1;
d >>= -l;
l += c;
for (;l > 0; o = 256 * o + e[t + u], u += g, l -= 8) ;
s = o & (1 << -l) - 1;
o >>= -l;
l += i;
for (;l > 0; s = 256 * s + e[t + u], u += g, l -= 8) ;
if (0 === o) o = 1 - h; else {
if (o === r) return s ? NaN : Infinity * (d ? -1 : 1);
s += Math.pow(2, i);
o -= h;
}
return (d ? -1 : 1) * s * Math.pow(2, o - i);
};
n.write = function(e, t, n, i, a, o) {
var s, c, r, h = 8 * o - a - 1, l = (1 << h) - 1, u = l >> 1, g = 23 === a ? Math.pow(2, -24) - Math.pow(2, -77) : 0, d = i ? 0 : o - 1, v = i ? 1 : -1, f = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
t = Math.abs(t);
if (isNaN(t) || Infinity === t) {
c = isNaN(t) ? 1 : 0;
s = l;
} else {
s = Math.floor(Math.log(t) / Math.LN2);
if (t * (r = Math.pow(2, -s)) < 1) {
s--;
r *= 2;
}
if ((t += s + u >= 1 ? g / r : g * Math.pow(2, 1 - u)) * r >= 2) {
s++;
r /= 2;
}
if (s + u >= l) {
c = 0;
s = l;
} else if (s + u >= 1) {
c = (t * r - 1) * Math.pow(2, a);
s += u;
} else {
c = t * Math.pow(2, u - 1) * Math.pow(2, a);
s = 0;
}
}
for (;a >= 8; e[n + d] = 255 & c, d += v, c /= 256, a -= 8) ;
s = s << a | c;
h += a;
for (;h > 0; e[n + d] = 255 & s, d += v, s /= 256, h -= 8) ;
e[n + d - v] |= 128 * f;
};
}, {} ],
Folds: [ function(e, t) {
"use strict";
cc._RF.push(t, "9a304jWq+JBAIkQm1bY2h61", "Folds");
cc.Class({
extends: cc.Component,
properties: {
_folds: null
},
onLoad: function() {
if (null != cc.vv) {
this.initView();
this.initEventHandler();
this.initAllFolds();
}
},
initView: function() {
this._folds = {};
for (var e = this.node.getChildByName("game"), t = [ "myself", "right", "up", "left" ], n = 0; n < t.length; ++n) {
for (var i = t[n], a = [], o = e.getChildByName(i).getChildByName("folds"), s = 0; s < o.children.length; ++s) {
var c = o.children[s];
c.active = !1;
var r = c.getComponent(cc.Sprite);
r.spriteFrame = null;
a.push(r);
}
this._folds[i] = a;
}
this.hideAllFolds();
},
hideAllFolds: function() {
for (var e in this._folds) {
var t = this._folds[n];
for (var n in t) t[n].node.active = !1;
}
},
initEventHandler: function() {
var e = this;
this.node.on("game_begin", function() {
e.initAllFolds();
});
this.node.on("game_sync", function() {
e.initAllFolds();
});
this.node.on("game_chupai_notify", function(t) {
e.initFolds(t.detail);
});
this.node.on("guo_notify", function(t) {
e.initFolds(t.detail);
});
},
initAllFolds: function() {
var e = cc.vv.gameNetMgr.seats;
for (var t in e) this.initFolds(e[t]);
},
initFolds: function(e) {
var t = e.folds;
if (null != t) {
for (var n = cc.vv.gameNetMgr.getLocalIndex(e.seatindex), i = cc.vv.mahjongmgr.getFoldPre(n), a = cc.vv.mahjongmgr.getSide(n), o = this._folds[a], s = 0; s < o.length; ++s) {
var c = s;
"right" != a && "up" != a || (c = o.length - s - 1);
(r = o[c]).node.active = !0;
this.setSpriteFrameByMJID(i, r, t[s]);
}
for (s = t.length; s < o.length; ++s) {
var r;
c = s;
"right" != a && "up" != a || (c = o.length - s - 1);
(r = o[c]).spriteFrame = null;
r.node.active = !1;
}
}
},
setSpriteFrameByMJID: function(e, t, n) {
t.spriteFrame = cc.vv.mahjongmgr.getSpriteFrameByMJID(e, n);
t.node.active = !0;
}
});
cc._RF.pop();
}, {} ],
GameOver: [ function(e, t) {
"use strict";
cc._RF.push(t, "ce353SCfT5DTo9QXPqOipBU", "GameOver");
cc.Class({
extends: cc.Component,
properties: {
_gameover: null,
_gameresult: null,
_seats: [],
_isGameEnd: !1,
_pingju: null,
_win: null,
_lose: null
},
onLoad: function() {
if (null != cc.vv && null != cc.vv.gameNetMgr.conf) {
"xzdd" == cc.vv.gameNetMgr.conf.type ? this._gameover = this.node.getChildByName("game_over") : this._gameover = this.node.getChildByName("game_over_xlch");
this._gameover.active = !1;
this._pingju = this._gameover.getChildByName("pingju");
this._win = this._gameover.getChildByName("win");
this._lose = this._gameover.getChildByName("lose");
this._gameresult = this.node.getChildByName("game_result");
this._gameover.getChildByName("wanfa").getComponent(cc.Label).string = cc.vv.gameNetMgr.getWanfa();
for (var e = this._gameover.getChildByName("result_list"), t = 1; t <= 4; ++t) {
var n = "s" + t, i = e.getChildByName(n), a = {};
a.username = i.getChildByName("username").getComponent(cc.Label);
a.reason = i.getChildByName("reason").getComponent(cc.Label);
var o = i.getChildByName("fan");
null != o && (a.fan = o.getComponent(cc.Label));
a.score = i.getChildByName("score").getComponent(cc.Label);
a.hu = i.getChildByName("hu");
a.mahjongs = i.getChildByName("pai");
a.zhuang = i.getChildByName("zhuang");
a.hupai = i.getChildByName("hupai");
a._pengandgang = [];
this._seats.push(a);
}
var s = this;
this.node.on("game_over", function(e) {
s.onGameOver(e.detail);
});
this.node.on("game_end", function() {
s._isGameEnd = !0;
});
}
},
onGameOver: function(e) {
"xzdd" == cc.vv.gameNetMgr.conf.type ? this.onGameOver_XZDD(e) : this.onGameOver_XLCH(e);
},
onGameOver_XZDD: function(e) {
console.log(e);
if (0 != e.length) {
this._gameover.active = !0;
this._pingju.active = !1;
this._win.active = !1;
this._lose.active = !1;
var t = e[cc.vv.gameNetMgr.seatIndex].score;
t > 0 ? this._win.active = !0 : t < 0 ? this._lose.active = !0 : this._pingju.active = !0;
for (var n = 0; n < 4; ++n) {
for (var i = this._seats[n], a = e[n], o = !1, s = a.angangs.length + a.wangangs.length + a.diangangs.length, c = a.numofgen, r = [], h = !1, l = 0; l < a.actions.length; ++l) {
var u = a.actions[l];
if ("zimo" == u.type || "ganghua" == u.type || "dianganghua" == u.type || "hu" == u.type || "gangpaohu" == u.type || "qiangganghu" == u.type || "chadajiao" == u.type) {
"7pairs" == a.pattern ? r.push("七对") : "l7pairs" == a.pattern ? r.push("龙七对") : "j7pairs" == a.pattern ? r.push("将七对") : "duidui" == a.pattern ? r.push("碰碰胡") : "jiangdui" == a.pattern && r.push("将对");
"zimo" == u.type ? r.push("自摸") : "ganghua" == u.type ? r.push("杠上花") : "dianganghua" == u.type ? r.push("点杠花") : "gangpaohu" == u.type ? r.push("杠炮胡") : "qiangganghu" == u.type ? r.push("抢杠胡") : "chadajiao" == u.type && (h = !0);
o = !0;
} else "fangpao" == u.type ? r.push("放炮") : "angang" == u.type ? r.push("暗杠") : "diangang" == u.type ? r.push("明杠") : "wangang" == u.type ? r.push("弯杠") : "fanggang" == u.type ? r.push("放杠") : "zhuanshougang" == u.type ? r.push("转手杠") : "beiqianggang" == u.type ? r.push("被抢杠") : "beichadajiao" == u.type && r.push("被查叫");
}
if (o) {
a.qingyise && r.push("清一色");
a.menqing && r.push("门清");
a.zhongzhang && r.push("中张");
a.jingouhu && r.push("金钩胡");
a.haidihu && r.push("海底胡");
a.tianhu && r.push("天胡");
a.dihu && r.push("地胡");
c > 0 && r.push("根x" + c);
h && r.push("查大叫");
}
for (var g = 0; g < 3; ++g) i.hu.children[g].active = !1;
a.huorder >= 0 && (i.hu.children[a.huorder].active = !0);
i.username.string = cc.vv.gameNetMgr.seats[n].name;
i.zhuang.active = cc.vv.gameNetMgr.button == n;
i.reason.string = r.join("、");
var d = 0;
o && (d = a.fan);
i.fan.string = d + "番";
a.score > 0 ? i.score.string = "+" + a.score : i.score.string = a.score;
var v = -1;
o && (v = a.holds.pop());
cc.vv.mahjongmgr.sortMJ(a.holds, a.dingque);
o && a.holds.push(v);
for (var f = 0; f < i.mahjongs.childrenCount; ++f) (m = i.mahjongs.children[f]).active = !1;
var p = 3 * (a.pengs.length + s);
for (f = 0; f < a.holds.length; ++f) {
var m, _ = a.holds[f];
(m = i.mahjongs.children[f + p]).active = !0;
m.getComponent(cc.Sprite).spriteFrame = cc.vv.mahjongmgr.getSpriteFrameByMJID("M_", _);
}
for (f = 0; f < i._pengandgang.length; ++f) i._pengandgang[f].active = !1;
var y = 0, C = a.angangs;
for (f = 0; f < C.length; ++f) {
var M = C[f];
this.initPengAndGangs(i, y, M, "angang");
y++;
}
for (C = a.diangangs, f = 0; f < C.length; ++f) {
M = C[f];
this.initPengAndGangs(i, y, M, "diangang");
y++;
}
for (C = a.wangangs, f = 0; f < C.length; ++f) {
M = C[f];
this.initPengAndGangs(i, y, M, "wangang");
y++;
}
var B = a.pengs;
if (B) for (f = 0; f < B.length; ++f) {
M = B[f];
this.initPengAndGangs(i, y, M, "peng");
y++;
}
}
} else this._gameresult.active = !0;
},
onGameOver_XLCH: function(e) {
console.log(e);
if (0 != e.length) {
this._gameover.active = !0;
this._pingju.active = !1;
this._win.active = !1;
this._lose.active = !1;
var t = e[cc.vv.gameNetMgr.seatIndex].score;
t > 0 ? this._win.active = !0 : t < 0 ? this._lose.active = !0 : this._pingju.active = !0;
for (var n = 0; n < 4; ++n) {
for (var i = this._seats[n], a = e[n], o = !1, s = [], c = i.hupai, r = 0; r < c.children.length; ++r) c.children[r].active = !1;
var h = 0;
for (r = 0; r < a.huinfo.length; ++r) {
var l = a.huinfo[r];
o = o || l.ishupai;
if (l.ishupai && h < c.children.length) {
var u = c.children[h];
u.active = !0;
u.getComponent(cc.Sprite).spriteFrame = cc.vv.mahjongmgr.getSpriteFrameByMJID("B_", l.pai);
h++;
}
var g = "", d = "", v = a;
if (l.ishupai) "hu" == l.action ? g = "接炮胡" : "zimo" == l.action ? g = "自摸" : "ganghua" == l.action ? g = "杠上花" : "dianganghua" == l.action ? g = "点杠花" : "gangpaohu" == l.action ? g = "杠炮胡" : "qiangganghu" == l.action ? g = "抢杠胡" : "chadajiao" == l.action && (g = "查大叫"); else {
g = "fangpao" == l.action ? "放炮" : "gangpao" == l.action ? "杠上炮" : "beiqianggang" == l.action ? "被抢杠" : "被查大叫";
l = (v = e[l.target]).huinfo[l.index];
}
g += "(";
if ("7pairs" == l.pattern) {
g += "七对";
d = "、";
} else if ("l7pairs" == l.pattern) {
g += "龙七对";
d = "、";
} else if ("j7pairs" == l.pattern) {
g += "将七对";
d = "、";
} else if ("duidui" == l.pattern) {
g += "碰碰胡";
d = "、";
} else if ("jiangdui" == l.pattern) {
g += "将对";
d = "、";
}
if (l.haidihu) {
g += d + "海底胡";
d = "、";
}
if (l.tianhu) {
g += d + "天胡";
d = "、";
}
if (l.dihu) {
g += d + "地胡";
d = "、";
}
if (v.qingyise) {
g += d + "清一色";
d = "、";
}
if (v.menqing) {
g += d + "门清";
d = "、";
}
if (v.jingouhu) {
g += d + "金钩胡";
d = "、";
}
if (v.zhongzhang) {
g += d + "中张";
d = "、";
}
if (l.numofgen > 0) {
g += d + "根x" + l.numofgen;
d = "、";
}
"" == d && (g += "平胡");
g += "、" + l.fan + "番";
g += ")";
s.push(g);
}
i.hu.active = o;
a.angangs.length && s.push("暗杠x" + a.angangs.length);
a.diangangs.length && s.push("明杠x" + a.diangangs.length);
a.wangangs.length && s.push("巴杠x" + a.wangangs.length);
i.username.string = cc.vv.gameNetMgr.seats[n].name;
i.zhuang.active = cc.vv.gameNetMgr.button == n;
i.reason.string = s.join("、");
a.score > 0 ? i.score.string = "+" + a.score : i.score.string = a.score;
for (var f = 0; f < i.mahjongs.childrenCount; ++f) (_ = i.mahjongs.children[f]).active = !1;
cc.vv.mahjongmgr.sortMJ(a.holds, a.dingque);
var p = a.angangs.length + a.wangangs.length + a.diangangs.length, m = 3 * (a.pengs.length + p);
for (f = 0; f < a.holds.length; ++f) {
var _, y = a.holds[f];
(_ = i.mahjongs.children[f + m]).active = !0;
_.getComponent(cc.Sprite).spriteFrame = cc.vv.mahjongmgr.getSpriteFrameByMJID("M_", y);
}
for (f = 0; f < i._pengandgang.length; ++f) i._pengandgang[f].active = !1;
var C = 0, M = a.angangs;
for (f = 0; f < M.length; ++f) {
var B = M[f];
this.initPengAndGangs(i, C, B, "angang");
C++;
}
for (M = a.diangangs, f = 0; f < M.length; ++f) {
B = M[f];
this.initPengAndGangs(i, C, B, "diangang");
C++;
}
for (M = a.wangangs, f = 0; f < M.length; ++f) {
B = M[f];
this.initPengAndGangs(i, C, B, "wangang");
C++;
}
var b = a.pengs;
if (b) for (f = 0; f < b.length; ++f) {
B = b[f];
this.initPengAndGangs(i, C, B, "peng");
C++;
}
}
} else this._gameresult.active = !0;
},
initPengAndGangs: function(e, t, n, i) {
var a = null;
if (e._pengandgang.length <= t) {
a = cc.instantiate(cc.vv.mahjongmgr.pengPrefabSelf);
e._pengandgang.push(a);
e.mahjongs.addChild(a);
} else (a = e._pengandgang[t]).active = !0;
for (var o = a.getComponentsInChildren(cc.Sprite), s = 0; s < o.length; ++s) {
var c = o[s];
if ("gang" == c.node.name) {
var r = "peng" != i;
c.node.active = r;
c.node.scaleX = 1;
c.node.scaleY = 1;
if ("angang" == i) {
c.spriteFrame = cc.vv.mahjongmgr.getEmptySpriteFrame("myself");
c.node.scaleX = 1.4;
c.node.scaleY = 1.4;
} else c.spriteFrame = cc.vv.mahjongmgr.getSpriteFrameByMJID("B_", n);
} else c.spriteFrame = cc.vv.mahjongmgr.getSpriteFrameByMJID("B_", n);
}
a.x = 165 * t + 10 * t;
},
onBtnReadyClicked: function() {
console.log("onBtnReadyClicked");
this._isGameEnd ? this._gameresult.active = !0 : cc.vv.net.send("ready");
this._gameover.active = !1;
},
onBtnShareClicked: function() {
console.log("onBtnShareClicked");
}
});
cc._RF.pop();
}, {} ],
GameResult: [ function(e, t) {
"use strict";
cc._RF.push(t, "da25b1xg2NHlrS/zlwhbBFd", "GameResult");
cc.Class({
extends: cc.Component,
properties: {
_gameresult: null,
_seats: []
},
onLoad: function() {
if (null != cc.vv) {
this._gameresult = this.node.getChildByName("game_result");
for (var e = this._gameresult.getChildByName("seats"), t = 0; t < e.children.length; ++t) this._seats.push(e.children[t].getComponent("Seat"));
var n = cc.find("Canvas/game_result/btnClose");
n && cc.vv.utils.addClickEvent(n, this.node, "GameResult", "onBtnCloseClicked");
var i = cc.find("Canvas/game_result/btnShare");
i && cc.vv.utils.addClickEvent(i, this.node, "GameResult", "onBtnShareClicked");
var a = this;
this.node.on("game_end", function(e) {
a.onGameEnd(e.detail);
});
}
},
showResult: function(e, t, n) {
e.node.getChildByName("zuijiapaoshou").active = n;
e.node.getChildByName("zimocishu").getComponent(cc.Label).string = t.numzimo;
e.node.getChildByName("jiepaocishu").getComponent(cc.Label).string = t.numjiepao;
e.node.getChildByName("dianpaocishu").getComponent(cc.Label).string = t.numdianpao;
e.node.getChildByName("angangcishu").getComponent(cc.Label).string = t.numangang;
e.node.getChildByName("minggangcishu").getComponent(cc.Label).string = t.numminggang;
e.node.getChildByName("chajiaocishu").getComponent(cc.Label).string = t.numchadajiao;
},
onGameEnd: function(e) {
for (var t = cc.vv.gameNetMgr.seats, n = -1, i = 0, a = -1, o = 0; o < t.length; ++o) {
(s = t[o]).score > n && (n = s.score);
if (e[o].numdianpao > i) {
i = e[o].numdianpao;
a = o;
}
}
for (o = 0; o < t.length; ++o) {
var s, c = !1;
(s = t[o]).score > 0 && (c = s.score == n);
this._seats[o].setInfo(s.name, s.score, c);
this._seats[o].setID(s.userid);
var r = a == o;
this.showResult(this._seats[o], e[o], r);
}
},
onBtnCloseClicked: function() {
cc.director.loadScene("hall");
},
onBtnShareClicked: function() {
cc.vv.anysdkMgr.shareResult();
}
});
cc._RF.pop();
}, {} ],
History: [ function(e, t) {
(function(e) {
"use strict";
cc._RF.push(t, "c9827792rdPc7BCe2FXpBCv", "History");
cc.Class({
extends: cc.Component,
properties: {
HistoryItemPrefab: {
default: null,
type: cc.Prefab
},
_history: null,
_viewlist: null,
_content: null,
_viewitemTemp: null,
_historyData: null,
_curRoomInfo: null,
_emptyTip: null
},
onLoad: function() {
this._history = this.node.getChildByName("history");
this._history.active = !1;
this._emptyTip = this._history.getChildByName("emptyTip");
this._emptyTip.active = !0;
this._viewlist = this._history.getChildByName("viewlist");
this._content = cc.find("view/content", this._viewlist);
this._viewitemTemp = this._content.children[0];
this._content.removeChild(this._viewitemTemp);
var e = cc.find("Canvas/global/main/menu/btn_zhanji");
this.addClickEvent(e, this.node, "History", "onBtnHistoryClicked");
e = cc.find("Canvas/history/btn_back");
this.addClickEvent(e, this.node, "History", "onBtnBackClicked");
},
addClickEvent: function(e, t, n, i) {
var a = new cc.Component.EventHandler();
a.target = t;
a.component = n;
a.handler = i;
e.getComponent(cc.Button).clickEvents.push(a);
},
onBtnBackClicked: function() {
if (null == this._curRoomInfo) {
this._historyData = null;
this._history.active = !1;
} else this.initRoomHistoryList(this._historyData);
},
onBtnHistoryClicked: function() {
this._history.active = !0;
var t = this;
cc.vv.userMgr.getHistoryList(function(n) {
n.sort(function(e, t) {
return e.time < t.time;
});
t._historyData = n;
for (var i = 0; i < n.length; ++i) for (var a = 0; a < 4; ++a) {
var o = n[i].seats[a];
o.name = new e(o.name, "base64").toString();
}
t.initRoomHistoryList(n);
});
},
dateFormat: function(e) {
var t = new Date(e), n = "{0}-{1}-{2} {3}:{4}:{5}", i = t.getFullYear(), a = t.getMonth() + 1;
a = a >= 10 ? a : "0" + a;
var o = t.getDate();
o = o >= 10 ? o : "0" + o;
var s = t.getHours();
s = s >= 10 ? s : "0" + s;
var c = t.getMinutes();
c = c >= 10 ? c : "0" + c;
var r = t.getSeconds();
r = r >= 10 ? r : "0" + r;
return n.format(i, a, o, s, c, r);
},
initRoomHistoryList: function(e) {
for (var t = 0; t < e.length; ++t) {
var n = this.getViewItem(t);
n.idx = t;
var i = "" + (t + 1);
n.getChildByName("title").getComponent(cc.Label).string = i;
n.getChildByName("roomNo").getComponent(cc.Label).string = "房间ID:" + e[t].id;
var a = this.dateFormat(1e3 * e[t].time);
n.getChildByName("time").getComponent(cc.Label).string = a;
var o = n.getChildByName("btnOp");
o.idx = t;
o.getChildByName("Label").getComponent(cc.Label).string = "详情";
for (var s = 0; s < 4; ++s) {
var c = e[t].seats[s], r = c.name + ":" + c.score;
n.getChildByName("info" + s).getComponent(cc.Label).string = r;
}
}
this._emptyTip.active = 0 == e.length;
this.shrinkContent(e.length);
this._curRoomInfo = null;
},
initGameHistoryList: function(e, t) {
t.sort(function(e, t) {
return e.create_time < t.create_time;
});
for (var n = 0; n < t.length; ++n) {
var i = this.getViewItem(n), a = t.length - n - 1;
i.idx = a;
var o = "" + (a + 1);
i.getChildByName("title").getComponent(cc.Label).string = o;
i.getChildByName("roomNo").getComponent(cc.Label).string = "房间ID:" + e.id;
var s = this.dateFormat(1e3 * t[n].create_time);
i.getChildByName("time").getComponent(cc.Label).string = s;
var c = i.getChildByName("btnOp");
c.idx = a;
c.getChildByName("Label").getComponent(cc.Label).string = "回放";
for (var r = JSON.parse(t[n].result), h = 0; h < 4; ++h) {
var l = e.seats[h].name + ":" + r[h];
i.getChildByName("info" + h).getComponent(cc.Label).string = l;
}
}
this.shrinkContent(t.length);
this._curRoomInfo = e;
},
getViewItem: function(e) {
var t = this._content;
if (t.childrenCount > e) return t.children[e];
var n = cc.instantiate(this._viewitemTemp);
t.addChild(n);
return n;
},
shrinkContent: function(e) {
for (;this._content.childrenCount > e; ) {
var t = this._content.children[this._content.childrenCount - 1];
this._content.removeChild(t, !0);
}
},
getGameListOfRoom: function(e) {
var t = this, n = this._historyData[e];
cc.vv.userMgr.getGamesOfRoom(n.uuid, function(e) {
null != e && e.length > 0 && t.initGameHistoryList(n, e);
});
},
getDetailOfGame: function(e) {
var t = this, n = this._curRoomInfo.uuid;
cc.vv.userMgr.getDetailOfGame(n, e, function(e) {
e.base_info = JSON.parse(e.base_info);
e.action_records = JSON.parse(e.action_records);
cc.vv.gameNetMgr.prepareReplay(t._curRoomInfo, e);
cc.vv.replayMgr.init(e);
cc.director.loadScene("mjgame");
});
},
onViewItemClicked: function(e) {
var t = e.target.idx;
console.log(t);
null == this._curRoomInfo ? this.getGameListOfRoom(t) : this.getDetailOfGame(t);
},
onBtnOpClicked: function(e) {
var t = e.target.parent.idx;
console.log(t);
null == this._curRoomInfo ? this.getGameListOfRoom(t) : this.getDetailOfGame(t);
}
});
cc._RF.pop();
}).call(this, e("buffer").Buffer);
}, {
buffer: 2
} ],
HuanSanZhang: [ function(e, t) {
"use strict";
cc._RF.push(t, "361a9leeXxIEpx5zDk7amE+", "HuanSanZhang");
cc.Class({
extends: cc.Component,
properties: {
_huanpaitip: null,
_huanpaiArr: []
},
onLoad: function() {
this._huanpaitip = cc.find("Canvas/huansanzhang");
this._huanpaitip.active = cc.vv.gameNetMgr.isHuanSanZhang;
this._huanpaitip.active && this.showHuanpai(null == cc.vv.gameNetMgr.getSelfData().huanpais);
this.initHuaipaiInfo();
var e = cc.find("Canvas/huansanzhang/btn_ok");
e && cc.vv.utils.addClickEvent(e, this.node, "HuanSanZhang", "onHuanSanZhang");
var t = this;
this.node.on("game_huanpai", function() {
t._huanpaitip.active = !0;
t.showHuanpai(!0);
});
this.node.on("huanpai_notify", function(e) {
e.detail.seatindex == cc.vv.gameNetMgr.seatIndex && t.initHuaipaiInfo();
});
this.node.on("game_huanpai_over", function() {
t._huanpaitip.active = !1;
for (var e = 0; e < t._huanpaiArr.length; ++e) t._huanpaiArr[e].y = 0;
t._huanpaiArr = [];
t.initHuaipaiInfo();
});
this.node.on("game_huanpai_result", function() {
cc.vv.gameNetMgr.isHuanSanZhang = !1;
t._huanpaitip.active = !1;
for (var e = 0; e < t._huanpaiArr.length; ++e) t._huanpaiArr[e].y = 0;
t._huanpaiArr = [];
});
this.node.on("mj_clicked", function(e) {
var n = e.detail, i = t._huanpaiArr.indexOf(n);
if (-1 != i) {
n.y = 0;
t._huanpaiArr.splice(i, 1);
} else if (t._huanpaiArr.length < 3) {
t._huanpaiArr.push(n);
n.y = 15;
}
});
},
showHuanpai: function(e) {
this._huanpaitip.getChildByName("info").getComponent(cc.Label).string = "请选择三张一样花色的牌";
this._huanpaitip.getChildByName("btn_ok").getComponent(cc.Button).interactable = e;
this._huanpaitip.getChildByName("mask").active = !1;
},
initHuaipaiInfo: function() {
var e = cc.find("Canvas/game/huanpaiinfo"), t = cc.vv.gameNetMgr.getSelfData();
if (null != t.huanpais) {
e.active = !0;
for (var n = 0; n < t.huanpais.length; ++n) e.getChildByName("hp" + (n + 1)).getComponent(cc.Sprite).spriteFrame = cc.vv.mahjongmgr.getSpriteFrameByMJID("M_", t.huanpais[n]);
var i = e.getChildByName("hpm");
i.active = !0;
0 == cc.vv.gameNetMgr.huanpaimethod ? i.rotation = 90 : 1 == cc.vv.gameNetMgr.huanpaimethod ? i.rotation = 0 : 2 == cc.vv.gameNetMgr.huanpaimethod ? i.rotation = 180 : i.active = !1;
} else e.active = !1;
},
onHuanSanZhang: function() {
if (3 == this._huanpaiArr.length) {
for (var e = null, t = 0; t < this._huanpaiArr.length; ++t) {
var n = this._huanpaiArr[t].mjId, i = cc.vv.mahjongmgr.getMahjongType(n);
if (null == e) e = i; else if (e != i) return;
}
var a = {
p1: this._huanpaiArr[0].mjId,
p2: this._huanpaiArr[1].mjId,
p3: this._huanpaiArr[2].mjId
};
this._huanpaitip.getChildByName("info").getComponent(cc.Label).string = "等待其他玩家选牌...";
this._huanpaitip.getChildByName("btn_ok").getComponent(cc.Button).interactable = !1;
this._huanpaitip.getChildByName("mask").active = !0;
cc.vv.net.send("huanpai", a);
}
}
});
cc._RF.pop();
}, {} ],
ImageLoader: [ function(e, t) {
"use strict";
cc._RF.push(t, "f253a+5EyVAOo5k1xv6A8v7", "ImageLoader");
function n(e, t, n) {
cc.loader.load(e, function(e, i) {
var a = new cc.SpriteFrame(i, cc.Rect(0, 0, i.width, i.height));
n(t, a);
});
}
function i(e, t) {
null == cc.vv.baseInfoMap && (cc.vv.baseInfoMap = {});
null != cc.vv.baseInfoMap[e] ? t(e, cc.vv.baseInfoMap[e]) : cc.vv.http.sendRequest("/base_info", {
userid: e
}, function(n) {
var i = null;
n.headimgurl && (i = n.headimgurl + ".jpg");
var a = {
name: n.name,
sex: n.sex,
url: i
};
cc.vv.baseInfoMap[e] = a;
t(e, a);
}, cc.vv.http.master_url);
}
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
this.setupSpriteFrame();
},
setUserID: function(e) {
if (0 != cc.sys.isNative && e) {
null == cc.vv.images && (cc.vv.images = {});
var t = this;
i(e, function(i, a) {
a && a.url && n(a.url, e, function(e, n) {
t._spriteFrame = n;
t.setupSpriteFrame();
});
});
}
},
setupSpriteFrame: function() {
if (this._spriteFrame) {
var e = this.getComponent(cc.Sprite);
e && (e.spriteFrame = this._spriteFrame);
}
}
});
cc._RF.pop();
}, {} ],
JoinGameInput: [ function(e, t) {
"use strict";
cc._RF.push(t, "aebb2CDLFlBaLyTjW6mPofN", "JoinGameInput");
cc.Class({
extends: cc.Component,
properties: {
nums: {
default: [],
type: [ cc.Label ]
},
_inputIndex: 0
},
onLoad: function() {},
onEnable: function() {
this.onResetClicked();
},
onInputFinished: function(e) {
cc.vv.userMgr.enterRoom(e, function(t) {
if (0 == t.errcode) this.node.active = !1; else {
var n = "房间[" + e + "]不存在，请重新输入!";
1 == t.errcode && (n = "房间[" + e + "]已满!");
cc.vv.alert.show("提示", n);
this.onResetClicked();
}
}.bind(this));
},
onInput: function(e) {
if (!(this._inputIndex >= this.nums.length)) {
this.nums[this._inputIndex].string = e;
this._inputIndex += 1;
if (this._inputIndex == this.nums.length) {
var t = this.parseRoomID();
console.log("ok:" + t);
this.onInputFinished(t);
}
}
},
onN0Clicked: function() {
this.onInput(0);
},
onN1Clicked: function() {
this.onInput(1);
},
onN2Clicked: function() {
this.onInput(2);
},
onN3Clicked: function() {
this.onInput(3);
},
onN4Clicked: function() {
this.onInput(4);
},
onN5Clicked: function() {
this.onInput(5);
},
onN6Clicked: function() {
this.onInput(6);
},
onN7Clicked: function() {
this.onInput(7);
},
onN8Clicked: function() {
this.onInput(8);
},
onN9Clicked: function() {
this.onInput(9);
},
onResetClicked: function() {
for (var e = 0; e < this.nums.length; ++e) this.nums[e].string = "";
this._inputIndex = 0;
},
onDelClicked: function() {
if (this._inputIndex > 0) {
this._inputIndex -= 1;
this.nums[this._inputIndex].string = "";
}
},
onCloseClicked: function() {
this.node.active = !1;
},
parseRoomID: function() {
for (var e = "", t = 0; t < this.nums.length; ++t) e += this.nums[t].string;
return e;
}
});
cc._RF.pop();
}, {} ],
Lodinglogin: [ function(e, t) {
"use strict";
cc._RF.push(t, "21586CBnz5KWat4e0A5CLFA", "Lodinglogin");
cc.loader.loadResAll || (cc.loader.loadResAll = cc.loader.loadResDir);
cc.Class({
extends: cc.Component,
properties: {
_splash: null,
tipLabel: cc.Label,
_stateStr: "",
_progress: 0,
_isLoading: !1
},
onLoad: function() {
if (!cc.sys.isNative) {
var e = this.node.getComponent(cc.Canvas);
e.fitHeight = !0;
e.fitWidth = !0;
}
this.initMgr();
this.tipLabel.string = this._stateStr;
this._splash = cc.find("Canvas/splash");
this._splash.active = !0;
},
start: function() {
var e = this;
if (cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative) {
this._splash.active = !1;
e.checkVersion();
} else {
e._splash.active = !0;
var t = Date.now();
setTimeout(function n() {
var i = Date.now() - t;
if (i < 3e3) setTimeout(n, 33); else {
var a = 255 * (1 - (i - 3e3) / 500);
if (a < 0) {
e._splash.opacity = 0;
e.checkVersion();
} else {
e._splash.opacity = a;
setTimeout(n, 33);
}
}
}, 33);
}
},
initMgr: function() {
cc.vv = {};
var t = e("UserMgr");
cc.vv.userMgr = new t();
var n = e("ReplayMgr");
cc.vv.replayMgr = new n();
cc.vv.http = e("HTTP");
cc.vv.global = e("Global");
cc.vv.net = e("Net");
var i = e("GameNetMgr");
cc.vv.gameNetMgr = new i();
cc.vv.gameNetMgr.initHandlers();
var a = e("AnysdkMgr");
cc.vv.anysdkMgr = new a();
cc.vv.anysdkMgr.init();
var o = e("VoiceMgr");
cc.vv.voiceMgr = new o();
cc.vv.voiceMgr.init();
var s = e("AudioMgr");
cc.vv.audioMgr = new s();
cc.vv.audioMgr.init();
var c = e("Utils");
cc.vv.utils = new c();
cc.args = this.urlParse();
},
urlParse: function() {
var e, t, n = {};
if (null == window.location) return n;
for (var i = window.location.href, a = i.indexOf("?"), o = (i = i.substr(a + 1)).split("&"), s = 0; s < o.length; s++) if ((a = o[s].indexOf("=")) > 0) {
e = o[s].substring(0, a);
t = o[s].substr(a + 1);
n[e] = t;
}
return n;
},
checkVersion: function() {
var e = this, t = function(t) {
if (null == t.version) console.log("error."); else {
cc.vv.SI = t;
t.version != cc.VERSION || e.startPreloading();
}
}, n = null, i = !1, a = function() {
e._stateStr = "正在连接服务器";
n = cc.vv.http.sendRequest("/get_serverinfo", null, function(e) {
n = null;
i = !0;
t(e);
});
setTimeout(o, 5e3);
}, o = function() {
if (!i) if (n) {
n.abort();
e._stateStr = "连接失败，即将重试";
setTimeout(function() {
a();
}, 5e3);
} else a();
};
o();
},
startPreloading: function() {
this._stateStr = "正在加载资源，请稍候";
this._isLoading = !0;
var e = this;
cc.loader.onProgress = function(t, n) {
e._isLoading && (e._progress = t / n);
};
cc.loader.loadResAll("textures", function() {
e.onLoadComplete();
});
},
onLoadComplete: function() {
this._isLoading = !1;
this._stateStr = "准备登陆";
cc.director.loadScene("login");
cc.loader.onComplete = null;
},
update: function() {
if (0 != this._stateStr.length) {
this.tipLabel.string = this._stateStr + " ";
if (this._isLoading) this.tipLabel.string += Math.floor(100 * this._progress) + "%"; else for (var e = Math.floor(Date.now() / 1e3) % 4, t = 0; t < e; ++t) this.tipLabel.string += ".";
}
}
});
cc._RF.pop();
}, {
AnysdkMgr: void 0,
AudioMgr: void 0,
GameNetMgr: void 0,
Global: void 0,
HTTP: void 0,
Net: void 0,
ReplayMgr: void 0,
UserMgr: void 0,
Utils: void 0,
VoiceMgr: void 0
} ],
MJGame: [ function(e, t) {
"use strict";
cc._RF.push(t, "b68e4qRqgZOk7BWjJDMCmaz", "MJGame");
cc.Class({
extends: cc.Component,
properties: {
gameRoot: {
default: null,
type: cc.Node
},
prepareRoot: {
default: null,
type: cc.Node
},
_myMJArr: [],
_options: null,
_selectedMJ: null,
_chupaiSprite: [],
_mjcount: null,
_gamecount: null,
_hupaiTips: [],
_hupaiLists: [],
_playEfxs: [],
_opts: []
},
onLoad: function() {
if (!cc.sys.isNative && cc.sys.isMobile) {
var e = this.node.getComponent(cc.Canvas);
e.fitHeight = !0;
e.fitWidth = !0;
}
if (cc.vv) {
this.addComponent("NoticeTip");
this.addComponent("GameOver");
this.addComponent("DingQue");
this.addComponent("PengGangs");
this.addComponent("MJRoom");
this.addComponent("TimePointer");
this.addComponent("GameResult");
this.addComponent("Chat");
this.addComponent("Folds");
this.addComponent("ReplayCtrl");
this.addComponent("PopupMgr");
this.addComponent("HuanSanZhang");
this.addComponent("ReConnect");
this.addComponent("Voice");
this.addComponent("UserInfoShow");
this.initView();
this.initEventHandlers();
this.gameRoot.active = !1;
this.prepareRoot.active = !0;
this.initWanfaLabel();
this.onGameBeign();
cc.vv.audioMgr.playBGM("bgFight.mp3");
} else cc.director.loadScene("loading");
},
initView: function() {
var e = this.node.getChildByName("game");
this._mjcount = e.getChildByName("mjcount").getComponent(cc.Label);
this._mjcount.string = "剩余" + cc.vv.gameNetMgr.numOfMJ + "张";
this._gamecount = e.getChildByName("gamecount").getComponent(cc.Label);
this._gamecount.string = cc.vv.gameNetMgr.numOfGames + "/" + cc.vv.gameNetMgr.maxNumOfGames + "局";
for (var t = e.getChildByName("myself").getChildByName("holds"), n = 0; n < t.children.length; ++n) {
var i = t.children[n].getComponent(cc.Sprite);
this._myMJArr.push(i);
i.spriteFrame = null;
}
console.log("cc.director: ", cc.director);
var a = cc.view.getVisibleSize().width;
t.scaleX *= a / 1280;
t.scaleY *= a / 1280;
var o = [ "myself", "right", "up", "left" ];
for (n = 0; n < o.length; ++n) {
var s = o[n], c = e.getChildByName(s);
this._hupaiTips.push(c.getChildByName("HuPai"));
this._hupaiLists.push(c.getChildByName("hupailist"));
this._playEfxs.push(c.getChildByName("play_efx").getComponent(cc.Animation));
this._chupaiSprite.push(c.getChildByName("ChuPai").children[0].getComponent(cc.Sprite));
var r = c.getChildByName("opt");
r.active = !1;
i = r.getChildByName("pai").getComponent(cc.Sprite);
var h = {
node: r,
sprite: i
};
this._opts.push(h);
}
var l = e.getChildByName("ops");
this._options = l;
this.hideOptions();
this.hideChupai();
},
hideChupai: function() {
for (var e = 0; e < this._chupaiSprite.length; ++e) this._chupaiSprite[e].node.active = !1;
},
initEventHandlers: function() {
cc.vv.gameNetMgr.dataEventHandler = this.node;
var e = this;
this.node.on("game_holds", function() {
e.initMahjongs();
e.checkQueYiMen();
});
this.node.on("game_begin", function() {
e.onGameBeign();
});
this.node.on("game_sync", function() {
e.onGameBeign();
});
this.node.on("game_chupai", function(t) {
t = t.detail;
e.hideChupai();
e.checkQueYiMen();
t.last != cc.vv.gameNetMgr.seatIndex && e.initMopai(t.last, null);
cc.vv.replayMgr.isReplay() || t.turn == cc.vv.gameNetMgr.seatIndex || e.initMopai(t.turn, -1);
});
this.node.on("game_mopai", function(t) {
e.hideChupai();
var n = (t = t.detail).pai;
if (0 == cc.vv.gameNetMgr.getLocalIndex(t.seatIndex)) {
var i = e._myMJArr[13];
e.setSpriteFrameByMJID("M_", i, n, 13);
i.node.mjId = n;
} else cc.vv.replayMgr.isReplay() && e.initMopai(t.seatIndex, n);
});
this.node.on("game_action", function(t) {
e.showAction(t.detail);
});
this.node.on("hupai", function(t) {
var n = (t = t.detail).seatindex, i = cc.vv.gameNetMgr.getLocalIndex(n), a = e._hupaiTips[i];
a.active = !0;
0 == i && e.hideOptions();
var o = cc.vv.gameNetMgr.seats[n];
o.hued = !0;
if ("xlch" == cc.vv.gameNetMgr.conf.type) {
a.getChildByName("sprHu").active = !0;
a.getChildByName("sprZimo").active = !1;
e.initHupai(i, t.hupai);
if (t.iszimo) if (o.seatindex == cc.vv.gameNetMgr.seatIndex) {
o.holds.pop();
e.initMahjongs();
} else e.initOtherMahjongs(o);
} else {
a.getChildByName("sprHu").active = !t.iszimo;
a.getChildByName("sprZimo").active = t.iszimo;
t.iszimo && 0 == i || e.initMopai(n, t.hupai);
}
if (1 == cc.vv.replayMgr.isReplay() && "xlch" != cc.vv.gameNetMgr.conf.type) {
var s = e._opts[i];
s.node.active = !0;
s.sprite.spriteFrame = cc.vv.mahjongmgr.getSpriteFrameByMJID("M_", t.hupai);
}
t.iszimo ? e.playEfx(i, "play_zimo") : e.playEfx(i, "play_hu");
cc.vv.audioMgr.playSFX("nv/hu.mp3");
});
this.node.on("mj_count", function() {
e._mjcount.string = "剩余" + cc.vv.gameNetMgr.numOfMJ + "张";
});
this.node.on("game_num", function() {
e._gamecount.string = cc.vv.gameNetMgr.numOfGames + "/" + cc.vv.gameNetMgr.maxNumOfGames + "局";
});
this.node.on("game_over", function() {
e.gameRoot.active = !1;
e.prepareRoot.active = !0;
});
this.node.on("game_chupai_notify", function(t) {
e.hideChupai();
var n = t.detail.seatData;
n.seatindex == cc.vv.gameNetMgr.seatIndex ? e.initMahjongs() : e.initOtherMahjongs(n);
e.showChupai();
var i = cc.vv.mahjongmgr.getAudioURLByMJID(t.detail.pai);
cc.vv.audioMgr.playSFX(i);
});
this.node.on("guo_notify", function(t) {
e.hideChupai();
e.hideOptions();
t.detail.seatindex == cc.vv.gameNetMgr.seatIndex && e.initMahjongs();
cc.vv.audioMgr.playSFX("give.mp3");
});
this.node.on("guo_result", function() {
e.hideOptions();
});
this.node.on("game_dingque_finish", function() {
e.initMahjongs();
});
this.node.on("peng_notify", function(t) {
e.hideChupai();
var n = t.detail;
n.seatindex == cc.vv.gameNetMgr.seatIndex ? e.initMahjongs() : e.initOtherMahjongs(n);
var i = e.getLocalIndex(n.seatindex);
e.playEfx(i, "play_peng");
cc.vv.audioMgr.playSFX("nv/peng.mp3");
e.hideOptions();
});
this.node.on("gang_notify", function(t) {
cc.log("gang", "ppppppppp");
e.hideChupai();
var n = (t = t.detail).seatData, i = t.gangtype;
n.seatindex == cc.vv.gameNetMgr.seatIndex ? e.initMahjongs() : e.initOtherMahjongs(n);
var a = e.getLocalIndex(n.seatindex);
if ("wangang" == i) {
e.playEfx(a, "play_guafeng");
cc.vv.audioMgr.playSFX("guafeng.mp3");
} else {
e.playEfx(a, "play_xiayu");
cc.vv.audioMgr.playSFX("rain.mp3");
}
});
this.node.on("hangang_notify", function(t) {
t = t.detail;
var n = e.getLocalIndex(t);
e.playEfx(n, "play_gang");
cc.vv.audioMgr.playSFX("nv/gang.mp3");
e.hideOptions();
});
},
showChupai: function() {
var e = cc.vv.gameNetMgr.chupai;
if (e >= 0) {
var t = this.getLocalIndex(cc.vv.gameNetMgr.turn), n = this._chupaiSprite[t];
n.spriteFrame = cc.vv.mahjongmgr.getSpriteFrameByMJID("M_", e);
n.node.active = !0;
}
},
addOption: function(e, t) {
for (var n = 0; n < this._options.childrenCount; ++n) {
var i = this._options.children[n];
if ("op" == i.name && 0 == i.active) {
i.active = !0;
i.getChildByName("opTarget").getComponent(cc.Sprite).spriteFrame = cc.vv.mahjongmgr.getSpriteFrameByMJID("M_", t);
var a = i.getChildByName(e);
a.active = !0;
a.pai = t;
return;
}
}
},
hideOptions: function() {
this._options.active = !1;
for (var e = 0; e < this._options.childrenCount; ++e) {
var t = this._options.children[e];
if ("op" == t.name) {
t.active = !1;
t.getChildByName("btnPeng").active = !1;
t.getChildByName("btnGang").active = !1;
t.getChildByName("btnHu").active = !1;
}
}
},
showAction: function(e) {
this._options.active && this.hideOptions();
if (e && (e.hu || e.gang || e.peng)) {
this._options.active = !0;
e.hu && this.addOption("btnHu", e.pai);
e.peng && this.addOption("btnPeng", e.pai);
if (e.gang) for (var t = 0; t < e.gangpai.length; ++t) {
var n = e.gangpai[t];
this.addOption("btnGang", n);
}
}
},
initWanfaLabel: function() {
cc.find("Canvas/infobar/wanfa").getComponent(cc.Label).string = cc.vv.gameNetMgr.getWanfa();
},
initHupai: function(e, t) {
if ("xlch" == cc.vv.gameNetMgr.conf.type) for (var n = this._hupaiLists[e], i = 0; i < n.children.length; ++i) {
var a = n.children[i];
if (0 == a.active) {
var o = cc.vv.mahjongmgr.getFoldPre(e);
a.getComponent(cc.Sprite).spriteFrame = cc.vv.mahjongmgr.getSpriteFrameByMJID(o, t);
a.active = !0;
break;
}
}
},
playEfx: function(e, t) {
this._playEfxs[e].node.active = !0;
this._playEfxs[e].play(t);
},
onGameBeign: function() {
for (var e = 0; e < this._playEfxs.length; ++e) this._playEfxs[e].node.active = !1;
for (e = 0; e < this._hupaiLists.length; ++e) for (var t = 0; t < this._hupaiLists[e].childrenCount; ++t) this._hupaiLists[e].children[t].active = !1;
for (e = 0; e < cc.vv.gameNetMgr.seats.length; ++e) {
var n = cc.vv.gameNetMgr.seats[e], i = cc.vv.gameNetMgr.getLocalIndex(e), a = this._hupaiTips[i];
a.active = n.hued;
if (n.hued) {
a.getChildByName("sprHu").active = !n.iszimo;
a.getChildByName("sprZimo").active = n.iszimo;
}
if (n.huinfo) for (t = 0; t < n.huinfo.length; ++t) {
var o = n.huinfo[t];
o.ishupai && this.initHupai(i, o.pai);
}
}
this.hideChupai();
this.hideOptions();
var s = [ "right", "up", "left" ], c = this.node.getChildByName("game");
for (e = 0; e < s.length; ++e) {
var r = c.getChildByName(s[e]).getChildByName("holds");
for (t = 0; t < r.childrenCount; ++t) {
var h = r.children[t];
h.active = !0;
h.scaleX = 1;
h.scaleY = 1;
h.getComponent(cc.Sprite).spriteFrame = cc.vv.mahjongmgr.holdsEmpty[e + 1];
}
}
if ("" != cc.vv.gameNetMgr.gamestate || 0 != cc.vv.replayMgr.isReplay()) {
this.gameRoot.active = !0;
this.prepareRoot.active = !1;
this.initMahjongs();
var l = cc.vv.gameNetMgr.seats;
for (var e in l) {
n = l[e];
if (0 != (i = cc.vv.gameNetMgr.getLocalIndex(e))) {
this.initOtherMahjongs(n);
e == cc.vv.gameNetMgr.turn ? this.initMopai(e, -1) : this.initMopai(e, null);
}
}
this.showChupai();
if (null != cc.vv.gameNetMgr.curaction) {
this.showAction(cc.vv.gameNetMgr.curaction);
cc.vv.gameNetMgr.curaction = null;
}
this.checkQueYiMen();
}
},
onMJClicked: function(e) {
if (cc.vv.gameNetMgr.isHuanSanZhang) this.node.emit("mj_clicked", e.target); else if (cc.vv.gameNetMgr.turn == cc.vv.gameNetMgr.seatIndex) {
for (var t = 0; t < this._myMJArr.length; ++t) if (e.target == this._myMJArr[t].node) {
if (e.target == this._selectedMJ) {
this.shoot(this._selectedMJ.mjId);
this._selectedMJ.y = 0;
this._selectedMJ = null;
return;
}
null != this._selectedMJ && (this._selectedMJ.y = 0);
e.target.y = 15;
this._selectedMJ = e.target;
return;
}
} else console.log("not your turn." + cc.vv.gameNetMgr.turn);
},
shoot: function(e) {
null != e && cc.vv.net.send("chupai", e);
},
getMJIndex: function(e, t) {
return "right" == e || "up" == e ? 13 - t : t;
},
initMopai: function(e, t) {
var n = cc.vv.gameNetMgr.getLocalIndex(e), i = cc.vv.mahjongmgr.getSide(n), a = cc.vv.mahjongmgr.getFoldPre(n), o = this.node.getChildByName("game").getChildByName(i).getChildByName("holds"), s = this.getMJIndex(i, 13), c = o.children[s];
c.scaleX = 1;
c.scaleY = 1;
if (null == t) c.active = !1; else if (t >= 0) {
c.active = !0;
if ("up" == i) {
c.scaleX = .73;
c.scaleY = .73;
}
c.getComponent(cc.Sprite).spriteFrame = cc.vv.mahjongmgr.getSpriteFrameByMJID(a, t);
} else if (null != t) {
c.active = !0;
if ("up" == i) {
c.scaleX = 1;
c.scaleY = 1;
}
c.getComponent(cc.Sprite).spriteFrame = cc.vv.mahjongmgr.getHoldsEmptySpriteFrame(i);
}
},
initEmptySprites: function(e) {
for (var t = cc.vv.gameNetMgr.getLocalIndex(e), n = cc.vv.mahjongmgr.getSide(t), i = (cc.vv.mahjongmgr.getFoldPre(t), 
this.node.getChildByName("game").getChildByName(n).getChildByName("holds")), a = cc.vv.mahjongmgr.getEmptySpriteFrame(n), o = 0; o < i.childrenCount; ++o) {
var s = i.children[o];
s.scaleX = 1;
s.scaleY = 1;
s.getComponent(cc.Sprite).spriteFrame = a;
}
},
initOtherMahjongs: function(e) {
var t = this.getLocalIndex(e.seatindex);
if (0 != t) {
var n = cc.vv.mahjongmgr.getSide(t), i = this.node.getChildByName("game").getChildByName(n).getChildByName("holds"), a = e.pengs.length + e.angangs.length + e.diangangs.length + e.wangangs.length;
a *= 3;
for (var o = 0; o < a; ++o) {
var s = this.getMJIndex(n, o);
i.children[s].active = !1;
}
var c = cc.vv.mahjongmgr.getFoldPre(t), r = this.sortHolds(e);
if (null != r && r.length > 0) {
for (o = 0; o < r.length; ++o) {
s = this.getMJIndex(n, o + a);
var h = i.children[s].getComponent(cc.Sprite);
if ("up" == n) {
h.node.scaleX = .73;
h.node.scaleY = .73;
}
h.node.active = !0;
h.spriteFrame = cc.vv.mahjongmgr.getSpriteFrameByMJID(c, r[o]);
}
if (r.length + a == 13) {
var l = this.getMJIndex(n, 13);
i.children[l].active = !1;
}
}
}
},
sortHolds: function(e) {
var t = e.holds;
if (null == t) return null;
var n = null, i = t.length;
2 != i && 5 != i && 8 != i && 11 != i && 14 != i || (n = t.pop());
var a = e.dingque;
cc.vv.mahjongmgr.sortMJ(t, a);
null != n && t.push(n);
return t;
},
initMahjongs: function() {
var e = cc.vv.gameNetMgr.seats[cc.vv.gameNetMgr.seatIndex], t = this.sortHolds(e);
if (null != t) {
for (var n = 3 * (e.pengs.length + e.angangs.length + e.diangangs.length + e.wangangs.length), i = 0; i < t.length; ++i) {
var a = t[i];
(o = this._myMJArr[i + n]).node.mjId = a;
o.node.y = 0;
this.setSpriteFrameByMJID("M_", o, a);
}
for (i = 0; i < n; ++i) {
(o = this._myMJArr[i]).node.mjId = null;
o.spriteFrame = null;
o.node.active = !1;
}
for (i = n + t.length; i < this._myMJArr.length; ++i) {
var o;
(o = this._myMJArr[i]).node.mjId = null;
o.spriteFrame = null;
o.node.active = !1;
}
}
},
setSpriteFrameByMJID: function(e, t, n) {
t.spriteFrame = cc.vv.mahjongmgr.getSpriteFrameByMJID(e, n);
t.node.active = !0;
},
checkQueYiMen: function() {
if (null != cc.vv.gameNetMgr.conf && "xlch" == cc.vv.gameNetMgr.conf.type && cc.vv.gameNetMgr.getSelfData().hued) if (cc.vv.gameNetMgr.seatIndex == cc.vv.gameNetMgr.turn) for (n = 0; n < 14; ++n) 1 == (i = this._myMJArr[n]).node.active && (i.node.getComponent(cc.Button).interactable = 13 == n); else for (n = 0; n < 14; ++n) 1 == (i = this._myMJArr[n]).node.active && (i.node.getComponent(cc.Button).interactable = !0); else {
var e = cc.vv.gameNetMgr.dingque, t = !1;
if (cc.vv.gameNetMgr.seatIndex == cc.vv.gameNetMgr.turn) for (var n = 0; n < this._myMJArr.length; ++n) if (null != (i = this._myMJArr[n]).node.mjId && (a = cc.vv.mahjongmgr.getMahjongType(i.node.mjId)) == e) {
t = !0;
break;
}
for (n = 0; n < this._myMJArr.length; ++n) {
var i;
if (null != (i = this._myMJArr[n]).node.mjId) {
var a = cc.vv.mahjongmgr.getMahjongType(i.node.mjId);
i.node.getComponent(cc.Button).interactable = !t || a == e;
}
}
}
},
getLocalIndex: function(e) {
return (e - cc.vv.gameNetMgr.seatIndex + 4) % 4;
},
onOptionClicked: function(e) {
console.log(e.target.pai);
"btnPeng" == e.target.name ? cc.vv.net.send("peng") : "btnGang" == e.target.name ? cc.vv.net.send("gang", e.target.pai) : "btnHu" == e.target.name ? cc.vv.net.send("hu") : "btnGuo" == e.target.name && cc.vv.net.send("guo");
},
update: function() {},
onDestroy: function() {
console.log("onDestroy");
cc.vv && cc.vv.gameNetMgr.clear();
}
});
cc._RF.pop();
}, {} ],
MJRoom: [ function(e, t) {
"use strict";
cc._RF.push(t, "9f0aeRoHPlBlp2qaYLq2unR", "MJRoom");
cc.Class({
extends: cc.Component,
properties: {
lblRoomNo: {
default: null,
type: cc.Label
},
_seats: [],
_seats2: [],
_timeLabel: null,
_voiceMsgQueue: [],
_lastPlayingSeat: null,
_playingSeat: null,
_lastPlayTime: null
},
onLoad: function() {
if (null != cc.vv) {
this.initView();
this.initSeats();
this.initEventHandlers();
}
},
initView: function() {
for (var e = this.node.getChildByName("prepare").getChildByName("seats"), t = 0; t < e.children.length; ++t) this._seats.push(e.children[t].getComponent("Seat"));
this.refreshBtns();
this.lblRoomNo = cc.find("Canvas/infobar/Z_room_txt/New Label").getComponent(cc.Label);
this._timeLabel = cc.find("Canvas/infobar/time").getComponent(cc.Label);
this.lblRoomNo.string = cc.vv.gameNetMgr.roomId;
var n = this.node.getChildByName("game"), i = [ "myself", "right", "up", "left" ];
for (t = 0; t < i.length; ++t) {
var a = n.getChildByName(i[t]).getChildByName("seat");
this._seats2.push(a.getComponent("Seat"));
}
var o = cc.find("Canvas/prepare/btnWeichat");
o && cc.vv.utils.addClickEvent(o, this.node, "MJRoom", "onBtnWeichatClicked");
var s = cc.find("Canvas/typeTitle");
for (t = 0; t < s.children.length; ++t) s.children[t].active = !1;
if (cc.vv.gameNetMgr.conf) {
var c = cc.vv.gameNetMgr.conf.type;
null != c && "" != c || (c = "xzdd");
s.getChildByName(c).active = !0;
}
},
refreshBtns: function() {
var e = this.node.getChildByName("prepare"), t = e.getChildByName("btnExit"), n = e.getChildByName("btnDissolve"), i = e.getChildByName("btnWeichat"), a = e.getChildByName("btnBack"), o = 0 == cc.vv.gameNetMgr.numOfGames;
t.active = !cc.vv.gameNetMgr.isOwner() && o;
n.active = cc.vv.gameNetMgr.isOwner() && o;
i.active = o;
a.active = o;
},
initEventHandlers: function() {
var e = this;
this.node.on("new_user", function(t) {
e.initSingleSeat(t.detail);
});
this.node.on("user_state_changed", function(t) {
e.initSingleSeat(t.detail);
});
this.node.on("game_begin", function() {
e.refreshBtns();
e.initSeats();
});
this.node.on("game_num", function() {
e.refreshBtns();
});
this.node.on("game_huanpai", function() {
for (var t in e._seats2) e._seats2[t].refreshXuanPaiState();
});
this.node.on("huanpai_notify", function(t) {
var n = t.detail.seatindex, i = cc.vv.gameNetMgr.getLocalIndex(n);
e._seats2[i].refreshXuanPaiState();
});
this.node.on("game_huanpai_over", function() {
for (var t in e._seats2) e._seats2[t].refreshXuanPaiState();
});
this.node.on("voice_msg", function(t) {
t = t.detail;
e._voiceMsgQueue.push(t);
e.playVoice();
});
this.node.on("chat_push", function(t) {
t = t.detail;
var n = cc.vv.gameNetMgr.getSeatIndexByID(t.sender), i = cc.vv.gameNetMgr.getLocalIndex(n);
e._seats[i].chat(t.content);
e._seats2[i].chat(t.content);
});
this.node.on("quick_chat_push", function(t) {
t = t.detail;
var n = cc.vv.gameNetMgr.getSeatIndexByID(t.sender), i = cc.vv.gameNetMgr.getLocalIndex(n), a = t.content, o = cc.vv.chat.getQuickChatInfo(a);
e._seats[i].chat(o.content);
e._seats2[i].chat(o.content);
cc.vv.audioMgr.playSFX(o.sound);
});
this.node.on("emoji_push", function(t) {
t = t.detail;
var n = cc.vv.gameNetMgr.getSeatIndexByID(t.sender), i = cc.vv.gameNetMgr.getLocalIndex(n);
console.log(t);
e._seats[i].emoji(t.content);
e._seats2[i].emoji(t.content);
});
},
initSeats: function() {
for (var e = cc.vv.gameNetMgr.seats, t = 0; t < e.length; ++t) this.initSingleSeat(e[t]);
},
initSingleSeat: function(e) {
var t = cc.vv.gameNetMgr.getLocalIndex(e.seatindex), n = !e.online, i = e.seatindex == cc.vv.gameNetMgr.button;
console.log("isOffline:" + n);
this._seats[t].setInfo(e.name, e.score);
this._seats[t].setReady(e.ready);
this._seats[t].setOffline(n);
this._seats[t].setID(e.userid);
this._seats[t].voiceMsg(!1);
this._seats2[t].setInfo(e.name, e.score);
this._seats2[t].setZhuang(i);
this._seats2[t].setOffline(n);
this._seats2[t].setID(e.userid);
this._seats2[t].voiceMsg(!1);
this._seats2[t].refreshXuanPaiState();
},
onBtnSettingsClicked: function() {
cc.vv.popupMgr.showSettings();
},
onBtnBackClicked: function() {
cc.vv.alert.show("返回大厅", "返回大厅房间仍会保留，快去邀请大伙来玩吧！", function() {
cc.director.loadScene("hall");
cc.vv.halltype = 1;
}, !0);
},
onBtnChatClicked: function() {},
onBtnWeichatClicked: function() {
cc.vv.gameNetMgr.conf.type;
},
onBtnDissolveClicked: function() {
cc.vv.alert.show("解散房间", "解散房间不扣房卡，是否确定解散？", function() {
cc.vv.net.send("dispress");
}, !0);
},
onBtnExit: function() {
cc.vv.net.send("exit");
},
playVoice: function() {
if (null == this._playingSeat && this._voiceMsgQueue.length) {
console.log("playVoice2");
var e = this._voiceMsgQueue.shift(), t = cc.vv.gameNetMgr.getSeatIndexByID(e.sender), n = cc.vv.gameNetMgr.getLocalIndex(t);
this._playingSeat = n;
this._seats[n].voiceMsg(!0);
this._seats2[n].voiceMsg(!0);
var i = JSON.parse(e.content);
console.log(i.msg.length);
cc.vv.voiceMgr.writeVoice("voicemsg.amr", i.msg);
cc.vv.voiceMgr.play("voicemsg.amr");
this._lastPlayTime = Date.now() + i.time;
}
},
update: function() {
var e = Math.floor(Date.now() / 1e3 / 60);
if (this._lastMinute != e) {
this._lastMinute = e;
var t = new Date(), n = t.getHours();
n = n < 10 ? "0" + n : n;
var i = t.getMinutes();
i = i < 10 ? "0" + i : i;
this._timeLabel.string = n + ":" + i;
}
if (null != this._lastPlayTime) {
if (Date.now() > this._lastPlayTime + 200) {
this.onPlayerOver();
this._lastPlayTime = null;
}
} else this.playVoice();
},
onPlayerOver: function() {
cc.vv.audioMgr.resumeAll();
console.log("onPlayCallback:" + this._playingSeat);
var e = this._playingSeat;
this._playingSeat = null;
this._seats[e].voiceMsg(!1);
this._seats2[e].voiceMsg(!1);
},
onDestroy: function() {
cc.vv.voiceMgr.stop();
}
});
cc._RF.pop();
}, {} ],
NoticeTip: [ function(e, t) {
"use strict";
cc._RF.push(t, "0aafcQ/RJxAE7C7z3tIXJ4F", "NoticeTip");
cc.Class({
extends: cc.Component,
properties: {
_guohu: null,
_info: null,
_guohuTime: -1
},
onLoad: function() {
this._guohu = cc.find("Canvas/tip_notice");
this._guohu.active = !1;
this._info = cc.find("Canvas/tip_notice/info").getComponent(cc.Label);
var e = this;
this.node.on("push_notice", function(t) {
t = t.detail;
e._guohu.active = !0;
e._guohuTime = t.time;
e._info.string = t.info;
});
},
update: function(e) {
if (this._guohuTime > 0) {
this._guohuTime -= e;
this._guohuTime < 0 && (this._guohu.active = !1);
}
}
});
cc._RF.pop();
}, {} ],
PengGangs: [ function(e, t) {
"use strict";
cc._RF.push(t, "594e6upScRAKqdCYJ7LQDR6", "PengGangs");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
if (cc.vv) {
var e = this.node.getChildByName("game").getChildByName("myself").getChildByName("penggangs");
console.log("cc.director: ", cc.director);
var t = cc.view.getVisibleSize().width / 1280;
e.scaleX *= t;
e.scaleY *= t;
var n = this;
this.node.on("peng_notify", function(e) {
e = e.detail;
n.onPengGangChanged(e);
});
this.node.on("gang_notify", function(e) {
e = e.detail;
n.onPengGangChanged(e.seatData);
});
this.node.on("game_begin", function() {
n.onGameBein();
});
var i = cc.vv.gameNetMgr.seats;
for (var a in i) this.onPengGangChanged(i[a]);
}
},
onGameBein: function() {
this.hideSide("myself");
this.hideSide("right");
this.hideSide("up");
this.hideSide("left");
},
hideSide: function(e) {
var t = this.node.getChildByName("game").getChildByName(e).getChildByName("penggangs");
if (t) for (var n = 0; n < t.childrenCount; ++n) t.children[n].active = !1;
},
onPengGangChanged: function(e) {
if (null != e.angangs || null != e.diangangs || null != e.wangangs || null != e.pengs) {
var t = cc.vv.gameNetMgr.getLocalIndex(e.seatindex), n = cc.vv.mahjongmgr.getSide(t), i = cc.vv.mahjongmgr.getFoldPre(t);
console.log("onPengGangChanged" + t);
for (var a = this.node.getChildByName("game").getChildByName(n).getChildByName("penggangs"), o = 0; o < a.childrenCount; ++o) a.children[o].active = !1;
var s = 0, c = e.angangs;
for (o = 0; o < c.length; ++o) {
var r = c[o];
this.initPengAndGangs(a, n, i, s, r, "angang");
s++;
}
for (c = e.diangangs, o = 0; o < c.length; ++o) {
r = c[o];
this.initPengAndGangs(a, n, i, s, r, "diangang");
s++;
}
for (c = e.wangangs, o = 0; o < c.length; ++o) {
r = c[o];
this.initPengAndGangs(a, n, i, s, r, "wangang");
s++;
}
var h = e.pengs;
if (h) for (o = 0; o < h.length; ++o) {
r = h[o];
this.initPengAndGangs(a, n, i, s, r, "peng");
s++;
}
}
},
initPengAndGangs: function(e, t, n, i, a, o) {
var s = null;
if (e.childrenCount <= i) {
s = "left" == t || "right" == t ? cc.instantiate(cc.vv.mahjongmgr.pengPrefabLeft) : cc.instantiate(cc.vv.mahjongmgr.pengPrefabSelf);
e.addChild(s);
} else (s = e.children[i]).active = !0;
if ("left" == t) s.y = -75 * i; else if ("right" == t) {
s.y = 75 * i;
s.setLocalZOrder(-i);
} else s.x = "myself" == t ? 165 * i + 10 * i : -165 * i;
for (var c = s.getComponentsInChildren(cc.Sprite), r = 0; r < c.length; ++r) {
var h = c[r];
if ("gang" == h.node.name) {
var l = "peng" != o;
h.node.active = l;
h.node.scaleX = 1;
h.node.scaleY = 1;
if ("angang" == o) {
h.spriteFrame = cc.vv.mahjongmgr.getEmptySpriteFrame(t);
if ("myself" == t || "up" == t) {
h.node.scaleX = 1.4;
h.node.scaleY = 1.4;
}
} else h.spriteFrame = cc.vv.mahjongmgr.getSpriteFrameByMJID(n, a);
} else h.spriteFrame = cc.vv.mahjongmgr.getSpriteFrameByMJID(n, a);
}
}
});
cc._RF.pop();
}, {} ],
PopupMgr: [ function(e, t) {
"use strict";
cc._RF.push(t, "fa18412m3RFrZAD6LACvsmD", "PopupMgr");
cc.Class({
extends: cc.Component,
properties: {
_popuproot: null,
_settings: null,
_dissolveNotice: null,
_endTime: -1,
_extraInfo: null,
_noticeLabel: null
},
onLoad: function() {
if (null != cc.vv) {
cc.vv.popupMgr = this;
this._popuproot = cc.find("Canvas/popups");
this._settings = cc.find("Canvas/popups/settings");
this._dissolveNotice = cc.find("Canvas/popups/dissolve_notice");
this._noticeLabel = this._dissolveNotice.getChildByName("info").getComponent(cc.Label);
this.closeAll();
this.addBtnHandler("settings/btn_close");
this.addBtnHandler("settings/btn_sqjsfj");
this.addBtnHandler("dissolve_notice/btn_agree");
this.addBtnHandler("dissolve_notice/btn_reject");
this.addBtnHandler("dissolve_notice/btn_ok");
var e = this;
this.node.on("dissolve_notice", function(t) {
var n = t.detail;
e.showDissolveNotice(n);
});
this.node.on("dissolve_cancel", function() {
e.closeAll();
});
}
},
start: function() {
cc.vv.gameNetMgr.dissoveData && this.showDissolveNotice(cc.vv.gameNetMgr.dissoveData);
},
addBtnHandler: function(e) {
var t = cc.find("Canvas/popups/" + e);
this.addClickEvent(t, this.node, "PopupMgr", "onBtnClicked");
},
addClickEvent: function(e, t, n, i) {
var a = new cc.Component.EventHandler();
a.target = t;
a.component = n;
a.handler = i;
e.getComponent(cc.Button).clickEvents.push(a);
},
onBtnClicked: function(e) {
this.closeAll();
var t = e.target.name;
"btn_agree" == t ? cc.vv.net.send("dissolve_agree") : "btn_reject" == t ? cc.vv.net.send("dissolve_reject") : "btn_sqjsfj" == t && cc.vv.net.send("dissolve_request");
},
closeAll: function() {
this._popuproot.active = !1;
this._settings.active = !1;
this._dissolveNotice.active = !1;
},
showSettings: function() {
this.closeAll();
this._popuproot.active = !0;
this._settings.active = !0;
},
showDissolveRequest: function() {
this.closeAll();
this._popuproot.active = !0;
},
showDissolveNotice: function(e) {
this._endTime = Date.now() / 1e3 + e.time;
this._extraInfo = "";
for (var t = 0; t < e.states.length; ++t) {
var n = e.states[t], i = cc.vv.gameNetMgr.seats[t].name;
this._extraInfo += n ? "\n[已同意] " + i : "\n[待确认] " + i;
}
this.closeAll();
this._popuproot.active = !0;
this._dissolveNotice.active = !0;
},
update: function() {
if (this._endTime > 0) {
var e = this._endTime - Date.now() / 1e3;
e < 0 && (this._endTime = -1);
var t = Math.floor(e / 60), n = Math.ceil(e - 60 * t), i = "";
t > 0 && (i += t + "分");
this._noticeLabel.string = i + n + "秒后房间将自动解散" + this._extraInfo;
}
}
});
cc._RF.pop();
}, {} ],
RadioButton: [ function(e, t) {
"use strict";
cc._RF.push(t, "9bb5aKN2AhO9rc9uB+nKZnL", "RadioButton");
cc.Class({
extends: cc.Component,
properties: {
target: cc.Node,
sprite: cc.SpriteFrame,
checkedSprite: cc.SpriteFrame,
checked: !1,
groupId: -1
},
onLoad: function() {
if (null != cc.vv) {
if (null == cc.vv.radiogroupmgr) {
var t = e("RadioGroupMgr");
cc.vv.radiogroupmgr = new t();
cc.vv.radiogroupmgr.init();
}
console.log(typeof cc.vv.radiogroupmgr.add);
cc.vv.radiogroupmgr.add(this);
this.refresh();
}
},
refresh: function() {
var e = this.target.getComponent(cc.Sprite);
this.checked ? e.spriteFrame = this.checkedSprite : e.spriteFrame = this.sprite;
},
check: function(e) {
this.checked = e;
this.refresh();
},
onClicked: function() {
cc.vv.radiogroupmgr.check(this);
},
onDestroy: function() {
cc.vv && cc.vv.radiogroupmgr && cc.vv.radiogroupmgr.del(this);
}
});
cc._RF.pop();
}, {
RadioGroupMgr: "RadioGroupMgr"
} ],
RadioGroupMgr: [ function(e, t) {
"use strict";
cc._RF.push(t, "c78ccvLg3JLFb+ds06R6ds7", "RadioGroupMgr");
cc.Class({
extends: cc.Component,
properties: {
_groups: null
},
init: function() {
this._groups = {};
},
add: function(e) {
var t = e.groupId, n = this._groups[t];
if (null == n) {
n = [];
this._groups[t] = n;
}
n.push(e);
},
del: function(e) {
var t = e.groupId, n = this._groups[t];
if (null != n) {
var i = n.indexOf(e);
-1 != i && n.splice(i, 1);
0 == n.length && delete this._groups[t];
}
},
check: function(e) {
var t = e.groupId, n = this._groups[t];
if (null != n) for (var i = 0; i < n.length; ++i) {
var a = n[i];
a == e ? a.check(!0) : a.check(!1);
}
}
});
cc._RF.pop();
}, {} ],
ReConnect: [ function(e, t) {
"use strict";
cc._RF.push(t, "92090ZoIYtGWYDJARih2HLV", "ReConnect");
cc.Class({
extends: cc.Component,
properties: {
_reconnect: null,
_lblTip: null,
_lastPing: 0
},
onLoad: function() {
this._reconnect = cc.find("Canvas/reconnect");
this._lblTip = cc.find("Canvas/reconnect/tip").getComponent(cc.Label);
var e = this, t = function e() {
cc.vv.net.test(function(t) {
t ? cc.director.loadScene("hall") : setTimeout(e, 3e3);
});
};
console.log("adasfdasdfsdf");
this.node.on("disconnect", function n() {
e.node.off("disconnect", n);
e._reconnect.active = !0;
t();
});
},
update: function() {
if (this._reconnect.active) {
var e = Math.floor(Date.now() / 1e3) % 4;
this._lblTip.string = "与服务器断开连接，正在尝试重连";
for (var t = 0; t < e; ++t) this._lblTip.string += ".";
}
}
});
cc._RF.pop();
}, {} ],
ReplayCtrl: [ function(e, t) {
"use strict";
cc._RF.push(t, "cd404pxLQVL243CPrY7hRC9", "ReplayCtrl");
cc.Class({
extends: cc.Component,
properties: {
_nextPlayTime: 1,
_replay: null,
_isPlaying: !0
},
onLoad: function() {
if (null != cc.vv) {
this._replay = cc.find("Canvas/replay");
this._replay.active = cc.vv.replayMgr.isReplay();
}
},
onBtnPauseClicked: function() {
this._isPlaying = !1;
},
onBtnPlayClicked: function() {
this._isPlaying = !0;
},
onBtnBackClicked: function() {
cc.vv.replayMgr.clear();
cc.vv.gameNetMgr.reset();
cc.vv.gameNetMgr.roomId = null;
cc.director.loadScene("hall");
},
update: function(e) {
if (cc.vv && this._isPlaying && 1 == cc.vv.replayMgr.isReplay() && this._nextPlayTime > 0) {
this._nextPlayTime -= e;
this._nextPlayTime < 0 && (this._nextPlayTime = cc.vv.replayMgr.takeAction());
}
}
});
cc._RF.pop();
}, {} ],
Seat: [ function(e, t) {
"use strict";
cc._RF.push(t, "0a655J0tGxFP5NzRxNN4E+I", "Seat");
cc.Class({
extends: cc.Component,
properties: {
_sprIcon: null,
_zhuang: null,
_ready: null,
_offline: null,
_lblName: null,
_lblScore: null,
_scoreBg: null,
_nddayingjia: null,
_voicemsg: null,
_chatBubble: null,
_emoji: null,
_lastChatTime: -1,
_userName: "",
_score: 0,
_dayingjia: !1,
_isOffline: !1,
_isReady: !1,
_isZhuang: !1,
_userId: null
},
onLoad: function() {
if (null != cc.vv) {
this._sprIcon = this.node.getChildByName("icon").getComponent("ImageLoader");
this._lblName = this.node.getChildByName("name").getComponent(cc.Label);
this._lblScore = this.node.getChildByName("score").getComponent(cc.Label);
this._voicemsg = this.node.getChildByName("voicemsg");
this._xuanpai = this.node.getChildByName("xuanpai");
this.refreshXuanPaiState();
this._voicemsg && (this._voicemsg.active = !1);
this._sprIcon && this._sprIcon.getComponent(cc.Button) && cc.vv.utils.addClickEvent(this._sprIcon, this.node, "Seat", "onIconClicked");
this._offline = this.node.getChildByName("offline");
this._ready = this.node.getChildByName("ready");
this._zhuang = this.node.getChildByName("zhuang");
this._scoreBg = this.node.getChildByName("Z_money_frame");
this._nddayingjia = this.node.getChildByName("dayingjia");
this._chatBubble = this.node.getChildByName("ChatBubble");
null != this._chatBubble && (this._chatBubble.active = !1);
this._emoji = this.node.getChildByName("emoji");
null != this._emoji && (this._emoji.active = !1);
this.refresh();
this._sprIcon && this._userId && this._sprIcon.setUserID(this._userId);
}
},
onIconClicked: function() {
var e = this._sprIcon.node.getComponent(cc.Sprite);
if (null != this._userId && this._userId > 0) {
var t = cc.vv.gameNetMgr.getSeatByID(this._userId), n = 0;
if (cc.vv.baseInfoMap) {
var i = cc.vv.baseInfoMap[this._userId];
i && (n = i.sex);
}
cc.vv.userinfoShow.show(t.name, t.userid, e, n, t.ip);
}
},
refresh: function() {
null != this._lblName && (this._lblName.string = this._userName);
null != this._lblScore && (this._lblScore.string = this._score);
null != this._nddayingjia && (this._nddayingjia.active = 1 == this._dayingjia);
this._offline && (this._offline.active = this._isOffline && "" != this._userName);
this._ready && (this._ready.active = this._isReady && cc.vv.gameNetMgr.numOfGames > 0);
this._zhuang && (this._zhuang.active = this._isZhuang);
this.node.active = null != this._userName && "" != this._userName;
},
setInfo: function(e, t, n) {
this._userName = e;
this._score = t;
null == this._score && (this._score = 0);
this._dayingjia = n;
null != this._scoreBg && (this._scoreBg.active = null != this._score);
null != this._lblScore && (this._lblScore.node.active = null != this._score);
this.refresh();
},
setZhuang: function(e) {
this._zhuang && (this._zhuang.active = e);
},
setReady: function(e) {
this._isReady = e;
this._ready && (this._ready.active = this._isReady && cc.vv.gameNetMgr.numOfGames > 0);
},
setID: function(e) {
var t = this.node.getChildByName("id");
t && (t.getComponent(cc.Label).string = "ID:" + e);
this._userId = e;
this._sprIcon && this._sprIcon.setUserID(e);
},
setOffline: function(e) {
this._isOffline = e;
this._offline && (this._offline.active = this._isOffline && "" != this._userName);
},
chat: function(e) {
if (null != this._chatBubble && null != this._emoji) {
this._emoji.active = !1;
this._chatBubble.active = !0;
this._chatBubble.getComponent(cc.Label).string = e;
this._chatBubble.getChildByName("New Label").getComponent(cc.Label).string = e;
this._lastChatTime = 3;
}
},
emoji: function(e) {
if (null != this._emoji && null != this._emoji) {
console.log(e);
this._chatBubble.active = !1;
this._emoji.active = !0;
this._emoji.getComponent(cc.Animation).play(e);
this._lastChatTime = 3;
}
},
voiceMsg: function(e) {
this._voicemsg && (this._voicemsg.active = e);
},
refreshXuanPaiState: function() {
if (null != this._xuanpai) {
this._xuanpai.active = cc.vv.gameNetMgr.isHuanSanZhang;
if (0 != cc.vv.gameNetMgr.isHuanSanZhang) {
this._xuanpai.getChildByName("xz").active = !1;
this._xuanpai.getChildByName("xd").active = !1;
var e = cc.vv.gameNetMgr.getSeatByID(this._userId);
e && (null == e.huanpais ? this._xuanpai.getChildByName("xz").active = !0 : this._xuanpai.getChildByName("xd").active = !0);
}
}
},
update: function(e) {
if (this._lastChatTime > 0) {
this._lastChatTime -= e;
if (this._lastChatTime < 0) {
this._chatBubble.active = !1;
this._emoji.active = !1;
this._emoji.getComponent(cc.Animation).stop();
}
}
}
});
cc._RF.pop();
}, {} ],
TimePointer: [ function(e, t) {
"use strict";
cc._RF.push(t, "2cec180dg5FbZBjz0vSx8X6", "TimePointer");
cc.Class({
extends: cc.Component,
properties: {
_arrow: null,
_pointer: null,
_timeLabel: null,
_time: -1,
_alertTime: -1
},
onLoad: function() {
var e = this.node.getChildByName("game");
this._arrow = e.getChildByName("arrow");
this._pointer = this._arrow.getChildByName("pointer");
this.initPointer();
this._timeLabel = this._arrow.getChildByName("lblTime").getComponent(cc.Label);
this._timeLabel.string = "00";
var t = this;
this.node.on("game_begin", function() {
t.initPointer();
});
this.node.on("game_chupai", function() {
t.initPointer();
t._time = 30;
t._alertTime = 3;
});
},
initPointer: function() {
if (null != cc.vv) {
this._arrow.active = "playing" == cc.vv.gameNetMgr.gamestate;
if (this._arrow.active) for (var e = cc.vv.gameNetMgr.turn, t = cc.vv.gameNetMgr.getLocalIndex(e), n = 0; n < this._pointer.children.length; ++n) this._pointer.children[n].active = n == t;
}
},
update: function(e) {
if (this._time > 0) {
this._time -= e;
if (this._alertTime > 0 && this._time < this._alertTime) {
cc.vv.audioMgr.playSFX("timeup_alarm.mp3");
this._alertTime = -1;
}
var t = "";
this._time < 0 && (this._time = 0);
var n = Math.ceil(this._time);
n < 10 && (t = "0");
this._timeLabel.string = t + n;
}
}
});
cc._RF.pop();
}, {} ],
UserInfoShow: [ function(e, t) {
"use strict";
cc._RF.push(t, "28240nr0jlB963YFZ4XkuUL", "UserInfoShow");
cc.Class({
extends: cc.Component,
properties: {
_userinfo: null
},
onLoad: function() {
if (null != cc.vv) {
this._userinfo = cc.find("Canvas/userinfo");
this._userinfo.active = !1;
cc.vv.utils.addClickEvent(this._userinfo, this.node, "UserInfoShow", "onClicked");
cc.vv.userinfoShow = this;
}
},
show: function(e, t, n, i, a) {
if (null != t && t > 0) {
this._userinfo.active = !0;
this._userinfo.getChildByName("icon").getComponent(cc.Sprite).spriteFrame = n.spriteFrame;
this._userinfo.getChildByName("name").getComponent(cc.Label).string = e;
this._userinfo.getChildByName("ip").getComponent(cc.Label).string = "IP: " + a.replace("::ffff:", "");
this._userinfo.getChildByName("id").getComponent(cc.Label).string = "ID: " + t;
var o = this._userinfo.getChildByName("sex_female");
o.active = !1;
var s = this._userinfo.getChildByName("sex_male");
s.active = !1;
1 == i ? s.active = !0 : 2 == i && (o.active = !0);
}
},
onClicked: function() {
this._userinfo.active = !1;
}
});
cc._RF.pop();
}, {} ],
Voice: [ function(e, t) {
"use strict";
cc._RF.push(t, "edcddHQ8s1Jw48/UaWN7x7O", "Voice");
cc.Class({
extends: cc.Component,
properties: {
_lastTouchTime: null,
_voice: null,
_volume: null,
_voice_failed: null,
_lastCheckTime: -1,
_timeBar: null,
MAX_TIME: 15e3
},
onLoad: function() {
this._voice = cc.find("Canvas/voice");
this._voice.active = !1;
this._voice_failed = cc.find("Canvas/voice/voice_failed");
this._voice_failed.active = !1;
this._timeBar = cc.find("Canvas/voice/time");
this._timeBar.scaleX = 0;
this._volume = cc.find("Canvas/voice/volume");
for (var e = 1; e < this._volume.children.length; ++e) this._volume.children[e].active = !1;
(t = cc.find("Canvas/voice/voice_failed/btn_ok")) && cc.vv.utils.addClickEvent(t, this.node, "Voice", "onBtnOKClicked");
var t, n = this;
if (t = cc.find("Canvas/btn_voice")) {
t.on(cc.Node.EventType.TOUCH_START, function() {
console.log("cc.Node.EventType.TOUCH_START");
cc.vv.voiceMgr.prepare("record.amr");
n._lastTouchTime = Date.now();
n._voice.active = !0;
n._voice_failed.active = !1;
});
t.on(cc.Node.EventType.TOUCH_MOVE, function() {
console.log("cc.Node.EventType.TOUCH_MOVE");
});
t.on(cc.Node.EventType.TOUCH_END, function() {
console.log("cc.Node.EventType.TOUCH_END");
if (Date.now() - n._lastTouchTime < 1e3) {
n._voice_failed.active = !0;
cc.vv.voiceMgr.cancel();
} else n.onVoiceOK();
n._lastTouchTime = null;
});
t.on(cc.Node.EventType.TOUCH_CANCEL, function() {
console.log("cc.Node.EventType.TOUCH_CANCEL");
cc.vv.voiceMgr.cancel();
n._lastTouchTime = null;
n._voice.active = !1;
});
}
},
onVoiceOK: function() {
if (null != this._lastTouchTime) {
cc.vv.voiceMgr.release();
var e = Date.now() - this._lastTouchTime, t = cc.vv.voiceMgr.getVoiceData("record.amr");
cc.vv.net.send("voice_msg", {
msg: t,
time: e
});
}
this._voice.active = !1;
},
onBtnOKClicked: function() {
this._voice.active = !1;
},
update: function() {
if (1 == this._voice.active && 0 == this._voice_failed.active && Date.now() - this._lastCheckTime > 300) {
for (var e = 0; e < this._volume.children.length; ++e) this._volume.children[e].active = !1;
var t = cc.vv.voiceMgr.getVoiceLevel(7);
t >= 1 && t <= 7 && (this._volume.children[t - 1].active = !0);
this._lastCheckTime = Date.now();
}
if (this._lastTouchTime) {
var n = Date.now() - this._lastTouchTime;
if (n >= this.MAX_TIME) {
this.onVoiceOK();
this._lastTouchTime = null;
} else {
var i = n / this.MAX_TIME;
this._timeBar.scaleX = 1 - i;
}
}
}
});
cc._RF.pop();
}, {} ],
createrole: [ function(e, t) {
"use strict";
cc._RF.push(t, "47a6fr2HmhKia0QntyDcy1s", "createrole");
cc.Class({
extends: cc.Component,
properties: {
inputName: cc.EditBox
},
onRandomBtnClicked: function() {
var e = [ "上官", "欧阳", "东方", "端木", "独孤", "司马", "南宫", "夏侯", "诸葛", "皇甫", "长孙", "宇文", "轩辕", "东郭", "子车", "东阳", "子言", "雀圣", "赌侠", "赌圣", "稳赢", "不输", "好运", "自摸", "有钱", "土豪" ], t = Math.floor(Math.random() * (e.length - 1));
this.inputName.string = "YB" + e[t];
},
onLoad: function() {
if (!cc.sys.isNative && cc.sys.isMobile) {
var e = this.node.getComponent(cc.Canvas);
e.fitHeight = !0;
e.fitWidth = !0;
}
this.onRandomBtnClicked();
},
onBtnConfirmClicked: function() {
var e = this.inputName.string;
if ("" != e) {
console.log(e);
cc.vv.userMgr.create(e);
} else console.log("invalid name.");
}
});
cc._RF.pop();
}, {} ],
hall: [ function(e, t) {
"use strict";
cc._RF.push(t, "a63d9t3AuBKVLfInT9JAVaH", "hall");
e("Net"), e("Global");
cc.Class({
extends: cc.Component,
properties: {
createRoomWin: cc.Node,
settingsWin: cc.Node,
helpWin: cc.Node,
xiaoxiWin: cc.Node,
zhanjiWin: cc.Node,
dezhoutitle: cc.Node,
mjtitle: cc.Node,
btnJoinGame: cc.Node,
btnReturnGame: cc.Node,
joinGameWin: cc.Node,
dezhoupk: {
default: null,
type: cc.Sprite
},
doudizhu: {
default: null,
type: cc.Sprite
},
xzmj: {
default: null,
type: cc.Sprite
},
ermj: {
default: null,
type: cc.Sprite
},
xiangqi: {
default: null,
type: cc.Sprite
},
buyu: {
default: null,
type: cc.Sprite
},
woman: {
default: null,
type: cc.Node
},
sencond: {
default: null,
type: cc.Node
},
back: {
default: null,
type: cc.Sprite
},
notice: {
default: null,
type: cc.Label
},
lblName: cc.Label,
lblMoney: cc.Label,
lblGems: cc.Label
},
initNetHandlers: function() {},
onLoad: function() {
var e = this;
if (!cc.sys.isNative && cc.sys.isMobile) {
var t = this.node.getComponent(cc.Canvas);
t.fitHeight = !0;
t.fitWidth = !0;
}
if (cc.vv) {
this.initLabels();
cc.log("roomid", cc.vv.gameNetMgr.roomId);
if (null == cc.vv.gameNetMgr.roomId) {
this.btnJoinGame.active = !0;
this.btnReturnGame.active = !1;
} else {
this.btnJoinGame.active = !1;
this.btnReturnGame.active = !0;
}
var n = cc.vv.userMgr.oldRoomId;
cc.log("roomold", n);
if (null != n) {
cc.vv.userMgr.oldRoomId = null;
cc.vv.userMgr.enterRoom(n);
}
if (1 === cc.vv.halltype) {
this.hidenode();
this.dezhoutitle.active = !1;
this.mjtitle.active = !0;
this.woman.x = 0;
this.woman.y = -111;
}
this.dezhoupk.node.on("touchstart", function() {
e.hidenode();
e.woman.x = 0;
e.woman.y = -111;
e.dezhoutitle.active = !0;
e.mjtitle.active = !1;
});
this.xzmj.node.on("touchstart", function() {
e.hidenode();
e.woman.x = 0;
e.woman.y = -111;
e.dezhoutitle.active = !1;
e.mjtitle.active = !0;
});
this.back.node.on("touchstart", function() {
e.shownode();
e.woman.x = -402;
e.woman.y = -111;
});
cc.vv.audioMgr.playBGM("bgMain.mp3");
this.initButtonHandler("Canvas/global/main/menu/btn_setting");
this.initButtonHandler("Canvas/global/main/menu/btn_help");
this.initButtonHandler("Canvas/global/main/menu/btn_xiaoxi");
this.initButtonHandler("Canvas/global/main/menu/btn_zhanji");
this.helpWin.addComponent("OnBack");
this.xiaoxiWin.addComponent("OnBack");
this.zhanjiWin.addComponent("OnBack");
cc.vv.userMgr.notice || (cc.vv.userMgr.notice = {
version: null,
msg: "数据请求中..."
});
this.notice.string = cc.vv.userMgr.notice.msg;
this.refreshInfo();
this.refreshNotice();
} else cc.director.loadScene("loading");
},
refreshInfo: function() {
var e = {
account: cc.vv.userMgr.account,
sign: cc.vv.userMgr.sign
};
cc.vv.http.sendRequest("/get_user_status", e, function(e) {
0 !== e.errcode ? console.log(e.errmsg) : null != e.gems && (this.lblGems.string = e.gems);
}.bind(this));
},
refreshNotice: function() {
var e = {
account: cc.vv.userMgr.account,
sign: cc.vv.userMgr.sign,
type: "notice",
version: cc.vv.userMgr.notice.version
};
cc.vv.http.sendRequest("/get_message", e, function(e) {
if (0 !== e.errcode) console.log(e.errmsg); else {
cc.vv.userMgr.notice.version = e.version;
cc.vv.userMgr.notice.msg = e.msg;
this.notice.string = e.msg;
}
}.bind(this));
},
initButtonHandler: function(e) {
var t = cc.find(e);
cc.vv.utils.addClickEvent(t, this.node, "hall", "onBtnClicked");
},
onBtnClicked: function(e) {
"btn_setting" == e.target.name ? this.settingsWin.active = !0 : "btn_help" == e.target.name ? this.helpWin.active = !0 : "btn_xiaoxi" == e.target.name ? this.xiaoxiWin.active = !0 : "btn_zhanji" == e.target.name && (this.zhanjiWin.active = !0);
},
initLabels: function() {
this.lblName.string = cc.vv.userMgr.userName;
this.lblMoney.string = cc.vv.userMgr.coins;
this.lblGems.string = cc.vv.userMgr.gems;
},
hidenode: function() {
this.dezhoupk.node.active = !1;
this.doudizhu.node.active = !1;
this.xzmj.node.active = !1;
this.ermj.node.active = !1;
this.xiangqi.node.active = !1;
this.buyu.node.active = !1;
this.sencond.active = !0;
},
shownode: function() {
this.dezhoupk.node.active = !0;
this.doudizhu.node.active = !0;
this.xzmj.node.active = !0;
this.ermj.node.active = !0;
this.xiangqi.node.active = !0;
this.buyu.node.active = !0;
this.sencond.active = !1;
},
onJoinGameClicked: function() {
this.joinGameWin.active = !0;
},
onReturnGameClicked: function() {
cc.director.loadScene("mjgame");
},
onCreateRoomClicked: function() {
if (null == cc.vv.gameNetMgr.roomId) {
console.log("onCreateRoomClicked");
this.createRoomWin.active = !0;
} else cc.vv.alert.show("提示", "房间已经创建!\n必须解散当前房间才能创建新的房间");
},
update: function(e) {
var t = this.notice.node.x;
(t -= 120 * e) + this.notice.node.width < -360 && (t = 600);
this.notice.node.x = t;
if (cc.vv && null != cc.vv.userMgr.roomData) {
cc.vv.userMgr.enterRoom(cc.vv.userMgr.roomData);
cc.vv.userMgr.roomData = null;
}
}
});
cc._RF.pop();
}, {
Global: void 0,
Net: void 0
} ],
login: [ function(e, t) {
"use strict";
cc._RF.push(t, "bbf1b43cW9Ovacibb4rBF7T", "login");
String.prototype.format = function(e) {
if (arguments.length > 0) {
var t = this;
if (1 == arguments.length && "object" == typeof e) for (var n in e) {
var i = new RegExp("({" + n + "})", "g");
t = t.replace(i, e[n]);
} else for (var a = 0; a < arguments.length; a++) {
if (null == arguments[a]) return "";
i = new RegExp("({[" + a + "]})", "g");
t = t.replace(i, arguments[a]);
}
return t;
}
return this;
};
cc.Class({
extends: cc.Component,
properties: {
_mima: null,
_mimaIndex: 0
},
onLoad: function() {
if (!cc.sys.isNative && cc.sys.isMobile) {
var e = this.node.getComponent(cc.Canvas);
e.fitHeight = !0;
e.fitWidth = !0;
}
if (cc.vv) {
cc.vv.http.url = cc.vv.http.master_url;
cc.vv.net.addHandler("push_need_create_role", function() {
console.log("onLoad:push_need_create_role");
cc.director.loadScene("createrole");
});
cc.vv.audioMgr.playBGM("bgMain.mp3");
this._mima = [ "A", "A", "B", "B", "A", "B", "A", "B", "A", "A", "A", "B", "B", "B" ];
cc.sys.isNative && cc.sys.os != cc.sys.OS_WINDOWS || (cc.find("Canvas/global/button/btn_yk").active = !0);
} else cc.director.loadScene("loading");
},
start: function() {},
onBtnQuickStartClicked: function() {
cc.vv.userMgr.guestAuth();
cc.vv.audioMgr.playSFX("button.mp3");
},
onBtnMIMAClicked: function(e) {
if (this._mima[this._mimaIndex] == e.target.name) {
this._mimaIndex++;
this._mimaIndex == this._mima.length && (cc.find("Canvas/global/button/btn_yk").active = !0);
} else {
console.log("oh ho~~~");
this._mimaIndex = 0;
}
}
});
cc._RF.pop();
}, {} ],
setting: [ function(e, t) {
"use strict";
cc._RF.push(t, "ca48dCjc1lMDKZsoTXRVIYT", "setting");
cc.Class({
extends: cc.Component,
properties: {
_btnYXOpen: null,
_btnYXClose: null,
_btnYYOpen: null,
_btnYYClose: null
},
onLoad: function() {
if (null != cc.vv) {
this._btnYXOpen = this.node.getChildByName("yinxiao").getChildByName("btn_yx_open");
this._btnYXClose = this.node.getChildByName("yinxiao").getChildByName("btn_yx_close");
this._btnYYOpen = this.node.getChildByName("yinyue").getChildByName("btn_yy_open");
this._btnYYClose = this.node.getChildByName("yinyue").getChildByName("btn_yy_close");
this.initButtonHandler(this.node.getChildByName("btn_close"));
this.initButtonHandler(this.node.getChildByName("btn_exit"));
this.initButtonHandler(this._btnYXOpen);
this.initButtonHandler(this._btnYXClose);
this.initButtonHandler(this._btnYYOpen);
this.initButtonHandler(this._btnYYClose);
var e = this.node.getChildByName("yinxiao").getChildByName("progress");
cc.vv.utils.addSlideEvent(e, this.node, "setting", "onSlided");
e = this.node.getChildByName("yinyue").getChildByName("progress");
cc.vv.utils.addSlideEvent(e, this.node, "setting", "onSlided");
this.refreshVolume();
}
},
onSlided: function(e) {
"yinxiao" == e.node.parent.name ? cc.vv.audioMgr.setSFXVolume(e.progress) : "yinyue" == e.node.parent.name && cc.vv.audioMgr.setBGMVolume(e.progress);
this.refreshVolume();
},
initButtonHandler: function(e) {
cc.vv.utils.addClickEvent(e, this.node, "setting", "onBtnClicked");
},
refreshVolume: function() {
this._btnYXClose.active = cc.vv.audioMgr.sfxVolume > 0;
this._btnYXOpen.active = !this._btnYXClose.active;
var e = this.node.getChildByName("yinxiao"), t = 430 * cc.vv.audioMgr.sfxVolume;
(n = e.getChildByName("progress")).getComponent(cc.Slider).progress = cc.vv.audioMgr.sfxVolume;
n.getChildByName("progress").width = t;
this._btnYYClose.active = cc.vv.audioMgr.bgmVolume > 0;
this._btnYYOpen.active = !this._btnYYClose.active;
var n, i = this.node.getChildByName("yinyue");
t = 430 * cc.vv.audioMgr.bgmVolume;
(n = i.getChildByName("progress")).getComponent(cc.Slider).progress = cc.vv.audioMgr.bgmVolume;
n.getChildByName("progress").width = t;
},
onBtnClicked: function(e) {
if ("btn_close" == e.target.name) this.node.active = !1; else if ("btn_exit" == e.target.name) cc.director.loadScene("login"); else if ("btn_yx_open" == e.target.name) {
cc.vv.audioMgr.setSFXVolume(1);
this.refreshVolume();
} else if ("btn_yx_close" == e.target.name) {
cc.vv.audioMgr.setSFXVolume(0);
this.refreshVolume();
} else if ("btn_yy_open" == e.target.name) {
cc.vv.audioMgr.setBGMVolume(1);
this.refreshVolume();
} else if ("btn_yy_close" == e.target.name) {
cc.vv.audioMgr.setBGMVolume(0);
this.refreshVolume();
}
}
});
cc._RF.pop();
}, {} ],
"use_v2.0.x_cc.Toggle_event": [ function(e, t) {
"use strict";
cc._RF.push(t, "eb1476l1+hF54Hq6AvN5Ykg", "use_v2.0.x_cc.Toggle_event");
cc.Toggle && (cc.Toggle._triggerEventInScript_check = !0);
cc._RF.pop();
}, {} ]
}, {}, [ "use_v2.0.x_cc.Toggle_event", "createrole", "CheckBox", "CreateRoom", "JoinGameInput", "hall", "setting", "Lodinglogin", "login", "Alert", "Chat", "DingQue", "Folds", "GameOver", "GameResult", "History", "HuanSanZhang", "ImageLoader", "MJGame", "MJRoom", "NoticeTip", "PengGangs", "PopupMgr", "RadioButton", "RadioGroupMgr", "ReConnect", "ReplayCtrl", "Seat", "TimePointer", "UserInfoShow", "Voice" ]);