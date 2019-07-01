var cardId=-1,interval = 0, summaryChart,option;
$(document).ready(function() {
	//
	//var mainDiv = $('#mainDiv');
	//var charWidth = document.documentElement.clientWidth-20;
	//var charHeight = document.documentElement.clientHeight-2;
	//mainDiv.css("width",charWidth);
	//mainDiv.css('height',charHeight);
	
	//summaryChart = echarts.init(document.getElementById('mainDiv'));
	
	//initTable();
	//initailChart();
	//updateChart();//初始化
	//定时刷新页面数据
	//clearInterval(interval);
	//interval = setInterval(initTable, 120*1000);
});

function initTable(){
	var table = $("#dataDiv table");
	table.html('');
	var th = $("<colgroup>"+
			   "	<col width='4%' />"+
			   "	<col width='30%' />"+
			   "	<col width='20%' />"+
			   "	<col width='20%' />"+
			   "	<col width='10%' />"+
			   "	<col width='10%' />"+
			   "	<col width='6%' />"+
			   "</colgroup>"+
			   "<tr>"+
			   "	<th nowrap='nowrap'>序号</th>"+
			   "	<th nowrap='nowrap'>隧道名称/线路名称</th>"+
			   "	<th nowrap='nowrap'>设备类型</th>"+
			   "	<th nowrap='nowrap'>数量</th>"+
			   "	<th nowrap='nowrap'>在线数</th>"+
			   "	<th nowrap='nowrap'>离线数</th>"+
			   "	<th nowrap='nowrap'>备注</th>"+
			   "</tr>");
	
	th.appendTo(table);
	
	//
	$.post(easyExt.url+"/report/getDeviceRunInfo",{},function(data,status, xhr){
		data = eval('(' + data + ')');
		if(true == data.success){
			var td,td_xh,td_name,id,zs=0,xh=1,ons=0;offs=0,zss=0,onss=0;offss=0;
			$.each(data.data, function (index, item) {
				var tr = $("<tr></tr>");
				if(index==0){
					id = item.id;
					zs = item.sl;
					ons = item.on;
					offs = item.off;
					td_xh = $("<td></td>");
					td_xh.attr('rowspan', 1);
					td_xh.html(xh++);
					td_xh.appendTo(tr);
					
					td_name = $("<td></td>");
					td_name.attr('rowspan', 1);
					td_name.html(item.name);
					td_name.appendTo(tr);
				}else{
					if(id == item.id){
						td_xh.attr('rowspan', parseInt(td_xh.attr('rowspan'))+1);
						td_name.attr('rowspan', parseInt(td_name.attr('rowspan'))+1);
						zs += item.sl;
						ons += item.on;
						offs += item.off;
					}else{
						//
						td_xh.attr('rowspan', parseInt(td_xh.attr('rowspan'))+1);
						td_name.attr('rowspan', parseInt(td_name.attr('rowspan'))+1);
						//
						var r = $("<tr></tr>");
						var d = $("<td></td>");
						d.html("<span style='font-weight: bold;color:blue;'>总计</span>");
						d.appendTo(r);
						d = $("<td></td>");
						d.html("<span style='font-weight: bold;color:blue;'>"+zs+"</span>");
						d.appendTo(r);
						d = $("<td></td>");
						d.html("<span style='font-weight: bold;color:blue;'>"+ons+"</span>");
						d.appendTo(r);
						d = $("<td></td>");
						d.html("<span style='font-weight: bold;color:blue;'>"+offs+"</span>");
						d.appendTo(r);
						d = $("<td></td>");
						d.html('');
						d.appendTo(r);
						r.appendTo(table);
						
						zss += zs;
						onss += ons;
						offss += offs;
						//
						id = item.id;
						zs = item.sl;
						ons = item.on;
						offs = item.off;
						td_xh = $("<td></td>");
						td_xh.attr('rowspan', 1);
						td_xh.html(xh++);
						td_xh.appendTo(tr);
					
						td_name = $("<td></td>");
						td_name.attr('rowspan', 1);
						td_name.html(item.name);
						td_name.appendTo(tr);
					}
				}
				
				td = $("<td></td>");
				td.html(item.type);
				td.appendTo(tr);
				td = $("<td></td>")
				td.html(item.sl);
				td.appendTo(tr);
				td = $("<td></td>");
				td.html(item.on);
				td.appendTo(tr);
				td = $("<td></td>");
				td.html(item.off);
				td.appendTo(tr);
				td = $("<td></td>");
				td.html('');
				td.appendTo(tr);
				
				tr.appendTo(table);
			});
			//
			if(zs > 0){
				td_xh.attr('rowspan', parseInt(td_xh.attr('rowspan'))+1);
				td_name.attr('rowspan', parseInt(td_name.attr('rowspan'))+1);
				//
				var r = $("<tr></tr>");
				var d = $("<td></td>");
				d.html("<span style='font-weight: bold;color:blue;'>总计</span>");
				d.appendTo(r);
				d = $("<td></td>");
				d.html("<span style='font-weight: bold;color:blue;'>"+zs+"</span>");
				d.appendTo(r);
				d = $("<td></td>");
				d.html("<span style='font-weight: bold;color:blue;'>"+ons+"</span>");
				d.appendTo(r);
				d = $("<td></td>");
				d.html("<span style='font-weight: bold;color:blue;'>"+offs+"</span>");
				d.appendTo(r);
				d = $("<td></td>");
				d.html('');
				d.appendTo(r);
				r.appendTo(table);
				
				zss += zs;
				onss += ons;
				offss += offs;
			}
			//总计
			var tr = $("<tr></tr>");
			td = $("<td></td>");
			td.attr('colspan', 3);
			td.html("<span style='font-weight: bold;color:blue;'>总计</span>");
			td.appendTo(tr);
			td = $("<td></td>");
			td.html("<span style='font-weight: bold;color:blue;'>"+zss+"</span>");
			td.appendTo(tr);
			td = $("<td></td>");
			td.html("<span style='font-weight: bold;color:blue;'>"+onss+"</span>");
			td.appendTo(tr);
			td = $("<td></td>");
			td.html("<span style='font-weight: bold;color:blue;'>"+offss+"</span>");
			td.appendTo(tr);
			td = $("<td></td>");
			td.html('');
			td.appendTo(tr);
			tr.appendTo(table);
		}
	});
}



function loadChart(on, off){
	option = {
		tooltip : {
			trigger: 'item',
			formatter: "{b} : {c} ({d}%)"
		},
		legend: {
			orient: 'vertical',
			x: 'left',
			data: ['离线设备','正常设备']
		},
		series : [{
			type: 'pie',
			radius : '50%',
			center: ['50%', '60%'],
			data:[
				{name:'离线设备',value:off},
				{name:'正常设备',value:on}
			],
			itemStyle: {
				emphasis: {
				shadowBlur: 10,
				shadowOffsetX: 0,
				shadowColor: 'rgba(0, 0, 0, 0.5)'
				}
			}
		}]
	};
	summaryChart.setOption(option);
}

function initailChart(){
	
	option = {
		tooltip : {
			trigger: 'item',
			formatter: "{b} : {c} ({d}%)"
		},
		legend: {
			orient: 'vertical',
			x: 'left',
			data: ['掉线设备','正常设备']
		},
		series : [{
			type: 'pie',
			radius : '50%',
			center: ['50%', '60%'],
			data:[
				{name:'离线设备',value:0},
				{name:'正常设备',value:1}
			],
			itemStyle: {
				emphasis: {
				shadowBlur: 10,
				shadowOffsetX: 0,
				shadowColor: 'rgba(0, 0, 0, 0.5)'
				}
			}
		}]
	};
	/*
	option = {
		    title: {
			        x: 'left',
			        text: '设备占比'
			    },
		    tooltip : {
		        trigger: 'axis'
		    },
		    toolbox: {
		        show : true,
		        y: 'bottom',
		        feature : {
		            mark : {show: true},
		            dataView : {show: false, readOnly: false},
		            magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
		            restore : {show: true},
		            saveAsImage : {show: true}
		        }
		    },
		    calculable : true,
		    legend: {
		        data:['设备数']
		    },
		    xAxis : [
		        {
		            type : 'category',
		            splitLine : {show : false},
		            data : ['洋浦','六甲','宏仁','石林']
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            position: 'right'
		        }
		    ],
		    series : [
		        {
		            name:'设备数',
		            type:'bar',
		            barWidth : 40,//柱图宽度
		            data:[20,30,40,50]
		        },
		        {
		            name:'设备占比',
		            type:'pie',
		            tooltip : {
		                trigger: 'item',
		                formatter: '{a} <br/>{b} : {c} ({d}%)'
		            },
		            center: [120,100],
		            radius : [0, 50],
		            data:[
		                {value:20, name:'洋浦'},
		                {value:30, name:'六甲'},
		                {value:40, name:'宏仁'},
		                {value:50, name:'石林'}
		            ]
		        }
		    ]
		};*/
	summaryChart.setOption(option);
}

function updateChart(){
	var selectedDevice = window.top.scopeToShare.selectedNode;
	if(cardId != window.top.scopeToShare.cardId){
		cardId = window.top.scopeToShare.cardId;
		var url="/mon_report/getTunnelsChartData?cardId="+cardId;
		$.get(url).done(function (info){
		   var json = eval('('+info+')');
		   if(true == json.success){
		   		//alert(json.data.on+'--'+json.data.off);
		   		loadChart(json.data.on, json.data.off);
		   }else{
			alert(json.msg);
		   }
		   //option.xAxis[0].data = data.xAxis;
		   //option.series[0].data.value = 30;
		   //option.series[1].data.value = 200;
		   //summaryChart.setOption(option);
		});
	}
}