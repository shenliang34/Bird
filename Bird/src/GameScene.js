var GameLayer = cc.Layer.extend({
	_countDown:0,//倒计时
	_scoreValue:0,//分数
	_step:0,//
	
	_score:null,//用于显示分数
	_time:null,//用于显示时间
	
	// 640 480
	_birdRect:[
	           cc.rect(0,0,320,240),
	           cc.rect(320,0,320,240),
	           cc.rect(0,240,320,240),
	           cc.rect(320,240,320,240)
	           ],
	ctor:function(){
		this._super();
		var size = cc.winSize;
		
		//背景
		var backGround = new cc.Sprite(res.Scene_jpg);
		backGround.setPosition(size.width>>1,size.height>>1);
		this.addChild(backGround);
		
		//初始化数据
		this._scoreValue = 0;
		this._countDown = 10000;
		
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
		
		return true;
	},
	onEnter:function(){
		this._super();
		this._step = 0;
		this.scheduleUpdate();
	},
	onExit:function(){
		this._super();
		this.unscheduleUpdate();
	},
	update:function(dt){
		this._step ++;
		
		if(this._countDown<=0){
			this.unscheduleUpdate();
		}
		else{
			var size = cc.winSize;
			this._countDown -= dt*1000;
			this._time.setString(Math.floor(this._countDown/1000)+"'");
			if(this._step%20 == 0){
				//建立小鸟
				var random = Math.random()>0.5?1:-1;
				var startPosition = cc.p(random>0.5?size.width:0, Math.random()*size.height);
				var endPosition = cc.p(random>0.5?0:size.width, Math.random()*size.height);
			}
				
		}
			
			
	}
	
})

var GameScene = cc.Scene.extend({
	onEnter:function(){
		this._super();
		var layer = new GameLayer();
		this.addChild(layer);
	}
})