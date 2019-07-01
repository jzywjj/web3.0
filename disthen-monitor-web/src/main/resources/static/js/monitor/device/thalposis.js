var assetLink,statusInfo,cardId,lockId,interval = 0,thalposisstatus,thalposisImg;
$(document).ready(function() {
	thalposisstatus = $("#thalposisstatus");
	thalposisImg = $("#thalposisImg");
	statusInfo = $("#statusInfo");
	assetLink = $("#assetLink");
	updateThalposis();//初始化
	clearInterval(interval);
	//定时刷新页面数据
	interval = setInterval(updateThalposis, 5000);
	
});

function updateThalposis(){
	var selectedDevice=window.top.scopeToShare.selectedThalposis;
	updateThalposisNode(selectedDevice);
}

function updateThalposisNode(node) {
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
		if (type == "ThalposisStatus") {
			lockId = ts.id;
			if(value=='1'){
				thalposisstatus.html('<b><font color=red>告警</font></b>');
				thalposisImg.attr('src','../../../static/images/monitor/Thalposis_alarm.gif');
			}else{
				thalposisstatus.html('<b>正常</b>');
				thalposisImg.attr('src','../../../static/images/monitor/Thalposis_normal.png');
			}
		}
	});
}
