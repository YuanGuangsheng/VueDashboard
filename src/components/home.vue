<template>
    <div class="bg">

      <div class="card">
        <el-row>

          <el-col :span="8">
            <div class="line">
              <div class="item">
                <span>521</span>
                <i>新闻数量</i>
              </div>
              <div class="item">
                <span>5021</span>
                <i>访问数量</i>
              </div>
              <div class="item">
                <span>521</span>
                <i>用户数量</i>
              </div>
              <div class="item">
                <span>521</span>
                <i>新注册用户</i>
              </div>
              <div class="item">
                <span>更新时间</span>
                <i>2017年1月1日</i>
              </div>
            </div>
          </el-col>

          <el-col :span="15" class="card-chart" :offset="1">
            <div id="myChart" style="height: 320px;"></div>
          </el-col>

        </el-row>
      </div>

      <div class="card">
        <el-row>
          <el-col :span="8" class="card-chart">
            <div id="myChart1" style="height: 400px;"></div>
          </el-col>
          <el-col :span="7" class="card-chart" :offset="1">
            <div id="myChart2" style="height: 400px;"></div>
          </el-col>
          <el-col :span="7" class="card-chart" :offset="1">
            <div id="myChart3" style="height: 400px;"></div>
          </el-col>
        </el-row>
      </div>

    </div>
</template>
<script>
  export default {
    mounted () {
      this.drawLine()
      this.drawPillar1()
      this.drawPillar2()
      this.drawPillar3()
    },
    methods: {
      drawLine () {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        var option = {
          title: {
            text: '堆叠区域图'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          legend: {
            data: ['问题反馈', '图片广告', '视频广告', 'vip', '总销售']
          },
          toolbox: {
            feature: {
              saveAsImage: {}
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
              boundaryGap: false,
              data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '问题反馈',
              type: 'line',
              stack: '总量',
              areaStyle: {normal: {}},
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: '图片广告',
              type: 'line',
              stack: '总量',
              areaStyle: {normal: {}},
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: '视频广告',
              type: 'line',
              stack: '总量',
              areaStyle: {normal: {}},
              data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
              name: 'vip',
              type: 'line',
              stack: '总量',
              areaStyle: {normal: {}},
              data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
              name: '总销售',
              type: 'line',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              },
              areaStyle: {normal: {}},
              data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
          ]
        }
        myChart.setOption(option)
      },
      drawPillar1 () {
        let myChart1 = this.$echarts.init(document.getElementById('myChart1'))
        var option = {
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
              data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
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
              name: '直接访问',
              type: 'bar',
              barWidth: '60%',
              data: [10, 52, 200, 334, 390, 330, 220]
            }
          ]
        }
        myChart1.setOption(option)
      },
      drawPillar2 () {
        let myChart2 = this.$echarts.init(document.getElementById('myChart2'))
        var option = {
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
              data: ['一月', '二月', '三月', '四月', '五月', '六月'],
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
              name: '直接访问',
              type: 'bar',
              barWidth: '60%',
              data: [10, 52, 200, 334, 390, 330]
            }
          ]
        }
        myChart2.setOption(option)
      },
      drawPillar3 () {
        let myChart3 = this.$echarts.init(document.getElementById('myChart3'))
        var option = {
          title: {
            text: ' ',
            subtext: '星级统计'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['1星', '2星', '3星', '4星', '5星']
          },
          grid: {
            left: '3%',
            right: '10%',
            bottom: '10%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
          },
          yAxis: {
            type: 'category',
            data: ['']
          },
          series: [
            {
              name: '1星',
              type: 'bar',
              data: [12]
            },
            {
              name: '2星',
              type: 'bar',
              data: [5]
            },
            {
              name: '3星',
              type: 'bar',
              data: [8]
            },
            {
              name: '4星',
              type: 'bar',
              data: [19]
            },
            {
              name: '5星',
              type: 'bar',
              data: [3]
            }
          ]
        }
        myChart3.setOption(option)
      }
    }
  }
</script>
<style>

  .bg{
    background-color: #f0f3f4;
  }
  .line .item:nth-child(1) {
    background-color: #fff;
    width: 49%;
    color: #23B7E5;
  }

  .line .item:nth-child(1) i {
    color: #97a8be;
    font-size: 14px;
  }

  .line .item:nth-child(2) {
    background-color: #7266BA;
    width: 49%;
    color: #fff;
  }

  .line .item:nth-child(2) i {
    font-size: 14px;
  }

  .line .item:nth-child(3) {
    background-color: #23B7E5;
    width: 49%;
    color: #fff;
  }

  .line .item:nth-child(3) i {
    font-size: 14px;
  }

  .line .item:nth-child(4) {
    background-color: #fff;
    width: 49%;
    color: #666;
  }

  .line .item:nth-child(4) i {
    color: #97a8be;
    font-size: 14px;
  }

  .line .item:nth-child(5) {
    background-color: #E4EAEC;
    width: 100%;
    color: #7266BA;
    margin-bottom: 0px;
  }

  .line .item:nth-child(5) i {
    color: #97a8be;
    font-size: 14px;
  }

  .line {
    width: 100%;
    height: 320px;
  }

  .line .item {
    padding: 23px 0px;
    float: left;
    height: 100px;
    margin-bottom: 10px;
    border-radius: 5px;
    text-align: center;
  }

  .line .item:nth-child(2n) {
    margin-left: 2%;
  }

  .line .item span {
    display: block;
    font-size: 32px;
    width: 100%;
  }

  .line .item i {
    font-style: normal;
  }

  .card:last-child{
    margin-top:20px;
  }

  .card-chart {
    background-color: #fff;
  }

  #feedback .card:last-child {
    padding-bottom: 40px;
  }
</style>





