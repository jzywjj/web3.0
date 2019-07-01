var assetLink,statusInfo,cardId,lockId,interval = 0,doorstatus,doorImgvar,safemodel = '';
var ids = "";
$(document).ready(function() {
	safemodel = window.localStorage['safemodel'];
	lampstatus = $("#doorstatus");
	lampImg = $("#doorImg");
	openCmd=$("#openLink");
	closeCmd=$("#closeLink");
	statusInfo=$("#statusInfo");
	assetLink = $('#assetLink');
	
	ids = $("#id").text();
	
	$("#openLink").click(function(e){
		sendCommand(1);
	});
	
	$("#closeLink").click(function(e){
		sendCommand(0);
	});
	
	updateDoor();//初始化
	
	clearInterval(interval);
	//定时刷新页面数据
	interval = setInterval(updateDoor, 30000);
	
});

function updateDoor(){
//	var selectedDevice=window.top.scopeToShare.selectedDoor;
//	updateDoorNode(selectedDevice);
	$.ajax({
        type: "GET",
        url: "/monitor/pages/device/deviceInfo/"+ids+"/",
        async:false,
        success: function(data){
        	$("#statusInfo").text("当前状态："+data.status);
        	$("#doorstatus").text(data.doorstatus==0?"已关闭":"已开启");
        	if(data.doorStatus == 1){
    			$("#openLink").css("display","block");
    			$("#closeLink").css("display","none");
        	}else if(data.doorStatus == 0){
        		$("#openLink").css("display","none");
    			$("#closeLink").css("display","block");
        	}
        }
    });
}

function updateDoorNode(node) {
	var cables = node.bindlogiccables;
	var onlineStat=node.onlineStat;
	
	var sInfo="<font size=2><b>当前状态&nbsp;:&nbsp;</b>"+('on'==onlineStat?"<font color=green>在线</font>":"离线")+"<br/> <b>最新时间&nbsp;:&nbsp;</b>"+(node.lastedDataTimeStr==null?"无":node.lastedDataTimeStr)+"</b></font>";
	statusInfo.html(sInfo);
	if(node.assetId&&node.assetId!='0'){
		assetLink.attr("href","/pro_asset/assetInfo?assetId="+node.assetId);
		assetLink.show();
	}
	
	cables && $.each(cables, function(index, ts) {
		var type = ts.dataType, value = ts.value;
		if (type == "DoorLock") {
			lockId = ts.id;
			if(value=='0'){				
				lampstatus.html('<b>关闭</b>');
				lampImg.attr('src','../../../static/images/monitor/door-close.png');
				closeCmd.hide();
				openCmd.show();
			}else{
				lampstatus.html('<b>打开</b>');
				lampImg.attr('src','../../../static/images/monitor/door-open.png');
				openCmd.hide();
				closeCmd.show();
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

function sendCommand(cmd){
	$.ajax({
        type: "GET",
        url: "/monitor/pages/device/updateDeviceStatus/"+ids+"/"+cmd+"/",
        async:false,
        success: function(data){
        	if(data == "true"){
        		if(cmd == 0){
        			$("#openLink").css("display","block");
        			$("#closeLink").css("display","none");
            	}else if(cmd == 1){
            		$("#openLink").css("display","none");
        			$("#closeLink").css("display","block");
            	}
        	}
        }
    });
};