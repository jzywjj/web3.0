var assetLink,statusInfo,cardId,lockId,interval = 0,linkstatus,data_time,option,lineoptions;
var colorList = ['#C1232B','#B5C334','#FCCE10','#E87C25'];
var dw = ['A','A','A','A'];
var prefix = "pages/device/";
$(document).ready(function() {
	var currentInfo = $('#currentInfo');
	var todayInfo = $('#todayInfo');
	statusInfo = $('#statusInfo');
	assetLink  = $('#assetLink');
	currentInfo.css("width",document.documentElement.clientWidth*5/12); 
	currentInfo.css('height',document.documentElement.clientHeight/1.3); 
	statusInfo.css("width",document.documentElement.clientWidth*5/12); 
	statusInfo.css('height',15); 
	todayInfo.css("width",document.documentElement.clientWidth*7/12); 
	todayInfo.css('height',document.documentElement.clientHeight/1.3); 
	
	initialChart();
	updateGroundBoxNode();
	//updateGroundBox();//初始化
	clearInterval(interval);
	//定时刷新页面数据
	interval = setInterval(updateGroundBoxNode, 30000);
	
});


function initialChart(){
	var myChart = echarts.init(document.getElementById('currentInfo'));
	option = {
		    title: {
		        x: 'center',
		        text: '接地箱电流'
		    },
		    tooltip: {
		        trigger: 'item'
		    },
		    toolbox: {
		        show: true
		    },
		    calculable: true,
		    grid: {
		        borderWidth: 0,
		        y: 80,
		        y2: 60
		    },
		    xAxis: [
		        {
		            type: 'category',
		            show: true,
		            data: ['A相电流', 'B相电流', 'C相电流', 'Z相电流']
		        }
		    ],
		    yAxis: [
		        {
		            type: 'value',
		            show: false
		        }
		    ],
		    series: [
		        {
		            name: '接地箱电流',
		            type: 'bar',
		            itemStyle: {
		                normal: {
		                    color: function(params) {
		                        return colorList[params.dataIndex];
		                    },
		                    label: {
		                        show: true,
		                        position: 'top',
		                        formatter: function(params) {
			                        return params.data+" "+dw[params.dataIndex];
			                    }
		                    }
		                }
		            },
		            data: [10,20,30,40]
		        }
		    ]
		};
	 myChart.setOption(option);
}

function updateGroundBoxNode() {	
	var id = $('#id').text();
	/*alert(id);
	var rel;	
	$.ajax({
        type: "GET",
        url: prefix+"deviceInfo/"+id+"/",
        async:false,
        dataType: "json",
        success: function(data){
        	rel = data;
        }
    });*/
	var rel;
	$.ajax({
        type: "GET",
        url: "/monitor/pages/device/deviceInfo/"+id+"/",
        async:false,
        success: function(data){
        	rel = data;
        }
    });
	var sInfo="<font size=2><b>当前状态&nbsp;:&nbsp;</b>"+rel.status+"&nbsp;<b>时间&nbsp;:&nbsp;</b>"+rel.dataTime+"</b></font>";
	statusInfo.html(sInfo);
    var myChart = echarts.getInstanceByDom(document.getElementById('currentInfo')); 
    var datas = new Array();
    var currentA = rel.currentA;
    var currentB = rel.currentB;
    var currentC = rel.currentC;
    var currentZ = rel.currentZ;
    //currentA = currentA.replace(/^\d+(\.\d+)?$/,"");
    currentA = currentA.replace(/[^\d.]/g,'');
    currentB = currentB.replace(/[^\d.]/g,'');
    currentC = currentC.replace(/[^\d.]/g,'');
    currentZ = currentZ.replace(/[^\d.]/g,'');
    datas.push(currentA,currentB,currentC,currentZ);   
	if(datas.length>0){
		 myChart.setOption({
			   series: [
			   		        {
					            name: '接地箱电流',
					            type: 'bar',
					            itemStyle: {
					                normal: {
					                    color: function(params) {
					                        return colorList[params.dataIndex]
					                    },
					                    label: {
					                        show: true,
					                        position: 'top',
					                        formatter: function(params) {
						                        return params.data+" "+dw[params.dataIndex];
						                    }
					                    }
					                }
					            },
					            data: datas
					        }
					    ]
		   });
		 
	 }
}