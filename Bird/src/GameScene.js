var GameLayer = cc.Layer.extend({
	_countDown:0,//倒计时
	_scoreValue:0,//分数
	_step:0,//增加小鸟的间隔
	
	_timeValue:0,//时间
	
	_self:null,//自己本身
	_score:null,//用于显示分数
	_time:null,//用于显示时间
	
	//
	_touchEvent:null,
	// 640 480
	_birdLayer:null,
	_birdRect:[
	           cc.rect(0,0,320,240),
	           cc.rect(320,0,320,240),
	           cc.rect(0,240,320,240),
	           cc.rect(320,240,320,240)
	           ],
	_birdList:null,
	ctor:function(){
		this._super();
		var size = cc.winSize;
		
		//背景
		var backGround = new cc.Sprite(res.Scene_jpg);
		backGround.setPosition(size.width>>1,size.height>>1);
		this.addChild(backGround);
		
		//初始化数据
		this._scoreValue = 0;
		this._countDown = 0;
		this._birdList = [];
		//分数
		this._score = new cc.LabelTTF("0","",50);
		this._score.setAnchorPoint(0, 1);//左上角
		this._score.setPosition(10,size.height - 10);
		this.addChild(this._score);
		
		//时间
		this._time = new cc.LabelTTF(Math.floor(this._countDown/1000)+"'","",50);
		this._time.setAnchorPoint(1, 1);//左上角
		this._time.setPosition(size.width-10,size.height - 10);
		this.addChild(this._time);
		
		//
		this._birdLayer = new cc.Node();
		this.addChild(this._birdLayer);
		return true;
	},
	onEnter:function(){
		this._super();
		//initData
		this._step = 0;
		this._timeValue = 0;
		this._countDown = 0;
		this._birdList = [];
		
		
		
		//添加鼠标点击事件，点中小鸟加分 消除该小鸟
		self = this;
		this._touchEvent = cc.EventListener.create({
					event:cc.EventListener.TOUCH_ONE_BY_ONE,
					swallowTouches:true,
					onTouchBegan:this.onTouchBegan
				}
		)
		//添加到事件管理器中
		cc.eventManager.addListener(this._touchEvent, this);
		//场景切换动画结束需要一秒钟
		this.scheduleOnce(function(){
			this.scheduleUpdate();
		}, 1)
	},
	onTouchBegan:function(touch,event){
		cc.log("this._step:======>"+self._step);
		var position = touch.getLocation();
		cc.log("position x\t"+position.x+"position y\t"+position.y);
		for (var i = self._birdList.length - 1; i >= 0; i--) {
			var bird = self._birdList[i];
			var birdBox = bird.getBoundingBox();
			var touchPos = touch.getLocation();
			cc.log("bird+x\t"+birdBox.x+"y\t"+birdBox.y+"width\t"+birdBox.width+"height\t"+birdBox.height);
			if(cc.rectContainsRect(birdBox, new cc.rect(touchPos.x, touchPos.y, 1, 1))){
				self._scoreValue += 1;
				self._score.setString(self._scoreValue+"");
				self._birdList.splice(i, 1);
				bird.stopAllActions();
				bird.runAction(new cc.Sequence(new cc.ScaleTo(0.3,0,0),new cc.CallFunc(function(){
					bird.removeFromParent();
				})))
				break;
			}
		}
		return false;
	},
	onExit:function(){
		this._super();
		this.unscheduleUpdate();
		cc.eventManager.removeListener(this._touchEvent);
	},
	update:function(dt){
		this._step ++;
		this._timeValue +=(dt*1000);
		
		this._countDown = COUNT - this._timeValue;

//		cc.log("this._timeValue"+this._timeValue + "\tthis._countDown"+this._countDown+ "\tdt" +dt);
		this._time.setString(Math.floor(this._countDown/1000)+"'");
		
		if(this._countDown < 0){
			this.unscheduleUpdate();
//			cc.director.pushScene(new cc.TransitionFade(1,new OverScene()))//new OverScene())
			var overScene = new OverScene();
			cc.director.pushScene(new cc.TransitionFade(1,overScene))//new OverScene())渐变切换场景
			overScene.setScore(this._scoreValue);
		}
		else{
			var size = cc.winSize;
			if(this._step % ADD_BIRD == 0){
				//创建小鸟
				var random = Math.random()>0.5?1:-1;
				var startPosition = cc.p(random>0.5?size.width+100:0-100, Math.random()*size.height);
				var endPosition = cc.p(random>0.5?0-100:size.width+100, Math.random()*size.height);
				
				var time = 1 + Math.floor(Math.random()*3);
				var bird = new cc.Sprite(res.Bird_png,this._birdRect[Math.floor(Math.random()*4)]);
				bird.setScale(-0.5*random, 0.5);
				bird.setAnchorPoint(0.5, 0.5);
				bird.setPosition(startPosition);
				this._birdLayer.addChild(bird);
				
				this._birdList.push(bird);
				var self = this;
				
				bird.runAction(
						new cc.Sequence(new cc.MoveTo(time,endPosition),
						new cc.CallFunc(function(){
							for (var int = 0; int < self._birdList.length; int++) {
								if(self._birdList[i] == bird){
									self._birdList.splice(i, 1);
									bird.removeFromParent();
									break;
								}
							}
						})));
			}
		}
	}
})

var GameScene = cc.Scene.extend({
	onEnter:function(){
		this._super();
		var layer = new GameLayer();
		this.addChild(layer);
	},
	onExit:function(){
		this._super();
		this.removeAllChildren();
		cc.log("scene exit");
	}
})