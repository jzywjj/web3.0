var assetLink,statusInfo,cardId,lockId,interval = 0,FaultStatus,Description,monitorImg,FaultLong,FaultXingbo,FaultJuli,FaultDianliu;
$(document).ready(function() {
	FaultStatus = $("#FaultStatus");// 告警状态
	monitorImg = $("#monitorImg");//图片
	//FaultDescription = $("#FaultDescription");//备注内容
	statusInfo = $("#statusInfo");//在线
	assetLink = $("#assetLink");//资产链接
	FaultLong = $("#FaultLong");//长度
	FaultXingbo = $("#FaultXingbo");//行波
	FaultJuli = $("#FaultJuli");//距离
	FaultDianliu = $("#FaultDianliu");//电流
	starName = $("#starName"); //变电站名称
	endName = $("#endName"); //终端塔名称
	updateMonitor();//初始化
	clearInterval(interval);
	//定时刷新页面数据
	interval = setInterval(updateMonitor, 5000);
	
});

function updateMonitor(){
	var selectedDevice=window.top.scopeToShare.selectedMonitor;
	updateMonitorNode(selectedDevice);
}

function updateMonitorNode(node) {
	var cables = node.bindlogiccables;
	var onlineStat=node.onlineStat;
	
	var sInfo="<font size=2>当前状态&nbsp;:&nbsp;"+('on'==onlineStat?"<font color=green>在线</font>":"离线")+"</font>";
	statusInfo.html(sInfo);
	if(node.assetId&&node.assetId!='0'){
		assetLink.attr("href","/pro_asset/assetInfo?assetId="+node.assetId);
		assetLink.show();
	}
	if(node.description){
		var description = node.description;
		var des = description.split(",");
		FaultLong.html(des[0]+'米');//电缆长度
		starName.html(des[2]); //起点名称
		endName.html(des[3]); //终点名称
		if(des[1]=='0'){						
			FaultXingbo.html('0');//行波信号
			FaultJuli.html('无');//故障距离
			FaultStatus.html('正常');
			monitorImg.attr('src','../../../static/images/monitor/cable.png');
		}else {
			FaultXingbo.html('1');//行波信号
			FaultJuli.html(des[1]+'米');//故障距离
			FaultStatus.html('<font color=red>相间短路</font>');
			monitorImg.attr('src','../../../static/images/monitor/cable_alarm.gif');
		}
		
		//FaultDescription.html(node.description);
	}//else{
	//	FaultDescription.html("无");
	//}
	cables && $.each(cables, function(index, ts) {
		var type = ts.dataType, value = ts.value;
		if (type == "FaultStatus") {
			lockId = ts.id;
			FaultDianliu.html(value+'A');//运行电流
		}
	});
}
