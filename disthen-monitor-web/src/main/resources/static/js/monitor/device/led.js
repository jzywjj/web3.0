var assetLink,cardId,interval = 0,lockId,previewBtn,setInfoBtn,cleanBtn;
$(document).ready(function() {
	previewBtn =  $("#previewBtn");
	setInfoBtn =  $("#setInfoBtn");
	cleanBtn = $("#cleanBtn");
	assetLink = $("#assetLink");
	var LEDpreviewDiv = $('#LEDpreview');
	LEDpreviewDiv.css("width",document.documentElement.clientWidth*2/3); 
	LEDpreviewDiv.css('height',document.documentElement.clientHeight-150); 
	
	//clearInterval(interval);
	//定时刷新页面数据
	//interval = setInterval(updateLED, 5000);
});

function updateLED(){
	var selectedDevice=window.top.scopeToShare.selectedLED;
	cardId=window.top.scopeToShare.cardId;
	updateLEDNode(selectedDevice);
}

function updateLEDNode(node) {
	var cables = node.bindlogiccables;
	var onlineStat=node.onlineStat;
	if(node.assetId&&node.assetId!='0'){
		assetLink.attr("href","/pro_asset/assetInfo?assetId="+node.assetId);
		assetLink.show();
	}
	cables && $.each(cables, function(index, ts) {
		var type = ts.dataType;
		if (type == "LEDStatus") {
			lockId = ts.id;
		}
	});
	if('off'==onlineStat){//设备离线不显示按钮
		previewBtn.linkbutton('disable');
		setInfoBtn.linkbutton('disable');
		cleanBtn.linkbutton('disable');
		$("#disptext").text("");
	}else{
		previewBtn.linkbutton('enable');
		setInfoBtn.linkbutton('enable');
		cleanBtn.linkbutton('enable');
	}
}

function preview(){
	var textvalue = $("#textSelect").combobox("getValue") ;
	$("#disptext").text(textvalue);
}

function setInfo(){
	var textvalue = $("#textSelect").combobox("getValue") ;
	$("#disptext").text(textvalue);
	$.get("/mon_cmd/setDeviceInfoCommand?cableId="+lockId+"&info="+textvalue, function(result){
		alert(result.message);
	});
}

function clean(){
	$.get("/mon_cmd/setDeviceInfoCommand?cableId="+lockId+"&info=", function(result){
		alert(result.message);
		if(result.state==1){
			$("#disptext").text("");
		}
	});
}