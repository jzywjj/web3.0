
var cardId;

$(function(){
    
	 //获取设备的卡编号
	 cardId=window.top.scopeToShare.cardId;
	 
	 //下拉列表数据
     var devTypeData = [{text : "线芯温度", value : "temp"},
                        {text : "表面温度", value : "mdts"},
	                     {text : "运行电流", value : "cur"},
	                     {text : "故障状态", value : "fal"},
	                     {text : "断电监测", value : "outage"}]; 
	
	 //初始化查询项目的下拉列表
     $("#devType").combobox({
        valueField: 'value',
        textField: 'text',                                  
        data : devTypeData,
        onSelect : function(){
              var devType = $("#devType").combobox("getValue") ;
               if(devType=="temp" || devType=="mdts"){
            	   var title_name = '温度';
            	   if(devType=="temp"){
            		   title_name = '线芯温度';
            	   }else{
            		   title_name = '表面温度';
            	   }
           		    $("#data_show_area").show();
             	    $("#list_show_area").hide();
                    var myChart = echarts.init(document.getElementById('data_show_area'));
				 	 myChart.setOption({
					    title: {
					        text: title_name,
					    },
					    tooltip: {
					        trigger:'axis'
					    },
					    //backgroundColor:'#696969',
					    legend: {
					        data:[
					          {
					             name:'A相温度',
					             icon:'circle',
					             textStyle:{color:'red'}         
					          },
					          {
					             name:'B相温度',
					             icon:'circle',
					             textStyle:{color:'yellow'}         
					          },
					          {
					             name:'C相温度',
					             icon:'circle',
					             textStyle:{color:'green'}         
					          }	          	          
					         ]
					    },
					    toolbox:{
					       show:true,
					    },
					    calculable:true,
					    xAxis: [
					       {
					        type:'category',
					        boundaryGap:false,
					        data:[]
					       }
					    ],
					    yAxis: [
					      {
					         type:'value',
					         axisLabel:{
					             formatter:'{value}℃'
					         },
					         min:0,
					         max:100
					      }
					    ],
					    series: [
					     {
					        name: 'A相温度',
					        type: 'line',
					        itemStyle:{
					            normal:{
					              lineStyle:{
					                color:'#FF0000', //红
					                width:3
					              }
					           }
					        },
					        data:[],
					        markPoint:{
					          data:[
					             {type:'max',name:'最大值'},
					             {type:'min',name:'最小值'}
					          ]
					        },
					        markLine:{
					          data:[
					             {type:'average',name:'平均值'}
					          ]
					        }
					    },
				        {
					        name: 'B相温度',
					        type: 'line',
					        itemStyle:{
					            normal:{
					              lineStyle:{
					                color:'#FFFF00', //黄
					                width:3
					              }
					           }
					        },	
					        data:[],
					        markPoint:{
					          data:[
					             {type:'max',name:'最大值'},
					             {type:'min',name:'最小值'}
					          ]
					        },
					        markLine:{
					          data:[
					             {type:'average',name:'平均值'}
					          ]
					        }
					    },
				        {
					        name: 'C相温度',
					        type: 'line',
					        itemStyle:{
					            normal:{
					              lineStyle:{
					                color:'#7CFC00', //绿
					                width:3
					              }
					           }
					        },	
					        data:[],
					        markPoint:{
					          data:[
					             {type:'max',name:'最大值'},
					             {type:'min',name:'最小值'}
					          ]
					        },
					        markLine:{
					          data:[
					             {type:'average',name:'平均值'}
					          ]
					        }
					    }	    
					    ]
					});    
    
               }else if(devType=="cur"){
             		 $("#data_show_area").show();
             		 $("#list_show_area").hide();
 				var myChart = echarts.init(document.getElementById('data_show_area'));             		 
				  	 myChart.setOption({
					    title: {
					        text: '运行电流',
					    },
					    tooltip: {
					        trigger:'axis'
					    },
					    //backgroundColor:'#696969',
					    legend: {
					        data:[
					          {
					             name:'A相电流',
					             icon:'circle',
					             textStyle:{color:'red'}         
					          },
					          {
						             name:'B相电流',
						             icon:'circle',
						             textStyle:{color:'yellow'}         
						      },
						      {
						             name:'C相电流',
						             icon:'circle',
						             textStyle:{color:'green'}         
						       }
					         ]
					    },
					    toolbox:{
					       show:true,
					    },
					    calculable:true,
					    xAxis: [
					       {
					        type:'category',
					        boundaryGap:false,
					        data:[]
					       }
					    ],
					    yAxis: [
					      {
					         type:'value',
					         precision: 1, 
					         axisLabel:{
					             formatter:'{value}A'
					         }
					      }
					    ],
					    series: [
					     {
					        name: 'A相电流',
					        type: 'line',
					        itemStyle:{
					            normal:{
					              lineStyle:{
					                color:'#FF0000', //红
					                width:3
					              }
					           }
					        },
					        data:[],
					        markPoint:{
					          data:[
					             {type:'max',name:'最大值'},
					             {type:'min',name:'最小值'}
					          ]
					        },
					        markLine:{
					          data:[
					             {type:'average',name:'平均值'}
					          ]
					        }
					    },
					    {
					        name: 'B相电流',
					        type: 'line',
					        itemStyle:{
					            normal:{
					              lineStyle:{
					                color:'#FFFF00', //黄
					                width:3
					              }
					           }
					        },
					        data:[],
					        markPoint:{
					          data:[
					             {type:'max',name:'最大值'},
					             {type:'min',name:'最小值'}
					          ]
					        },
					        markLine:{
					          data:[
					             {type:'average',name:'平均值'}
					          ]
					        }
					    },
					    {
					        name: 'C相电流',
					        type: 'line',
					        itemStyle:{
					            normal:{
					              lineStyle:{
					                color:'#7CFC00', //绿
					                width:3
					              }
					           }
					        },
					        data:[],
					        markPoint:{
					          data:[
					             {type:'max',name:'最大值'},
					             {type:'min',name:'最小值'}
					          ]
					        },
					        markLine:{
					          data:[
					             {type:'average',name:'平均值'}
					          ]
					        }
					    }
					    ]
					});                 
             
               }else if(devType=="fal" || devType=="outage"){
               	  $("#list_show_area").show();
               	  $("#data_show_area").hide();            	   
               }
           }    
     }); 
});


//查询历史数据
function doSearch(){
	   
	   var devType = $("#devType").combobox("getValue") ;	   
	   if(devType==null||devType==""||devType=="...请选择"){
	          $.messager.alert("系统提示","请选择查询设备类型！");
	   }else{
		   
		   //获取查询时间
	  	   var startdd = $('#startdd').datebox('getValue');
		   var enddd =   $('#enddd').datebox('getValue');
		   var sd=startdd==""?"":startdd+" 00:00:01";
		   var ed=enddd==""?"":enddd+" 23:59:59";
		   
		   //构建访问路径
		   var url="/mon_his/selectHistoryDataType?devType="+devType+"&cardId="+cardId+"&sd="+sd+"&ed="+ed;
		   
		   if(devType=="temp"){
			   //加载数据
			   var myChart = echarts.getInstanceByDom(document.getElementById('data_show_area')); 
			   
			   $.get(url).done(function (info){
				   var data = eval('('+info+')');
				   myChart.setOption({
					   xAxis:{
						      data:data.date
					   },
					   series:[
					           {
					        	   name: 'A相温度',
					        	   data:data.temp.a,
					           },
					           {
					           	   name: 'B相温度',
					           	   data:data.temp.b,
					           },
					           {
					               name: 'C相温度',
					               data:data.temp.c,
					           }]
				   });
			   });
		   }else if(devType=="mdts"){
			   //加载数据
			   var myChart = echarts.getInstanceByDom(document.getElementById('data_show_area')); 
			   
			   $.get(url).done(function (info){
				   var data = eval('('+info+')');
				   myChart.setOption({
					   xAxis:{
						      data:data.date
					   },
					   series:[
					           {
					        	   name: 'A相温度',
					        	   data:data.mdts.a,
					           },
					           {
					           	   name: 'B相温度',
					           	   data:data.mdts.b,
					           },
					           {
					               name: 'C相温度',
					               data:data.mdts.c,
					           }]
				   });
			   });
		   }else if(devType=="cur"){
			   var myChart = echarts.getInstanceByDom(document.getElementById('data_show_area')); 
			   $.get(url).done(function (info){
				   var data = eval('('+info+')');
				   myChart.setOption({
					   xAxis:{
						       data:data.date
					   },
					   series:[
					           {
					        	   name: 'A相电流',
					        	   data:data.cur.a,
					           },
					           {
					        	   name: 'B相电流',
					        	   data:data.cur.b,
					           },
					           {
					        	   name: 'C相电流',
					        	   data:data.cur.c,
					           }]
				   });
			   });
		   }else if(devType=="fal"){
			   $('#event_show_area').datagrid('reload',url);
		   }else if(devType=="outage"){
			   $('#event_show_area').datagrid('reload',url);
		   }
	    }
	}