var assetLink,statusInfo,cardId,lockId,interval = 0,fanstatus,fanImg,runmodel,safemodel = '';
var colorList = [
                 '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                  '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                  '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
               ];
var dw = ['A','A','A','A','V','V','V','W','W','W'];
var ids = "";
$(document).ready(function() {
	safemodel = window.localStorage['safemodel'];
	fanstatus = $("#fanstatus");
	fanImg = $("#fanImg");
	runmodel = $("#runmodel");
	openCmd=$("#openLink");
	closeCmd=$("#closeLink");
	statusInfo=$("#statusInfo");
	assetLink=$("#assetLink"); 
	var otherInfo = $('#otherInfo');
	otherInfo.css("width",document.documentElement.clientWidth*2/3); 
	otherInfo.css('height',document.documentElement.clientHeight); 
	
	ids = $("#id").text();
	//initialChart();
	
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
	
	updateFan();//初始化
	clearInterval(interval);
	
	
	//定时刷新页面数据
	interval = setInterval(updateFan, 30000);
	
});

function initialChart(){
	var myChart = echarts.init(document.getElementById('otherInfo'));
	//document.getElementById('otherInfo').style.display="none";//先隐藏，如果有电流、电压数据就显示 2017-7-20 cn
	option = {
		    title: {
		        x: 'center',
		        text: '风机电流、电压、功率信息'
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
		            data: ['A相电流', 'B相电流', 'C相电流', 'AB线电压', 'BC线电压', 'CA线电压', '有功功率', '无功功率', '视在功率']
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
		            name: '风机电流、电压、功率信息',
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
		            data: [10,15,13,36,48,25,46,32,21,22]
		        }
		    ]
		};
	 myChart.setOption(option);
}

function updateFan(){
//	var selectedDevice=window.top.scopeToShare.selectedFan;
//	updateFanNode(selectedDevice);
	$.ajax({
        type: "GET",
        url: "/monitor/pages/device/deviceInfo/"+ids+"/",
        async:false,
        success: function(data){
        	$("#statusInfo").text("当前状态："+data.status);
        	$("#fanstatus").text(data.fanStatus==0?"已关闭":"已开启");
        	$("#runmodel").text(data.fanModel==0?"自动":"手动");
        	if(data.fanStatus == 1){
    			$("#openLink").css("display","block");
    			$("#closeLink").css("display","none");
        	}else{
        		$("#openLink").css("display","none");
    			$("#closeLink").css("display","block");
        	}
        	if(data.fanModel == 0){
        		$("#auto").css("background-color","lightseagreen");
        	}else{
        		$("#manual").css("background-color","lightgray");
        	}
        	
        }
    });
}

function updateFanNode(node) {
	var cables = node.bindlogiccables;
	var onlineStat=node.onlineStat;
	
	var sInfo="<font size=2><b>当前状态&nbsp;:&nbsp;</b>"+('on'==onlineStat?"<font color=green>在线</font>":"离线")+"<br/> <b>最新时间&nbsp;:&nbsp;</b>"+(node.lastedDataTimeStr==null?"无":node.lastedDataTimeStr)+"</b></font>";
	statusInfo.html(sInfo);
	if(node.assetId&&node.assetId!='0'){
		assetLink.attr("href","/pro_asset/assetInfo?assetId="+node.assetId);
		assetLink.show();
	}
    var myChart = echarts.getInstanceByDom(document.getElementById('otherInfo')); 
    var datas = new Array();
    var names = new Array();
	cables && $.each(cables, function(index, ts) {
		var type = ts.dataType;
		if (type == "FanController") {
			lockId = ts.id;
			//风机状态
			if(ts.sstatus==1){
				fanstatus.html('<b>已开启</b>');
				fanImg.attr('src','../../../static/images/monitor/fan-run.gif');
				openCmd.hide();
				closeCmd.show();
			}else{
				fanstatus.html('<b>已关闭</b>');
				fanImg.attr('src','../../../static/images/monitor/fan-stop.png');
				 closeCmd.hide();
				 openCmd.show();
			}
			//风机运行模式
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
			if(ts.aElectriccurrent!= null && ts.aElectriccurrent >=0){
				datas.push(ts.aElectriccurrent);
				names.push('A相电流');				
			}
			if(ts.bElectriccurrent!= null && ts.bElectriccurrent >=0){
				datas.push(ts.bElectriccurrent);
				names.push('B相电流');
			}
			if(ts.cElectriccurrent!= null && ts.cElectriccurrent >=0){
				datas.push(ts.cElectriccurrent);
				names.push('C相电流');
			}
			/*if(ts.zElectriccurrent!= null && ts.zElectriccurrent >=0){
				datas.push(ts.zElectriccurrent);
				names.push('Z相电流');
			}*/
			if(ts.baVoltage!= null && ts.baVoltage >=0){
				datas.push(ts.baVoltage);
				names.push('BA线电压');
			}
			if(ts.acVoltage!= null && ts.acVoltage >=0){
				datas.push(ts.acVoltage);
				names.push('AC线电压');
			}
			if(ts.cbVoltage!= null && ts.cbVoltage >=0){
				datas.push(ts.cbVoltage);
				names.push('CB线电压');
			}
			if(ts.activePower!= null && ts.activePower >=0){
				datas.push(ts.activePower);
				names.push('功率');
			}
//			if(ts.wattlessPower!= null && ts.wattlessPower >=0){
//				datas.push(ts.wattlessPower);
//				names.push('无功功率');
//			}
//			if(ts.apparentPower!= null && ts.apparentPower >=0){
//				datas.push(ts.apparentPower);
//				names.push('视在功率');
//			}
			if(ts.aElectriccurrent >= 0 || ts.baVoltage>=0 || ts.activePower>=0){//只要有值就显示yjb
				document.getElementById('otherInfo').style.display="block";//如果有电流、电压数据就显示
			}
		}
	});
	
	 myChart.setOption({
		 xAxis: [
			        {
			            type: 'category',
			            show: false,
			            data:  names//['A相电流', 'B相电流', 'C相电流', 'Z相电流', 'BA线电压', 'AC线电压', 'CB线电压', '有功功率', '无功功率', '视在功率']
			        }
			    ],
		   series: [
		   		        {
				            name: '风机电流、电压、功率信息',
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