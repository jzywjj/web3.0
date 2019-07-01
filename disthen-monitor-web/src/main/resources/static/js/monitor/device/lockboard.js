var assetLink,statusInfo,cardId,lockId,interval = 0,doorstatus,doorImgvar,safemodel = '';
$(document).ready(function() {
	safemodel = window.localStorage['safemodel'];
	lampstatus = $("#doorstatus");
	lampImg = $("#doorImg");
	openCmd=$("#openLink");
	closeCmd=$("#closeLink");
	statusInfo=$("#statusInfo");
	assetLink = $('#assetLink');
	updateDoor();//初始化
	clearInterval(interval);
	//定时刷新页面数据
	interval = setInterval(updateDoor, 3000);
	
});

function updateDoor(){
	var selectedDevice=window.top.scopeToShare.selectedDoor;
	updateDoorNode(selectedDevice);
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
		if (type == "DoorBLock") {
			lockId = ts.id;
			if(value=='0'){				
				lampstatus.html('<b>关闭</b>');
				lampImg.attr('src','../../../static/images/obord-off.png');
				closeCmd.hide();
				openCmd.show();
			}else{
				lampstatus.html('<b>打开</b>');
				lampImg.attr('src','../../../static/images/obord-on.png');
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

function sendCoverCommand(cmdStr){
	var cmd = 0;
	if('open'==cmdStr){
		 $('#addDialog').dialog({
				title : '请输入控制口令',
				buttons : [ {
					text : '确认',
					handler : function() {
						var pwd = $('#password').val();
						if(pwd==''){
							alert("口令不能为空！");
							return;
						}
						$('#addDialog').dialog('close');
						sendCoverCommands(lockId, cmd, 'checkCoverPassword', pwd)
					}
				}, {
					text : '取消',
					handler : function() {
						$('#addDialog').dialog('close');
					}
				} ]
			});
		 $('#addDialog').dialog('open');
	}else if('close'==cmdStr){
		 cmd = 1;
		 sendCoverCommands(lockId, cmd, '', '');
	}
	
};

function sendCoverCommands(lockId, cmd, type, pwd){
	$.get("/mon_cmd/sendCommand?cableId="+lockId+"&cmd="+cmd+'&type='+type+'&pwd='+pwd, function(result){
		//$.message.alert('温馨提示','hello', msg.message); 
		alert(result.message);
	});
}