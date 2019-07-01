//可选的consoleLevel值为：info:普通调试信息,'trace'：堆栈调试,'dir'：打印对象
var _DEBUG=false,_LOG=false,debug=log=function(){},_consoleLevel='info';

if(window.DEBUG){
	_DEBUG=window.DEBUG;
}
if(window.LOG){
	_LOG=window.LOG;
}
if(window.consoleLevel){
	_consoleLevel=wondow.consoleLevel;
}
if(_DEBUG){
	if(_consoleLevel==='trace'){
		debug=function(){console.debug.apply(console,arguments),console.trace()};
	}else if(_consoleLevel==='dir'){
		debug=function(){for(var i=0;i<arguments.length;i++){console.dir.apply(arguments[i])}};
	}else{
		debug=$.browser.mozilla?console[_consoleLevel]:function(){console[_consoleLevel].apply(console,arguments)};
	}
}
if(_LOG){
	if(_consoleLevel==='trace'){
		log=function(){console.debug.apply(console,arguments),console.trace()};
	}else if(_consoleLevel==='dir'){
		log=function(){for(var i=0;i<arguments.length;i++){console.dir.apply(arguments[i])}};
	}else{
		
		log=$.browser.mozilla?console[_consoleLevel]:function(){console[_consoleLevel].apply(console,arguments)};
		
	}
}