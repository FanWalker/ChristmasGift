/**
 * 第一副场景页面
 * @param  {[type]} argument [description]
 * @return {[type]}          [description]
 */
function pageA (element,callback) {
    //根元素
    this.$root = element;
    //小男孩
    this.$boy = element.find(".chs-boy");
    //窗户
    this.$window = element.find(".window");
    this.$leftwin = this.$window.find(".window-left");
    this.$rightwin = this.$window.find(".window-right");
    //运行动画
    //console.log("yunxingdonghua");
    this.run();

    //模拟执行时间
    setTimeout(function() {

        callback();

    }, 20000);
}

/**
 * 开窗
 * @return {[type]} [description]
 */
pageA.prototype.openWindow = function(callback){
    var count = 1;
    var complete = function(){
        ++count;
        if(count === 2){
            callback && callback();
        }
    }
    var bind = function(data){
        data.one("transitionend webkitTransitionEnd", function(event){
            data.removeClass("window-transition");
            complete();
        })
    }
    bind(this.$leftwin.addClass("window-transition").addClass("hover"));
    bind(this.$rightwin.addClass("window-transition").addClass("hover"));
}


/**
 * 运行下一个动画
 * @return {Function} [description]
 */
pageA.prototype.next = function(options) {
    var dfd = $.Deferred();
    //console.log(options.style);
    this.$boy.transition(options.style, options.time, "linear",function() {
        dfd.resolve()
    });
    //console.log("pause2");
    return dfd;
}


/**
 * 停止走路
 * @return {[type]} [description]
 */
pageA.prototype.stopWalk = function(){
    this.$boy.removeClass("chs-boy-deer");
}


/**
 * 路径
 * @return {[type]} [description]
 */
pageA.prototype.run = function(callback){
    //console.log("kaishiyunxing");
    var that = this;
    var next = function() {
        // console.log(this.next);
        return this.next.apply(this, arguments);
    }.bind(this)

    next({
        "time": 10000,
        "style": {
            "top": "4rem",
            "right": "16rem",
            "scale": "1.2"
        }
    })
    .then(function() {
       return next({
            "time":1000,
            "style": {
               "rotateY" : "-180",
               "scale": "1.5"
            }
        })
    })    
    
        .then(function() {
        return next({
            "time": 7000,
            "style": {
                "top"   :"7.8rem",
                "right" : "1.2rem"
            }
        })
    })
    
    .then(function(){
        that.stopWalk();
    })  
    .then(function() {
            // that.stopWalk();
            that.openWindow();
        })
}