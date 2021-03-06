var StartLayer = cc.Layer.extend({
	ctor:function(){
		this._super();
		var size = cc.winSize;
		
		//背景
		var backGround = new cc.Sprite(res.Scene_jpg);
		backGround.setPosition(size.width>>1,size.height>>1);
		this.addChild(backGround);
		//开始按钮
		
		var startBtn = new ccui.Button();
		startBtn.loadTextures(res.Start_png, "", "");
//		startBtn.setTitleText("开始游戏");
//		startBtn.setTitleFontSize(100)
		startBtn.setPosition(size.width>>1, size.height>>1)
		this.addChild(startBtn);
		
		startBtn.addTouchEventListener(this.onTouchEvent,this);
		
		return true;
	},
	onTouchEvent:function(sender,type)
	{
		switch (type) {
		case ccui.Widget.TOUCH_BEGAN:

			break;
		case ccui.Widget.TOUCH_ENDED:
//			cc.director.pushScene(new cc.TransitionSlideInT(1,new GameScene()))//new OverScene());
//			cc.director.replaceScene(new cc.TransitionFadeDown(1,new GameScene()));
//			cc.director.replaceScene(new cc.Tr
//			cc.director.replaceScene(new cc.TransitionProgressRadialCW(1,new GameScene()))
			cc.director.replaceScene(new cc.TransitionPageTurn(1,new GameScene(),false));
			break;
		case ccui.Widget.TOUCH_MOVED:

			break;
		case ccui.Widget.TOUCH_CANCELED:

			break;
		default:
			break;
		}
	}
});

//开始游戏场景
var StartScene = cc.Scene.extend({
	onEnter:function(){
		this._super();
		var layer = new StartLayer();
		this.addChild(layer);
	}
})