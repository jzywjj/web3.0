var timeout = 0;
var interval = 0;
var safemodel = '';
var obordImg = $("#oboard-off");
function updateMyCover(){
	var selectedDevice=window.top.scopeToShare.selectedCover;
	//var CoverData = $("#CoverData");//,parent.document
	//var CoverData = $("#CoverData",parent.document);
	//var element = parent.angular.element(CoverData);
	//var ctl=element.controller;
	//var parentScope=element.scope;
	//var d = parentScope.selectedDevice;
	//svar scope=element.scope();
	//scope.$apply(function(){
	//	scope.jQBtnClick();
	//});
	updateCoverNode(selectedDevice);
}

function updateCoverNode(node) {
	var cables = node.bindlogiccables;
	var onlineStat=node.onlineStat;
	
	var sInfo="<b>当前状态&nbsp;:&nbsp;</b>"+('on'==onlineStat?"<font color='green'>在线</font>":"离线")+"&nbsp;&nbsp; <b>最新时间&nbsp;:&nbsp;</b>"+(node.lastedDataTimeStr==null?"无":node.lastedDataTimeStr)+"</b>";
	statusInfo.html(sInfo);
	if(node.assetId&&node.assetId!='0'){
		assetLink.attr("href","/pro_asset/assetInfo?assetId="+node.assetId);
		assetLink.show();
	}
	var lock='1';
	cables && $.each(cables, function(index, ts) {
		var type = ts.dataType, value = ts.value;
				if (type == "CoverBLock") {
					lockId = ts.id;
					if(value=='1'){
						 lock=value;
						 lock_lock('lock');
						 coverDes.text('盖板关闭');
						 obordImg.attr('src','../static/images/obord-off.png');
						 closeCmd.hide();
						 openCmd.show();
					}else{
						lock=value;
						lock_unlock('lock');
						coverDes.text('盖板开启');
						obordImg.attr('src','../static/images/obord-on.png');
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
				} else if (type == "CoverBPole") {
					var src=leverImg.attr('src');
					if(value=='1'){
						if(src.indexOf("-on")!=-1)leverImg.attr('src',src.replace("-on","-off"))
						leverDes.text('锁杆上锁');
					}else{
						if(src.indexOf("-off")!=-1)leverImg.attr('src',src.replace("-off","-on"))
						leverDes.text('锁杆打开');
					}
				} else if (type == "CoverBCvolt") {

				} else if (type == "CoverBAngle") {
					if(ts.z){
						if(lock!='1' && 'on'==onlineStat){//井盖在线并且不是关闭状态
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
				} else if (type == "CoverBIntensity") {

				} else if (type == "CoverBMotorCurrent") {

				} else if (type == "CoverBMotor") {

				}
			});
}

function sendCoverCommand(cmdStr){
	var cmd = 0;
	if('open'==cmdStr){
		$("#password").textbox("setValue", "");
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
						sendCoverCommands(lockId, cmd, 'checkCoverPassword', pwd);
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

var coverAll,angelX,angelY,angelZ,coverDes,leverDes,leverImg,openCmd,closeCmd,lockId,statusInfo,assetLink;
$(document).ready(function() {
	safemodel = window.localStorage['safemodel'];
	statusInfo=$("#statusInfo");
	coverAll=$("[DEF=cover_all]");
	angelX=$('.x-z');
	angelY=$('.y-x');
	angelZ=$('.z-y');
	coverDes=$('.cover3D>.-des');
	leverDes=$('.lever>.-des');
	leverImg=$('.lever>img');
	openCmd=$("#openLink");
	closeCmd=$("#closeLink");
	assetLink=$("#assetLink");
	// $('#box,#box canvas').height($('body').height());
	$('#box,#box canvas').width($('.cover3d').width());
		// $('#box,#box canvas').css('top',40);
		// $('#box,#box canvas').css('position','absolute');
		// $('#box,#box canvas').css('left',$('body').width()/2);
	updateMyCover();//初始化
	clearInterval(interval);
	//定时刷新页面数据
	interval = setInterval(updateMyCover, 3000);
})
function cover_close(id) {
	cover = $("[DEF=" + id + "]");
	cover.attr("translation", "0 0 0");
	cover.attr("rotation", "0 0 0 0");
}
function cover_open(id) {
	cover = $("[DEF=" + id + "]");
	cover.attr("translation", "0 20 0");
	cover.attr("rotation", "1 0 0 -0.7");
}
function lever_lock(id) {
	lever = $("[DEF=" + id + "]");
	lever_color = $("[DEF=" + id + "_color]");
	lever_color.attr("diffuseColor", "0 1 0");
	lever.attr("translation", "0 10 0");
}
function lever_unknown(id) {
	lever = $("[DEF=" + id + "]");
	lever_color = $("[DEF=" + id + "_color]");
	lever_color.attr("diffuseColor", "1 0 0");
	lever.attr("translation", "0 10 0");
}
function lever_unlock(id) {
	lever = $("[DEF=" + id + "]");
	lever_color = $("[DEF=" + id + "_color]");
	lever_color.attr("diffuseColor", "0 0 1");
	lever.attr("translation", "0 0 0");
}

function lock_lock(id) {
	lock = $("[DEF=" + id + "]");
	lock_color = $("[DEF=" + id + "_color]");
	lock_color.attr("diffuseColor", "0 1 0");
	lock.attr("translation", "0 0 0");
}
function lock_rmunlock(id) {
	lock = $("[DEF=" + id + "]");
	lock_color = $("[DEF=" + id + "_color]");
	lock_color.attr("diffuseColor", "0 0 1");
	lock.attr("translation", "0 10 0");
}

function lock_unlock(id) {
	lock = $("[DEF=" + id + "]");
	lock_color = $("[DEF=" + id + "_color]");
	lock_color.attr("diffuseColor", "1 0 0");
	lock.attr("translation", "0 10 0");
}