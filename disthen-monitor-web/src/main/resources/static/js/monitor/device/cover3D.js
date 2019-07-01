var timeout = 0;
var interval = 0;
var prefix = "pages/device/";
function updateCoverNode() {
	var id = $('#id').text();
	var rel;
	$.ajax({
        type: "GET",
        url: "/monitor/pages/device/deviceInfo/"+id+"/",
        async:false,
        success: function(data){
        	rel = data;
        }
    });
	var sInfo="<b>当前状态&nbsp;:&nbsp;</b>"+rel.status+"&nbsp;&nbsp; <b>最新时间&nbsp;:&nbsp;</b>"+rel.dataTime+"</b>";
	statusInfo.html(sInfo);
	var lock='1';
	var src=coverImg.attr('src');
	if(rel.lockStatus==1){
		 lock=value;
		 //lock_lock('lock');
		 if(src.indexOf("-on")!=-1)
		 	coverImg.attr('src',src.replace("-on","-off"));
		 coverDes.text('井盖锁关闭');
		 closeCmd.hide();
		 openCmd.show();
	}else{
		lock=value;
		//lock_unlock('lock');
		if(src.indexOf("-off")!=-1)
			coverImg.attr('src',src.replace("-off","-on"))
		coverDes.text('井盖锁开启');
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
	
	var src=leverImg.attr('src');
	if(rel.data.poleStatus=='1'){
		if(src.indexOf("-on")!=-1)
			leverImg.attr('src',src.replace("-on","-off"));
		leverDes.text('锁杆上锁');
	}else{
		if(src.indexOf("-off")!=-1)
			leverImg.attr('src',src.replace("-off","-on"));
		leverDes.text('锁杆打开');
	}
	
	if(rel.data!=""){
		if(lock!='1' && rel.lockStatus==1){//井盖在线并且不是关闭状态
			var z = parseInt(ts.z);
			var rot=(-(90+z)/180)*Math.PI;
			rot = rot.toFixed(1);
			coverAll.attr("rotation", "0 0 1 "+rot);
		}else{
			coverAll.attr("rotation", "0 0 0");
		}
		angelX.text(ts.x);
		angelY.text(ts.y);
		angelZ.text(ts.z);
	}

}

function sendCoverCommand(cmdStr){
	var cmd = 0;
	if('open'==cmdStr){
		//$("#password").textbox("setValue", "");
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
						//sendCoverCommands(id, cmd);
						sendCommand(1);
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
		 sendCommand(0);
		 //sendCoverCommands("1750", 0);
	}
	
};

/*function sendCoverCommands(lockId, cmd){
	$.ajax({
        type: "GET",
        url: "/pages/device/updateDeviceStatus/"+lockId+"/"+cmd+"",
        async:false,
        success: function(data){
        	if(data=="true"){
        		alert("操作成功！");
        	}else{
        		alert("操作失败！");
        	}
        }
    });
}*/

function updateCover(){
//	var selectedDevice=window.top.scopeToShare.selectedDoor;
//	updateDoorNode(selectedDevice);
	$.ajax({
        type: "GET",
        url: "/monitor/pages/device/deviceInfo/"+ids+"/",
        async:false,
        success: function(data){
        	if(data.lockStatus==0){
        		$("#openLink").css("display","none");
    			$("#closeLink").css("display","block");
    			$("#conver").attr("src","/monitor/img/cover/cover-on.png");
    			$("#lever").attr("src","/monitor/img/cover/cover-lever-on.gif");
    			var sInfo="<b>当前状态&nbsp;:&nbsp;</b>"+data.status+"&nbsp;&nbsp; <b>最新时间&nbsp;:&nbsp;</b>"+data.dataTime+"</b>";
    			statusInfo.html(sInfo);
        	}else{
        		$("#openLink").css("display","block");
    			$("#closeLink").css("display","none");
    			$("#conver").attr("src","/monitor/img/cover/cover-off.png");
    			$("#lever").attr("src","/monitor/img/cover/cover-lever-off.gif");
    			var sInfo="<b>当前状态&nbsp;:&nbsp;</b>"+data.status+"&nbsp;&nbsp; <b>最新时间&nbsp;:&nbsp;</b>"+data.dataTime+"</b>";
    			statusInfo.html(sInfo);
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
        			$("#conver").attr("src","/monitor/img/cover/cover-off.png");
        			$("#lever").attr("src","/monitor/img/cover/cover-lever-off.gif");
            	}else if(cmd == 1){
            		$("#openLink").css("display","none");
        			$("#closeLink").css("display","block");
        			$("#conver").attr("src","/monitor/img/cover/cover-on.png");
        			$("#lever").attr("src","/monitor/img/cover/cover-lever-on.gif");
            	}
        	}
        }
    });
};

var coverAll,angelX,angelY,angelZ,coverDes,leverDes,leverImg,openCmd,closeCmd,lockId,statusInfo,assetLink,coverImg;
var ids = "";
$(document).ready(function() {
	statusInfo=$("#statusInfo");
	coverAll=$("[DEF=cover_all]");
	angelX=$('.x-z');
	angelY=$('.y-x');
	angelZ=$('.z-y');
	coverDes=$('.cover3D>.-des');
	leverDes=$('.lever>.-des');
	leverImg=$('.lever>img');
	coverImg=$('.cover3d>img');
	openCmd=$("#openLink");
	closeCmd=$("#closeLink");
	assetLink=$("#assetLink");
	$('#box,#box canvas').width($('.cover3d').width());
		// $('#box,#box canvas').css('top',40);
		// $('#box,#box canvas').css('position','absolute');
		// $('#box,#box canvas').css('left',$('body').width()/2);
	ids = $("#id").text();
	$("#openLink").click(function(e){
		sendCoverCommand('open');
	});
	
	$("#closeLink").click(function(e){
		sendCoverCommand('close');
	});
	
	updateCover();//初始化
	clearInterval(interval);
	//定时刷新页面数据
	interval = setInterval(updateCover, 30000);
})
