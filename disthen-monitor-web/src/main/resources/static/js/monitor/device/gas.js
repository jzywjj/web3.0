var assetLink,statusInfo,cardId,lockId,interval = 0, o2,o2option,ch4,ch4option,h2s,c2soption,co,cooption,lineoptions,gslines,data_time;
$(document).ready(function() {
	var O2Div = $('#O2');
	var CH4Div = $('#CH4');
	var H2SDiv = $('#H2S');
	var CODiv = $('#CO');
	statusInfo = $('#statusInfo');
	assetLink = $('#assetLink');
	O2Div.css("width",document.documentElement.clientWidth/4); 
	O2Div.css('height',document.documentElement.clientHeight/2-25); 
	statusInfo.css("width",document.documentElement.clientWidth/4); 
	statusInfo.css('height',25); 
	
	CH4Div.css("width",document.documentElement.clientWidth/4); 
	CH4Div.css('height',document.documentElement.clientHeight/2-25); 
	H2SDiv.css("width",document.documentElement.clientWidth/4); 
	H2SDiv.css('height',document.documentElement.clientHeight/2); 
	CODiv.css("width",document.documentElement.clientWidth/4); 
	CODiv.css('height',document.documentElement.clientHeight/2); 
	
	var gslinesDiv = $('#gslines');
	gslinesDiv.css("width",document.documentElement.clientWidth/2); 
	gslinesDiv.css('height',document.documentElement.clientHeight/2); 
	
	var dataframe = $('#dataframe');
	dataframe.attr("width",document.documentElement.clientWidth/2); 
	dataframe.attr('height',document.documentElement.clientHeight/2); 
	
	initailGasCharts();
	clearInterval(interval);
	//定时刷新页面数据
	interval = setInterval(initailGasCharts, 30000);

	//updateGas();//初始化
	//clearInterval(interval);
	//定时刷新页面数据
	//interval = setInterval(updateGas, 5000);
});

function initailGasCharts(){
	var ids = $("#id").text();
	var a1,a2,a3,a4,status;
	$.ajax({
        type: "GET",
        url: "/monitor/pages/device/deviceInfo/"+ids+"/",
        async:false,
        success: function(data){
        	a1 = data.O2;
        	a1 = a1.substring(0,a1.length-3);
        	a1 = parseFloat(a1)/10000;
        	a2 = data.CH4;
        	a2 = a2.substring(0,a2.length-1);
        	a3 = data.H2S;
        	a3 = a3.substring(0,a3.length-3);
        	a3 = parseFloat(a3)/10000;
        	a4 = data.CO;
        	a4 = a4.substring(0,a4.length-1);
        	status = data.status;
        	$("#statusInfo").text("当前状态："+status);
        }
    });
	o2 = echarts.init(document.getElementById('O2'),dark);
	ch4 = echarts.init(document.getElementById('CH4'));
	h2s = echarts.init(document.getElementById('H2S'));
	co = echarts.init(document.getElementById('CO'));
	gslines = echarts.init(document.getElementById('gslines'));
	o2option = {
			title : { text: '氧气'},
		    tooltip : { formatter: "{a} : {c}%" },
		    toolbox: {show : false},
		    series : [ {
		            name:'氧气浓度',
		            type:'gauge',
		            detail : {formatter:'{value}%'},
		            data:[{value: a1}]
		        }
		    ]
		};
	ch4option = {
			title : { text: '甲烷'},
		    tooltip : {formatter: "{a} : {c}%"		    },
		    toolbox: {show : false},
		    series : [
		        {
		            name:'甲烷浓度',
		            type:'gauge',
		            detail : {formatter:'{value}%'},
		            data:[{value: a2}]
		        }
		    ]
		};
	h2soption = {
			title : { text: '硫化氢'},
		    tooltip : { formatter: "{a} : {c}%"},
		    toolbox: {show : false},
		    series : [
		        {
		            name:'硫化氢浓度',
		            type:'gauge',
		            detail : {formatter:'{value}%'},
		            data:[{value: a3}]
		        }
		    ]
		};
	cooption = {
			title : { text: '一氧化碳'},
		    tooltip : { formatter: "{a} : {c}%"},
		    toolbox: { show : false},
		    series : [
		        {
		            name:'一氧化碳浓度',
		            type:'gauge',
		            detail : {formatter:'{value}%'},
		            data:[{value: a4}]
		        }
		    ]
		};
	o2.setOption(o2option);
	ch4.setOption(ch4option);
	h2s.setOption(h2soption);
	co.setOption(cooption);
	
	lineoptions = {
		    title : { subtext: '今日气体浓度'},
		    tooltip : { trigger: 'axis'},
		    legend: {data:['氧气','甲烷','硫化氢','一氧化碳']},
		    toolbox: {show : true},
		    calculable : true,
		    xAxis : [ 
		        { type : 'category',
		            boundaryGap : false,
		            data : [10,23,45,12]
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
		            name:'氧气',
		            type:'line',
		            data:[12,32,25,13,15,16],
		            markPoint : {
		                data : [
		                    {type : 'max', name: '最大值'}
		                ]
		            }
		        },
		        {
		            name:'甲烷',
		            type:'line',
		            data:[23,25,36,14,45,26],
		            markPoint : {
		                data : [
		                    {type : 'max', name: '最大值'}
		                ]
		            }
		        },
		        {
		            name:'硫化氢',
		            type:'line',
		            data:[36,25,63,54,12,55],
		            markPoint : {
		                data : [
		                    {type : 'max', name: '最大值'}
		                ]
		            }
		        },
		        {
		            name:'一氧化碳',
		            type:'line',
		            data:[15,64,85,23,65,55],
		            markPoint : {
		                data : [
		                    {type : 'max', name: '最大值'}
		                ]
		            }
		        }
		    ]
		};
	gslines.setOption(lineoptions);
}

function updateGas(){
	var selectedDevice=window.top.scopeToShare.selectedGas;
	cardId=window.top.scopeToShare.cardId;
	updateGasNode(selectedDevice);
}

function updateGasNode(node) {
	var cables = node.bindlogiccables;
	var onlineStat=node.onlineStat;
	
	var sInfo="<font size=2><b>当前状态&nbsp;:&nbsp;</b>"+('on'==onlineStat?"<font color=green>在线</font>":"离线")+"&nbsp;<b>时间&nbsp;:&nbsp;</b>"+(node.lastedDataTimeStr==null?"无":node.lastedDataTimeStr)+"</b></font>";
	statusInfo.html(sInfo);
	if(node.assetId&&node.assetId!='0'){
		assetLink.attr("href","/pro_asset/assetInfo?assetId="+node.assetId);
		assetLink.show();
	}
    var datas = new Array();
	cables && $.each(cables, function(index, ts) {
		var type = ts.dataType;
		if (type == "O2") {
			o2option.series[0].data[0].value = ts.value;
			o2.setOption(o2option);
		}else if (type == "CH4") {
			ch4option.series[0].data[0].value = ts.value;
			ch4.setOption(ch4option);
		}else if (type == "CO") {
			cooption.series[0].data[0].value = ts.value;
			co.setOption(cooption);
		}else if (type == "H2S") {
			h2soption.series[0].data[0].value = ts.value;
			h2s.setOption(h2soption);
		}
		if(data_time != ts.data_time){
			 var url="/mon_his/selectGasData?cardId="+cardId;
			 $.get(url).done(function (info){
				   var data = eval('('+info+')');
				   lineoptions.xAxis[0].data = data.dates;
				   lineoptions.series[0].data = data.o2values;
				   lineoptions.series[1].data = data.cH4values;
				   lineoptions.series[2].data = data.h2Svalues;
				   lineoptions.series[3].data = data.cOvalues;
				   gslines.setOption(lineoptions);
			 });
		}
		data_time = ts.data_time;
	});
}