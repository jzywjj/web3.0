
/*
说明：JS时间Date格式化参数
月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
例子：
(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
参数：格式化字符串如：'yyyy-MM-dd HH:mm:ss'  结果：如2016-06-01 10:09:00
*/
Date.prototype.Format = function(fmt){
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
    	fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    
    for (var k in o)
    	if (new RegExp("(" + k + ")").test(fmt))
    		fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

/*
两个日期相减，并返回相差天数
2017-08-09,2017-08-01
两个时间相减，得到毫秒数，
1秒=1000毫秒
1分钟=60秒
1小时=60分钟
1天=24小时
*/
var getDays = function(date1, date2){
	date1 = new Date(date1);
	date2 = new Date(date2);
	return ((date1 - date2) / 1000 / 60 / 60 / 24)+1;
}

//判断结束时间是否大于起始时间，时间格式（yyyy-MM-dd）
var compareDate = function(startDate,endDate){
	var arrStart = startDate.split("-");
	var startTime = new Date(arrStart[0],arrStart[1],arrStart[2]);
	var startTimes = startTime.getTime();
	var arrEnd = endDate.split("-");
	var endTime = new Date(arrEnd[0],arrEnd[1],arrEnd[2]);
	var endTimes = endTime.getTime();
	if(endTimes < startTime){
		return false
	}
	return true;
}

//判断查询时间是否跨月，时间格式（yyyy-MM-dd）
var  checkDate = function(startDate,endDate){
	var arrStart = startDate.split("-");
	var startTime = new Date(arrStart[0],arrStart[1],arrStart[2]);

	var arrEnd = endDate.split("-");
	var endTime = new Date(arrEnd[0],arrEnd[1],arrEnd[2]);

	
	var days = parseInt(endTime - startTime)/1000/60/60/24;
	var month = parseInt(arrEnd[1]) - parseInt(arrStart[1]);
	if(days > 31 || month > 0){ //两个时间大于31天或者是结束月份大于开始月份
		return true;
	}else{
		return false;
	}
}
