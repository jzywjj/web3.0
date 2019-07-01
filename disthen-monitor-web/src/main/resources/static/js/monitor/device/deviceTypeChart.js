var cardId,lockId,interval = 0, typeSumChart, option;
$(document).ready(function() {
	initailChart();
});

function initailChart(){
	typeSumChart = echarts.init(document.getElementById('typeSumDiv'));
	option = {
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
		            data : ['风机','井盖','环网柜隔断','摄像头','LED','照明','水泵','气体监测','门禁','除湿','红外','接地箱']
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
		            data:[20,30,40,50,30,40,50,30,40,50,30,40]
		        },
		        {
		            name:'设备类型占比',
		            type:'pie',
		            tooltip : {
		                trigger: 'item',
		                formatter: '{a} <br/>{b} : {c} ({d}%)'
		            },
		            center: [120,80],
		            radius : [0, 50],
		            data:[
		                {value:20, name:'风机'},
		                {value:30, name:'井盖'},
		                {value:40, name:'环网柜隔断'},
		                {value:50, name:'摄像头'},
		                {value:30, name:'LED'},
		                {value:40, name:'照明'},
		                {value:50, name:'水泵'},
		                {value:30, name:'气体监测'},
		                {value:40, name:'门禁'},
		                {value:50, name:'除湿'},
		                {value:30, name:'红外'},
		                {value:40, name:'接地箱'}
		            ]
		        }
		    ]
		};
	typeSumChart.setOption(option);
		                    
}