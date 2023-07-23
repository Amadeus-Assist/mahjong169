// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        account:cc.EditBox,
        prevPassword:cc.EditBox,
        newPassword:cc.EditBox,
        alertLabel:cc.Label
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        if(!cc.sys.isNative && cc.sys.isMobile){
            var cvs = this.node.getComponent(cc.Canvas);
            cvs.fitHeight = true;
            cvs.fitWidth = true;
        }
        console.log("alert in changepwd: ", this.alertLabel);
        cc.vv.changePwdAlert = this.alertLabel;
        var guafeng = cc.find("guafeng", this.node).getComponent(cc.Animation);
        guafeng.on("stop",this.onAnimationStop,guafeng);
        // cc.vv.changePwdAlert.alertLabel.node.active=false;
    },

    onAnimationStop:function(event){
        console.log("onAnimationStop, event: ", event);
        console.log("onAnimationStop, this: ", this);
        this.node.active=false;
    },

    start () {

    },

    onChangePwd:function(ret) {
        if(ret.errcode!==0){
            console.log("change pwd failed");
            console.log(cc.vv.changePwdAlert);
            cc.vv.changePwdAlert.string=ret.errmsg;
            cc.vv.changePwdAlert.node.active=true;
        }else{
            cc.director.loadScene("login");
        }
    },

    onBackBtnClicked:function() {
        cc.director.loadScene("login");
    },

    onConfirmBtnClicked:function() {
        cc.vv.userMgr.changePwd(this.account.string,this.prevPassword.string,this.newPassword.string,this.onChangePwd);
    },

    onGuafengClicked:function() {
        console.log("this.node: ", this.node);
        var guafeng = cc.find("guafeng", this.node);
        console.log("guafeng: ", guafeng);
        guafeng.active=true;
        guafeng.getComponent(cc.Animation).play("peng");
    }

    // update (dt) {},
});
