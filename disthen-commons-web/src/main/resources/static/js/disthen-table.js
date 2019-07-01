var ojbk = null;
var dicValue = null;
var rules = null;
var id,linkUrl,showParam;
$.disthenInitTable = function (ids,linkUrls,params,showParams,sort,dict) {
	if($.common.isEmpty(ids) || $.common.isEmpty(linkUrls) || showParams == null){
		$.modal.alertError("表格唯一标志、请求链接、显示参数不能为空");
	}
	id = ids;
	linkUrl = linkUrls;
	showParam = showParams;
	dicValue = $.getDicType(dict);
 	ojbk = params;
 	var options = {
 			id:id,
	        url: linkUrl,
	        removeUrl:linkUrl+"/remove",
	        search: false,
	        showSearch:false,
	        escape: true,
	        showColumns: true,
	        onCheck:function(row){
	        	var a= $("#"+id).bootstrapTable('getSelections');
	        	if(a.length == 1){
		        	var str = '<a class="btn btn-info" data-toggle="modal" data-target=".addTableModal'+id+'" onclick="addTable()">'+
								'<i class="fa fa-plus"></i> 新增'+
								'</a>'+
								'<a class="btn btn btn-primary" data-toggle="modal" data-target=".addTableModal'+id+'" onclick="editTable(\''+id+'\')">'+
									'<i class="fa fa-edit"></i> 修改'+
								'</a>'+
								'<a class="btn btn-danger" onclick="deleteTable(\''+id+'\')">'+
									'<i class="fa fa-remove"></i> 删除'+
								'</a>';
		        	$("#"+id+"Toolbar").html(str);
	        	}else{
	        		var str = '<a class="btn btn-info" data-toggle="modal" data-target=".addTableModal'+id+'" onclick="addTable()">'+
					'<i class="fa fa-plus"></i> 新增'+
					'</a>'+
					'<a class="btn btn btn-primary disabled" onclick="editTable()">'+
						'<i class="fa fa-edit"></i> 修改'+
					'</a>'+
					'<a class="btn btn-danger" onclick="deleteTable(\''+id+'\')">'+
						'<i class="fa fa-remove"></i> 删除'+
					'</a>';
    				$("#"+id+"Toolbar").html(str);
	        	}
                
            },
            onUncheck:function(row){
            	var a= $("#"+id).bootstrapTable('getSelections');
	        	if(a.length == 1){
                	var str = '<a class="btn btn-info" data-toggle="modal" data-target=".addTableModal'+id+'" onclick="addTable()">'+
					'<i class="fa fa-plus"></i> 新增'+
					'</a>'+
					'<a class="btn btn btn-primary" data-toggle="modal" data-target=".addTableModal'+id+'" onclick="editTable(\''+id+'\')">'+
						'<i class="fa fa-edit"></i> 修改'+
					'</a>'+
					'<a class="btn btn-danger" onclick="deleteTable(\''+id+'\')">'+
						'<i class="fa fa-remove"></i> 删除'+
					'</a>';
                	$("#"+id+"Toolbar").html(str);
	        	}else if(a.length > 1){
	        		var str = '<a class="btn btn-info" data-toggle="modal" data-target=".addTableModal'+id+'" onclick="addTable()">'+
					'<i class="fa fa-plus"></i> 新增'+
					'</a>'+
					'<a class="btn btn btn-primary disabled" onclick="editTable()">'+
						'<i class="fa fa-edit"></i> 修改'+
					'</a>'+
					'<a class="btn btn-danger" onclick="deleteTable(\''+id+'\')">'+
						'<i class="fa fa-remove"></i> 删除'+
					'</a>';
                	$("#"+id+"Toolbar").html(str);
	        	}else{
	        		var str = '<a class="btn btn-info" data-toggle="modal" data-target=".addTableModal'+id+'" onclick="addTable()">'+
					'<i class="fa fa-plus"></i> 新增'+
					'</a>'+
					'<a class="btn btn btn-primary disabled" onclick="editTable()">'+
						'<i class="fa fa-edit"></i> 修改'+
					'</a>'+
					'<a class="btn btn-danger disabled" onclick="deleteTable()">'+
						'<i class="fa fa-remove"></i> 删除'+
					'</a>';
                	$("#"+id+"Toolbar").html(str);
	        	}
            },
	        queryParams:queryParams
	    };
 	if(sort != null && sort != ""){
     	var str = sort.split("#");
     	options.sortName=str[0];
     	options.sortOrder=str[1];
 	}
	var columns = getColumns(showParam);
	options.columns=columns;
	$.table.init(options);
 	
 	rules = getRules(showParam);
 	$("#addForm"+id).validate({
         rules:rules
     });
 	
 	showQuery(showParam);
};

$(function () {
 	$('#addSave').click(function() {
 		if($.validate.form("addForm"+id)){
 			$.operate.save(linkUrl + "/add", $('#addForm'+id).serialize(),id);
 			$(".addTableModal"+id).modal("hide");
 		} 
	});
});

//添加
function addTable(){
	var str ="";
	for(var i = 0; i < showParam.length; i++){
		if(showParam[i].field == "id"){
			continue;
		}
		if(showParam[i].type == "String"){
			str += '<div class="form-group">'+
	 					'<label class="col-sm-3 control-label">'+showParam[i].title+':</label>'+
	 					'<div class="col-sm-8">'+
	 						'<input class="form-control" type="text" name="'+showParam[i].field+'" id="'+showParam[i].field+'">'+
	 					'</div>'+
					'</div>';
		}else if(showParam[i].type == "Number"){
			str += '<div class="form-group">'+
						'<label class="col-sm-3 control-label">'+showParam[i].title+':</label>'+
						'<div class="col-sm-8">'+
							'<input class="form-control" type="number" name="'+showParam[i].field+'" id="'+showParam[i].field+'">'+
						'</div>'+
					'</div>';
		}else if(showParam[i].type.indexOf("#")!=-1){
			str += '<div class="form-group">'+
			'<label class="col-sm-3 control-label">'+showParam[i].title+':</label>'+
			'<div class="col-sm-8">'+
				'<select id="'+showParam[i].field+'" name="'+showParam[i].field+'" class="form-control m-b">';
		    if(showParam[i].required == false){
		    	str += '<option value=""></option>';
		    }
			for(let j in dicValue){
				if(showParam[i].type.indexOf(dicValue[j].dictType) != -1){
					str += '<option value="'+dicValue[j].dictValue+'">'+dicValue[j].dictLabel+'</option>';
				}
			}	
			str += '</select>'+
				'</div>'+
			'</div>';
		}else if(showParam[i].type == "Date" || showParam[i].type == "Time"){
			str += '<div class="form-group">'+
			'<label class="col-sm-3 control-label">'+showParam[i].title+':</label>'+
			'<div class="col-sm-8">'+
				'<input type="text" class="time-input" autocomplete="off" readonly id="'+showParam[i].field+'" placeholder="'+showParam[i].title+'" name="'+showParam[i].field+'" />'+
			'</div>'+
			'</div>';
		}
	}
	$("#myModalLabel"+id).html("添加");
	$("#addForm"+id).html(str);
}

//修改
function editTable(tableId){
	var select= $("#"+tableId).bootstrapTable('getSelections');
	$("#myModalLabel"+id).html("编辑");
	var str = ' <input name="id" id="id" type="hidden" value="'+select[0].id+'" />';
	for(var i = 0; i < showParam.length; i++){
		if(showParam[i].field == "id"){
			continue;
		}
		if(showParam[i].type == "String"){
			str += '<div class="form-group">'+
			'<label class="col-sm-3 control-label">'+showParam[i].title+':</label>'+
			'<div class="col-sm-8">'+
				'<input class="form-control" type="text" name="'+showParam[i].field+'" id="'+showParam[i].field+'" value="'+select[0][showParam[i].field]+'">'+
			'</div>'+
			'</div>';
		}else if(showParam[i].type == "Number"){
			str += '<div class="form-group">'+
			'<label class="col-sm-3 control-label">'+showParam[i].title+':</label>'+
			'<div class="col-sm-8">'+
				'<input class="form-control" type="number" name="'+showParam[i].field+'" id="'+showParam[i].field+'" value="'+select[0][showParam[i].field]+'">'+
			'</div>'+
			'</div>';
		}else if(showParam[i].type.indexOf("#")!=-1){
			str += '<div class="form-group">'+
			'<label class="col-sm-3 control-label">'+showParam[i].title+':</label>'+
			'<div class="col-sm-8">'+
				'<select id="'+showParam[i].field+'" name="'+showParam[i].field+'" class="form-control m-b">';
 				if(showParam[i].required == false){
			    	str += '<option value=""></option>';
			    }
 				for(let j in dicValue){
 					if(showParam[i].type.indexOf(dicValue[j].dictType) != -1){
 						if(dicValue[j].dictValue == select[0][showParam[i].field]){
 							str += '<option value="'+dicValue[j].dictValue+'" selected>'+dicValue[j].dictLabel+'</option>';
 						}else{
 							str += '<option value="'+dicValue[j].dictValue+'">'+dicValue[j].dictLabel+'</option>';
 						}
 					}
 				}	
			str += '</select>'+
				'</div>'+
			'</div>';
		}else if(showParam[i].type == "Date" || showParam[i].type == "Time"){
			var date = select[0][showParam[i].field];
			if(date != null && date != ""){
				var d = new Date(date);
				date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
			}else{
				date = "";
			}
			str += '<div class="form-group">'+
			'<label class="col-sm-3 control-label">'+showParam[i].title+':</label>'+
			'<div class="col-sm-8">'+
				'<input type="text" class="time-input" autocomplete="off" readonly id="'+showParam[i].field+'" name="'+showParam[i].field+'" value="'+date+'"/>'+
			'</div>'+
			'</div>';
		}
	}
	$("#addForm"+id).html(str);
}

//删除
function deleteTable(tableId){
	var select= $("#"+tableId).bootstrapTable('getSelections');
	$.operate.removeAll()
}

//显示参数的封装
function getColumns(showParam){
	var columns = [{checkbox:true}];
	for(var i = 0; i < showParam.length; i++){
		var param = {};
 		for(var key in showParam[i]){
 			if(key == "type"){
 				if(showParam[i][key].indexOf("#")!=-1){
 					param.formatter=function(value) {
	 					 return $.table.selectDictLabel(dicValue, value);
                    }
 				}else if(showParam[i][key] == "Date"||showParam[i][key] == "Time"){
 					param.formatter=function(value) {
 						if(value == null || value == ""){
 							return "";
 						}
                        var d = new Date(value);
                        var str=d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日 ';
                        if(value.length > 10){
                        	str += d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
                        }
                        return str;
                    }
 				}
 			}else{
	 			param[key]=showParam[i][key];
 			}
 		}
 		columns.push(param);
	}
	return columns;
}

//封装校验参数
function getRules(showParam){
	var rule = {};
	for(var i = 0; i < showParam.length; i++){
		if(showParam[i].required == true){
			rule[showParam[i]["field"]]={
				required:true	
			}
		}
	}
	return rule;
}

//显示查询参数的封装
function showQuery(showParam){
	var str = "<ul>";
	for(var i = 0; i < showParam.length; i++){
		if(showParam[i].query == true){
			if(showParam[i].type == "String"){
				str += '<li>'+
						showParam[i].title+'：<input type="text" name="'+showParam[i].field+'"/>'+
						'</li>';
			}else if(showParam[i].type == "Number"){
				str += '<li>'+
				showParam[i].title+'：<input type="number" name="'+showParam[i].field+'"/>'+
				'</li>';
			}else if(showParam[i].type.indexOf("#")!=-1){
				str += '<li>'+showParam[i].title+'：<select id="'+showParam[i].field+'" name="'+showParam[i].field+'">';
				str += '<option value="">所有</option>';
				for(var j = 0; j < dicValue.length; j++){
 					if(showParam[i].type.indexOf(dicValue[j].dictType) != -1){
 						str += '<option value="'+dicValue[j].dictValue+'">'+dicValue[j].dictLabel+'</option>';
 					}
 				}	
				str +='</select></li>';
			}else if(showParam[i].type == "Date" || showParam[i].type == "Time"){
				str += '<li class="select-time">'+
							'<label>'+showParam[i].title+'： </label>'+
							'<input type="text" class="time-input" autocomplete="off" readonly id="'+showParam[i].field+'" placeholder="'+showParam[i].title+'" name="'+showParam[i].field+'"/>'+
						'</li>';
			}
			if(i == showParam.length-1){
				str += '<li>'+
				'<a class="btn btn-primary btn-rounded btn-sm" onclick="$.table.search(\''+'online-form'+id+'\')"><i class="fa fa-search"></i>&nbsp;搜索</a>'+
				'<a class="btn btn-warning btn-rounded btn-sm" onclick="$.form.reset(\''+'online-form'+id+'\')"><i class="fa fa-refresh"></i>&nbsp;重置</a>'+
				'</li>';
			}
		}
	}
	str += "</ul>"
	$("#selectList"+id).html(str);
}

//入参的封装
function queryParams(params) {
	var param = {
		size:       params.limit,
		page:        params.offset / params.limit,
		sort:  params.sort+","+params.order
	};
	for(var key in ojbk){
		param[key]=ojbk[key];
	}
	return param;
}