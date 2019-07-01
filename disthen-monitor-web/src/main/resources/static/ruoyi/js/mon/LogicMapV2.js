$(document).ready(function() {
	myContainer = $("#myContainer");
	mainContainer = $("#mainContainer");
	$('.left').dialog({
		  title:'逻辑设备',
		  modal:false,
		  closable:false,
		  collapsible:true,
		  height:300
	});
	
	$('#inputFile').filebox({
		   buttonText: '选择图片',
		   buttonAlign: 'right',
		   accept: 'image/jpeg,image/x-png',
		   onChange:function(newValue,oldValue){
	       		if(newValue!=''){
	           		var extend = newValue.substring(newValue.lastIndexOf(".")+1);
	           		if("jpg"!=extend&&"png"!=extend){
	           			alert("只支持图片(.jpg,.png)文件格式的导入，请重新导入！");
	           			$('#inputFile').filebox('setValue','');
	           		}
	           	}
           }
	});

	$("#tunnel").combotree({
	        onChange:function(newValue, oldValue){
	        	if(newValue!=oldValue){
		             var selectedValue = $("#tunnel").combotree('tree').tree('getSelected');
		             if(selectedValue.dataType==null || selectedValue.dataType ==''){
		            	 $.messager.alert('提示','请选择隧道、回路、配电室、配电网节点');
		            	 return false;
		             }	             
		             selectedTunnelId = selectedValue.id;
		             if(selectedValue.picture!=null&&selectedValue.picture!=''){
		            	 $("#bgimg").attr('src',selectedValue.picture); 
		             }else{
		            	 $("#bgimg").attr('src',''); 
		            	 initialGroups(selectedTunnelId,false);
		            	 setImgLocation();
		             }
	        	}
	        }
	 });
	
	 $("#bgimg").load(function(){
  	       initialGroups(selectedTunnelId,true);
	 });
});


var items = new Array();/**存储配置过的数据点**/
var groups = new Array();/**存储所有的设备分组信息**/
var selectedTunnelId;
var topOffset=51;
var leftOffset=1;
var myContainer; 
var mainContainer;
var targetLeft;
var targetTop;

/** 初始化窗口中的信息**/
function initailDraggable(){
	 var lng=$('#device').accordion("panels").length;
	 for(var i = 0; i < lng ;i++){
		 $('#device').accordion('remove',0);
	 }
	 var htmlStr = "";
	 for(var i in groups){
//	 for(var i=0;i<10;i++){
		 var g=groups[i];	
//		 var childdiv=$("<div></div>");    //创建一个子div
//		 var table=$("<table></table>");
//		 table.appendTo(childdiv);
//		 var cables = g.bindlogiccables;
//		 if(cables && cables.length>0){
//			 for(var j = 0; j < cables.length; j++) {
//				var cb = cables[j];
//			    var tr=$("<tr></tr>");
//			    tr.appendTo(table);
//			    var td=$("<td align='center'></td>");
//			    td.appendTo(tr);
//			    if(cb.myUI && cb.myUI.uiLeft!=''){
//			    	 var item = $("<div class='item'>"+cb.name+"</div>");
//			    	 item.addClass('sditem');
//					 item.attr('id', cb.id);   //给子div设置id
//					 item.appendTo(td);
//					 
//					 /**创建在设备图上配置过的数据点**/
//					 var citem = $("<div id='"+ cb.id+"' title='"+g.name+"-"+cb.name+"' ></div>");
//					 citem.attr('uiValid', cb.myUI.uiValid);
//					 citem.attr('uiLeft', cb.myUI.uiLeft);
//					 citem.attr('uiTop', cb.myUI.uiTop);
//					 items.push(citem);
//					 
//			    }else{
//			    	 var item = $("<div class='item'>"+cb.name+"</div>");
//					 item.attr('id', cb.id);   //给子div设置id
//					 item.attr('title', g.name+"-"+cb.name);   //给子div设置id
//					 item.appendTo(td);
//			    }
//			}
//	 	 }
		 var cables = g.bindlogiccables;
		 var childdiv="<div><table>";    //创建一个子div
		 if(cables && cables.length>0){
			 for(var j = 0; j < cables.length; j++) {
				 var cb = cables[j];
				 if(cb.myUI && cb.myUI.uiLeft!=''){
			         childdiv += "<tr><td align='center' ><div class='sditem' id='"+cb.id+"'>"+cb.name+"</div></td></tr>"
			         /**创建在设备图上配置过的数据点**/
			         var citem = $("<div id='"+ cb.id+"' title='"+g.name+"-"+cb.name+"' ></div>");
					 citem.attr('uiValid', cb.myUI.uiValid);
					 citem.attr('uiLeft', cb.myUI.uiLeft);
					 citem.attr('uiTop', cb.myUI.uiTop);
					 items.push(citem);
				 }else{
					 childdiv += "<tr><td align='center' ><div class='item' id='"+cb.id+"' title='"+g.name+"-"+cb.name+"'>"+cb.name+"</div></td></tr>"
				 }
			 }
		 }
		 childdiv += "</table></div>"; 
		 //htmlStr += "<div title='"+g.name+"' data-options='selected:false'>"+childdiv+"</div>";
		 htmlStr += "<div title='"+g.name+"' data-options='selected:false' style='background-color:#6CAEF5'>"+g.name+"</div>"+childdiv;
//		$('#device').accordion('add', {
//			title: g.name,
//			content: childdiv,
//			selected: false
//		});

	}
	//alert(htmlStr);
//	 var tbody=document.getElementById('device'); 
//	 tbody.innerHTML = htmlStr;
//	 $('#device').accordion('destroy');
	$('#device').html(htmlStr);
//	$("#device").accordion();
//	$('#device').append(htmlStr);
//	$("#device").accordion("option","collapsible",true);
//	 $("#device").accordion("refresh"); 
	 
	 
	$('.left .easyui-accordion .item').draggable({
		revert:true,
		proxy:'clone',
		onDrag:function(e){
			console.info("onDrag:"+ e.clientX+" "+ e.clientY);
			targetLeft = e.clientX;
			targetTop = e.clientY;
		},
		onStopDrag:function(e){
			console.info("onStopDrag:"+ e.clientX+" "+ e.clientY);
		}
	});
	
	$('.left .easyui-accordion .sditem').draggable({
		revert:true,
		proxy:'clone',
		onDrag:function(e){
			console.info("onDrag:"+ e.clientX+" "+ e.clientY);
			targetLeft = e.clientX;
			targetTop = e.clientY;
		},
		onStopDrag:function(e){
			console.info("onStopDrag:"+ e.clientX+" "+ e.clientY);
			
		}
	});
}
/**配置Droppable**/
function initailDroppable(){
	$('.right .item').draggable({
		revert:false,
		onDrag:function(e){
			console.info("onDrag:"+ e.clientX+" "+ e.clientY);
			targetLeft = e.clientX;
			targetTop = e.clientY;
		},
		onStopDrag:function(e){
			console.info("onStopDrag:"+ e.clientX+" "+ e.clientY);
		}
	});
	
	$('.right').droppable({
		onDragEnter:function(e,source){
			$(this).addClass('over');
		},
		onDragOver:function(e,source){
			//$(this).removeClass('over');
		},
		onDragLeave:function(e,source){
			$(this).addClass('over');
		},
		onDrop:function(e,source){
			$(this).removeClass('over');
			if($(source).hasClass('assigned')||$(source).hasClass('item')
					||$(source).hasClass('sditem')||$(source).hasClass('valid')){
				var containerScrollTop = mainContainer.scrollTop();  
				var containerScrollLeft = mainContainer.scrollLeft();
				
				if ($(source).hasClass('assigned') ||$(source).hasClass('valid')){//在窗口外面的拖拽
				} else {//从窗口中进行拖拽
					var c;
					if($(source).hasClass('sditem')){
						var idv=$(source).attr("id");
						for(var i in items){
							if(idv ==items[i].attr("id")){
								c = items[i];
								break;
							}
						}
						var uiValid=c.attr("uiValid");
						if(uiValid==0){
							c.attr('uiValid', 1);
							c.removeClass('valid');
							c.addClass('assigned');
						}
					}else if($(source).hasClass('item')){
						var idv=$(source).attr("id");
						var title=$(source).attr("title");
						var c = $("<div id='"+idv+"' title='"+title+"' ></div>");
						c.attr('uiValid', 1);
						c.addClass('item');
						c.addClass('assigned');
						items.push(c);
						c.appendTo(myContainer);
					}
					
					c.css('position','absolute');
					c.css('margin-left',targetLeft+containerScrollLeft-leftOffset);
					c.css('margin-top',targetTop+containerScrollTop-topOffset);
					if($(source).hasClass('item')){
						$(source).removeClass('item');
						$(source).addClass('sditem');
					}
					c.draggable({
						revert:false
					});
				}
			}
		}
	});
}

function setImgLocation(){
	var docWidth = $("#bgimg").width();
	var docHeight = $("#bgimg").height();
	myContainer.css("width",docWidth); 
	myContainer.css('height',docHeight); 
	myContainer.empty();
	
    $(".right").css("margin-top",-docHeight);
}

/**初始化配置过的点**/
function initialSet(){
	if(items && items.length>0){
		for(var z=0;z<items.length;z++){
			var citem = items[z];
			citem.css('position','absolute');
			citem.css('margin-left',parseInt(citem.attr("uiLeft")));
			citem.css('margin-top',parseInt(citem.attr("uiTop")));
			citem.addClass('item');
			citem.addClass('assigned');
			citem.appendTo(myContainer);
		}
	}
}

function inputBg(){
    $('#bgfm').form('submit',{
   	url: '/mon_logicmap/inputBackGround',
   	onSubmit: function(){
   		 var selectedValue = $("#tunnel").combotree('tree').tree('getSelected');
            if(selectedValue.dataType ==null || selectedValue.dataType ==''){
           	 $.messager.alert('提示','请选择可配置的节点');
           	 return false;
            }
            return $(this).form('validate');
       },
       success: function(result){
           var result = eval('('+result+')');
           if (result.state){
        	   $("#bgimg").attr('src',result.message); 
        	   $('#inputFile').filebox('setValue','');
        	   $('#tunnel').combotree('reload');    
           } else {
               $.messager.alert('出错啦',result.message,'error');
           }
       }
   });
}

/**加载某分组的信息**/
function initialGroups(tunnelId,setImgLoc){
	 groups = new Array();
	 items = new Array();
	 $.post("/mon_logicmap/getlogicGroupsByTunnelId?tunnelId="+tunnelId,"",function(res){
	     if (res && res.length>0){
	        for(var i in res){
	        	var group = res[i];
	        	if(group.dataType!=''&&!group.dataType.startWith("ND-")){
	        		groups.push(group);
	        	}
	        }
	     }
	     initailDraggable();
	     if(setImgLoc){//设置背景图位置
	    	 setImgLocation();
	     }
//	     setTimeout(function () { 
	    	 initialSet();
	    	 initailDroppable();
// 	     }, 3000);
	     
	 	 
	 });
}

function saveSet(){
	var datas= new Array();
	var containerScrollTop = mainContainer.scrollTop();  
	var containerScrollLeft = mainContainer.scrollLeft();  
	
	for(var i in items){
		var it = items[i];
		var id = it.attr("id");
		
		//var cssLeft  = it.css("margin-left");
		//var cssTop = it.css("margin-top");
		//cssLeft = cssLeft.substring(0,cssLeft.indexOf("px"));
		//cssTop = cssTop.substring(0,cssTop.indexOf("px"));
		
		var offsetLeft = it.offset().left;
		var offsetTop =  it.offset().top;
		
		//var uiLeft = parseInt(it.attr("uiLeft"));
		//var uiTop = parseInt(it.attr("uiTop"));
		
		var ob = new Object();
		ob.id=id;
		
		ob.uiLeft = offsetLeft+containerScrollLeft-leftOffset;
		ob.uiTop =  offsetTop+containerScrollTop-topOffset;
		
		var uiValid=1;
		if(ob.uiLeft < 0 || ob.uiTop < 0){
			uiValid = 0;
		}
		ob.uiValid = uiValid;
		datas.push(ob);
	}
	$.post("/mon_logicmap/updateLogicMap",{"datas":JSON.stringify(datas),"tunnelId":selectedTunnelId},function(res){
		 if (res.state){
			 $.messager.alert('温馨提示',res.message,'info');
         } else {
             $.messager.alert('出错啦',res.message,'error');
         }
	 });
}

String.prototype.startWith=function(str){     
	var reg=new RegExp("^"+str);     
	return reg.test(this);        
}