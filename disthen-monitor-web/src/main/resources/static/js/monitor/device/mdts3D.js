var timeout = 0;
var interval = 0;
var data_time;
var statusInfo;
var assetLink;
//window.updateMDTS = function(node, delay) {
//	clearTimeout(timeout);
//	if (delay) {
//		setTimeout(function() {
//			updateMDTSNode(node);
//				}, delay);
//	} else {
//		updateMDTSNode(node);
//	}
//};

function updateMyMDTS(){
	//var selectedDevice=window.top.scopeToShare.selectedMDTS;
	//updateMDTSNode(selectedDevice);
	var ids = $("#id").text();
	$.ajax({
        type: "GET",
        url: "/monitor/pages/device/deviceInfo/"+ids+"/",
        async:false,
        success: function(data){
        	$("#statusInfo").text("当前状态："+data.status);
        	var temperatureA = "A相电流温度："+data.temperatureA;
        	var temperatureB = "B相电流温度："+data.temperatureB;
        	var temperatureC = "C相电流温度："+data.temperatureC;
        	$("#axiang").text(temperatureA);
        	$("#bxiang").text(temperatureB);
        	$("#cxiang").text(temperatureC);
        }
    });
}

function updateMDTSNode(node) {
	if(node){
		 var onlineStat=node.onlineStat;
		 var sInfo="<font size=2><b>当前状态&nbsp;:&nbsp;</b>"+('on'==onlineStat?"<font color=green>在线</font>":"离线")+"&nbsp;<b>最新时间&nbsp;:&nbsp;</b>"+(node.lastedDataTimeStr==null?"无":node.lastedDataTimeStr)+"</b></font>";
		 statusInfo.html(sInfo);
		 if(node.assetId&&node.assetId!='0'){
			assetLink.attr("href","/pro_asset/assetInfo?assetId="+node.assetId);
			assetLink.show();
		 }
		 if(data_time != node.lastedDataTimeStr){
			var cables = node.bindlogiccables;
			$('.MDTS_texture').each(function(index){
				var ts=$(this);
				var cable=cables[index];
				if(cable){
					var vals = cable.value;
					ts.attr('url','/mon_index/mdtsImg?vals='+vals+'&timer='+new Date().getTime());			
				}
			});
		 }
		 data_time = node.lastedDataTimeStr;
	}
}

$(document).ready(function() {
	$('#box,#box canvas').height(document.documentElement.clientHeight-20);
	$('#box,#box canvas').width(document.documentElement.clientWidth);
	statusInfo = $("#statusInfo");
	assetLink = $("#assetLink");
	statusInfo.height(20);
	//debugger;
	updateMyMDTS();
	//updateMyMDTS();//初始化
	//clearInterval(interval);
	//定时刷新页面数据
	//interval = setInterval(updateMyMDTS, 5000);
});