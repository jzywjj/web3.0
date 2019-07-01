var assetLink,statusInfo,electricity,cardId,lockId,interval = 0,linkstatus,data_time,option,curentlineoptions,voltagelineoptions;
var colorList = ['#C1232B','#B5C334','#FCCE10','#E87C25'];
var dw = ['A','V','kWH'];
$(document).ready(function() {
	var currentInfo = $('#currentInfo');
	var todayCurentInfo = $('#todayCurentInfo');
	var todayVoltageInfo = $('#todayVoltageInfo');
	var dataframe = $('#dataframe');
	assetLink = $('#assetLink');
	statusInfo = $('#statusInfo');
	electricity = $('#electricity'); 
	currentInfo.css("width",document.documentElement.clientWidth*5/12); 
	currentInfo.css('height',document.documentElement.clientHeight/2-40); 
	
	statusInfo.css("width",document.documentElement.clientWidth*5/12); 
	statusInfo.css('height',20); 
	electricity.css("width",document.documentElement.clientWidth*5/12); 
	electricity.css('height',20); 
	
	todayCurentInfo.css("width",document.documentElement.clientWidth*7/12); 
	todayCurentInfo.css('height',document.documentElement.clientHeight/2); 
	
	todayVoltageInfo.css("width",document.documentElement.clientWidth/2); 
	todayVoltageInfo.css('height',document.documentElement.clientHeight/2); 
	
	dataframe.attr("width",document.documentElement.clientWidth/2); 
	dataframe.attr('height',document.documentElement.clientHeight/2); 
	
	initialChart();
	initialLineChart();
	updatePowerMeter();//初始化
	clearInterval(interval);
	//定时刷新页面数据
	interval = setInterval(updatePowerMeter, 5000);
	
});

function initialChart(){
	var myChart = echarts.init(document.getElementById('currentInfo'));
	option = {
		    title: {
		        x: 'left',
		        subtext: '电能表信息'
		    },
		    tooltip: {
		        trigger: 'item'
		    },
		    toolbox: {
		        show: true
		    },
		    legend: {
		        data:['电流','电压']
		    },
		    calculable: true,
		    grid: {
		        borderWidth: 0,
		        y: 80,
		        y2: 60
		    },
		    xAxis: [
		        {
		            type: 'category',
		            show: true,
		            data: ['A相', 'B相', 'C相']
		        }
		    ],
		    yAxis: [
		        {
		            type: 'value',
		            show: false
		        }
		    ],
		    series: [
		        {
		            name: '电流',
		            type: 'bar',
		            itemStyle: {
		                normal: {
//		                    color: function(params) {
//		                        return colorList[params.dataIndex];
//		                    },
		                    label: {
		                        show: true,
		                        position: 'top',
		                        formatter: function(params) {
		                        	if(params.data != null && params.data.length > 0){
		                        		return params.data+" "+dw[0];
		                        	} else {
		                        		return " ";
		                        	}
			                    }
		                    }
		                }
		            },
		            data: [0,0,0]
		        },
		        {
		            name: '电压',
		            type: 'bar',
		            itemStyle: {
		                normal: {
//		                    color: function(params) {
//		                        return colorList[params.dataIndex];
//		                    },
		                    label: {
		                        show: true,
		                        position: 'top',
		                        formatter: function(params) {
			                        return params.data+" "+dw[1];
			                    }
		                    }
		                }
		            },
		            data: [0,0,0]
		        }
		    ]
		};
	 myChart.setOption(option);
}

function initialLineChart(){
	var todayCurentInfo = echarts.init(document.getElementById('todayCurentInfo'));
	var todayVoltageInfo = echarts.init(document.getElementById('todayVoltageInfo'));
	curentlineoptions = {
		    title : {
		        text: '电流趋势',
		        subtext: '今日电流'
		    },
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		    	data:['A相','B相','C相']
		    },
		    toolbox: {
		        show : true
		    },
		    calculable : true,
		    xAxis : [
		        {
		            type : 'category',
		            boundaryGap : false,
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
		            name:'A相',
		            type:'line',
		            smooth:true,
		            itemStyle: {normal: {color:'#C1232B',areaStyle: {type: 'default'}}},
		            data : [],
		            markPoint : {
		                data : [
		                    {type : 'max', name: '最大值'},
		                    {type : 'min', name: '最小值'}
		                ]
		            },
		            markLine : {
		                data : [
		                    {type : 'average', name: '平均值'},
		                ]
		            }
		        },
		        {
		            name:'B相',
		            type:'line',
		            smooth:true,
		            itemStyle: {normal: {color:'#B5C334',areaStyle: {type: 'default'}}},
		            data : [],
		            markPoint : {
		                data : [
		                    {type : 'max', name: '最大值'},
		                    {type : 'min', name: '最小值'}
		                ]
		            },
		            markLine : {
		                data : [
		                    {type : 'average', name: '平均值'},
		                ]
		            }
		        },
		        {
		            name:'C相',
		            type:'line',
		            smooth:true,
		            itemStyle: {normal: {color:'#FCCE10',areaStyle: {type: 'default'}}},
		            data : [],
		            markPoint : {
		                data : [
		                    {type : 'max', name: '最大值'},
		                    {type : 'min', name: '最小值'}
		                ]
		            },
		            markLine : {
		                data : [
		                    {type : 'average', name: '平均值'},
		                ]
		            }
		        }
		    ]
		};
	todayCurentInfo.setOption(curentlineoptions);
	
	voltagelineoptions = {
		    title : {
		        text: '电压趋势',
		        subtext: '今日电压'
		    },
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		    	data:['A相','B相','C相']
		    },
		    toolbox: {
		        show : true
		    },
		    calculable : true,
		    xAxis : [
		        {
		            type : 'category',
		            boundaryGap : false,
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
		            name:'A相',
		            type:'line',
		            smooth:true,
		            itemStyle: {normal: {color:'#C1232B',areaStyle: {type: 'default'}}},
		            data : [],
		            markPoint : {
		                data : [
		                    {type : 'max', name: '最大值'},
		                    {type : 'min', name: '最小值'}
		                ]
		            },
		            markLine : {
		                data : [
		                    {type : 'average', name: '平均值'},
		                ]
		            }
		        },
		        {
		            name:'B相',
		            type:'line',
		            smooth:true,
		            itemStyle: {normal: {color:'#B5C334',areaStyle: {type: 'default'}}},
		            data : [],
		            markPoint : {
		                data : [
		                    {type : 'max', name: '最大值'},
		                    {type : 'min', name: '最小值'}
		                ]
		            },
		            markLine : {
		                data : [
		                    {type : 'average', name: '平均值'},
		                ]
		            }
		        },
		        {
		            name:'C相',
		            type:'line',
		            smooth:true,
		            itemStyle: {normal: {color:'#FCCE10',areaStyle: {type: 'default'}}},
		            data : [],
		            markPoint : {
		                data : [
		                    {type : 'max', name: '最大值'},
		                    {type : 'min', name: '最小值'}
		                ]
		            },
		            markLine : {
		                data : [
		                    {type : 'average', name: '平均值'},
		                ]
		            }
		        }
		    ]
		};
	todayVoltageInfo.setOption(voltagelineoptions);
}

function updatePowerMeter(){
	var selectedDevice=window.top.scopeToShare.selectedPowerMeter;
	cardId=window.top.scopeToShare.cardId;
	if(selectedDevice){
		updatePowerMeterNode(selectedDevice);
	}
}

function updatePowerMeterNode(node) {
	var cables = node.bindlogiccables;
	var onlineStat=node.onlineStat;
	
	var sInfo="<font size=2><b>当前状态&nbsp;:&nbsp;</b>"+('on'==onlineStat?"<font color=green>在线</font>":"离线")+"&nbsp;<b>时间&nbsp;:&nbsp;</b>"+(node.lastedDataTimeStr==null?"无":node.lastedDataTimeStr)+"</b></font>";
	statusInfo.html(sInfo);
	if(node.assetId&&node.assetId!='0'){
		assetLink.attr("href","/pro_asset/assetInfo?assetId="+node.assetId);
		assetLink.show();
	}
	
    var myChart = echarts.getInstanceByDom(document.getElementById('currentInfo')); 
    var todayCurentInfo = echarts.getInstanceByDom(document.getElementById('todayCurentInfo')); 
    var todayVoltageInfo = echarts.getInstanceByDom(document.getElementById('todayVoltageInfo')); 
    var datas1 = new Array();
    var datas2 = new Array();
    var curdate = node.lastedDataTimeStr;
	cables && $.each(cables, function(index, ts) {
		var type = ts.dataType,value = ts.value;
		if (type == "PowerMA") {
			datas1.push(ts.current);
			datas2.push(ts.voltage);
		}else if(type == "PowerMB"){
			datas1.push(ts.current);
			datas2.push(ts.voltage);
		}else if(type == "PowerMC"){
			datas1.push(ts.current);
			datas2.push(ts.voltage);
		}else if(type == "PowerMElectricity"){
			electricity.html("总电量:"+value+" "+dw[2]);
		}
	});
	if(datas1.length>0){
		option.series[0].data = datas1;
		option.series[1].data = datas2;
		myChart.setOption(option);
		if(data_time != curdate){
			 var url="/mon_his/selectPowerMeterData?cardId="+cardId;
			 $.get(url).done(function (info){
				   var data = eval('('+info+')');
				   
				   voltagelineoptions.xAxis[0].data = data[0].xAxis;
				   voltagelineoptions.series[0].data = data[0].series1;
				   voltagelineoptions.series[1].data = data[0].series2;
				   voltagelineoptions.series[2].data = data[0].series3;
				   
				   curentlineoptions.xAxis[0].data = data[1].xAxis;
				   curentlineoptions.series[0].data = data[1].series1;
				   curentlineoptions.series[1].data = data[1].series2;
				   curentlineoptions.series[2].data = data[1].series3;
				   
				   todayCurentInfo.setOption(curentlineoptions);
				   todayVoltageInfo.setOption(voltagelineoptions); 
			 });
		}
		data_time = curdate;
	}
}