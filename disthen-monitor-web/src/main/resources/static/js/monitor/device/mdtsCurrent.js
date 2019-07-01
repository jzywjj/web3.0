var cardId,lockId,interval = 0,data_time,currentOption,currenctInfoChart,currentData;
var colorList = ['#C1232B','#B5C334','#FCCE10','#E87C25'];
var dw = ['A','A','A','A'];
$(document).ready(function() {
	var currenctInfoDIV = $('#currenctInfo');
	
	currenctInfoDIV.css("width",document.documentElement.clientWidth); 
	currenctInfoDIV.css('height',document.documentElement.clientHeight); 
	//initialChart();
	//updateMDTS();//初始化
	//clearInterval(interval);
	//定时刷新页面数据
	//interval = setInterval(updateMDTS, 5000);
	
});

function initialChart(){
	currenctInfoChart = echarts.init(document.getElementById('currenctInfo'));
	var hours = ['温度1', '温度2', '温度3','温度4', '温度5', '温度6','温度7', '温度8', 
	      		'温度9','温度10', '温度11', '温度12','温度13', '温度14', '温度15','温度16', '温度17', '温度18'];
	var days = ['C相温度', 'B相温度', 'A相温度'];
	
	currentData = [[0,0,0],[0,1,0],[0,2,0],[1,0,0],[1,1,0],[1,2,0],[2,0,0],[2,1,0],[2,2,0],
	     		[3,0,0],[3,1,0],[3,2,0],[4,0,0],[4,1,0],[4,2,0],[5,0,0],[5,1,0],[5,2,0],[6,0,0],[6,1,0],[6,2,0],
	     		[7,0,0],[7,1,0],[7,2,0],[8,0,0],[8,1,0],[8,2,0],[9,0,0],[9,1,0],[9,2,0],
	     		[10,0,0],[10,1,0],[10,2,0],[11,0,0],[11,1,0],[11,2,0],[12,0,0],[12,1,0],[12,2,0],[13,0,0],[13,1,0],[13,2,0],
	     		[14,0,0],[14,1,0],[14,2,0],[15,0,0],[15,1,0],[15,2,0],[16,0,0],[16,1,0],[16,2,0],
	     		[17,0,0],[17,1,0],[17,2,0]];
	
	currentOption = {
			tooltip : {
			 	formatter: function (params){
			 			return days[params.data[1]]+'<br/>'+params.name+' '+params.data[2]+'℃';
			 	}
		    },
            animation: true,
            grid: {
                height: '70%',
                y: '10%'
            },
            xAxis: {
                type: 'category',
                data: hours
            },
            yAxis: {
                type: 'category',
                data: days
            },
            visualMap: {
                min: -10,
                max: 100,
                calculable: true,
                orient: 'vertical',
                left: 'right',
                top: '',
                inRange: {
                  color: ['#e1e2e5', '#fffbbc', '#c4463a', '#c4463a']
                }
            },
            series: [{
                name: '多点测温',                               
                type: 'heatmap',
                data: currentData,
                label: {
                    normal: {
                        show: false
                    }
                },
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
    };

	currenctInfoChart.setOption(currentOption);	                    
}


function initialChart1(){
	currenctInfoChart = echarts.init(document.getElementById('currenctInfo'));
	currentOption = {
		    tooltip : {
		        trigger: 'axis',
//		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
//		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
//		        }
		        formatter: function (params){
			            return params[0].name + '<br/>'
			                   + params[0].seriesName + ' : ' + params[0].value + ';'
			                   + params[1].seriesName + ' : ' + params[1].value + ';'
			                   + params[2].seriesName + ' : ' + params[2].value + ';'
			                   + params[3].seriesName + ' : ' + params[3].value + ';'
			            	   + params[4].seriesName + ' : ' + params[4].value + ';'
		                       + params[5].seriesName + ' : ' + params[5].value + '<br/>'
		                       + params[6].seriesName + ' : ' + params[6].value + ';'
		                       + params[7].seriesName + ' : ' + params[7].value + ';'
			            	   + params[8].seriesName + ' : ' + params[8].value + ';'
		                       + params[9].seriesName + ' : ' + params[9].value + ';'
		                       + params[10].seriesName + ' : ' + params[10].value + ';'
		                       + params[11].seriesName + ' : ' + params[11].value + '<br/>'
			            	   + params[12].seriesName + ' : ' + params[12].value + ';'
		                       + params[13].seriesName + ' : ' + params[13].value + ';'
		                       + params[14].seriesName + ' : ' + params[14].value + ';'
		                       + params[15].seriesName + ' : ' + params[15].value + ';';
			            	   + params[16].seriesName + ' : ' + params[16].value + ';'
		                       + params[17].seriesName + ' : ' + params[17].value ;
				 
			 	}
		    },
		    legend: {
		        data:['温度1','温度2','温度3','温度4','温度5','温度6','温度7','温度8','温度9','温度10',
		              ,'温度11','温度12','温度13','温度14','温度15','温度16','温度17','温度18']
		    },
		    toolbox: {
		        show : true,
		        orient: 'vertical',
		        x: 'right',
		        y: 'center',
		        feature : {
		            mark : {show: true},
		            magicType : {show: true, type: ['line', 'bar']},
		            restore : {show: true},
		            saveAsImage : {show: true}
		        }
		    },
		    calculable : true,
		    yAxis : [
		        {
		            type : 'category',
		            data : ['C相','B相','A相']
		        }
		    ],
		    xAxis : [
		        {
		            type : 'value'
		        }
		    ],
		    series : [
		        {
		            name:'温度1',
		            type:'bar',
		            stack: '温度',
		            data:[0, 0, 0]
		        },
		        {
		            name:'温度2',
		            type:'bar',
		            stack: '温度',
		            data:[0, 0, 0],
		            itemStyle: {
		                normal: {
		                    color: function(params) {
		                        return colorList[0];
		                    }
		                }
		            }
		        },
		        {
		            name:'温度3',
		            type:'bar',
		            stack: '温度',
		            data:[0, 0, 0]
		        },
		        {
		            name:'温度4',
		            type:'bar',
		            stack: '温度',
		            data:[0, 0, 0]
		        },
		        {
		            name:'温度5',
		            type:'bar',
		            stack: '温度',
		            data:[0, 0, 0]
		        },
		        {
		            name:'温度6',
		            type:'bar',
		            stack: '温度',
		            data:[0, 0, 0]
		        },
		        {
		            name:'温度7',
		            type:'bar',
		            stack: '温度',
		            data:[0, 0, 0]
		        },
		        {
		            name:'温度8',
		            type:'bar',
		            stack: '温度',
		            data:[0, 0, 0]
		        },
		        {
		            name:'温度9',
		            type:'bar',
		            stack: '温度',
		            data:[0, 0, 0]
		        },
		        {
		            name:'温度10',
		            type:'bar',
		            stack: '温度',
		            data:[0, 0, 0]
		        },
		        {
		            name:'温度11',
		            type:'bar',
		            stack: '温度',
		            data:[0, 0, 0]
		        },
		        {
		            name:'温度12',
		            type:'bar',
		            stack: '温度',
		            data:[0, 0, 0]
		        },
		        {
		            name:'温度13',
		            type:'bar',
		            stack: '温度',
		            data:[0, 0, 0]
		        },
		        {
		            name:'温度14',
		            type:'bar',
		            stack: '温度',
		            data:[0, 0, 0]
		        },
		        {
		            name:'温度15',
		            type:'bar',
		            stack: '温度',
		            data:[0, 0, 0]
		        },
		        {
		            name:'温度16',
		            type:'bar',
		            stack: '温度',
		            data:[0, 0, 0]
		        },
		        {
		            name:'温度17',
		            type:'bar',
		            stack: '温度',
		            data:[0, 0, 0]
		        },
		        {
		            name:'温度18',
		            type:'bar',
		            stack: '温度',
		            data:[0, 0, 0]
		        }
		    ]
	};
	currenctInfoChart.setOption(currentOption);	                    
}

function updateMDTS(){
//	var selectedDevice=window.top.scopeToShare.selectedMDTS;
//	if(selectedDevice){
//		updateMDTSNode(selectedDevice);
//	}
}

function updateMDTSNode(node) {
    var cables = node.bindlogiccables;
	var onlineStat=node.onlineStat;
    var currenctInfo = echarts.getInstanceByDom(document.getElementById('currenctInfo')); 
    if(data_time != node.lastedDataTimeStr){
//    	for(var index=0;index<3;index++){
//    		var cable=cables[index];
//			if(cable){
//				var vals = cable.value;
//				var valsArry=vals.split(",");
//				for(var itemIndex=0;itemIndex<valsArry.length;itemIndex++){
//					currentOption.series[itemIndex].data[index]=valsArry[itemIndex];
//				}
//			}
//    	}
    	for(var index=0;index<3;index++){
    		var cable=cables[2-index];
			if(cable){
				var vals = cable.value;
				var valsArry=vals.split(",");
				if(valsArry&&valsArry.length>0){
					for(var itemIndex=0;itemIndex<valsArry.length;itemIndex++){
						if(valsArry[itemIndex]){
							currentData[3*itemIndex+index][2]=valsArry[itemIndex];
						}
					}
				}	
			}
    	}
    	currentOption.series[0].data=currentData;
    	currenctInfoChart.setOption(currentOption);
	}
	data_time = node.lastedDataTimeStr;
}