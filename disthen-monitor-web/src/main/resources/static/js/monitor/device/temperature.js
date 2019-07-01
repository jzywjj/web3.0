var assetLink,statusInfo,cardId,lockId,interval = 0,temperature,TMPoption,lines,data_time;
$(document).ready(function() {
	var temperatureDIV = $('#temperature');
	temperatureDIV.css("width",document.documentElement.clientWidth/3); 
	temperatureDIV.css('height',document.documentElement.clientHeight-20); 
	
	statusInfo = $("#statusInfo");
	assetLink = $("#assetLink");
	statusInfo.css("width",document.documentElement.clientWidth/3); 
	statusInfo.css('height',20); 
	
	var otherInfoDIV = $('#otherInfo');
	otherInfoDIV.css("width",document.documentElement.clientWidth*2/3); 
	otherInfoDIV.css('height',document.documentElement.clientHeight); 
	
	initailCharts();
	//update();//初始化
	clearInterval(interval);
	//定时刷新页面数据
	//interval = setInterval(update, 5000);
});

function initailCharts(){
	temperature = echarts.init(document.getElementById('temperature'));
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
		            data : ['温 度']
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
		            data:[10,20,30]
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
	temperature.setOption(TMPoption);
	
	lineoptions = {
		    title : { subtext: '今日温度'},
		    tooltip : { trigger: 'axis'},
		    legend: {data:['温度']},
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
		                formatter: '{value} %'
		            }
		        }
		    ],
		    series : [
		        {
		            name:'温度',
		            type:'line',
		            data:[10,20,30,20,15],
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

function update(){
	var selectedDevice=window.top.scopeToShare.selectedTemperature;
	cardId=window.top.scopeToShare.cardId;
	updateNode(selectedDevice);
}

function updateNode(node) {
	var cables = node.bindlogiccables;
	var onlineStat=node.onlineStat;
	var sInfo="<font size=2><b>当前状态&nbsp;:&nbsp;</b>"+('on'==onlineStat?"<font color=green>在线</font>":"离线")+"&nbsp;<b>最新时间&nbsp;:&nbsp;</b>"+(node.lastedDataTimeStr==null?"无":node.lastedDataTimeStr)+"</b></font>";
	statusInfo.html(sInfo);
	if(node.assetId&&node.assetId!='0'){
		assetLink.attr("href","/pro_asset/assetInfo?assetId="+node.assetId);
		assetLink.show();
	}
    var datas = new Array();
	cables && $.each(cables, function(index, ts) {
		var type = ts.dataType;
		if (type == "PRTemperature") {
			TMPoption.series[0].data[0] = ts.value;
			temperature.setOption(TMPoption);
		}
		if(data_time != ts.data_time){
			 var url="/mon_his/selectTemperatureData?cardId="+cardId;
			 $.get(url).done(function (info){
				   var data = eval('('+info+')');
				   lineoptions.xAxis[0].data = data.dates;
				   lineoptions.series[0].data = data.f_values;
				   lines.setOption(lineoptions);
			 });
		}
		data_time = ts.data_time;
	});
}