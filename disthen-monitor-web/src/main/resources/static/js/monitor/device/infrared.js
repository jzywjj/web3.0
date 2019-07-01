var assetLink,statusInfo,cardId,lockId,interval = 0,infraredstatus,infraredImg;
var ids = "";
$(document).ready(function() {
	infraredstatus = $("#infraredstatus");
	infraredImg = $("#infraredImg");
	statusInfo = $("#statusInfo");
	assetLink = $("#assetLink");
	
	ids = $("#id").text();
	
	updateInfrared();//初始化
	clearInterval(interval);
	//定时刷新页面数据
	interval = setInterval(updateInfrared, 30000);
	
});

function updateInfrared(){
	//var selectedDevice=window.top.scopeToShare.selectedInfrared;
	//updateInfraredNode(selectedDevice);
	$.ajax({
        type: "GET",
        url: "/monitor/pages/device/deviceInfo/"+ids+"/",
        async:false,
        success: function(data){
        	var infraredStatus = data.infraredStatus;
        	$("#statusInfo").text("当前状态："+data.status);
        	$("#infraredstatus").text(data.infraredStatus==0?"报警":"正常");
        }
    });
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
		if (type == "InfraredController") {
			lockId = ts.id;
			if(value=='0'){
				infraredstatus.html('<b><font color=red>告警</font></b>');
				infraredImg.attr('src','../../../static/images/monitor/IR_alarm.png');
			}else{
				infraredstatus.html('<b>正常</b>');
				infraredImg.attr('src','../../../static/images/monitor/IR_normal.png');
			}
		}
	});
}
