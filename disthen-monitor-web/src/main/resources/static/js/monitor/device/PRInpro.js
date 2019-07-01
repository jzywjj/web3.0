var assetLink,statusInfo,cardId,lockId,interval = 0,armingCmd,disarmingCmd,RPInprostatus,RPInproImg;
$(document).ready(function() {
	RPInprostatus = $("#RPInprostatus");
	RPInproImg = $("#RPInproImg");
	armingCmd=$("#openLink");
	disarmingCmd=$("#closeLink");
	statusInfo = $("#statusInfo");
	assetLink = $("#assetLink");
	updatePRInpro();//初始化
	clearInterval(interval);
	//定时刷新页面数据
	interval = setInterval(updatePRInpro, 5000);
	
});

function updatePRInpro(){
	var selectedDevice=window.top.scopeToShare.selectedPRInpro;
	updatePRInproNode(selectedDevice);
}

function updatePRInproNode(node) {
	var cables = node.bindlogiccables;
	var onlineStat=node.onlineStat;
	var sInfo="<font size=2><b>当前状态&nbsp;:&nbsp;</b>"+('on'==onlineStat?"<font color=green>在线</font>":"离线")+"<br/><b>最新时间&nbsp;:&nbsp;</b>"+(node.lastedDataTimeStr==null?"无":node.lastedDataTimeStr)+"</b></font>";
	statusInfo.html(sInfo);
	if(node.assetId&&node.assetId!='0'){
		assetLink.attr("href","/pro_asset/assetInfo?assetId="+node.assetId);
		assetLink.show();
	}
	cables && $.each(cables, function(index, ts) {
		var type = ts.dataType, value = ts.value;
		if (type == "PRInproStatus") {
			lockId = ts.id;
			disarmingCmd.show();
			if(value=='0'){
				RPInprostatus.html('<b><font color=red>告警</font></b>');
				RPInproImg.attr('src','../../../static/images/monitor/PRInpro_alarm.gif');
				disarmingCmd.hide();
				armingCmd.show();
			}else if(value=='1'){
				RPInprostatus.html('<b>正常</b>');
				RPInproImg.attr('src','../../../static/images/monitor/PRInpro_normal.png');
				armingCmd.hide();
				disarmingCmd.show();
			}else if(value=='2'){
				RPInprostatus.html('<b>布防</b>');
				RPInproImg.attr('src','../../../static/images/monitor/PRInpro_normal.png');
				disarmingCmd.hide();
				armingCmd.show();
			}else if(value=='-2'){
				RPInprostatus.html('<b>撤防</b>');
				RPInproImg.attr('src','../../../static/images/monitor/PRInpro_normal.png');
				armingCmd.hide();
				disarmingCmd.show();
			}
			if('off'==onlineStat){
				armingCmd.hide();//设备离线不显示按钮
				disarmingCmd.hide();
			}
		}
	});
}

function sendPRInproCommand(cmdStr){
	var cmd = 0;
	if('open'==cmdStr){
		 cmd = 0;
	}else if('close'==cmdStr){
		 cmd = 1;
	}
	$.get("/mon_cmd/sendCommand?cableId="+lockId+"&cmd="+cmd, function(result){
		alert(result.message);
	});
};