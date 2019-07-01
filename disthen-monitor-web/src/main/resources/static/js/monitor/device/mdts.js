var cardId, lockId, interval = 0, data_time, currentOption, lineoptions, type = 'h', date = '';
var colorList = ['#C1232B', '#B5C334', '#FCCE10', '#E87C25'];
var dw = ['A', 'A', 'A', 'A'];
$(document).ready(function () {
    var otherInfoDIV = $('#todayInfo');

    otherInfoDIV.css("width", document.documentElement.clientWidth);
    otherInfoDIV.css('height', document.documentElement.clientHeight);

    //initialChart();
    //debugger;
    //updateMDTSNode();
    //updateMDTS();//初始化
    //clearInterval(interval);
    //定时刷新页面数据
    //interval = setInterval(updateMDTS, 1000 * 30);

});

function initialChart() {
    var todayInfo = echarts.init(document.getElementById('todayInfo'));
    lineoptions = {
        title: {
            text: '接头温度',
            subtext: '今日最高温度曲线'
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                if (params.length == 3) {
                    return params[0].name + '<br/>'
                        + params[0].seriesName + ' : ' + params[0].value + '<br/>'
                        + params[1].seriesName + ' : ' + params[1].value + '<br/>'
                        + params[2].seriesName + ' : ' + params[2].value + '<br/>';
                } else if (params.length == 2) {
                    return params[0].name + '<br/>'
                        + params[0].seriesName + ' : ' + params[0].value + '<br/>'
                        + params[1].seriesName + ' : ' + params[1].value + '<br/>';
                } else if (params.length == 1) {
                    return params[0].name + '<br/>'
                        + params[0].seriesName + ' : ' + params[0].value + '<br/>';
                }

            }
        },
        legend: {
            data: [
                {
                    name: 'A相',
                    textStyle: {color: 'red'}
                },
                {
                    name: 'B相',
                    textStyle: {color: 'yellow'}
                },
                {
                    name: 'C相',
                    textStyle: {color: 'green'}
                }
            ]
        },
        grid: {
            x: 40,
            x2: 40,
            y2: 50
        },
        toolbox: {
            show: true,
            feature: {
                mark: {show: true},
                myTool: {
                    show: true,
                    title: '小时图',
                    icon: 'image://../../../img/echart/h.png',
                    onclick: function () {
                        type = 'h';
                        date = '';
                        data_time = '';
                        updateMDTS();
                    }
                },
                myTool2: {
                    show: true,
                    title: '分图',
                    icon: 'image://../../../img/echart/m.png',
                    onclick: function () {
                        type = 'm';
                        date = '';
                        data_time = '';
                        updateMDTS();
                    }
                },
                myTool3: {
                    show: true,
                    title: '秒图',
                    icon: 'image://../../../img/echart/s.png',
                    onclick: function () {
                        type = 's';
                        date = '';
                        data_time = '';
                        updateMDTS();
                    }
                }
            }
        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: [],
                axisLabel: {
                    interval: 0,//横轴信息全部显示
                    rotate: -30//-30度角倾斜显示
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLabel: {
                    formatter: '{value}℃'
                },
                min: -10,
                max: 60
            }
        ],
        //滚动条
        dataZoom: [{
            backgroundColor:"rgba(47,69,84,0)", //组件的背景颜色
            fillerColor:"rgba(167,183,204,0.4)", //选中范围的填充颜色。
            borderColor:"#ddd", //边框颜色。
            type: 'slider',
            show: true,
            xAxisIndex: [0],
            zoomLock:true,
            left: '5%',
            bottom: -5,
            start: 30,
            end: 100 //初始化滚动条
        }],
        series: [
            {
                name: 'A相',
                type: 'line',
//		            smooth:true,
                itemStyle: {
                    normal: {
                        lineStyle: {
                            color: '#FF0000', //
                            width: 3
                        }
                    }
                },
                data: []
            },
            {
                name: 'B相',
                type: 'line',
//		            smooth:true,
                itemStyle: {
                    normal: {
                        lineStyle: {
                            color: '#FFFF00', //
                            width: 3
                        }
                    }
                },
                data: []
            },
            {
                name: 'C相',
                type: 'line',
//		            smooth:true,
                itemStyle: {
                    normal: {
                        lineStyle: {
                            color: '#7CFC00', //
                            width: 3
                        }
                    }
                },
                data: []
            }
        ]
    };
    todayInfo.setOption(lineoptions);
    todayInfo.on('click', eConsole);
}

function eConsole(param) {
    date = param.name;
    data_time = '';
    if (date.length == 5 && '00' == date.substring(3, 5)) {
        type = 'm';
    } else {
        type = 's';
    }
    updateMDTS();
}

function updateMDTS() {
	
}

function updateMDTSNode() {
	var prefix = "pages/device/";
    var todayLineCharts = echarts.getInstanceByDom(document.getElementById('todayInfo'));
    $.ajax({
        type: "GET",
        url: prefix+"selectMDTSData/1739/"+type+"/"+date,
        async:false,
        success: function(info){
            var data = eval('(' + info + ')');
            var len = data.series1.length;
            if(len<=10) lineoptions.dataZoom[0].start = 0;
            else {
                var value = parseInt(len/10);
                lineoptions.dataZoom[0].start = 100 - 100/value;
            }
            lineoptions.xAxis[0].data = data.xAxis;
            lineoptions.series[0].data = data.series1;
            lineoptions.series[1].data = data.series2;
            lineoptions.series[2].data = data.series3;
            todayLineCharts.setOption(lineoptions);
        }
    });
}