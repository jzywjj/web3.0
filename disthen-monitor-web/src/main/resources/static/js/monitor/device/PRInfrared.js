var assetLink,statusInfo,cardId,lockId,interval = 0,infraredstatus,infraredImg;
$(document).ready(function() {
	infraredstatus = $("#infraredstatus");
	infraredImg = $("#infraredImg");
	statusInfo = $("#statusInfo");
	assetLink = $("#assetLink");
	updateInfrared();//初始化
	clearInterval(interval);
	//定时刷新页面数据
	interval = setInterval(updateInfrared, 5000);
	
});

function updateInfrared(){
	var selectedDevice=window.top.scopeToShare.selectedInfrared;
	updateInfraredNode(selectedDevice);
}

function updateInfraredNode(node) {
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
		if (type == "PRInfraredController") {
			lockId = ts.id;
			if(value=='1'){
				infraredstatus.html('<b><font color=red>告警</font></b>');
				infraredImg.attr('src','../../../static/images/monitor/IR_alarm.png');
			}else{
				infraredstatus.html('<b>正常</b>');
				infraredImg.attr('src','../../../static/images/monitor/IR_normal.png');
			}
		}
	});
}
