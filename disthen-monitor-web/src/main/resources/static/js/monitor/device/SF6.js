var assetLink,statusInfo,cardId,lockId,interval = 0,SF6Status,SF6Thickness,SF6Img;
$(document).ready(function() {
	SF6Status = $("#SF6Status");
	SF6Img = $("#SF6Img");
	statusInfo = $("#statusInfo");
	SF6Thickness = $("#SF6Thickness");
	assetLink = $("#assetLink");
	updateSF6();//初始化
	clearInterval(interval);
	//定时刷新页面数据
	interval = setInterval(updateSF6, 5000);
	
});

function updateSF6(){
	var selectedDevice=window.top.scopeToShare.selectedSF6;
	updateSF6Node(selectedDevice);
}

function updateSF6Node(node) {
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
		if (type == "SF6Status") {
			lockId = ts.id;
			if(value=='1'){
				SF6Status.html('<b><font color=red>告警</font></b>');
				SF6Img.attr('src','../../../static/images/monitor/SF6_alarm.gif');
			}else{
				SF6Status.html('<b>正常</b>');
				SF6Img.attr('src','../../../static/images/monitor/SF6_normal.png');
			}
		}else if(type == "SF6Thickness"){
			SF6Thickness.html('<b>'+value+'%</b>');
		}
	});
}
