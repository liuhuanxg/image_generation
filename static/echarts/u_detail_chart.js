$(function() {
  /* ChartJS
   * -------
   * index html charts
   */

    var id = $("#u_id").val();
    console.log(id);
    $.ajax({
    url:"/get_underground_detail/"+id,
    type:"get",
    dataType:"json",
    success:function (data) {
      f(data.data,data.value);
      // f1(data.data,data.value);
        console.log(data)
    }
    });
    function f(data,value) {
        option = {
        title: {
            text: '地下数据占比详情',
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
                name: '地质信息',
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
        var dom = document.getElementById("main_chart1");
        var myChart = echarts.init(dom);
        myChart.setOption(option, true);
    }


});