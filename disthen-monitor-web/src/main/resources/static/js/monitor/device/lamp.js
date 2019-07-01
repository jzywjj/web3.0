var assetLink,statusInfo,cardId,lockId,interval = 0,lampstatus,lampImg,safemodel = '';
var colorList = [
                 '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                  '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                  '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
               ];
var dw = ['A','A','A','A','V','V','V','W','W','W'];
var ids = "";
$(document).ready(function() {
	safemodel = window.localStorage['safemodel'];
	lampstatus = $("#lampstatus");
	lampImg = $("#lampImg");
	openCmd=$("#onLink");
	closeCmd=$("#offLink");
	statusInfo=$("#statusInfo");
	assetLink=$("#assetLink");
	var otherInfoDIV = $('#otherInfo');
	otherInfoDIV.css("width",document.documentElement.clientWidth*2/3); 
	otherInfoDIV.css('height',document.documentElement.clientHeight); 
	//initialChart();
	ids = $("#id").text();
	
	updateLamp();//初始化
	
	$("#onLink").click(function(e){
		sendLampCommand(0);
	});
	
	$("#offLink").click(function(e){
		sendLampCommand(1);
	});
	
	
	clearInterval(interval);
//	//定时刷新页面数据
	interval = setInterval(updateLamp, 30000);
	
	
});

function initialChart(){
	var myChart = echarts.init(document.getElementById('otherInfo'));
	option = {
		    title: {
		        x: 'center',
		        text: '照明电流、电压、功率信息'
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
		            data: ['A相电流', 'B相电流', 'C相电流', 'Z相电流', 'BA线电压', 'AC线电压', 'CB线电压', '有功功率', '无功功率', '视在功率']
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
		            name: '照明电流、电压、功率信息',
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
		            data: [10,25,36,25,43,26,35,28,15,36]
		        }
		    ]
		};
	 myChart.setOption(option);
}

function updateLamp(){
//	var selectedDevice=window.top.scopeToShare.selectedLamp;
//	updateLampNode(selectedDevice);
	$.ajax({
        type: "GET",
        url: "/monitor/pages/device/deviceInfo/"+ids+"/",
        async:false,
        success: function(data){
        	var lampStatus = data.lampStatus;
        	$("#statusInfo").text("当前状态："+data.status);
        	$("#lampstatus").text(data.lampStatus==0?"已关闭":"已开启");
        	if(data.lampStatus == 0){
	        	$("#onLink").css("display","none");
	        	$("#offLink").css("display","block");
        	}else{
        		$("#onLink").css("display","block");
        		$("#offLink").css("display","none");
        	}
        	
        }
    });
}

function updateLampNode(node) {
	var cables = node.bindlogiccables;
	var onlineStat=node.onlineStat;
	
	var sInfo="<font size=2><b>当前状态&nbsp;:&nbsp;</b>"+('on'==onlineStat?"<font color=green>在线</font>":"离线")+"<br/><b>时间&nbsp;:&nbsp;</b>"+(node.lastedDataTimeStr==null?"无":node.lastedDataTimeStr)+"</b></font>";
	statusInfo.html(sInfo);
	if(node.assetId&&node.assetId!='0'){
		assetLink.attr("href","/pro_asset/assetInfo?assetId="+node.assetId);
		assetLink.show();
	}
	var myChart = echarts.getInstanceByDom(document.getElementById('otherInfo')); 
	var datas = new Array();
	cables && $.each(cables, function(index, ts) {
		var type = ts.dataType;
		if (type == "LampModel") {
			lockId = ts.id;
			if(ts.sstatus==1){
				lampstatus.html('<b>打开</b>');
				lampImg.attr('src','../../../static/images/monitor/Light-on.png');
				openCmd.hide();
				closeCmd.show();
			}else{
				lampstatus.html('<b>关闭</b>');
				 lampImg.attr('src','../../../static/images/monitor/Light-off.png');
				 closeCmd.hide();
				 openCmd.show();
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
			datas.push(ts.zElectriccurrent);
			datas.push(ts.baVoltage);
			datas.push(ts.acVoltage);
			datas.push(ts.cbVoltage);
			datas.push(ts.activePower);
			datas.push(ts.wattlessPower);
			datas.push(ts.apparentPower);
		}
	});
	
	 myChart.setOption({
		   series: [
		   		        {
				            name: '照明电流、电压、功率信息',
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
        			$("#onLink").css("display","none");
        			$("#offLink").css("display","block");
            	}else{
            		$("#onLink").css("display","block");
            		$("#offLink").css("display","none");
            	}
        	}
        }
    });
};