var interval,hiddenTitle,typechart,today_tunnelschart,ty_labels=new Array(),all_labels=new Array(),all_tunnelschart,typechartoption,today_tunnelsoption,all_tunnelsoption;
var colorList = ['#FF0000','#FFA500','#FFFF00','#87CEFA'];
var eventypeMap = new Map();
$(document).ready(function() {
	var docWidth = document.documentElement.clientWidth-80;
	var docHeight = document.documentElement.clientHeight-100;
	hiddenTitle = window.localStorage['hiddenTitle'];
	var header= $(".wpheader-bg");
	if(hiddenTitle){//是否隐藏头部
		header.hide();
		docHeight = document.documentElement.clientHeight-10;
	}else{
		header.show();
		docHeight = document.documentElement.clientHeight-90;
	}
	var today_tunnelschart = $("#today_tunnelschart");
	var alarmframe = $("#alarmframe");
	var typechart = $("#typechart");
	var all_tunnelschart = $("#all_tunnelschart");
	
	today_tunnelschart.css("width",docWidth/2); 
	today_tunnelschart.css('height',docHeight/2); 
	alarmframe.attr("width",docWidth/2); 
	alarmframe.attr('height',docHeight/2); 
	typechart.css("width",docWidth*5/12); 
	typechart.css('height',docHeight/2); 
	all_tunnelschart.css("width",docWidth*7/12); 
	all_tunnelschart.css('height',docHeight/2); 
	$.post("/sys_dict/getDictListByType?type=eventType","",function(res){
	     if (res && res.length>0){
	    	 for(var i in res){
	    		 var valStr=res[i].label;
	    		 var valId=res[i].value;
	    		 eventypeMap.put(valId, valStr);
	    	 }
	    	 initailCharts();
	    	 initialChartsData();
	     }
	});
	//clearInterval(interval);
	//定时刷新页面数据
	//interval = setInterval(updateCharts, 60*1000);
	
});

var isArray = function(obj) { 
    return Object.prototype.toString.call(obj) === '[object Array]'; 
};

var itemStyle = {
	    normal: {
	        color: function(params) {
	          if (params.dataIndex < 0) {
	            // for legend
	            return zrColor.lift(
	              colorList1[colorList1.length - 1], params.seriesIndex * 0.1
	            );
	          }
	          else {
	            // for bar
	            return zrColor.lift(
	              colorList1[params.dataIndex], params.seriesIndex * 0.1
	            );
	          }
	        }
	    }
	};

function updateCharts(){
	var now = new Date().Format("yyyy-MM-dd");
	var url2="/mon_warning/getWarningInfoByGroup?sdate="+now;
	$.get(url2).done(function (info){
		   var data = eval('('+info+')');
		   today_tunnelsoption.labels =  data.xAxis;
		   today_tunnelsoption.data[0].value = data.series1;
		   today_tunnelsoption.data[1].value = data.series2;
		   today_tunnelsoption.data[2].value = data.series3;
		   today_tunnelsoption.data[3].value = data.series4;
		   var maxValue = 10;
		   maxValue = getMaxValue(0, data.series1);
		   maxValue += getMaxValue(0, data.series2);
		   maxValue += getMaxValue(0, data.series3);
		   maxValue += getMaxValue(0, data.series4);
		   
		   today_tunnelschart.data = today_tunnelsoption.data;
		   today_tunnelsoption.coordinate.scale[0].end_scale=maxValue;
		   today_tunnelsoption.coordinate.scale[0].scale_space=maxValue/10;
		   today_tunnelschart.setUp();
		   today_tunnelschart.draw();
	});
}

function initialChartsData(){
	var now = new Date().Format("yyyy-MM-dd");
	var url="/mon_warning/getWarningTypesByType";
	 $.get(url).done(function (info){
		   var data = eval('('+info+')');
		   for(var i in data){
			   if(data[i].name=='红色告警'){
				   typechartoption.data[0].value=data[i].value;
			   }else if(data[i].name=='橙色告警'){
				   typechartoption.data[1].value=data[i].value;
			   }else if(data[i].name=='黄色告警'){
				   typechartoption.data[2].value=data[i].value;
			   }else if(data[i].name=='蓝色告警'){
				   typechartoption.data[3].value=data[i].value;
			   }
		   }
		   typechart = new iChart.Pie3D(typechartoption);
		   typechart.draw();
		   //typechart.bound(0);
	 });
	var url1="/mon_warning/getWarningInfoByGroup";
	$.get(url1).done(function (info){
		   var data = eval('('+info+')');
		   all_labels =  data.xAxis;
		   all_tunnelsoption.labels = new Array();
		   var num=50/all_labels.length;
		   for(var i in all_labels){
			   if(all_labels[i].length>num){
				   all_tunnelsoption.labels.push(all_labels[i].substring(0,num)+"...");
			   }else{
				   all_tunnelsoption.labels.push(all_labels[i]);
			   }
		   }
		   all_tunnelsoption.data[0].value = data.series1;
		   all_tunnelsoption.data[1].value = data.series2;
		   all_tunnelsoption.data[2].value = data.series3;
		   all_tunnelsoption.data[3].value = data.series4;
		   var maxValue = 10;
		   maxValue = getMaxValue(maxValue, data.series1);
		   maxValue += getMaxValue(0, data.series2);
		   maxValue += getMaxValue(0, data.series3);
		   maxValue += getMaxValue(0, data.series4);
		   
		   all_tunnelsoption.coordinate.scale[0].end_scale=maxValue;
		   all_tunnelsoption.coordinate.scale[0].scale_space=maxValue/10;
		   all_tunnelsoption.column_width = all_tunnelsoption.width/(all_tunnelsoption.data[0].value.length*3);
		   all_tunnelschart= new iChart.ColumnStacked3D(all_tunnelsoption);
		   all_tunnelschart.draw();
		   
	});
	var url2="/mon_warning/getWarningInfoByGroup?sdate="+now;
	$.get(url2).done(function (info){
		   var data = eval('('+info+')');
		   today_tunnelsoption.labels =  data.xAxis;
		   ty_labels =  data.xAxis;
		   var num=45/ty_labels.length;
		   today_tunnelsoption.labels = new Array();
		   for(var i in ty_labels){
			   if(ty_labels[i].length>num){
				   today_tunnelsoption.labels.push(ty_labels[i].substring(0,num)+"...");
			   }else{
				   today_tunnelsoption.labels.push(ty_labels[i]);
			   }
		   }
		   today_tunnelsoption.data[0].value = data.series1;
		   today_tunnelsoption.data[1].value = data.series2;
		   today_tunnelsoption.data[2].value = data.series3;
		   today_tunnelsoption.data[3].value = data.series4;
		   var maxValue = 10;
		   maxValue = getMaxValue(maxValue, data.series1);
		   maxValue += getMaxValue(0, data.series2);
		   maxValue += getMaxValue(0, data.series3);
		   maxValue += getMaxValue(0, data.series4);
		   
		   today_tunnelschart.data = today_tunnelsoption.data;
		   today_tunnelsoption.coordinate.scale[0].end_scale=maxValue;
		   today_tunnelsoption.coordinate.scale[0].scale_space=maxValue/10;
		   today_tunnelsoption.column_width = today_tunnelsoption.width/(today_tunnelsoption.data[0].value.length*3);
		   today_tunnelschart= new iChart.ColumnStacked3D(today_tunnelsoption);
		   today_tunnelschart.draw();
	});
}
function initailCharts(){
	var ttDiv = document.getElementById('today_tunnelschart');
	var ttWidth = ttDiv.clientWidth;
	var ttHeight = ttDiv.clientHeight;
	ty_labels.push('Item1');
	today_tunnelsoption={
		render : 'today_tunnelschart',
		title: {
			text: '今日告警信息数',
			color:'#254d70'
		},
		data:[{
     		name : eventypeMap.get(1),
     		value:[10],
     		color:'#87CEFA'
     	},
     	/*'#FF0000' '#FFA500' '#FFFF00' '#87CEFA'*/
     	{
     		name : eventypeMap.get(2),
     		value:[10],
     		color:'#FFFF00'
     	},
     	{
     		name : eventypeMap.get(3),
     		value:[10],
     		color:'#FFA500'
     	},
     	{
     		name : eventypeMap.get(4),
     		value:[10],
     		color:'#FF0000'
     	}],
		width : ttWidth,
		height : ttHeight,
		column_width:ttWidth/10,
		background_color : '#ffffff',
		shadow : true,
		shadow_blur : 3,
		shadow_color : '#aaaaaa',
		shadow_offsetx : 1,
		shadow_offsety : 0, 
//		sub_option:{
//			label:{color:'#f9f9f9',fontsize:12,fontweight:600},
//			border : {
//				width : 2,
//				color : '#ffffff'
//			} 
//		},
		sub_option:{
			label :false
		},
		label:{color:'#254d70',fontsize:12,fontweight:600},
		labels:['Item1'],
		legend:{
			enable:true,
			background_color : null,
			line_height:25,
			color:'#254d70',
			fontsize:12,
			fontweight:600,
			valign:'top',
			column:4,
			offsety:-20,
			offsetx:10,
			border : {
				enable : false
			}
		},
		tip:{
			enable :true,
			listeners:{
				//tip:提示框对象、name:数据名称、value:数据值、text:当前文本、i:数据点的索引
				parseText:function(tip,name,value,text,i){
					return ty_labels[i.split('_')[0]]+" "+name+":"+value+ '条';
				}
			} 
		},
		text_space : 16,//坐标系下方的label距离坐标系的距离。
		zScale:0.8,
		xAngle:50,
		bottom_scale:1.5, 
		coordinate:{
			width:'90%',
			height:'80%',
			board_deep:10,//背面厚度
			pedestal_height:10,//底座高度
			left_board:false,//取消左侧面板 
			shadow:true,//底座的阴影效果
			grid_color:'#6a6a80',//网格线
			wall_style:[{//坐标系的各个面样式
			color : '#6a6a80'
			},{
			color : '#b2b2d3'
			}, {
			color : '#a6a6cb'
			},{
			color : '#6a6a80'
			},{
			color : '#74749b'
			},{
			color : '#a6a6cb'
			}], 
			axis : {
				color : '#c0d0e0',
				width : 0
			}, 
			scale:[{
				 position:'left',	
				 scale_enable : false,
				 start_scale:0,
				 scale_space:10,
				 end_scale:100,
				 label:{color:'#254d70',fontsize:11,fontweight:600}
			}]
		}
	};
	
	today_tunnelschart= new iChart.ColumnStacked3D(today_tunnelsoption);
	today_tunnelschart.draw();
//	//利用自定义组件构造左上侧单位
//	today_tunnelschart.plugin(new iChart.Custom({
//			drawFn:function(){
//				//计算位置
//				var coo = today_tunnelschart.getCoordinate(),
//					x = coo.get('originx'),
//					y = coo.get('originy');
//				//在左上侧的位置，渲染一个单位的文字
//				today_tunnelschart.target.textAlign('end')
//				.textBaseline('bottom')
//				.textFont('600 12px 微软雅黑')
//				.fillText('单位(条)',x+10,y-20,false,'#254d70')
//			}
//	}));
	var tcDiv = document.getElementById('typechart');
	var tcWidth = tcDiv.clientWidth;
	var tcHeight = tcDiv.clientHeight;
	typechartoption = {
			render : 'typechart',
			title:{
				text:'告警信息类型占比',
				color:'#254d70',
				height:40,
				border:{
					enable:true,
					width:[0,0,1,0],
					color:'#6a6a80'
				}
			},
			padding:'2 10',
			footnote:{
				text:'所有不同告警信息比例',
				color:'#254d70',
				height:30,
				border:{
					enable:true,
					width:[1,0,0,0],
					color:'#6a6a80'
				}
			},
			width : tcWidth,
			height : tcHeight-30,
			data:[
	        	{name : eventypeMap.get(1),value : 0,color:'#87CEFA'},
	        	{name : eventypeMap.get(2),value : 0,color:'#FFFF00'},
	        	{name : eventypeMap.get(3),value : 0,color:'#FFA500'},
	        	{name : eventypeMap.get(4),value : 0,color:'#FF0000'},
	        ],
			shadow:true,
			shadow_color:'#aaaaaa',
			shadow_blur:10,
			background_color : '#a6a6cb',
			gradient:true,
			color_factor:0.28,
			gradient_mode:'LinearGradientDownUp',
			showpercent:true,
			decimalsnum:2,
			legend:{
				enable:true,
				background_color : null,
				line_height:25,
				color:'#254d70',
				fontsize:12,
				fontweight:600,
//				border:{
//					width:[0,0,0,2],
//					color:'#343b3e'
//				}
				border : {
					enable : false
				}
			},
			sub_option:{
				border:{
					enable:false
				},
				label : {
					background_color:'#fefefe',
					sign:false,//设置禁用label的小图标
					line_height:10,
					padding:4,
					border:{
						enable:true,
						radius : 4,//圆角设置
						color:'#e0e5e8'
					},
					fontsize:11,
					fontweight:600,
					color : '#444444'
				},
				listeners:{
					parseText:function(d, t){
						return d.get('value');
					}
				}
			},
			border:{
				width:[0,20,0,20],
				color:'#ffffff'
			}
	};
	typechart = new iChart.Pie3D(typechartoption);
	typechart.bound(0);
	
	all_labels.push('Item1');
	var atDiv = document.getElementById('all_tunnelschart');
	var atWidth = atDiv.clientWidth;
	var atHeight = atDiv.clientHeight;
	all_tunnelsoption = {
			render : 'all_tunnelschart',
			title: {
				text: '所有告警信息数',
				color:'#254d70'
			},
			data:[{
	     		name : eventypeMap.get(1),
	     		value:[10],
	     		color:'#87CEFA'
	     	},
	     	{
	     		name : eventypeMap.get(2),
	     		value:[10],
	     		color:'#FFFF00'
	     	},
	     	{
	     		name : eventypeMap.get(3),
	     		value:[10],
	     		color:'#FFA500'
	     	},
	     	{
	     		name : eventypeMap.get(4),
	     		value:[10],
	     		color:'#FF0000'
	     	}],
			width : atWidth,
			height : atHeight,
			column_width:atWidth/9,
			background_color : '#ffffff',
			shadow : true,
			shadow_blur : 3,
			shadow_color : '#aaaaaa',
			shadow_offsetx : 1,
			shadow_offsety : 0, 
//			sub_option:{
//				label:{color:'#f9f9f9',fontsize:12,fontweight:600},
//				border : {
//					width : 2,
//					color : '#ffffff'
//				} 
//			},
			sub_option:{
				label :false
			},
			label:{color:'#254d70',fontsize:12,fontweight:600},
			labels:['Item1'],
			legend:{
				enable:true,
				background_color : null,
				line_height:25,
				color:'#254d70',
				fontsize:12,
				fontweight:600,
				valign:'top',
				column:4,
				offsety:-20,
				offsetx:8,
				border : {
					enable : false
				}
			},
			tip:{
				enable :true,
				listeners:{
					//tip:提示框对象、name:数据名称、value:数据值、text:当前文本、i:数据点的索引
					parseText:function(tip,name,value,text,i){
						return all_labels[i.split('_')[0]]+" "+name+":"+value+ '条';
					}
				} 
			},
			text_space : 16,//坐标系下方的label距离坐标系的距离。
			zScale:2,
			xAngle:50,
			bottom_scale:1.8, 
			coordinate:{
				width:'90%',
				height:'80%',
				board_deep:10,//背面厚度
				pedestal_height:10,//底座高度
				left_board:false,//取消左侧面板 
				shadow:true,//底座的阴影效果
				grid_color:'#6a6a80',//网格线
				wall_style:[{//坐标系的各个面样式
				color : '#6a6a80'
				},{
				color : '#b2b2d3'
				}, {
				color : '#a6a6cb'
				},{
				color : '#6a6a80'
				},{
				color : '#74749b'
				},{
				color : '#a6a6cb'
				}], 
				axis : {
					color : '#c0d0e0',
					width : 0
				}, 
				scale:[{
					 position:'left',	
					 scale_enable : false,
					 start_scale:0,
					 scale_space:10,
					 end_scale:100,
					 label:{color:'#254d70',fontsize:11,fontweight:600}
				}]
			}
		};
	all_tunnelschart= new iChart.ColumnStacked3D(all_tunnelsoption);
	all_tunnelschart.draw();	      
}

function getMaxValue(maxValue,datas){
	 for(var i in datas){
		 if(parseInt(datas[i])>maxValue){
			 maxValue = Math.ceil(parseInt(datas[i])/10)*10;
		 }
	 }
	 return maxValue;
}

Date.prototype.Format = function (fmt) { 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}