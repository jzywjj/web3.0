var assetLink,statusInfo,cardId,lockId,interval = 0,waterinvasionstatus,waterinvasionImg;
$(document).ready(function() {
	waterinvasionstatus = $("#waterinvasionstatus");
	waterinvasionImg = $("#waterinvasionImg");
	statusInfo = $("#statusInfo");
	assetLink = $("#assetLink");
	updateWaterinvasion();//初始化
	clearInterval(interval);
	//定时刷新页面数据
	interval = setInterval(updateWaterinvasion, 5000);
	
});

function updateWaterinvasion(){
	var selectedDevice=window.top.scopeToShare.selectedWaterinvasion;
	updateWaterinvasionNode(selectedDevice);
}

function updateWaterinvasionNode(node) {
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
		if (type == "WaterInvasionStatus") {
			lockId = ts.id;
			if(value=='1'){
				waterinvasionstatus.html('<b><font color=red>告警</font></b>');
				waterinvasionImg.attr('src','../../../static/images/monitor/water_alarm.gif');
			}else{
				waterinvasionstatus.html('<b>正常</b>');
				waterinvasionImg.attr('src','../../../static/images/monitor/water_normal.png');
			}
		}
	});
}
