var cardId;
$(document).ready(function() {
	cardId=window.top.scopeToShare.cardId;
	$('#eventHis').datagrid({   
		url: '/mon_his/selectHistoryEventPage?cardId='+cardId
	});	
});
			
function doSearch() {
	var startdd = $('#startdd').datebox('getValue');
	var enddd =   $('#enddd').datebox('getValue');
	if(!compareDate(startdd,enddd)){
		alert("查询结束时间不能小于开始时间！");
		return;
	}
	if(checkDate(startdd,enddd)){
		alert("暂时不支持跨月查询！");
		return;
	}
	var sd=startdd==""?"":startdd+" 00:00:01";
	var ed=enddd==""?"":enddd+" 23:59:59";
	$('#eventHis').datagrid('reload','/mon_his/selectHistoryEventPage?cardId='+cardId+'&sd='+sd+'&ed='+ed);
}
//格式化单元格提示信息  
function formatCellTooltip(value){  
    return "<span title='" + value + "'>" + value + "</span>";  
}  