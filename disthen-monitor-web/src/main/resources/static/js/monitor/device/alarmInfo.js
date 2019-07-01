var cardId="",autoRefesh="false";
var eventypeMap = new Map();
$(document).ready(function() {
	if(window.top.scopeToShare && window.top.scopeToShare.cardId){
		cardId=window.top.scopeToShare.cardId;
	}
	autoRefesh = getQueryStr("autoRefesh");
	if(!cardId||cardId==null||cardId==""){//没有卡编号，试着从参数中获取
		cardId = getQueryStr("cardId");
	}
	
	$.post("/sys_dict/getDictListByType?type=CheckInfo","",function(res){
	     if (res && res.length>0){
	    	 var linkbtns = "";
	    	 for(var i in res){
	    		 var valStr=res[i].label;
	    		 var valId=res[i].value;
	    		 linkbtns+="<button type=button onclick=javascript:setCheckInfo('"+valId+"','"+valStr+"')>"+valStr+"</button>&nbsp;";
	    	 }
	    	 $('#ckinfo').html(linkbtns);
	     }
	});
	$.post("/sys_dict/getDictListByType?type=eventType","",function(res){
	     if (res && res.length>0){
	    	 for(var i in res){
	    		 var valStr=res[i].label;
	    		 var valId=res[i].value;
	    		 eventypeMap.put(valId, valStr);
	    	 }
	    	 $('#alarmInfo').datagrid({   
	    		url: '/mon_alarm/selectAlarmInfoPage?cardId='+cardId
	    	 });
	    	 if(autoRefesh&&autoRefesh=='true'){
	    			interval = setInterval(reloadInfo, 10000);
//	    			$('#alarmInfo').datagrid({
//	    				rowStyler: function(index,row){
//	    					return 'background-color:#a7aaac;color:#fff;';
//	    				}
//	    			});
	    	 }
	     }
	});
});

function setCheckInfo(idv,val){
	$('#confirm_checkInfo').val(idv);
	$('#confirm_content').textbox('setValue',val);
}

function reloadInfo(){
	$('#alarmInfo').datagrid('reload');  
}

function doSearch() {
	var startdd = $('#startdd').datebox('getValue');
	var enddd =   $('#enddd').datebox('getValue');
	var content =   $('#content').val();
	var sd=startdd==""?"":startdd+" 00:00:01";
	var ed=enddd==""?"":enddd+" 23:59:59";
	$('#alarmInfo').datagrid('reload','/mon_alarm/selectAlarmInfoPage?cardId='+cardId+'&sd='+sd+'&ed='+ed+'&sc='+content);
	//$('#explink').attr('href','/inbox/exportData?sinfo='+value); 
}

function formatAlertType(val,row){
    if (val==1){
    	return '<img title="这是'+eventypeMap.get(1)+'事件级别." src="../../../static/images/monitor/alert-red.png" height="20" width="20"></img>';
	} else if (val==2){
    	return '<img title="这是'+eventypeMap.get(2)+'事件级别."  src="../../../static/images/monitor/alert-orange.png" height="20" width="20"></img>';
	} else if (val==3){
    	return '<img title="这是'+eventypeMap.get(3)+'事件级别." src="../../../static/images/monitor/alert-yellow.png" height="20" width="20"></img>';
	} else if (val==4){
    	return '<img title="这是'+eventypeMap.get(4)+'事件级别." src="../../../static/images/monitor/alert-blue.png" height="20" width="20"></img>';
	} else {
		return val;
	}
}

function formatStatus(val,row){
	if (val && val!=''){
		return "<span><font color='black'>已处理</font></span>";
	}else{
		return "<span><font color='red'>未处理</font></span>";
	}
}

function editAlertInfo(){
    var row = $('#alarmInfo').datagrid('getSelected');
    if (row){
        $('#alertDlg').dialog('open').dialog('setTitle','确认告警');
        $('#checkfm').form('load',row);
       
    }else{
    	$.messager.alert('温馨提示','请选择一条事件进行确认！','question');
    }
}

function saveCheckInfo(){
	  $('#checkfm').form('submit',{
          url: '/mon_alarm/setAlarmComments',
          onSubmit: function(){
              return $(this).form('validate');
          },
          success: function(result){
              var result = eval('('+result+')');
              if (result.state==1){
                  $('#alertDlg').dialog('close');        // close the dialog
                  $('#alarmInfo').datagrid('reload');    // reload the user data
              } else {
                  $.messager.alert('温馨提示',result.message,'error');
              }
          }
      });
}
//格式化单元格提示信息  
function formatCellTooltip(value){  
    return "<span title='" + value + "'>" + value + "</span>";  
}  