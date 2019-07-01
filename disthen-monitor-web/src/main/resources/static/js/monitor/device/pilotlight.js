var assetLink,statusInfo,cardId,lockId,interval = 0,PLStatus,PLDescription,PilotlightImg;
$(document).ready(function() {
	PLStatus = $("#PLStatus");
	PilotlightImg = $("#PilotlightImg");
	PLDescription = $("#PLDescription");
	statusInfo = $("#statusInfo");
	assetLink = $("#assetLink");
	updatePilotlight();//初始化
	clearInterval(interval);
	//定时刷新页面数据
	interval = setInterval(updatePilotlight, 5000);
	
});

function updatePilotlight(){
	var selectedDevice=window.top.scopeToShare.selectedPilotlight;
	updatePilotlightNode(selectedDevice);
}

function updatePilotlightNode(node) {
	var cables = node.bindlogiccables;
	var onlineStat=node.onlineStat;
	
	var sInfo="<font size=2><b>当前状态&nbsp;:&nbsp;</b>"+('on'==onlineStat?"<font color=green>在线</font>":"离线")+"<br/><b>最新时间&nbsp;:&nbsp;</b>"+(node.lastedDataTimeStr==null?"无":node.lastedDataTimeStr)+"</b></font>";
	statusInfo.html(sInfo);
	if(node.assetId&&node.assetId!='0'){
		assetLink.attr("href","/pro_asset/assetInfo?assetId="+node.assetId);
		assetLink.show();
	}
	if(node.description){
		PLDescription.html(node.description);
	}else{
		PLDescription.html("详情:未知");
	}
	cables && $.each(cables, function(index, ts) {
		var type = ts.dataType, value = ts.value;
		if (type == "PLStatus") {
			lockId = ts.id;
			if(value=='0'){
				PLStatus.html('<b><font color=red>告警</font></b>');
				PilotlightImg.attr('src','../../../static/images/monitor/pilotlight_alarm.png');
			}else {
				PLStatus.html('<b>正常</b>');
				PilotlightImg.attr('src','../../../static/images/monitor/pilotlight_normal.png');
			}
		}
	});
}
