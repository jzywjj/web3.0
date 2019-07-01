var interval = 0, cpu,cpuoption,memory,memoryoption,disk,diskoption,data_time;
var radius = [40, 55];
var labelTop = {
	    normal : {
	        label : {
	            show : true,
	            position : 'center',
	            formatter : '',
	            textStyle: {
	                baseline : 'bottom'
	            }
	        },
	        labelLine : {
	            show : false
	        }
	    }
	};
var labelBottom = {
	    normal : {
	        color: '#c23531',
	        label : {
	            show : true,
	            position : 'center'
	        },
	        labelLine : {
	            show : false
	        }
	    },
	    emphasis: {
	        color: 'rgba(0,0,0,0)'
	    }
	};
var labelFromatter = {
	    normal : {
	        label : {
	            formatter : function (params){
	                return "使用:"+params.value + '%'
	            },
	            textStyle: {
	                baseline : 'top'
	            }
	        }
	    },
	};

$(document).ready(function() {
	var cpuDiv = $('#CPU');
	var MemoryDiv = $('#Memory');
	var DiskDiv = $('#Disk');
	
	cpuDiv.css("width",document.documentElement.clientWidth/4); 
	cpuDiv.css('height',document.documentElement.clientHeight*3/5); 
	
	MemoryDiv.css("width",document.documentElement.clientWidth/4); 
	MemoryDiv.css('height',document.documentElement.clientHeight*3/5); 
	
	DiskDiv.css("width",document.documentElement.clientWidth/2); 
	DiskDiv.css('height',document.documentElement.clientHeight*3/5); 
	
	initailCharts();
	updateCharts();//初始化
	clearInterval(interval);
	//定时刷新页面数据
	interval = setInterval(updateCharts, 2000);
});

function initailCharts(){
	cpu = echarts.init(document.getElementById('CPU'));
	memory = echarts.init(document.getElementById('Memory'));
	disk = echarts.init(document.getElementById('Disk'));
	
	cpuoption = {
			title : { text: 'CPU'},
		    tooltip : { formatter: "{a} : {c}%" },
		    toolbox: {show : false},
		    series : [ {
		            name:'CPU使用率',
		            type:'gauge',
		            detail : {formatter:'{value}%'},
		            data:[{value: 0}]
		        }
		    ]
		};
	memoryoption = {
			title : { text: '内存'},
		    tooltip : {formatter: "{a} : {c}%"		    },
		    toolbox: {show : false},
		    series : [
		        {
		            name:'内存使用率',
		            type:'gauge',
		            detail : {formatter:'{value}%'},
		            data:[{value: 0}]
		        }
		    ]
		};
	diskoption ={
		    legend: {
		        x : 'center',
		        y : 'bottom',
		        data:['C','D','E','F']
		    },
		    title : {
		        text: '硬盘',
		        subtext: '文件系统使用率',
		        x: 'left'
		    },
		    series : [
		        {
		            type : 'pie',
		            center : ['10%', '50%'],
		            radius : radius,
		            x: '0%', // for funnel
		            itemStyle : labelFromatter,
		            data : [
		                {name:'other', value:0, itemStyle : labelBottom},
		                {name:'C', value:100,itemStyle : labelTop}
		            ]
		        },
		        {
		            type : 'pie',
		            center : ['30%', '50%'],
		            radius : radius,
		            x:'25%', // for funnel
		            itemStyle : labelFromatter,
		            data : [
		                {name:'other', value:0, itemStyle : labelBottom},
		                {name:'D', value:100,itemStyle : labelTop}
		            ]
		        },
		        {
		            type : 'pie',
		            center : ['50%', '50%'],
		            radius : radius,
		            x:'50%', // for funnel
		            itemStyle : labelFromatter,
		            data : [
		                {name:'other', value:0, itemStyle : labelBottom},
		                {name:'E', value:100,itemStyle : labelTop}
		            ]
		        },
		        {
		            type : 'pie',
		            center : ['70%', '50%'],
		            radius : radius,
		            x:'75%', // for funnel
		            itemStyle : labelFromatter,
		            data : [
		                {name:'other', value:0, itemStyle : labelBottom},
		                {name:'F', value:100,itemStyle : labelTop}
		            ]
		        }
		    ]
		};
	
	cpu.setOption(cpuoption);
	memory.setOption(memoryoption);
	disk.setOption(diskoption);
}


function updateCharts() {
	var url="/sys_info/getServerRunInfo";
	$.get(url).done(function (info){
		var data = eval('('+info+')');
		cpuoption.series[0].data[0].value = data.CPU;
		memoryoption.series[0].data[0].value = data.Memory;
		
		var desks = data.IO;
		var legends = new Array();
		var seriess = new Array();
		for(var i=0;i<desks.length;i++){
			legends.push(desks[i].name);
			
			var series = new Object();
			series.type='pie';
			series.cente= [(i*100/desks.length+10)+'%', '50%'],
			series.radius = radius;
			series.x = (i*100/desks.length+5)+"%";
			series.itemStyle=labelFromatter;
			var useful = 100-desks[i].value;
			series.data = [ {name:'使用', value:desks[i].value, itemStyle : labelBottom},
			                {name:desks[i].name, value:useful.toFixed(2),itemStyle : labelTop}];
			seriess.push(series);
		}
		diskoption.legend.data = legends;
		diskoption.series = seriess;
		cpu.setOption(cpuoption);
		memory.setOption(memoryoption);
		disk.setOption(diskoption);
	});
}