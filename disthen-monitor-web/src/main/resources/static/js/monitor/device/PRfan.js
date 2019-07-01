var assetLink,statusInfo,cardId,lockId,interval = 0,fanstatus,fanImg,safemodel = '';
$(document).ready(function() {
	safemodel = window.localStorage['safemodel'];
	fanstatus = $("#fanstatus");
	fanImg = $("#fanImg");
	openCmd=$("#openLink");
	closeCmd=$("#closeLink");
	statusInfo=$("#statusInfo");
	assetLink=$("#assetLink"); 
	var dataframe = $('#dataframe');
	dataframe.css("width",document.documentElement.clientWidth/2); 
	dataframe.css('height',document.documentElement.clientHeight); 
	
	updateFan();//初始化
	clearInterval(interval);
	//定时刷新页面数据
	interval = setInterval(updateFan, 5000);
	
});

function updateFan(){
	var selectedDevice=window.top.scopeToShare.selectedFan;
	updateFanNode(selectedDevice);
}

function updateFanNode(node) {
	var cables = node.bindlogiccables;
	var onlineStat=node.onlineStat;
	
	var sInfo="<font size=2><b>当前状态&nbsp;:&nbsp;</b>"+('on'==onlineStat?"<font color=green>在线</font>":"离线")+"<br/> <b>最新时间&nbsp;:&nbsp;</b>"+(node.lastedDataTimeStr==null?"无":node.lastedDataTimeStr)+"</b></font>";
	statusInfo.html(sInfo);
	if(node.assetId&&node.assetId!='0'){
		assetLink.attr("href","/pro_asset/assetInfo?assetId="+node.assetId);
		assetLink.show();
	}
	cables && $.each(cables, function(index, ts) {
		var type = ts.dataType;
		if (type == "PRFanController") {
			lockId = ts.id;
			if(ts.sstatus==1){
				fanstatus.html('<b>已开启</b>');
				fanImg.attr('src','../../../static/images/monitor/fan-run.gif');
				openCmd.hide();
				closeCmd.show();
			}else{
				fanstatus.html('<b>已关闭</b>');
				fanImg.attr('src','../../../static/images/monitor/fan-stop.png');
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
		}
	});
}

function sendFanCommand(cmdStr){
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