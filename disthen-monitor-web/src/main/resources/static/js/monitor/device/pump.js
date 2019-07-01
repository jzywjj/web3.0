var assetLink,statusInfo,cardId,lockId,interval = 0,pumpstatus,pumpImg,runmodel,data_time,safemodel = '';
var colorList = [
                 '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                  '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                  '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
               ];
var dw = ['A','A','A','A','V','V','V','W','W','W'];
var ids = "";
$(document).ready(function() {
	safemodel = window.localStorage['safemodel'];
	pumpstatus = $("#pumpstatus");
	pumpImg = $("#pumpImg");
	runmodel = $("#runmodel");
	openCmd=$("#openLink");
	closeCmd=$("#closeLink");
	statusInfo=$("#statusInfo");
	assetLink=$("#assetLink"); 
	var otherInfo = $('#otherInfo');
	otherInfo.css("width",document.documentElement.clientWidth*2/3); 
	otherInfo.css('height',document.documentElement.clientHeight/2); 
	
	var waterLevel = $('#waterLevel');
	waterLevel.css("width",document.documentElement.clientWidth/2); 
	waterLevel.css('height',document.documentElement.clientHeight/2); 
	
	var dataframe = $('#dataframe');
	dataframe.attr("width",document.documentElement.clientWidth/2); 
	dataframe.attr('height',document.documentElement.clientHeight/2); 
	
	//initialChart();
	//initialWaterChart();
	ids = $("#id").text();
	updatePump();//初始化
	
	$("#openLink").click(function(e){
		sendLampCommand(1);
	});
	
	$("#closeLink").click(function(e){
		sendLampCommand(0);
	});
	$("#manual").click(function(e){
		sendLampCommand(3);
	});
	$("#auto").click(function(e){
		sendLampCommand(2);
	});
	
	clearInterval(interval);
	//定时刷新页面数据
	interval = setInterval(updatePump, 30000);
	
});

function initialChart(){
	var myChart = echarts.init(document.getElementById('otherInfo'));
	document.getElementById('otherInfo').style.display="none";//先隐藏，如果有电流、电压数据就显示 2017-7-20 cn
	option = {
		    title: {
		        x: 'center',
		        text: '水泵电流、电压、功率信息'
		        //subtext: 'Rainbow bar example',
		        //link: 'http://echarts.baidu.com/doc/example.html'
		    },
		    tooltip: {
		        trigger: 'item'
		    },
		    toolbox: {
		        show: true,
//		        feature: {
//		            dataView: {show: true, readOnly: false},
//		            restore: {show: true},
//		            saveAsImage: {show: true}
//		        }
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
		            show: false,
		            data: ['A相电流', 'B相电流', 'C相电流', 'AB线电压', 'BC线电压', 'CA线电压', '功率']
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
		            name: '水泵电流、电压、功率信息',
		            type: 'bar',
		            itemStyle: {
		                normal: {
		                    color: function(params) {
		                        return colorList[params.dataIndex]
		                    },
		                    label: {
		                        show: true,
		                        position: 'top',
		                        formatter: function(params) {
			                        return params.name+"\n"+params.data+" "+dw[params.dataIndex]
			                    }
		                    }
		                }
		            },
		            data: [10,16,20,23,25,43,26,21,33,66]
		        }
		    ]
		};
	 myChart.setOption(option);
}

function initialWaterChart(){
	var myChart = echarts.init(document.getElementById('waterLevel'));
	option = {
		    title : {
		        text: '水泵水位',
		        subtext: '今日水位(cm)'
		    },
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		        data:['水位']
		    },
		    toolbox: {
		        show : true,
//		        feature : {
//		            mark : {show: true},
//		            dataView : {show: true, readOnly: false},
//		            magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
//		            restore : {show: true},
//		            saveAsImage : {show: true}
//		        }
		    },
		    calculable : true,
		    xAxis : [
		        {
		            type : 'category',
		            boundaryGap : false,
		            data : [10,23,25,36,65,42,52,55]
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value'
		        }
		    ],
		    series : [
		        {

		            name:'水位(cm)',
		            type:'line',
		           /* label: {		    
		            	normal: {
		            		show: true,	
		            		position: 'top',	
		            		formatter: '{c}cm'		
		            	},		      
		            },*/
		            smooth:true,
		            itemStyle: {normal: {color:'#60C0DD',areaStyle: {type: 'default'}}},
		            data:[10,25,36,66,22],
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
	 myChart.setOption(option);
}

function updatePump(){
//	var selectedDevice=window.top.scopeToShare.selectedPump;
//	cardId=window.top.scopeToShare.cardId;
//	updatePumpNode(selectedDevice);
	$.ajax({
        type: "GET",
        url: "/monitor/pages/device/deviceInfo/"+ids+"/",
        async:false,
        success: function(data){
        	$("#statusInfo").text("当前状态："+data.status);
        	$("#waterLever").text("当前水位："+data.waterLevel);
        	$("#pumpstatus").text(data.pumpStatus==0?"已关闭":"已开启");
        	$("#runmodel").text(data.pumpModel==0?"自动":"手动");
        	if(data.pumpStatus == 1){
    			$("#openLink").css("display","block");
    			$("#closeLink").css("display","none");
        	}else{
        		$("#openLink").css("display","none");
    			$("#closeLink").css("display","block");
        	}
        	if(data.pumpModel == 0){
        		$("#auto").css("background-color","lightseagreen");
        	}else{
        		$("#manual").css("background-color","lightgray");
        	}
        	
        }
    });
}

function updatePumpNode(node) {
	var cables = node.bindlogiccables;
	var onlineStat=node.onlineStat;
	var sInfo="<font size=2><b>当前状态&nbsp;:&nbsp;</b>"+('on'==onlineStat?"<font color=green>在线</font>":"离线")+"<br/> <b>最新时间&nbsp;:&nbsp;</b>"+(node.lastedDataTimeStr==null?"无":node.lastedDataTimeStr)+"</b></font>";
	statusInfo.html(sInfo);
	if(node.assetId&&node.assetId!='0'){
		assetLink.attr("href","/pro_asset/assetInfo?assetId="+node.assetId);
		assetLink.show();
	}
    var otherInfo = echarts.getInstanceByDom(document.getElementById('otherInfo')); 
    var waterLevel = echarts.getInstanceByDom(document.getElementById('waterLevel')); 
    var datas = new Array();
	cables && $.each(cables, function(index, ts) {
		var type = ts.dataType;
		if (type == "PumpController") {
			lockId = ts.id;
			if(ts.sstatus==1){
				pumpstatus.html('<b>已开启</b>');
				pumpImg.attr('src','../../../static/images/monitor/pump-run.gif');
				openCmd.hide();
				closeCmd.show();
			}else{
				pumpstatus.html('<b>已关闭</b>');
				pumpImg.attr('src','../../../static/images/monitor/pump-stop.gif');
				 closeCmd.hide();
				 openCmd.show();
			}
			//水泵运行模式
			if(ts.runmodel == 1){
				runmodel.html('<b>手动</b>');
			}else{
				runmodel.html('<b>自动</b>');
			}
			if('off'==onlineStat){
				openCmd.hide();//设备离线不显示按钮
				closeCmd.hide();
			}
			if(safemodel){//安全模式
				openCmd.show();
				closeCmd.show();
			}
			datas.push(ts.aElectriccurrent);
			datas.push(ts.bElectriccurrent);
			datas.push(ts.cElectriccurrent);
			/*datas.push(ts.zElectriccurrent);*/
			datas.push(ts.baVoltage);
			datas.push(ts.acVoltage);
			datas.push(ts.cbVoltage);
			datas.push(ts.activePower);
//			datas.push(ts.wattlessPower);
//			datas.push(ts.apparentPower);
			if(ts.aElectriccurrent >= 0 || ts.baVoltage>=0 || ts.activePower>=0){//只要有值就显示yjb
				document.getElementById('otherInfo').style.display="block";//如果有电流、电压数据就显示
			}
		}else if(type == "WaterLevel"){//水位
			if(data_time != ts.data_time){
				 var url="/mon_his/selectPumpWaterData?cardId="+cardId+"&cableId="+ts.id;
				 $.get(url).done(function (info){
					   var data = eval('('+info+')');
					   waterLevel.setOption({
						   xAxis:{
							      data:data.dates
						   },
						   series:[
						           {
						        	   data:data.values
						           }
						   ]
					   });
				 });
			}
			data_time = ts.data_time;
		}
	});
	otherInfo.setOption({
		   series: [
		   		        {
				            name: '水泵电流、电压、功率信息',
				            type: 'bar',
				            itemStyle: {
				                normal: {
				                    color: function(params) {
				                        return colorList[params.dataIndex]
				                    },
				                    label: {
				                        show: true,
				                        position: 'top',
				                        formatter: function(params) {
					                        return params.name+"\n"+params.data+" "+dw[params.dataIndex]
					                    }
				                    }
				                }
				            },
				            data: datas
				        }
				    ]
	   });
}

function sendLampCommand(cmd){
	$.ajax({
        type: "GET",
        url: "/monitor/pages/device/updateDeviceStatus/"+ids+"/"+cmd+"/",
        async:false,
        success: function(data){
        	if(data == "true"){
        		if(cmd == 0){
        			$("#openLink").css("display","block");
        			$("#closeLink").css("display","none");
            	}else if(cmd == 1){
            		$("#openLink").css("display","none");
        			$("#closeLink").css("display","block");
            	}else if(cmd == 2){
            	}else{
            	}
        	}
        }
    });
};