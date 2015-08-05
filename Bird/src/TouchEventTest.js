var TouchLayer = cc.Layer.extend({
	_draw:null,
	_drawX : 0,
	_self:null,
	ctor:function(){
		this._super();
		
		this._self = this;
		
		this._draw =new  cc.DrawNode();
		this.addChild(this._draw);
		
		var size = cc.winSize;
//		this._draw.drawCircle(cc.p(size.width>>1, size.height>>1),100,0,100,false,6,cc.color(0, 255, 0));
//		var bird = cc.Sprite(res.Bird_png,cc.rect(0, 0, 320, 240));
//		bird.setPosition(size.width>>1, size.height>>1);
//		this.scheduleUpdate();
		
//		for (var int = 0; int < 10; int++) {
//			var circle = new Circle();
//			circle.setPosition(cc.p(size.width>>1, size.height>>1));
//			this.addChild(circle);
//		}
		var self = this;
		var _circleList = [];
		var onTouchEvent = cc.EventListener.create({
			event:cc.EventListener.TOUCH_ONE_BY_ONE,
			sallowTouches:true,
			onTouchBegan:function(touch,event){
				if(_circleList.length>=10){
					var tmp = _circleList.shift();
					tmp.removeFromParent();
				}
				var circle = new Circle();
				circle.setPosition(cc.p(size.width>>1, size.height>>1));
				self.addChild(circle);
				_circleList.push(circle);	
				
				return false;
			}
		});
		cc.eventManager.addListener(onTouchEvent, this);
//		this.addChild(bird);
//		
//		var onTouchEvent = cc.EventListener.create({
//			event:cc.EventListener.TOUCH_ONE_BY_ONE,
//			sallowTouches:true,
//			onTouchBegan:function(touch , event){
//				var box = bird.getBoundingBox();
//				var position = touch.getLocation();
//				if(cc.rectContainsRect(box, new cc.rect(position.x, position.y, 1, 1))){
//					cc.log("点击中了"+box+position);
//				}
//			return false;
//			}
//			})
//		cc.eventManager.addListener(onTouchEvent, this);
		return true;
	},
	update:function(){
		this._drawX = this._draw.x;
		this._draw.setPosition(this._drawX+1,this._draw.y);
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