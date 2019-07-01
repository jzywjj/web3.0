 $.sparkline_one = function (options) {
		 $(".sparkline_one").sparkline(options.param, {
				type: 'bar',
				height: '125',
				barWidth: 13,
				colorMap: {
					'10' : '#a1a1a1'
				},
				barSpacing: 2,
				barColor: '#26B99A'
		 });
};

$.sparkline_area = function (options) {
	$(".sparkline_area").sparkline(options.param, {
		type: 'line',
		lineColor: '#26B99A',
		fillColor: '#26B99A',
		spotColor: '#4578a0',
		minSpotColor: '#728fb2',
		maxSpotColor: '#6d93c4',
		highlightSpotColor: '#ef5179',
		highlightLineColor: '#8ba8bf',
		spotRadius: 2.5,
		height: '120',
		width: '600',
	});
};

$.sparkline_line = function (options) {
	$(".sparkline_line").sparkline(options.param, {
		type: 'line',
		lineColor: '#26B99A',
		fillColor: '#ffffff',
		height: '120',
		width: '600',
		spotColor: '#34495E',
		minSpotColor: '#34495E'
	});
};

$.sparkline_pie = function (options) {
	$(".sparkline_pie").sparkline(options.param, {
		type: 'pie',
		sliceColors: ['#26B99A', '#ccc', '#75BCDD', '#D66DE2'],
		height: '220'
	});
};

$.sparkline_discreet = function (options) {
	$(".sparkline_discreet").sparkline(options.param, {
		type: 'discrete',
		barWidth: 3,
		lineColor: '#26B99A',
		height: '120',
		width: '600',
	});
};
