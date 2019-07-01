//单柱状图
$.graph_bar = function (options) {
	if ($('#graph_bar').length){ 
		
		Morris.Bar({
		  element: 'graph_bar',
		  data: options.data,
		  xkey: options.xkey,
		  ykeys: options.ykeys,
		  labels: options.labels,
		  barRatio: 0.4,
		  barColors: ['#26B99A', '#34495E', '#ACADAC', '#3498DB'],
		  xLabelAngle: 35,
		  hideHover: 'auto',
		  resize: true
		});

	}	
};

//多柱状图
$.graph_bar_group = function (options) {
	if ($('#graph_bar_group').length ){
		
		Morris.Bar({
		  element: 'graph_bar_group',
		  data: options.data,
		  xkey: options.xkey,
		  barColors: ['#26B99A', '#34495E', '#ACADAC', '#3498DB'],
		  ykeys: options.ykeys,
		  labels: options.labels,
		  hideHover: 'auto',
		  xLabelAngle: 60,
		  resize: true
		});
	
	}
};

//多柱状图带点击事件
$.graphx = function (options) {
	if ($('#graphx').length ){
		
		Morris.Bar({
		  element: 'graphx',
		  data: options.data,
		  xkey: options.xkey,
		  ykeys: options.ykeys,
		  barColors: ['#26B99A', '#34495E', '#ACADAC', '#3498DB'],
		  hideHover: 'auto',
		  labels: options.labels,
		  resize: true
		}).on('click', function (i, row) {
			console.log(i, row);
		});
	}
};

//区域图
$.graph_area = function (options) {
	if ($('#graph_area').length ){
		
		Morris.Area({
		  element: 'graph_area',
		  data: options.data,
		  xkey: options.xkey,
		  ykeys: options.ykeys,
		  lineColors: ['#26B99A', '#34495E', '#ACADAC', '#3498DB'],
		  labels: options.labels,
		  pointSize: 2,
		  hideHover: 'auto',
		  resize: true
		});
	}
};
//环状图
$.graph_donut = function (options) {
	if ($('#graph_donut').length ){
		
		Morris.Donut({
		  element: 'graph_donut',
		  data: options.data,
		  colors: ['#26B99A', '#34495E', '#ACADAC', '#3498DB'],
		  formatter: function (y) {
			return y + "%";
		  },
		  resize: true
		});
	
	}
};

//折线图
$.graph_line = function (options) {
	if ($('#graph_line').length ){
		
		Morris.Line({
		  element: 'graph_line',
		  xkey: options.xkey,
		  ykeys: options.ykeys,
		  labels: options.labels,
		  hideHover: 'auto',
		  lineColors: ['#26B99A', '#34495E', '#ACADAC', '#3498DB'],
		  data: options.data,
		  resize: true
		});
	
		$MENU_TOGGLE.on('click', function() {
		  $(window).resize();
		});
	}
}
