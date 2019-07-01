var interval,hiddenTitle,typechart,today_tunnelschart,all_tunnelschart,typechartoption,today_tunnelsoption,all_tunnelsoption;
var colorList = ['#FF0000','#FFA500','#FFFF00','#87CEFA'];
$(document).ready(function() {
	var docWidth = document.documentElement.clientWidth-80;
	var docHeight = document.documentElement.clientHeight-100;
	hiddenTitle = window.localStorage['hiddenTitle'];
	var header= $(".wpheader-bg");
	if(hiddenTitle){//是否隐藏头部
		header.hide();
		docHeight = document.documentElement.clientHeight-10;
	}else{
		header.show();
		docHeight = document.documentElement.clientHeight-90;
	}
	var today_tunnelschart = $("#today_tunnelschart");
	var alarmframe = $("#alarmframe");
	var typechart = $("#typechart");
	var all_tunnelschart = $("#all_tunnelschart");
	
	today_tunnelschart.css("width",docWidth/2); 
	today_tunnelschart.css('height',docHeight/2); 
	alarmframe.attr("width",docWidth/2); 
	alarmframe.attr('height',docHeight/2); 
	typechart.css("width",docWidth/2); 
	typechart.css('height',docHeight/2); 
	all_tunnelschart.css("width",docWidth/2); 
	all_tunnelschart.css('height',docHeight/2); 
	
	initailCharts();
	initialChartsData();
	//clearInterval(interval);
	//定时刷新页面数据
	//interval = setInterval(updateCharts, 60*1000);
	
});

var isArray = function(obj) { 
    return Object.prototype.toString.call(obj) === '[object Array]'; 
};

var itemStyle = {
	    normal: {
	        color: function(params) {
	          if (params.dataIndex < 0) {
	            // for legend
	            return zrColor.lift(
	              colorList1[colorList1.length - 1], params.seriesIndex * 0.1
	            );
	          }
	          else {
	            // for bar
	            return zrColor.lift(
	              colorList1[params.dataIndex], params.seriesIndex * 0.1
	            );
	          }
	        }
	    }
	};

function updateCharts(){
	var now = new Date().Format("yyyy-MM-dd");
	var url2="/mon_warning/getWarningInfoByGroup?sdate="+now;
	$.get(url2).done(function (info){
		   var data = eval('('+info+')');
		   today_tunnelsoption.xAxis[0].data =  data.xAxis;
		   today_tunnelsoption.series[0].data = data.series1;
		   today_tunnelsoption.series[1].data = data.series2;
		   today_tunnelsoption.series[2].data = data.series3;
		   today_tunnelsoption.series[3].data = data.series4;
		   today_tunnelschart.setOption(today_tunnelsoption);
	});
}

function initialChartsData(){
	var now = new Date().Format("yyyy-MM-dd");
	var url="/mon_warning/getWarningTypesByType";
	 $.get(url).done(function (info){
		   var data = eval('('+info+')');
		   typechartoption.series[0].data = data;
		   typechart.setOption(typechartoption);
	 });
	var url1="/mon_warning/getWarningInfoByGroup";
	$.get(url1).done(function (info){
		   var data = eval('('+info+')');
		   all_tunnelsoption.xAxis[0].data =  data.xAxis;
		   all_tunnelsoption.series[0].data = data.series1;
		   all_tunnelsoption.series[1].data = data.series2;
		   all_tunnelsoption.series[2].data = data.series3;
		   all_tunnelsoption.series[3].data = data.series4;
		   all_tunnelschart.setOption(all_tunnelsoption);
	});
	var url2="/mon_warning/getWarningInfoByGroup?sdate="+now;
	$.get(url2).done(function (info){
		   var data = eval('('+info+')');
		   today_tunnelsoption.xAxis[0].data =  data.xAxis;
		   today_tunnelsoption.series[0].data = data.series1;
		   today_tunnelsoption.series[1].data = data.series2;
		   today_tunnelsoption.series[2].data = data.series3;
		   today_tunnelsoption.series[3].data = data.series4;
		   today_tunnelschart.setOption(today_tunnelsoption);
	});
}
function initailCharts(){
	typechart = echarts.init(document.getElementById('typechart'));
	today_tunnelschart = echarts.init(document.getElementById('today_tunnelschart'));
	all_tunnelschart = echarts.init(document.getElementById('all_tunnelschart'));
	typechartoption ={
		    title : {
		        text: '不同类型告警信息占比',
		        subtext:'所有告警信息',
		        x:'center'
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		        orient : 'vertical',
		        x : 'left',
		        data:['红色告警','橙色告警','黄色告警','蓝色告警']
		    },toolbox: {
		        show : true,
		        feature : {
		            mark : {show: true},
		            saveAsImage : {show: true}
		        }
		    },
		    calculable : true,
		    series : [
		        {
		            name:'',
		            type:'pie',
		            radius : '55%',
		            center: ['50%', '60%'],
		            itemStyle: {
		                normal: {
		                    color: function(params) {
		                        return colorList[params.dataIndex];
		                    }
		                }
		            },
		            data:[
		                {value:0, name:'红色告警'},
		                {value:0, name:'橙色告警'},
		                {value:0, name:'黄色告警'},
		                {value:0, name:'蓝色告警'}
		            ]
		        }
		    ]
		};
	typechart.setOption(typechartoption);
	
	today_tunnelsoption = {
		    title : {
			    subtext: '各个隧道（线路、配电室）今日告警信息占比',
			    x:'center'
			},
		    tooltip : {
		        trigger: 'axis',
			 	formatter: function (params){
			 		if("markPoint"==params.componentType){
			 			return params.name + '<br/>' + params.seriesName+':'+params.value;
			 		}else{
			 			return params[0].name + '<br/>'
		                   + params[0].seriesName + ' : ' + params[0].value + '<br/>'
		                   + params[1].seriesName + ' : ' + params[1].value + '<br/>'
		                   + params[2].seriesName + ' : ' + params[2].value + '<br/>'
		                   + params[3].seriesName + ' : ' + params[3].value + '<br/>'
		                   + '总计: ' + (parseInt(params[3].value) + parseInt(params[2].value) + parseInt(params[1].value) + parseInt(params[0].value));
			 		}
			 	}
		    },
		    legend: {
		    	 data:['红色告警','橙色告警','黄色告警','蓝色告警']
		    },
		    toolbox: {
		        show : true,
		        feature : {
		            mark : {show: true},
		            saveAsImage : {show: true}
		        }
		    },
		    calculable : true,
		    xAxis : [
		        {
		            type : 'category',
		            data : []
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value'
		        }
		    ],
		    series : [
		        {
		            name:'红色告警',
		            type:'bar',
		            stack: '所有',
		            itemStyle: {
		                normal: {
		                    color: function(params) {
		                        return colorList[0];
		                    }
		                }
		            },
		            data:[0, 0, 0, 0]
		        },
		        {
		            name:'橙色告警',
		            type:'bar',
		            stack: '所有',
		            itemStyle: {
		                normal: {
		                    color: function(params) {
		                        return colorList[1];
		                    }
		                }
		            },
		            data:[0, 0, 0, 0]
		        },
		        {
		            name:'黄色告警',
		            type:'bar',
		            stack: '所有',
		            itemStyle: {
		                normal: {
		                    color: function(params) {
		                        return colorList[2];
		                    }
		                }
		            },
		            data:[0, 0, 0, 0]
		        },
		        {
		            name:'蓝色告警',
		            type:'bar',
		            stack: '所有',
		            itemStyle: {
		                normal: {
		                    color: function(params) {
		                        return colorList[3];
		                    }
		                }
		            },
		            data:[0, 0, 0, 0]
		        }
		    ]
		};
	
	today_tunnelschart.setOption(today_tunnelsoption);
	
	all_tunnelsoption ={
		    title : {
		    	subtext: '各隧道（线路、配电室）所有告警信息占比',
		    	x:'center'
			},
		    tooltip : {
		        trigger: 'axis',
//		        axisPointer : {            
//		            type : 'shadow'    
//		        }
			 	formatter: function (params){
			 		if("markLine"==params.componentType){
			 			return params.name + '<br/>' + params.seriesName+':'+params.value;
			 		}else{
			            return params[0].name + '<br/>'
			                   + params[0].seriesName + ' : ' + params[0].value + '<br/>'
			                   + params[1].seriesName + ' : ' + params[1].value + '<br/>'
			                   + params[2].seriesName + ' : ' + params[2].value + '<br/>'
			                   + params[3].seriesName + ' : ' + params[3].value + '<br/>'
			                   + '总计: ' + (parseInt(params[3].value) + parseInt(params[2].value) + parseInt(params[1].value) + parseInt(params[0].value));
				 	}
			 	}
		    },
		    legend: {
		    	 data:['红色告警','橙色告警','黄色告警','蓝色告警']
		    },
		    toolbox: {
		        show : true,
		        feature : {
		            mark : {show: true},
		            //dataView : {show: true, readOnly: false},
		            //magicType : {show: true, type: ['line', 'bar']},
		            //restore : {show: true},
		            saveAsImage : {show: true}
		        }
		    },
		    calculable : true,
		    xAxis : [
		        {
		            type : 'category',
		            data : []
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value'
		        }
		    ],
		    series : [
		        {
		            name:'红色告警',
		            type:'bar',
		            stack: '所有',
		            itemStyle: {
		                normal: {
		                    color: function(params) {
		                        return colorList[0];
		                    }
		                }
		            },
		            data:[0, 0, 0, 0],
		            markLine : {
		                itemStyle:{
		                    normal:{
		                        lineStyle:{
		                            type: 'dashed',
		                            color : colorList[0]
		                        }
		                    }
		                },
		                data : [
		                    [{type : 'min'}, {type : 'max'}]
		                ]
		            }
		        },
		        {
		            name:'橙色告警',
		            type:'bar',
		            stack: '所有',
		            itemStyle: {
		                normal: {
		                    color: function(params) {
		                        return colorList[1];
		                    }
		                }
		            },
		            data:[0, 0, 0, 0],
		            markLine : {
		                itemStyle:{
		                    normal:{
		                        lineStyle:{
		                            type: 'dashed',
		                            color : colorList[1]
		                        }
		                    }
		                },
		                data : [
		                    [{type : 'min'}, {type : 'max'}]
		                ]
		            }
		        },
		        {
		            name:'黄色告警',
		            type:'bar',
		            stack: '所有',
		            itemStyle: {
		                normal: {
		                    color: function(params) {
		                        return colorList[2];
		                    }
		                }
		            },
		            data:[0, 0, 0, 0],
		            markLine : {
		                itemStyle:{
		                    normal:{
		                        lineStyle:{
		                            type: 'dashed',
		                            color : colorList[2]
		                        }
		                    }
		                },
		                data : [
		                    [{type : 'min'}, {type : 'max'}]
		                ]
		            }
		        },
		        {
		            name:'蓝色告警',
		            type:'bar',
		            stack: '所有',
		            itemStyle: {
		                normal: {
		                    color: function(params) {
		                        return colorList[3];
		                    }
		                }
		            },
		            data:[0, 0, 0, 0],
		            markLine : {
		                itemStyle:{
		                    normal:{
		                        lineStyle:{
		                            type: 'dashed',
		                            color : colorList[3]
		                        }
		                    }
		                },
		                data : [
		                    [{type : 'min'}, {type : 'max'}]
		                ]
		            }
		        }
		    ]
		};
		         
	all_tunnelschart.setOption(all_tunnelsoption);
}

Date.prototype.Format = function (fmt) { 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}