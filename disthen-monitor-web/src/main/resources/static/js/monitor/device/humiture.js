var assetLink,statusInfo,cardId,lockId,interval = 0,temperature,TMPoption,humidity,HTYoption,lines,data_time;
$(document).ready(function() {
	var temperatureDiv = $('#temperature');
	temperatureDiv.css("width",document.documentElement.clientWidth/3); 
	temperatureDiv.css('height',document.documentElement.clientHeight-25); 
	
	statusInfo=$("#statusInfo");
	statusInfo.css("width",document.documentElement.clientWidth/3); 
	statusInfo.css('height',25); 
	
	var humidityDiv = $('#humidity');
	humidityDiv.css("width",document.documentElement.clientWidth/4); 
	humidityDiv.css('height',document.documentElement.clientHeight);
	
	var otherInfoDiv = $('#otherInfo');
	otherInfoDiv.css("width",document.documentElement.clientWidth*5/12); 
	otherInfoDiv.css('height',document.documentElement.clientHeight);
	
	assetLink = $('#assetLink');
	
	initailDHFCharts();
	updateDHF();//初始化
	clearInterval(interval);
	//定时刷新页面数据
	interval = setInterval(updateDHF, 5000);
});

function initailDHFCharts(){
	temperature = echarts.init(document.getElementById('temperature'));
	humidity  = echarts.init(document.getElementById('humidity'));
	lines  = echarts.init(document.getElementById('otherInfo'));
	TMPoption = {
		    title : {
		        text: '温度'
		    },
		    tooltip : {
		        trigger: 'axis',
		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        },
		        formatter: function (params){
		        	 return params[0].seriesName + ' : ' + (params[0].value)+" ℃";
		        }
		    },
//		    legend: {
//		        selectedMode:false,
//		        data:['温度']
//		    },
		    toolbox: {
		        show : true,
		    },
		    calculable : true,
		    xAxis : [
		        {
		            type : 'category',
		            data : ['温度']
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            boundaryGap: [0, 0.1]
		        }
		    ],
		    series : [
		        {
		            name:'当前温度',
		            type:'bar',
		            stack: 'sum',
		            barCategoryGap: '80%',
		            itemStyle: {
		                normal: {
		                    color: 'tomato',
		                    label : {
		                        show: true, position: 'insideTop'
		                    }
		                }
		            },
		            data:[0]
		        },
		        {
		            name:'最高温',
		            type:'bar',
		            stack: 'sum',
		            itemStyle: {
		                normal: {
		                    color: '#fff',
		                    barBorderColor: 'tomato',
		                    barBorderWidth: 6,
		                    barBorderRadius:0,
		                    label : {
		                        show: true, 
		                        position: 'top',
		                        formatter: function (params) {
		                            for (var i = 0, l = TMPoption.xAxis[0].data.length; i < l; i++) {
		                                if (TMPoption.xAxis[0].data[i] == params.name) {
		                                    return  parseInt(params.value);
		                                }
		                            }
		                        },
		                        textStyle: {
		                            color: 'tomato'
		                        }
		                    }
		                }
		            },
		            data:[100]
		        }
		    ]
		};
	
	HTYoption = {
			title : { text: '湿度'},
		    tooltip : { formatter: "{a} : {c}%" },
		    toolbox: {show : false},
		    series : [ {
		            name:'空气湿度',
		            type:'gauge',
		            detail : {formatter:'{value}%'},
		            data:[{value: 0}]
		        }
		    ]
		};
	temperature.setOption(TMPoption);
	humidity.setOption(HTYoption);
	
	lineoptions = {
		    title : { subtext: '今日温湿度'},
		    tooltip : { trigger: 'axis'},
		    legend: {data:['温度','湿度']},
		    toolbox: {show : true},
		    calculable : true,
		    xAxis : [ 
		        { type : 'category',
		            boundaryGap : false,
		            data : []
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            axisLabel : {
		                formatter: '{value}'
		            }
		        }
		    ],
		    series : [
		        {
		            name:'温度',
		            type:'line',
		            data:[],
		            markPoint : {
		                data : [
		                    {type : 'max', name: '最大值'}
		                ]
		            }
		        },
		        {
		            name:'湿度',
		            type:'line',
		            data:[],
		            markPoint : {
		                data : [
		                    {type : 'max', name: '最大值'}
		                ]
		            }
		        }
		    ]
		};
	lines.setOption(lineoptions);
}

function updateDHF(){
	var selectedDevice=window.top.scopeToShare.selectedDHF;
	cardId=window.top.scopeToShare.cardId;
	updateDHFNode(selectedDevice);
}

function updateDHFNode(node) {
	var cables = node.bindlogiccables;
	var onlineStat=node.onlineStat;
	var sInfo="<b>当前状态&nbsp;:&nbsp;</b>"+('on'==onlineStat?"<font color='green'>在线</font>":"离线")+"&nbsp;&nbsp; <b>最新时间&nbsp;:&nbsp;</b>"+(node.lastedDataTimeStr==null?"无":node.lastedDataTimeStr)+"</b>";
	statusInfo.html(sInfo);
	if(node.assetId&&node.assetId!='0'){
		assetLink.attr("href","/pro_asset/assetInfo?assetId="+node.assetId);
		assetLink.show();
	}
    var datas = new Array();
	cables && $.each(cables, function(index, ts) {
		var type = ts.dataType;
		if (type == "Temperature") {
			TMPoption.series[0].data[0] = ts.value;
			temperature.setOption(TMPoption);
		}else if (type == "Humidity") {
			HTYoption.series[0].data[0].value = ts.value;
			humidity.setOption(HTYoption);
		}
		if(data_time != ts.data_time){
			 var url="/mon_his/selectDHFData?cardId="+cardId;
			 $.get(url).done(function (info){
				   var data = eval('('+info+')');
				   lineoptions.xAxis[0].data = data.dates;
				   lineoptions.series[0].data = data.f_values;
				   lineoptions.series[1].data = data.s_values;
				   lines.setOption(lineoptions);
			 });
		}
		data_time = ts.data_time;
	});
}