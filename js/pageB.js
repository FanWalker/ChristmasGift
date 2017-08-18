function pageB(element,callback){
	//男孩
	var $boy = element.find(".christmas-boy");
	//女孩
	var $girl = element.find(".girl");

	//3d旋转节点
    var $carousel = element.find("#carousel");

	var animationEnd = "animationend webkitAnimationEnd";


    /**
     * 小男孩动作
     * @return {[type]} [description]
     */
    var boyAction = {
    	//走路
    	walk: function(){
            //?
            var dfd = $.Deferred();
            $boy.transition({
                "right":"4.3rem"
            },4000,"linear",function(){
                dfd.resolve()
            });
            return dfd;
    	},
    	//停止走路
    	stopWalk: function(){
    		$boy.removeClass("boy-walk");
    		$boy.addClass("boy-stand");
    	},
    	//继续走路
        runWalk: function() {
            $boy.addClass("walk-run");
        },
        //解开包裹
        unwrapp: function() {
            var dfd = $.Deferred();
            $boy.addClass("boy-unwrapp");
            $boy.removeClass("boy-stand");
            $boy.one(animationEnd, function() {
                dfd.resolve();
            })
            return dfd;
        },
         //脱衣动作
        //1-3
        strip: function(count) {
            $boy.addClass("boy-strip-" + count).removeClass("boy-unwrapp");
        },
        //人物用拥抱
        //重叠问题处理
        hug: function() {
            $boy.addClass("boy-hug").one(animationEnd, function() {
                $(".christmas-boy-head").show();
            })
        }
    }

        /**
     * 小女孩动作
     * @return {[type]} [description]
     */
    var girlAction = {
        //小女起立
        standUp: function() {
            var dfd = $.Deferred();
            //起立
            setTimeout(function(){
                $girl.addClass("girl-standUp");
            },200)
            //抛书
            setTimeout(function(){
                $girl.addClass("girl-throwBook");
                dfd.resolve()
            },500)
            return dfd;
        },
        //走路
        walk: function(callback) {
            //?
            var dfd = $.Deferred();
            //小女孩走路
            $girl.addClass("girl-walk");
            $girl.transition({
                    "left": "4rem"
            }, 4000, "linear", function() {
                    dfd.resolve()
             })
             return dfd;
        },
        //停止走路
        stopWalk: function() {
            $girl.addClass("walk-stop")
                .removeClass("girl-standUp")
                .removeClass("girl-walk")
                .removeClass("girl-throwBook")
                .addClass("girl-stand")
        },
        //选择3d
        choose: function(callback) {
            $girl.addClass("girl-choose")
                .removeClass("walk-stop");
            $girl.one(animationEnd, function() {
                callback();
            })
        },
        //泪奔
        weepWalk: function(callback) {
            $girl.addClass("girl-weep");
            $girl.transition({
                "left": "7rem"
            }, 1000, "linear", function() {
                $girl.addClass("walk-stop").removeClass("girl-weep")
                callback();
            })
        },
        //拥抱
        hug: function() {
            $girl.addClass("girl-hug").addClass("walk-run")
        }
    }
    
/*    //女孩开始走路
    girlAction
        .standUp()
        .then(function() {
            //女孩停止走路
            return girlAction.stopWalk();
        })
        .then(function() {
            //女孩走路
            return girlAction.walk();
        })
        .then(function(){
            //选择
            girlAction.choose(function() {
                //继续走路
                girlAction.weepWalk(function() {
                    //拥抱
                    girlAction.hug();
                })
            })

        })*/

    //男孩开始走路
    boyAction.walk()
        .then(function() {
            //停止走路
            boyAction.stopWalk();
        })
        .then(function(){
        	girlAction.standUp()
        })
        .then(function() {
            //女孩走路
            return girlAction.walk();
        })
        .then(function() {
            //女孩停止走路
            return girlAction.stopWalk();
        })
        .then(function() {
            //解开包裹
            return boyAction.unwrapp();
        })
        .then(function(){
        	//旋转木马对象
        	setTimeout(function(){
        		var carousel = new Carousel($carousel, {
        		imgUrls: [
            		"http://img.mukewang.com/5662e29a0001905a14410901.png",
            		"http://img.mukewang.com/5662e2960001f16314410901.png",
            		"http://img.mukewang.com/5662e26f00010dea14410901.png"
        			]
    			});
    			var i = 0;
    			carousel.run(i++);
        	},500)
    		
        })
        .then(function() {
            //脱衣动作
            setTimeout(function(){
                boyAction.strip(1)
            },2000)
            setTimeout(function(){
                boyAction.strip(2)
            },3000)
            setTimeout(function(){
                boyAction.strip(3)
            },4000)
            //任务重叠问题
            setTimeout(function(){
                boyAction.hug();
            },5000)
        })
        .then(function(){
            //选择
            setTimeout(function(){
            	girlAction.choose(function() {
                //继续走路
                girlAction.weepWalk(function() {
                    //拥抱
                    girlAction.hug();
                })
            })
            },2500)

        });

    setTimeout(function() {

        callback();

    }, 18000);

}