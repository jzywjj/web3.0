var assetLink,statusInfo,cardId,lockId,interval = 0,HTYoption,data_time,pitTemperature,pitHumidity,temperature,humidity,pitInfraredTemperature;

//window.onload = function (){chImg();chImgs();}

var Img = new Array("../static/images/fires.png","../static/images/fire.png");
var Imgs = new Array("../static/images/inbreaks.png","../static/images/inbreak.png");
var size = 2;
var i =0;
var a =0;
function chImg(k){
	if(k==0){
		fire.src = Img[i];
		i++;
		 if (i>=size) 
			  i = 0;
	}else{
		inbreak.src = Imgs[a];
		a++;
		 if (a>=size) 
			  a = 0;
	}	 
	  
 }

$(document).ready(function() {
//	var pitInfraredDiv = $('#pitInfraredTemperature');
//	pitInfraredDiv.css("width",document.documentElement.clientWidth*4/10); 
//	pitInfraredDiv.css('height',document.documentElement.clientHeight*4/7);
//	
//	var pitDiv = $('#pitTemperature');
//	pitDiv.css("width",document.documentElement.clientWidth*4/10); 
//	pitDiv.css('height',document.documentElement.clientHeight*4/7); 
//	
//	var pitHumidityDIV = $('#pitHumidity');
//	pitHumidityDIV.css("width",document.documentElement.clientWidth*4/10); 
//	pitHumidityDIV.css('height',document.documentElement.clientHeight*4/7); 
	
	statusInfo = $('#statusInfo');
	assetLink = $('#assetLink');
	initailCharts();
	update();//初始化
	clearInterval(interval);
	//定时刷新页面数据
	interval = setInterval(update, 5000);
});

function initailCharts(){
	pitInfraredTemperature  = echarts.init(document.getElementById('pitInfraredTemperature'));//红外温度
	pitTemperature  = echarts.init(document.getElementById('pitTemperature'));//温度
	pitHumidity  = echarts.init(document.getElementById('pitHumidity'));//湿度

     // 红外温度指定图表的配置项和数据
	infraredTemperature = {
         title: {
             text: '红外温度',
             x:'center',
             y:'top',
             textAlign:'left' 
         },
         tooltip: {},
         legend: {
             data:['统计']
         },
         xAxis: {
             data: ["最低温度","平均温度","最高温度"]
         },
         yAxis: {},
         series: [{
             name: '当前',
             type: 'bar',
             data: [0,0,0] 
         }]
     };

     // 使用刚指定的配置项和数据显示图表。
	//infraredTemperature.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
    pitInfraredTemperature.setOption(infraredTemperature,true);
     
    temperature = {
    		 title: {
                 text: '温度',
                 x:'center',
                 y:'top',
                 textAlign:'left'	 
             },
		    tooltip : {
		        formatter: "{a} <br/>{b} : {c}%"
		    },
		    series: [
		        {
		            name: '温度',
		            type: 'gauge',
		            detail: {formatter:'{value}%'},
		            data: [{value: 0, name: ''}]
		        }
		    ]
		};      
    pitTemperature.setOption(temperature, true); 
    
    humidity = {
	    		 title: {
	                 text: '湿度',
	                 x:'center',
	                 y:'top',
	                 textAlign:'left'
	             },
			    tooltip : {
			        formatter: "{a} <br/>{b} : {c}%"
			    },
			    series: [
			        {
			            name: '湿度',
			            type: 'gauge',
			            detail: {formatter:'{value}%'},
			            data: [{value: 0, name: ''}]
			        }
			    ]
			};      
	  pitHumidity.setOption(humidity, true);

}

function update(){
	var selectedDevice=window.top.scopeToShare.selectedPitCable;
	cardId=window.top.scopeToShare.cardId;
	updateNode(selectedDevice);
}

//	Img = new Array("../static/images/fires.png","../static/images/fire.png");
//	size = Img.length;
//	 i = 0;
//	 function chImg(){
//		  fire.src = Img[i];
//		  i++;
//		  if (i>=size) i = 0;
//		  setTimeout("chImg()",200);
//	  }
//	 
//	Imgs = new Array("../static/images/inbreaks.png","../static/images/inbreak.png");
//	sizes = Imgs.length;
//	 a = 0;
//	 function chImgs(){
//		  inbreak.src = Imgs[a];
//		  a++;
//		  if (a>=sizes) a = 0;
//		  setTimeout("chImgs()",200);
//	  }
	 
	 
function updateNode(node) {
	var cables = node.bindlogiccables;
	var onlineStat=node.onlineStat;
	
	var sInfo="<font size=2><b>当前状态&nbsp;:&nbsp;</b>"+('on'==onlineStat?"<font color=green>在线</font>":"离线")+"&nbsp;<b>最新时间&nbsp;:&nbsp;</b>"+(node.lastedDataTimeStr==null?"无":node.lastedDataTimeStr)+"</b></font>";
	statusInfo.html(sInfo);
	if(node.assetId&&node.assetId!='0'){
		assetLink.attr("href","/pro_asset/assetInfo?assetId="+node.assetId);
		assetLink.show();
	}
    var datas = new Array();
	cables && $.each(cables, function(index, ts) {
		var type = ts.dataType;
		if (type == "PitTemperature") {//温度
			temperature.series[0].data[0].value = ts.value;
			pitTemperature.setOption(temperature);
		}else if (type == "PitHumidity") {//湿度
			humidity.series[0].data[0].value = ts.value;
			pitHumidity.setOption(humidity);
		}else if (type == "PitInfraredTemperature") {//红外温度
			infraredTemperature.series[0].data[0] = ts.minVal;
			infraredTemperature.series[0].data[1] = ts.avgVal;
			infraredTemperature.series[0].data[2] = ts.maxVal;
			pitInfraredTemperature.setOption(infraredTemperature);
		}else if (type == "PitFireAlarm") {//火灾报警 
			 //chImg(0);
			setInterval("chImg(0)",500);
		}else if (type == "PitIntrusionAlarm"){//入侵报警（或井盖状态）
			setInterval("chImg(1)",500);
			/*Imgs = new Array("../static/images/inbreaks.png","../static/images/inbreak.png");
			sizes = Imgs.length;
			 a = 0;
			 function chImgs(){
				  inbreak.src = Imgs[a];
				  a++;
				  if (a>=sizes) a = 0;
				  setTimeout("chImgs()",200);
			  }*/
		}else if (type == "PitVoltage") {//供电电压
			
		}
		
	});
}