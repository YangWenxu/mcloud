<template>
    <div id="main" style="width: 400px; height: 400px">
        <div class="content">
            <div id="overview">
                <p>好好学习天天向上</p>
            </div>
            <div class="zhaobuchu">
                <div id="datasize"></div>
                <div id="availablility"></div>
            </div>
        </div>
        <div class="footer">
            <div id="category"></div>
            <div id="quantity"></div>
        </div>
    </div>
</template>


<script>

    import echarts from 'echarts'

    export default {
        data () {
            return {};
        },
        methods: {
            drawCharts() {
                var myChart1 = echarts.init(document.getElementById('datasize'));
                var myChart2 = echarts.init(document.getElementById('availablility'));
                var myChart3 = echarts.init(document.getElementById('category'));
                var myChart4 = echarts.init(document.getElementById('quantity'));

                var option1 = {
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['01/01', '02/01', '03/01', '04/01', '05/01']
                    },
                    yAxis: {
                        type: 'value',
                        mix: 0,
                        max: 5,
                    },
                    series: [{
                        data: [1, 2, 1.5, 2.3, 2.4],
                        type: 'line',
                        areaStyle: {
                            normal: {
                                color: 'rgba(51,181,234, 0.3)',
                            }
                        },
                        itemStyle : {
                            normal : {
                                color:'#33B5EA', //改变折线点的颜色
                                lineStyle:{
                                 color:'#33B5EA' //改变折线颜色
                                }
                            }
                        },
                      
                        smooth: true
                    }]
                };

                var option2 = {
                    tooltip : {
                        formatter: "{a} <br/>{b} : {c}%"
                    },
                    toolbox: {
                        feature: {
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    series: [
                        {
                            name: '业务指标',
                            type: 'gauge',
                            detail: {formatter:'{value}%'},
                            data: [{value: 50, name: 'Availablity'}]
                        }
                    ]
                };

                var option3 = {
                    color:['#19faf6','#192cfa', '#e3fa19', 'red', '#fda617','#0f1961'],
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        // x: 'right',
                        right: 90,
                        top: 100,
                        // bottom: 50,
                        data:['Granulator','Conveyor','Dryer','Mixer','Temperature','Other']
                    },
                    series: [
                        {
                            name:'访问来源',
                            type:'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'center',
                                    formatter: function() {
                                        // return ' Total \r\n 124,543 '
                                        return "{a|" + "Total" + "}" + "\n" + "{b|" + "124,543" + "}"
                                    },
                                    rich: {
                                        a: {
                                            left: '30px',
                                            fontSize: '20',
                                            // fontWeight: 'bold',
                                        },
                                        b: {
                                            left: '30px',
                                            fontSize: '30',
                                            fontWeight: 'bold',
                                        }
                                    }
                                    // textStyle: {
                                    //     left: '30px',
                                    //     fontSize: '30',
                                    //     fontWeight: 'bold'
                                    // }
                                },
                                // emphasis: {
                                //     show: true,
                                //     textStyle: {
                                
                                //         left: '30px',
                                //         fontSize: '30',
                                //         fontWeight: 'bold'
                                //     }
                                // }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:[
                                {value:335, name:'Granulator'},
                                {value:310, name:'Conveyor'},
                                {value:234, name:'Dryer'},                    
                                {value:135, name:'Mixer'},
                                {value:148, name:'Temperature'},
                                {value:131, name: 'Other'},
                            ],
                        }
                        
                    ]
                };

                var option4 = {
                    tooltip: {},
                    xAxis: {
                        data: ['01/05', '02/05', '03/05', '04/05', '05/05']
                    },
                    yAxis: {},
                    series: [{
                        type: 'bar',
                        barWidth: '35%',
                        data: [280, 670, 690, 710, 860],
                        itemStyle: {
                        normal: {
                　　　　　　　　
                                color: function(params) {
                                    var colorList = ['#33B5EA','#33B5EA', '#33B5EA', '#33B5EA', '#33B5EA'];
                                    return colorList[params.dataIndex]
                                }
                            }
                        }

                    }]
                };
                
                myChart1.setOption(option1);
                setInterval(function () {
                    option2.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
                    myChart2.setOption(option2, true);
                },2000);
                myChart3.setOption(option3);
                myChart4.setOption(option4);

            }
        },
        mounted() {
            this.drawCharts();
        },
    }
</script>

<style scoped>
    * {
        margin: 0;
        padding: 0;
    }

    #main {
        width: 1500px;
        height: 1200px;
        margin: 0 auto;
        padding-left: 25px;
        padding-right: 25px;
        padding-top: 15px;
        background: #FFFFFF;
       
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -600px;
        margin-left: -750px;
    }

    .content {

        width: 1500px;
        height: 800px;
    }

    #overview {
        float: left;
        height: 800px;
        width: 65%;
        background:gray;
    }

    .zhaobuchu {
        float: right;
        height: 800px;
        width: 35%;
    }

    #datasize {
        height: 399px;
        width: 100%;
        background: #FFFFFF;
        border: 1px solid blue;
    }

    #availablility {
        height: 399px;
        width: 100%;
        background: #FFFFFF;
        border: 1px solid blue;
    }

    .footer {
        height: 400px;
        width: 1500px;
    }

    #category {
        float: left;
        width: 49.7%;
        height: 390px;
        background: #FFFFFF;
        border: 1px solid blue;
    }

    #quantity {
        float: right;
        width: 50%;
        height: 390px;
        background: #FFFFFF;
        border: 1px solid blue;
    }

</style>