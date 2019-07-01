var assetLink,statusInfo,cardId,lockId,interval = 0,sdstatus,sdImg;
$(document).ready(function() {
	sdstatus = $("#sdstatus");
	sdImg = $("#sdImg");
	statusInfo = $("#statusInfo");
	assetLink = $("#assetLink");
	updateSmokeDetector();//初始化
	clearInterval(interval);
	//定时刷新页面数据
	interval = setInterval(updateSmokeDetector, 5000);
	
});

function updateSmokeDetector(){
	var selectedDevice=window.top.scopeToShare.selectedSmokeDetector;
	updateSmokeDetectorNode(selectedDevice);
}

function updateSmokeDetectorNode(node) {
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
		if (type == "SmokeDetectorStatus") {
			lockId = ts.id;
			if(value=='1'){
				sdstatus.html('<b><font color=red>告警</font></b>');
				sdImg.attr('src','../../../static/images/monitor/Smoke_alarm.gif');
			}else{
				sdstatus.html('<b>正常</b>');
				sdImg.attr('src','../../../static/images/monitor/Smoke_normal.png');
			}
		}
	});
}
