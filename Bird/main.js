cc.game.onStart = function(){
    cc.view.adjustViewPort(false);
    cc.view.setDesignResolutionSize(1024, 768, cc.ResolutionPolicy.FIXED_WIDTH);
    cc.view.resizeWithBrowserSize(true);
    //load resources
    cc.LoaderScene.preload(g_resources, function () {
//        cc.director.runScene(new HelloWorldScene());
//    	cc.director.runScene(new StartScene());
    	cc.director.runScene(new TouchScene());
    }, this);
};
cc.game.run();