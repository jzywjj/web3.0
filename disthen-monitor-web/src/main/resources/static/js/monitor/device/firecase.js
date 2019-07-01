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
		//alert(type+'--'+value);
		if (type == "FireModel") {
			lockId = ts.id;
			if(value=='0'){				
				lampstatus.html('<b>正常</b>');
				lampImg.attr('src','../../../static/images/fire-off.png');
			}else{
				lampstatus.html('<b>发现火情</b>');
				lampImg.attr('src','../../../static/images/fire-on.gif');
			}	
		}else if(type == "ExitFire"){
			if(value=='0'){
				closeCmd.hide();
				openCmd.show();
			}else{
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

function sendDoorCommand(cmdStr){
	var cmd = 0;
	if('close'==cmdStr){
		 cmd = 1;
		 sendDoorCommands(lockId, cmd, '', '')
	}else if('open'==cmdStr){
		cmd = 0;
		$('#addDialog').dialog({
			title : '请输入密码',
			buttons : [ {
				text : '确认',
				handler : function() {
					var pwd = $('#password').val();
					if(pwd==''){
						alert("密码不能为空！");
						return;
					}
					$('#addDialog').dialog('close');
					sendDoorCommands(lockId, cmd, 'checkPassword', pwd)
				}
			}, {
				text : '取消',
				handler : function() {
					$('#addDialog').dialog('close');
				}
			} ]
		});
		$('#addDialog').dialog('open');
	}
};

function sendDoorCommands(lockId, cmd, type, pwd){
	$.get("/mon_cmd/sendCommand?cableId="+lockId+"&cmd="+cmd+'&type='+type+'&pwd='+pwd, function(result){
		alert(result.message);
	});
}