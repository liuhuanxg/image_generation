/*
Template Name: house_message
File: js
*/
$(function() {

    $.ajax({
        url:"/get_house_number",
        data:{},
        dataType:"json",
        type:"GET",
        success:function (data) {
            console.log(data);
            f(data.type_list,data.count);
            // console.log(222222222)

        }
    });
    function f(type_list,count) {

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
                    name: '已有信息数',
                    type: 'bar',
                    barWidth: '60%',
                    data:count
                }
            ]
        };
        var dom = document.getElementById("main_chart1");
        var myChart = echarts.init(dom);
        myChart.setOption(option, true);
    }

    // 搜索框触发函数
    $("#select").change(function () {
        longitude = $(this).val();
        f2(longitude)
        // 经度

    });

    function f2(longitude) {
        $.ajax({
            url:"/index_message/",
            data:{longitude:longitude},
            dataType:"json",
            type:"GET",
            success:function (data) {
                console.log(data.data);
                console.log(data.data.length);
                f1(data.data)
            }
        });
    }

    function f1(data) {

    colorList = [
    '#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed',
    '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0',
    '#1e90ff', '#ff6347', '#7b68ee', '#d0648a', '#ffd700',
    '#6b8e23', '#4ea397', '#3cb371', '#b8860b', '#7bd9a5',
    '#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed',
    '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0',
    '#1e90ff', '#ff6347', '#7b68ee', '#00fa9a', '#ffd700',
    '#6b8e23', '#ff00ff', '#3cb371', '#b8860b', '#30e0e0',
    '#929fff', '#9de0ff', '#ffa897', '#af87fe', '#7dc3fe',
    '#bb60b2', '#433e7c', '#f47a75', '#009db2', '#024b51',
    '#0780cf', '#765005', '#e75840', '#26ccd8', '#3685fe',
    '#9977ef', '#f5616f', '#f7b13f', '#f9e264', '#50c48f'
    ];
    console.log(data.length);
    var arr1 = [
            {"name": "乱港分子向中国大使馆求助", "value": 2226013, "symbolSize": 149, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 100, "shadowColor": colorList[0], "color": colorList[0] } } },
            {"name": "吴春红要求道歉恢复名誉", "value": 1741162, "symbolSize": 149, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 100, "shadowColor": colorList[1], "color": colorList[1] } } },
            {"name": "兰蔻持妆粉底液", "value": 1531659, "symbolSize": 123, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 100, "shadowColor": colorList[2], "color": colorList[2] } } },
            {"name": "爸爸用女儿纸尿裤当口罩", "value": 1529599, "symbolSize": 123, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 100, "shadowColor": colorList[3], "color": colorList[3] } } },
            {"name": "刘诗诗黑长直", "value": 1396359, "symbolSize": 118, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 100, "shadowColor": colorList[4], "color": colorList[4] } } },
            {"name": "邓主任", "value": 1326123, "symbolSize": 115, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 100, "shadowColor": colorList[5], "color": colorList[5] } } },
            {"name": "五角大楼寻求10万个收尸袋", "value": 1237092, "symbolSize": 111, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 100, "shadowColor": colorList[6], "color": colorList[6] } } },
            {"name": "目前已有36名中国留学生确诊", "value": 1136802, "symbolSize": 106, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 100, "shadowColor": colorList[7], "color": colorList[7] } } },
            {"name": "美国暂停向国外援助医疗物资用品", "value": 1096608, "symbolSize": 104, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 100, "shadowColor": colorList[8], "color": colorList[8] } } },
            {"name": "特朗普称不会发布全国居家隔离令", "value": 1062177, "symbolSize": 103, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 100, "shadowColor": colorList[9], "color": colorList[9] } } },
            {"name": "崂山再次回应核酸检测外国人插队", "value": 916854, "symbolSize": 95, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 100, "shadowColor": colorList[10], "color": colorList[10] } } },
            {"name": "印度最大贫民窟首次报告新冠确诊病例", "value": 909125, "symbolSize": 95, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 100, "shadowColor": colorList[11], "color": colorList[11] } } },
            {"name": "9架次包机接回中国公民1457人", "value": 848313, "symbolSize": 92, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 100, "shadowColor": colorList[12], "color": colorList[12] } } },
            {"name": "外交部将向留学生派发1100多万份口罩", "value": 774922, "symbolSize": 88, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 100, "shadowColor": colorList[13], "color": colorList[13] } } },
            {"name": "浙江嘉兴发放2亿消费券", "value": 631941, "symbolSize": 79, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 100, "shadowColor": colorList[14], "color": colorList[14] } } },
            {"name": "借给患者的外公和妈妈还回来了", "value": 608787, "symbolSize": 78, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 100, "shadowColor": colorList[15], "color": colorList[15] } } },
            {"name": "男子开火车撞美国海军医疗船", "value": 607278, "symbolSize": 77, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 100, "shadowColor": colorList[16], "color": colorList[16] } } },
            {"name": "张根硕母亲涉嫌逃税被起诉", "value": 599145, "symbolSize": 77, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 100, "shadowColor": colorList[17], "color": colorList[17] } } },
            {"name": "愚人节后零点一分的表白", "value": 596433, "symbolSize": 77, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 100, "shadowColor": colorList[18], "color": colorList[18] } } },
            {"name": "不是饭也舍不得删的照片", "value": 591945, "symbolSize": 76, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 100, "shadowColor": colorList[19], "color": colorList[19] } } },
            {"name": "广州通报外籍新冠肺炎患者打伤护士", "value": 588043, "symbolSize": 76, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 100, "shadowColor": colorList[0], "color": colorList[0] } } },
            {"name": "食物语", "value": 580264, "symbolSize": 76, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 100, "shadowColor": colorList[1], "color": colorList[1] } } },
            {"name": "接英国留学生飞机已在9点半起飞", "value": 580067, "symbolSize": 76, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 100, "shadowColor": colorList[2], "color": colorList[2] } } },
            {"name": "全美大面积拆除篮球筐", "value": 575029, "symbolSize": 75, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 100, "shadowColor": colorList[3], "color": colorList[3] } } },
            {"name": "湖南新增1例境外输入确诊病例", "value": 501908, "symbolSize": 70, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 100, "shadowColor": colorList[4], "color": colorList[4] } } },
            {"name": "加州所有学校今年整个学年将不再开学", "value": 499193, "symbolSize": 70, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 100, "shadowColor": colorList[5], "color": colorList[5] } } },
            {"name": "最长寿爷爷112岁生日会因疫情取消", "value": 470461, "symbolSize": 68, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 100, "shadowColor": colorList[6], "color": colorList[6] } } },
            {"name": "世卫组织称未来几天全球病例将超100万", "value": 465601, "symbolSize": 68, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 100, "shadowColor": colorList[7], "color": colorList[7] } } },
            {"name": "土耳其人用香水当消毒剂", "value": 416664, "symbolSize": 64, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 100, "shadowColor": colorList[8], "color": colorList[8] } } },
            {"name": "目前142万留学生尚在国外", "value": 415130, "symbolSize": 64, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 100, "shadowColor": colorList[9], "color": colorList[9] } } },
            {"name": "世卫组织代表回应外媒对中国指责", "value": 411501, "symbolSize": 64, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 100, "shadowColor": colorList[10], "color": colorList[10] } } },
            {"name": "高中生直播分享上网课经验", "value": 376046, "symbolSize": 61, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 100, "shadowColor": colorList[11], "color": colorList[11] } } },
            {"name": "美国新冠肺炎确诊超20万例", "value": 369299, "symbolSize": 60, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 100, "shadowColor": colorList[12], "color": colorList[12] } } },
            {"name": "武汉无疫情小区达99%", "value": 360124, "symbolSize": 60, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 100, "shadowColor": colorList[13], "color": colorList[13] } } },
            {"name": "网络上看不懂的字母缩写", "value": 338968, "symbolSize": 58, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 100, "shadowColor": colorList[14], "color": colorList[14] } } },
            {"name": "洛杉矶市长建议全体市民戴口罩", "value": 315365, "symbolSize": 56, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 100, "shadowColor": colorList[15], "color": colorList[15] } } },
            {"name": "小时候追剧的样子", "value": 282486, "symbolSize": 53, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 100, "shadowColor": colorList[16], "color": colorList[16] } } },
            {"name": "世界自闭症日", "value": 275653, "symbolSize": 52, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 100, "shadowColor": colorList[17], "color": colorList[17] } } },
            {"name": "意大利3000万海外口罩2200万来自中国", "value": 272135, "symbolSize": 52, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 100, "shadowColor": colorList[18], "color": colorList[18] } } },
            {"name": "动物森友会 樱花", "value": 261851, "symbolSize": 51, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 100, "shadowColor": colorList[19], "color": colorList[19] } } },
            {"name": "上海教师入围全球教师奖", "value": 259718, "symbolSize": 50, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 100, "shadowColor": colorList[0], "color": colorList[0] } } },
            {"name": "阶段性友谊", "value": 225713, "symbolSize": 47, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 100, "shadowColor": colorList[1], "color": colorList[1] } } },
            {"name": "中关村研发出新型石墨烯口罩", "value": 208998, "symbolSize": 45, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 100, "shadowColor": colorList[2], "color": colorList[2] } } },
            {"name": "西班牙执勤军人护送独居奶奶回家", "value": 208637, "symbolSize": 45, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 100, "shadowColor": colorList[3], "color": colorList[3] } } },
            {"name": "篮网四位感染新冠病毒球员已无症状", "value": 207387, "symbolSize": 45, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 100, "shadowColor": colorList[4], "color": colorList[4] } } },
            {"name": "疫情中爱情的模样", "value": 207262, "symbolSize": 45, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 100, "shadowColor": colorList[5], "color": colorList[5] } } },
            {"name": "甜筒美妆蛋", "value": 206198, "symbolSize": 45, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 100, "shadowColor": colorList[6], "color": colorList[6] } } },
            {"name": "美国预计有10万至24万人死于新冠", "value": 205726, "symbolSize": 45, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 100, "shadowColor": colorList[7], "color": colorList[7] } } },
            {"name": "钟南山谈康复患者是否会有后遗症", "value": 198472, "symbolSize": 44, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 100, "shadowColor": colorList[8], "color": colorList[8] } } },
            {"name": "查尔斯王子发视频谈患病感受", "value": 196940, "symbolSize": 44, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 100, "shadowColor": colorList[9], "color": colorList[9] } } },
            ].splice(0,data.length);
    console.log(arr1,111);
    for(var i in arr1){
        arr1[i].name = data[i].name;
        arr1[i].value = data[i].value;
        console.log(11111)
    };
    console.log(arr1);
    // console.log(colorList);
    option = {
        // 图表标题
        title: {
            show:true,//显示策略，默认值true,可选为：true（显示） | false（隐藏）
            text: '纬度地下数据展示',//主标题文本，'\n'指定换行
            x: 'center',        // 水平安放位置，默认为左对齐，可选为：
                              // 'center' ¦ 'left' ¦ 'right'
                              // ¦ {number}（x坐标，单位px）
            y: 'bottom',             // 垂直安放位置，默认为全图顶端，可选为：
                              // 'top' ¦ 'bottom' ¦ 'center'
                              // ¦ {number}（y坐标，单位px）
            //textAlign: null          // 水平对齐方式，默认根据x设置自动调整
            backgroundColor: 'rgba(0,0,0,0)',
            borderColor: '#ccc',    // 标题边框颜色
            borderWidth: 0,         // 标题边框线宽，单位px，默认为0（无边框）
            padding: 5,             // 标题内边距，单位px，默认各方向内边距为5，
                                    // 接受数组分别设定上右下左边距，同css
            itemGap: 10,            // 主副标题纵向间隔，单位px，默认为10，
            textStyle: {
                fontSize: 18,
                fontWeight: 'bolder',
                color: '#333'        // 主标题文字颜色
            },
            subtextStyle: {
                color: '#aaa'        // 副标题文字颜色
            }
        },
        backgroundColor: '#fff',
        tooltip: {},
        animationDurationUpdate: function(idx) {
            // 越往后的数据延迟越大
            return idx * 100;
        },
        animationEasingUpdate: 'bounceIn',
        color: ['#fff', '#fff', '#fff'],
        series: [{
            type: 'graph',
            layout: 'force',
            force: {
                repulsion: 250,
                edgeLength: 10
            },
            roam: true,
            label: {
                normal: {
                    show: true
                }
            },
            data:arr1
        }]
    };
    var dom = document.getElementById("main2");
    var myChart = echarts.init(dom);
    myChart.setOption(option, true);
    }

    // 调用f2函数
    f2("东经0");
});