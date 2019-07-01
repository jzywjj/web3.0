var assetLink,statusInfo,cardId,lockId,interval = 0,cameraStatus,cameraImg;
$(document).ready(function() {
	cameraStatus = $("#cameraStatus");
	cameraImg = $("#cameraImg");
	statusInfo = $("#statusInfo");
	assetLink = $("#assetLink");
	updateCamera();//初始化
	clearInterval(interval);
	//定时刷新页面数据
	interval = setInterval(updateCamera, 5000);
	
});

function updateCamera(){
	var selectedDevice=window.top.scopeToShare.selectedCamera;
	updateCameraNode(selectedDevice);
}

function updateCameraNode(node) {
	var cables = node.bindlogiccables;
	var onlineStat=node.onlineStat;
//	var sInfo="<font size=2><b>当前状态&nbsp;:&nbsp;</b>"+('on'==onlineStat?"<font color=green>在线</font>":"离线")+"<br/><b>最新时间&nbsp;:&nbsp;</b>"+(node.lastedDataTimeStr==null?"无":node.lastedDataTimeStr)+"</b></font>";
	var sInfo="<font size=2><b>当前状态&nbsp;:&nbsp;</b>"+('on'==onlineStat?"<font color=green>实时</font>":"实时")+"<br/></font>";
	statusInfo.html(sInfo);
	if(node.assetId&&node.assetId!='0'){
		assetLink.attr("href","/pro_asset/assetInfo?assetId="+node.assetId);
		assetLink.show();
	}
	cables && $.each(cables, function(index, ts) {
		var type = ts.dataType, value = ts.value;
		if (type == "CameraOC") {
			lockId = ts.id;
			if(value=='1'){
				SF6Status.html('<b><font color=red>关闭</font></b>');
				SF6Img.attr('src','../../../static/images/monitor/Camera-off.png');
			}else{
				SF6Status.html('<b>开启</b>');
				SF6Img.attr('src','../../../static/images/monitor/Camera-on.png');
			}
		}
	});
}
