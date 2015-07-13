var TouchLayer = cc.Layer.extend({
	ctor:function(){
		this._super();
		
		var size = cc.winSize;
		var bird = cc.Sprite(res.Bird_png,cc.rect(0, 0, 320, 240));
		bird.setPosition(size.width>>1, size.height>>1);
		this.addChild(bird);
		
		var onTouchEvent = cc.EventListener.create({
			event:cc.EventListener.TOUCH_ONE_BY_ONE,
			sallowTouches:true,
			onTouchBegan:function(touch , event){
				var box = bird.getBoundingBox();
				var position = touch.getLocation();
				if(cc.rectContainsRect(box, new cc.rect(position.x, position.y, 1, 1))){
					cc.log("点击中了"+box+position);
				}
			return false;
			}
			})
		cc.eventManager.addListener(onTouchEvent, this);
		return true;
	},
	onEnter:function(){
		this._super();
	}
});
var TouchScene = cc.Scene.extend({
	onEnter:function(){
		this._super();
		var layer = new TouchLayer();
		this.addChild(layer);
	},
	onExit:function(){
		this._super();
	}
});