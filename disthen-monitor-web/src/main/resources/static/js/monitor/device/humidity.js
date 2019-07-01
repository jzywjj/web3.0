var assetLink,statusInfo,cardId,lockId,interval = 0,humidity,HTYoption,lines,data_time;
$(document).ready(function() {
	var humidityDiv = $('#humidity');
	humidityDiv.css("width",document.documentElement.clientWidth*5/12); 
	humidityDiv.css('height',document.documentElement.clientHeight); 
	
	var otherInfoDIV = $('#otherInfo');
	otherInfoDIV.css("width",document.documentElement.clientWidth*7/12); 
	otherInfoDIV.css('height',document.documentElement.clientHeight); 
	
	statusInfo = $('#statusInfo');
	assetLink = $('#assetLink');
	initailCharts();
	update();//初始化
	clearInterval(interval);
	//定时刷新页面数据
	interval = setInterval(update, 5000);
});

function initailCharts(){
	humidity  = echarts.init(document.getElementById('humidity'));
	lines  = echarts.init(document.getElementById('otherInfo'));
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
	humidity.setOption(HTYoption);
	
	lineoptions = {
		    title : { subtext: '今日湿度'},
		    tooltip : { trigger: 'axis'},
		    legend: {data:['湿度']},
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

function update(){
	var selectedDevice=window.top.scopeToShare.selectedHumidity;
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
		if (type == "PRHumidity") {
			HTYoption.series[0].data[0].value = ts.value;
			humidity.setOption(HTYoption);
		}
		if(data_time != ts.data_time){
			 var url="/mon_his/selectHumidityData?cardId="+cardId;
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