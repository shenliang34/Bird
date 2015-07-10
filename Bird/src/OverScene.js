var OverLayer = cc.Layer.extend({
	_scoreValue:0,
	_score:null,
	ctor:function(){
		this._super();
		
		var size = cc.winSize;
		//背景
		var bg = cc.Sprite(res.Scene_jpg);
		bg.setPosition(size.width>>1, size.height>>1);
		this.addChild(bg);
		//分数
		this._score = new cc.LabelTTF("0","",50);
		this._score.setPosition(size.width>>1,(size.height>>1) + 100);
		this.addChild(this._score);
		//继续游戏
		
		var continueBtn = new ccui.Button();
		continueBtn.loadTextures(res.Continue_png, "", "");
		continueBtn.setPosition(size.width>>1, (size.height>>1) - 100);
		this.addChild(continueBtn);
		continueBtn.addTouchEventListener(this.onTouchEvent, this);
		return true;
	},
	onTouchEvent : function(sender,type)
	{
		switch (type) {
		case ccui.Widget.TOUCH_BEGAN:

			break;
		case ccui.Widget.TOUCH_ENDED:
			cc.director.popScene();
			break;
		case ccui.Widget.TOUCH_MOVED:

			break;
		case ccui.Widget.TOUCH_CANCELED:

			break;

		default:
			break;
		}
	}
})
var OverScene = cc.Scene.extend({
	onEnter:function(){
		this._super();
		var layer = new OverLayer();
		this.addChild(layer);
	}
})