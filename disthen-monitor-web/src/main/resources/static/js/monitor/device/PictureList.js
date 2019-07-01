
var cardId;
$(document).ready(function() {
	cardId = window.top.scopeToShare.cardId;
	var picImg = $("#picImg");
	
	$('#dg').datagrid({
		url : '/mon_pic/getPictrueList?cardId='+cardId,
		striped : true,
		fit : true,
		method : 'get',
		autoRowHeight : false,
		singleSelect:true,
		pagination : true,
		showRefresh : true,
		pagePosition : 'bottom',
		nowrap : true,
		collapsible : true,
		idField : 'id',
		fitColumns : true,
		rownumbers : true,
		pageSize : 20,
		onLoadError : function() {
			$.messager.alert("提示", "数据加载失败！", "info");
		},
		onLoadSuccess : function(data) {
			//alert(data.total);
			if(data.total > 0){
				$('#dg').datagrid("selectRow", 0);
				var row = data.rows[0];
				if(row.url!=null && row.url.length>0){
					picImg.attr('src',row.url+row.name);
				}else{
					picImg.attr('src',row.name);
				}
			}
		},
		onClickRow:function(xh,row){
			//alert(row.name);
			if(row.url!=null && row.url.length>0){
				picImg.attr('src',row.url+row.name);
			}else{
				picImg.attr('src',row.name);
			}
		}
	});
	
	
});