/**
 * 事件
 * 观察者模式
 */
var Observer = (function(slice){

	function bind(event,fn){             //订阅事件，event可能包含有多个事件类型如：“click、change、focus等”
		var events = this.events = this.events || {},
			parts = event.split(/\s+/), //匹配任何空白符，包括\n,\r,\f,\t,\v   parts存储多个事件类型
			i = 0,
			num = parts.length,
			part;

		if(events[event] && events[event].length) return this;

		for(;i < num; i++){
			events[(part = parts[i])] = events[part] || [];
			events[part].push(fn);           //events对象存储了事件类型和其对应的回调函数
		}
		return this;
	}


/*
 *	响应回调函数 
 *	one() 方法为被选元素附加一个或多个事件处理程序，
 *	并规定当事件发生时运行的函数。当使用 one() 方法时，
 *	每个元素只能运行一次事件处理器函数
 */
	function one(){                          
		this.bind(event,function fnc(){
			fn.apply(this, slice.call(arguments));   
			this.unbind(event,fnc);
		});
		return this;
	}

	function unbind(event,fn){              //取消订阅
		var events = this.events,
			eventName, i , parts , num;

		if(!events) return;

		parts = event.split(/\s+/);
		for(i = 0,num = parts.length; i<num ;i++){
			if((eventName = parts[i]) in events !== false){             //如果，key即eventName，在events里面
				events[eventName].splice(events[eventName].indexOf(fn),1);     //删除eventName对应的回调函数
				if(!events[eventName].length){                    				//删除没有回调函数事件eventName
					delete events[eventName];
				}
			}
		}
		return this;
	}

	function trigger(event){        //发布事件
		var events = this.events,
			i, args, falg;

		if(!events || event in events === false) return;

		args = slice.call(arguments,1);
		for(i = events[event].length-1; i>=0; i--){
			falg = events[event][i].apply(this, args);     //调用该事件的回调函数即events[event][i]
		} 

		return falg;
	}

	return function(){
		this.on = 
			this.subscribe = bind;
		this.off = 
			this.unsubscribe = unbind;
		this.trigger = 
			this.publish = trigger;
		this.one = one;
		return this;
	}
})([].slice);      //把数组的slice()方法传入该方法，使得该方法内部可以使用slice()方法；