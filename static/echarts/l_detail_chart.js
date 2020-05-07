$(function() {
  /* ChartJS
   * -------
   * index html charts
   */

    var id = $("#l_id").val();
    console.log(id);
    $.ajax({
    url:"/get_longitudelatitude_house_detail/"+id,
    type:"get",
    dataType:"json",
    success:function (data) {
      f1(data.data1.type,data.data1.count);
      f2(data.data2.data,data.data2.value);
      // console.log(data.data2.data,data.data2.value)
    }
    });

    // 房屋信息柱状图
    function f1(type_list,count) {
        option = {
            color: ['#3398DB'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: type_list,
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '已有数据',
                    type: 'bar',
                    barWidth: '50%',
                    data:count
                }
            ]
        };

        var dom = document.getElementById("main_chart1");
        var myChart = echarts.init(dom);
        myChart.setOption(option, true);
    }

    // 房屋信息饼状图
    function f2(data,value) {
        option = {
        title: {
            text: '房屋信息占比详情',
            subtext: '已有数据',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: data
        },
        series: [
            {
                name: '房屋信息',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data:value,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
        var dom = document.getElementById("main_chart2");
        var myChart = echarts.init(dom);
        myChart.setOption(option, true);
    }

    // 地下数据情况
    $.ajax({
    url:"/get_longitudelatitude_under_detail/"+id,
    type:"get",
    dataType:"json",
    success:function (data) {
      // console.log(data.data1.type,data.data1.count);
      f3(data.data1.type,data.data1.count)
    }
    });

    // 地下数据折线图
    function f3(type_list,count) {
        option = {
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data:type_list,
                axisTick: {
                        alignWithLabel: true
                    }
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                name:"已有数据",
                data: count,
                type: 'line',
                areaStyle: {}
            }]
        };
        var dom = document.getElementById("main_chart3");
        var myChart = echarts.init(dom);
        myChart.setOption(option, true);
    }


});